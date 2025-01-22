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
    email: null,
};

const saveJwt = async (token, role, gcToken, updateState) => {
    axData.jwt = token;

    if (token) {
        sessionStorage.setItem(conf.jwtSessionStorageKey, token);
        sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("gcToken", gcToken);

        // Update state after setting sessionStorage
        updateState && updateState({ token, role });
    } else {
        sessionStorage.removeItem(conf.jwtSessionStorageKey);
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("gcToken");

        // Reset state if token is null
        updateState && updateState(initialState);
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
                const role = user.role?.name || "User";
                await saveJwt(jwt, role, null, updateState);
                updateState({
                    isLoggedIn: true,
                    user: user.email,
                    role,
                    id: user.id,
                    email: user.email,
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

    // Logout function
    const logout = async () => {
        await saveJwt(null, null, null);
        setState(initialState);
    };

    // Check login status on initial load
    useEffect(() => {
        const loadPersistedJwt = async () => {
            const token = sessionStorage.getItem(conf.jwtSessionStorageKey);
            const role = sessionStorage.getItem("userRole");

            if (token) {
                try {
                    axData.jwt = token;
                    const response = await ax.get(conf.jwtUserEndpoint);
                    if (response.data?.email) {
                        await saveJwt(
                            token,
                            response.data.role?.name,
                            response.data.Speach,
                            updateState
                        );
                        updateState({
                            isLoggedIn: true,
                            user: response.data.username,
                            role: response.data.role?.name || "User",
                            id: response.data.id,
                            email: response.data.email,
                            gcToken: response.data.Speach,
                        });
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch {
                    await saveJwt(null, null, null);
                }
            }
        };
        loadPersistedJwt();
    }, []);

    // Refresh Token function
    const refreshToken = async () => {
        try {
            const response = await ax.post(conf.refreshTokenEndpoint);
            if (response.data?.jwt) {
                const { jwt } = response.data;
                await saveJwt(jwt, state.role, null, updateState);
                updateState({ token: jwt });
            }
        } catch {
            await logout();
        }
    };

    // Check if user has specific role
    const hasRole = (roles) => {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }
        return roles.includes(state.role);
    };

    // Get Authenticated User Info
    const getUserInfo = () => ({
        id: state.id,
        email: state.email,
        role: state.role,
    });

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                refreshToken,
                hasRole,
                getUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, ContextProvider };
