import client from 'Axios';
import { GoogleProfile } from '../data/models/AuthModels';

class AuthService {

    async getGoogleUserInfo(accessToken: string): Promise<GoogleProfile> {
        return client.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
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