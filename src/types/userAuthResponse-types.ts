export interface UserAuthResponse {
    userToken: UserToken;
    userData: {
        userId: number;
        userRole: number | null;
    };
}


export interface UserToken {
    access_token: string;
    expires_in: number;
}
