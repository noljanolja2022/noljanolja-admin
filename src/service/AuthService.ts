import { firebaseAuthInstance } from './FirebaseService';
import { signOut } from 'firebase/auth';
import { StorageKey } from '../util/Constants';
import { useUserStore } from '../store/UserStore';

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

    async logout() {
        useUserStore.getState().setUser(null)
        this.clearToken();
        return signOut(firebaseAuthInstance)
    }
}
const authService = new AuthService();

export default authService;