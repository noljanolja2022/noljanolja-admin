import { getAnalytics, logEvent } from "firebase/analytics";
import { AccountType } from "../data/enums/AccountType";

class AnalyticService {
    logLoginEvent(provider: AccountType) {
        logEvent(getAnalytics(), 'login', {
            method: provider
        })
    }
}

export default new AnalyticService();