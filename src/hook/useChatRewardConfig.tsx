import { useRewardStore } from "../store/rewardConfigStore"
import { useLoadingStore } from "../store/LoadingStore";
import rewardService from "../service/RewardService";

export default function useChatRewardConfig() {
    const { setLoading, setIdle } = useLoadingStore();
    const { chatConfigs, setChatConfigs } = useRewardStore();

    const fetchChatConfig = () => {
        setLoading()
        rewardService.getChatRewardConfigs().then(res => {
            if (res.isFailure()) {
                return;
            }
            setChatConfigs(res.data || [])
        }).finally(() => {
            setIdle();
        })
    }

    return { chatConfigs, fetchChatConfig }
}