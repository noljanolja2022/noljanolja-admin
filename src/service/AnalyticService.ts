import { getAnalytics, logEvent } from "firebase/analytics";

class AnalyticService {
    logLoginEvent() {
        logEvent(getAnalytics(), 'login')
    }
}

export default new AnalyticService();