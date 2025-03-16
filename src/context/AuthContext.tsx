import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextData {
    user: any; // Substitua com o tipo real, por exemplo, User ou null
    isAuthenticated: boolean;
    login: (userData: any) => void; // Função para fazer login
    logout: () => void; // Função para fazer logoff
}

// Cria o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null); // Estado do usuário
    const router = useRouter();

    // Carregar dados do usuário ao iniciar o app (se um token de sessão for encontrado)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        if (parsedUser) {
            setUser(parsedUser);
        }
    }, []);

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Salvar no localStorage (ou cookies)
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login'); // Redireciona para a página de login
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user, // verifica se o usuário está autenticado
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
