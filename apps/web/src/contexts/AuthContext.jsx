import React, { createContext, useEffect, useState } from "react";
import ax, { axData } from "../conf/ax";
import conf from "../conf/main";

const AuthContext = createContext(null);

const initialState = {
    isLoggedIn: false,
    user: null, // this was email before, let's keep it as string email or username
    username: null,
    role: null,
    loading: true,
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
                
                // Store in sessionStorage
                sessionStorage.setItem(conf.jwtSessionStorageKey, access_token);
                sessionStorage.setItem("userRole", role);
                sessionStorage.setItem("userInfo", JSON.stringify(user));
                
                // Update axios headers
                axData.jwt = access_token;
                
                updateState({
                    isLoggedIn: true,
                    user: user.email,
                    username: user.username,
                    role,
                    id: user.id,
                    email: user.email,
                    token: access_token,
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
            throw error;
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

            // Set loading to false immediately
            setState(prevState => ({ ...prevState, loading: false }));

            if (token) {
                try {
                    axData.jwt = token;
                    // Check token validity with NestJS backend
                    const response = await ax.get(conf.jwtUserEndpoint);
                    
                    if (response.data?.email) {
                        const user = response.data;
                        updateState({
                            isLoggedIn: true,
                            user: user.email,
                            username: user.username,
                            role: user.role || "USER",
                            id: user.id,
                            email: user.email,
                            token: token,
                        });
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch {
                    sessionStorage.removeItem(conf.jwtSessionStorageKey);
                    sessionStorage.removeItem("userRole");
                    setState(initialState);
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

// Hook for easy access to auth context
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
