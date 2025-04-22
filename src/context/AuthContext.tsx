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
    id: number
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserStore | null>(null); 
    const [userToken, setUserToken] = useState<UserToken | null>(null);
    const router = useRouter();

    
    useEffect(() => {
        getUserTokenFromLocalStorage();
    }, []);

    const login = (userAuthData: UserAuthResponse) => {
        setUserToken(userAuthData.userToken);
        localStorage.setItem('vn_userData', JSON.stringify(userAuthData));
        fetchClient(userAuthData.userData.userId);
    };

    const getUserTokenFromLocalStorage = () => {
        const storedUser = localStorage.getItem('vn_userData');
        const parsedUser:UserAuthResponse|null = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
            setUserToken(parsedUser.userToken);
            fetchClient(parsedUser.userData.userId);
        }
    }

    const logout = () => {
        setUserToken(null);
        localStorage.removeItem('vn_userData');
        router.push('/');
    };

    const fetchClient = async (clientId:number) => {
        const client = await GetClientById(clientId);
        setUser({
            fullname: client.fullname,
            id: client.id
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
