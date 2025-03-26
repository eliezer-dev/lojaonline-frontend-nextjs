'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserToken } from '@/types/userToken-types';

interface AuthContextData {
    userToken: UserToken | null; 
    isAuthenticated: boolean;
    login: (userData: any) => void; 
    logout: () => void; 
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null); 
    const [userToken, setUserToken] = useState<UserToken | null>(null); // Estado do token do usuário
    const router = useRouter();

    
    useEffect(() => {
        const storedUser = localStorage.getItem('userToken');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
            setUserToken(parsedUser);
        }
    }, []);

    const login = (userToken: UserToken) => {
        setUserToken(userToken);
        localStorage.setItem('vn_token', JSON.stringify(userToken));
    };

    const logout = () => {
        setUserToken(null);
        localStorage.removeItem('userToken');
        router.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                userToken,
                isAuthenticated: !!userToken, 
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
