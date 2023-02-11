import { httpsCallable } from 'firebase/functions';
import { firebaseFunctions } from './FirebaseService';
import api from './ApiClient';

class AuthService {
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