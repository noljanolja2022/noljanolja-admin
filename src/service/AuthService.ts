import { firebaseAuthInstance } from './FirebaseService';
import { signOut } from 'firebase/auth';
import { StorageKey } from '../util/Constants';

class AuthService {
    saveToken(token: string) {
        localStorage.setItem(StorageKey.bearer, token);
    }

    getToken() {
        return localStorage.getItem(StorageKey.bearer);
    }

    clearToken() {
        localStorage.removeItem(StorageKey.bearer);
    }

    async onLogout() {
        this.clearToken();
        return signOut(firebaseAuthInstance)
    }
}
const authService = new AuthService();

export default authService;