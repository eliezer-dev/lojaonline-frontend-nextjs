import api from "@/lib/api";
import { UserAuthResponse, UserToken } from "@/types/userAuthResponse-types";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    sub: string; // ou o nome da claim que contém o ID do usuário
    email?: string;
    exp: number; // Data de expiração do token,
    roles?: string[];
}



export const AuthenticateUser = async (credentials: { email: string; password: string }): Promise<UserAuthResponse> => {
    const response = await api.post<UserToken>('/clients/auth', credentials);
    const token = response.data.access_token

    const decoded: DecodedToken = jwtDecode(token);

    const userAuthResponse: UserAuthResponse = {
        userToken: response.data,
        userData: {
            userId: parseInt(decoded.sub),
            userRole: decoded.roles ? parseInt(decoded.roles[0]) : null
        }
    }

    return userAuthResponse
}