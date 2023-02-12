import { httpsCallable } from 'firebase/functions';
import { firebaseAuthInstance, firebaseFunctions } from './FirebaseService';
import api from './ApiClient';
import { signOut } from 'firebase/auth';

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

    async onLogout() {
        this.clearToken();
        return signOut(firebaseAuthInstance)
    }
}

export default new AuthService();