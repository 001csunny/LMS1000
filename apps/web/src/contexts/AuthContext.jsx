import React, { createContext, useEffect, useState } from "react";
import ax, { axData } from "../conf/ax";
import conf from "../conf/main";

const AuthContext = createContext(null);

const initialState = {
    isLoggedIn: false,
    user: null, // this was email before, let's keep it as string email or username
    username: null,
    role: null,
    loading: false,
    error: null,
    token: null,
    id: null,
    email: null,
};

const saveJwt = async (token, role, updateState) => {
    axData.jwt = token;

    if (token) {
        sessionStorage.setItem(conf.jwtSessionStorageKey, token);
        sessionStorage.setItem("userRole", role);

        // Update state after setting sessionStorage
        updateState && updateState({ token, role });
    } else {
        sessionStorage.removeItem(conf.jwtSessionStorageKey);
        sessionStorage.removeItem("userRole");

        // Reset state if token is null
        updateState && updateState(initialState);
    }
};

const ContextProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    // Update state function
    const updateState = (newState) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    // Login function
    const login = async (username, password) => {
        updateState({ loading: true, error: null });

        try {
            // NestJS login format
            const response = await ax.post(conf.loginEndpoint, {
                email: username, // Assuming 'identifier' -> 'email' in NestJS
                password: password,
            });

            if (response.data?.access_token) {
                const { access_token, user } = response.data;
                const role = user.role || "USER";
                await saveJwt(access_token, role, updateState);
                
                updateState({
                    isLoggedIn: true,
                    user: user.email,
                    username: user.username,
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
        await saveJwt(null, null);
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
                    // Check token validity with NestJS backend
                    const response = await ax.get(conf.jwtUserEndpoint);
                    
                    if (response.data?.email) {
                        const user = response.data;
                        await saveJwt(
                            token,
                            user.role || "USER",
                            updateState
                        );
                        updateState({
                            isLoggedIn: true,
                            user: user.email,
                            username: user.username,
                            role: user.role || "USER",
                            id: user.id,
                            email: user.email,
                        });
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch {
                    await saveJwt(null, null);
                }
            }
        };
        loadPersistedJwt();
    }, []);

    // Refresh Token function (Stubbed if not using refresh tokens in NestJS)
    const refreshToken = async () => {
        // Not implemented in backend yet, keeping interface for compatibility
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
        username: state.username,
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
