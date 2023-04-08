import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "./FirebaseService";

class AnalyticService {
    logLoginEvent() {
        logEvent(firebaseAnalytics, 'login')
    }
}

const analyticService = new AnalyticService();

export default analyticService;