import React, { createContext, useEffect, useState } from "react";

import ax, { axData } from "../conf/ax";
import conf from "../conf/main";

const AuthContext = createContext(null);

// Initial state for authentication
const initialState = {
    isLoggedIn: false,
    user: null,
    isLoginPending: false,
    loginError: null,
    role: null,
};

// Function to update JWT in session storage and axios configuration
const updateJwt = async (jwt) => {
    axData.jwt = jwt; // Set JWT for axios
    if (jwt) {
        sessionStorage.setItem(conf.jwtSessionStorageKey, jwt); // Use sessionStorage
    } else {
        sessionStorage.removeItem(conf.jwtSessionStorageKey);
    }
};

const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    // Utility function to update the state
    const updateState = (newState) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    // Login state management functions
    const setLoginPending = (isLoginPending) => updateState({ isLoginPending });
    const setLoginSuccess = (isLoggedIn, user) =>
        updateState({ isLoggedIn, user, loginError: null });
    const setLoginError = (loginError) =>
        updateState({ loginError, isLoggedIn: false });
    const setUserRole = (role) => updateState({ role });

    // Handle the login result
    const handleLoginResult = async (error, result) => {
        console.log("🚀 ~ handleLoginResult ~ result:", result.jwt)
        setLoginPending(false);
        
        if (result?.email) {
            if (result.access_token) {
                await updateJwt(result.jwt);
            }
            setLoginSuccess(true, result.user.email);
            setUserRole(result.role?.name || "User"); // Default role fallback
        } else if (error) {
            setLoginError(error);
        }
    };

    // Load persisted JWT and verify user
    useEffect(() => {
        const loadJwt = async () => {
            const persistedJwt = sessionStorage.getItem(
                conf.jwtSessionStorageKey
            ); // Use sessionStorage
            if (persistedJwt) {
                setLoginPending(true);
                await loadPersistedJwt(handleLoginResult);
            }
        };

        loadJwt();
    }, []);

    // Function to handle login
    const login = async (username, password) => {
        setLoginPending(true);
        setLoginSuccess(false, undefined);
        setLoginError(null);

        await fetchLogin(username, password, handleLoginResult);
    };

    // Function to handle logout
    const logout = async () => {
        await updateJwt(null);
        setState(initialState);
    };

    // Provide context to children
    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Function to fetch login data
const fetchLogin = async (username, password, callback) => {
    try {
        console.log("Fetching login");
        const response = await ax.post(conf.loginEndpoint, {
            identifier: username,
            password: password,
        });
        console.log(response);

        if (response.data?.jwt) {
            callback(null, response.data);
        } else {
            callback("Invalid username or password", undefined);
        }
    } catch (e) {
        callback("Failed to initiate login. Please try again.", undefined);
    }
};

// Function to load persisted JWT and verify user
const loadPersistedJwt = async (callback) => {
    try {
        const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey); // Use sessionStorage

        if (persistedJwt) {
            axData.jwt = persistedJwt;
            const response = await ax.get(conf.jwtUserEndpoint);

            if (response.data?.id > 0) {
                callback(null, {
                    email: response.data.email,
                    role: response.data.role.name,
                });
            } else {
                callback(
                    "Failed to validate session. Please log in again.",
                    null
                );
            }
        }
    } catch (e) {
        callback("Failed to auto-login. Please check your connection.", null);
    }
};

export { AuthContext, ContextProvider };
