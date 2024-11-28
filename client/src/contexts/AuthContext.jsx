import React, { createContext, useEffect, useState } from "react";
import ax, { axData } from "../conf/ax";
import conf from "../conf/main";

const AuthContext = createContext(null);

const initialState = {
    isLoggedIn: false,
    user: null,
    role: null,
    loading: false,
    error: null,
    token: null,
    id: null,
};

const saveJwt = async (token) => {
    axData.jwt = token;
    if (token) {
        sessionStorage.setItem(conf.jwtSessionStorageKey, token);
    } else {
        sessionStorage.removeItem(conf.jwtSessionStorageKey);
    }
};

const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    // console.log("🚀 ~ ContextProvider ~ state:", state);

    // Update state function
    const updateState = (newState) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    // Login function
    const login = async (username, password) => {
        updateState({ loading: true, error: null });

        try {
            const response = await ax.post(conf.loginEndpoint, {
                identifier: username,
                password: password,
            });

            if (response.data?.jwt) {
                const { jwt, user } = response.data;
                await saveJwt(jwt);
                updateState({
                    isLoggedIn: true,
                    user: user.email,
                    role: user.role?.name || "User",
                    token: jwt,
                    loading: false,
                });
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            updateState({
                error: error.response?.data?.message || "Login failed",
                loading: false,
            });
        }
    };

 
    const logout = async () => {
        await saveJwt(null);
        setState(initialState);
    };

  
    useEffect(() => {
        const loadPersistedJwt = async () => {
            const token = sessionStorage.getItem(conf.jwtSessionStorageKey);
            if (token) {
                try {
                    axData.jwt = token;
                    const response = await ax.get(conf.jwtUserEndpoint);
                    if (response.data?.email) {
                        updateState({
                            isLoggedIn: true,
                            user: response.data.username,
                            role: response.data.role?.name || "User",
                            token,
                            id: response.data.id,
                            email: response.data.email,
                        });
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch {
                    await saveJwt(null);
                }
            }
        };
        loadPersistedJwt();
    }, []);

    
    const refreshToken = async () => {
        try {
            const response = await ax.post(conf.refreshTokenEndpoint);
            if (response.data?.jwt) {
                const { jwt } = response.data;
                await saveJwt(jwt);
                updateState({ token: jwt });
            }
        } catch {
            await logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, ContextProvider };
