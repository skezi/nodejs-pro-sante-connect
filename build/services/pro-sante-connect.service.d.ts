export type returnToken = {
    'token_type': string;
    'access_token': string;
    'expires_in': number;
    'refresh_token': string;
    'refresh_expires_in': number;
    'id_token': string;
    'session_state': string;
    'scope': string;
};
declare class ProSanteConnectService {
    proSanteConnectAuthenticationUrl: string;
    proSanteConnectServerUrl: string;
    proSanteConnectClientId: string;
    proSanteConnectClientSecret: string;
    proSanteConnectCallbackUri: string;
    authenticationCode: string;
    access_token: string;
    access_token_expires_date: number;
    refresh_token: string;
    access_token_refresh_expires_date: number;
    constructor(authenticationUrl: any, serverUrl: any, clientId: any, clientSecret: any, callbackUri: any);
    getApiTest(): Promise<any>;
    getAuthenticationUrl(userState?: string, userNonce?: string, prompt?: string, max_age?: string): string;
    setAuthenticationCode(code: any): void;
    generateNewToken(): Promise<any>;
    refreshToken(): Promise<any>;
    getToken(): Promise<any>;
    getUserInfo(token?: string): Promise<any>;
}
export declare class DevProSanteConnectService extends ProSanteConnectService {
    constructor();
}
export declare class ProdProSanteConnectService extends ProSanteConnectService {
    constructor();
}
export {};
