import React, { createContext } from 'react';

export const UserAuthContext = createContext({ isAuthenticated: false, _isAuthenticated: () => { } });

export const UserAuthProvider = ({ children, value }) => {
    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    )
}