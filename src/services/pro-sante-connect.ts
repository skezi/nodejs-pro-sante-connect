import { request } from "./fetcher";

type returnToken = {
   'token_type': string,
   'access_token': string,
   'expires_in': number,
   'refresh_token': string,
   'refresh_expires_in': number,
   'id_token': string,
   'session_state': string,
   'scope': string
}

class ProSanteConnectService {
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

    constructor(authenticationUrl, serverUrl, clientId, clientSecret, callbackUri) {
        this.proSanteConnectAuthenticationUrl = authenticationUrl;
        this.proSanteConnectServerUrl = serverUrl;
        this.proSanteConnectClientId = clientId;
        this.proSanteConnectClientSecret = clientSecret;
        this.proSanteConnectCallbackUri = callbackUri;
    }

    async getApiTest(): Promise<any> {
        return await request({method: 'get', url: `${this.proSanteConnectServerUrl}/.well-known/wallet-openid-configuration`});
    }

    getAuthenticationUrl(userState: string = null, userNonce: string = null, prompt: string = null, max_age: string = null): string {
        let queryStrings = [
            `response_type=code`,
            `client_id=${encodeURIComponent(this.proSanteConnectClientId)}`,
            `redirect_uri=${encodeURIComponent(this.proSanteConnectCallbackUri)}`,
            `scope=${encodeURIComponent('openid scope_all')}`,
            `acr_values=eidas1`,
        ];
        if (userState) {
            queryStrings.concat(`state=${encodeURIComponent(userState)}`);
        }
        if (userNonce) {
            queryStrings.concat(`nonce=${encodeURIComponent(userNonce)}`);
        }
        if (prompt) {
            queryStrings.concat(`prompt=${encodeURIComponent(prompt)}`);
        }
        if (max_age) {
            queryStrings.concat(`max_age=${encodeURIComponent(max_age)}`);
        }

        return `${this.proSanteConnectAuthenticationUrl}?${queryStrings.join('&')}`;
    }

    setAuthenticationCode(code) {
        this.authenticationCode = code;
    }

    async generateNewToken(): Promise<any> {
        return await request({
            method: 'post',
            url: `${this.proSanteConnectServerUrl}/protocol/openid-connect/token`,
            data: {
                'grant_type': 'authorization_code',
                'redirect_uri': this.proSanteConnectCallbackUri,
                'client_id': this.proSanteConnectClientId,
                'client_secret': this.proSanteConnectClientSecret,
                'code': this.authenticationCode
            }
        }).then((data: returnToken) => {
            console.log('Get token return');

            this.access_token = data.access_token;
            this.access_token_expires_date = new Date().setSeconds(new Date().getSeconds() + data.expires_in);
            this.refresh_token = data.refresh_token;
            this.access_token_refresh_expires_date = new Date().setSeconds(new Date().getSeconds() + data.refresh_expires_in);
        })
        .catch ((error) => {
            console.log('get_token error :', error);
            throw new Error(error);
        });
    }

    async refreshToken(): Promise<any> {
        return await request({
            method: 'post',
            url: `${this.proSanteConnectServerUrl}/protocol/openid-connect/token`,
            data: {
                'grant_type': 'refresh_token',
                'refresh_token': this.refresh_token,
                'client_id': this.proSanteConnectClientId,
                'client_secret': this.proSanteConnectClientSecret,
                'scope': 'openid scope_all'
            }
        }).then((data: returnToken) => {
            console.log('Refresh token');

            this.access_token = data.access_token;
            this.access_token_expires_date = new Date().setSeconds(new Date().getSeconds() + data.expires_in);
            this.refresh_token = data.refresh_token;
            this.access_token_refresh_expires_date = new Date().setSeconds(new Date().getSeconds() + data.refresh_expires_in);
        })
        .catch ((error) => {
            console.log('refresh_token error :', error);
            throw new Error(error);
        });
    }

    async getToken(): Promise<any> {
        if (!this.authenticationCode) {
            throw new Error('You need to set the authenticationCode with function setAuthenticationCode(code)');
        }

        const now = new Date().getTime();

        if (this.access_token && this.access_token_expires_date < now && this.access_token_refresh_expires_date > now) {
            await this.refreshToken();
        } else if (!this.access_token || this.access_token_refresh_expires_date < now) {
            await this.generateNewToken();
        }

        return this.access_token;
    }

    async getUserInfo(token: string = null) {
        const accessToken = token ? token : await this.getToken();

        return await request({
            method: 'get',
            url: `${this.proSanteConnectServerUrl}/protocol/openid-connect/userinfo`,
            token: accessToken,
        }).then((data: any) => {
            console.log('getUserInfo');

            console.log('data', data)
            console.log('data SubjectRefPro', data.SubjectRefPro)
            console.log('data.SubjectRefPro.exercices[0].activities', data.SubjectRefPro.exercices[0].activities)

            return data;
        })
        .catch ((error) => {
            console.log('get_user_info error :', error);
            throw new Error(error);
        });
    }
}

export class DevProSanteConnectService extends ProSanteConnectService {
    constructor() {
        super (
            'https://wallet.bas.psc.esante.gouv.fr/auth',
            'https://auth.bas.psc.esante.gouv.fr/auth/realms/esante-wallet',
            process.env.DEV_PRO_SANTE_CONNECT_CLIENT_ID,
            process.env.DEV_PRO_SANTE_CONNECT_CLIENT_SECRET,
            process.env.DEV_PRO_SANTE_CONNECT_CALLBACK_URI
        )
    }
}

export class ProdProSanteConnectService extends ProSanteConnectService {
    constructor() {
        super (
            'https://wallet.esw.esante.gouv.fr/auth',
            'https://auth.esw.esante.gouv.fr/auth/realms/esante-wallet',
            process.env.PROD_PRO_SANTE_CONNECT_CLIENT_ID,
            process.env.PROD_PRO_SANTE_CONNECT_CLIENT_SECRET,
            process.env.PROD_PRO_SANTE_CONNECT_CALLBACK_URI
        )
    }
}
