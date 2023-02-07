import client from 'Axios';
import { GoogleProfile } from '../data/models/AuthModels';
import { httpsCallable } from 'firebase/functions';
import { firebaseFunctions } from './FirebaseService';
import { AccountType } from '../data/enums/AccountType';

class AuthService {

    async getGoogleUserInfo(accessToken: string): Promise<GoogleProfile> {
        return client.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    async getExchangedToken(token: string, provider: AccountType) {
        httpsCallable(
            firebaseFunctions,
            `api/auth/${provider}`
        )({
            token
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    clearToken() {
        localStorage.removeItem('token');
    }
}

export default new AuthService();