'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuthResponse, UserToken } from '@/types/userAuthResponse-types';
import { GetClientById } from '@/app/api/actions/client';

interface AuthContextData {
    userToken: UserToken | null; 
    isAuthenticated: boolean;
    login: (userData: any) => void; 
    logout: () => void; 
    user: UserStore | null;
}

interface UserStore {
    fullname: string
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStore | null>(null); 
    const [userToken, setUserToken] = useState<UserToken | null>(null);
    const router = useRouter();

    
    useEffect(() => {
        const storedUser = localStorage.getItem('userToken');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
            setUserToken(parsedUser);
        }
    }, []);

    const login = (userAuthData: UserAuthResponse) => {
        setUserToken(userAuthData.userToken);
        localStorage.setItem('vn_token', JSON.stringify(userToken));
        const client = fetchClient(userAuthData.userData.userId);
    };

    const logout = () => {
        setUserToken(null);
        localStorage.removeItem('userToken');
        router.push('/');
    };

    const fetchClient = async (clientId:number) => {
        const client = await GetClientById(clientId);
        console.log(client);
        setUser({
            fullname: client.fullname
        });
    }

    return (
        <AuthContext.Provider
            value={{
                userToken,
                isAuthenticated: !!userToken && !!user, 
                login,
                logout,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
