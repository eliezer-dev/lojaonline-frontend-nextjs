import api from "@/lib/api";
import { UserToken } from "@/types/userToken-types";

export const AuthenticateUser = async (credentials: { email: string; password: string }): Promise<UserToken> => {
    const response = await api.post<UserToken>('/clients/auth', credentials);
    return response.data;
};