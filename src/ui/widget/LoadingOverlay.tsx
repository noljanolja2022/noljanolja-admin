import { ViewState } from "../../data/enum/ViewState";
import { useLoadingStore } from "../../store/LoadingStore";

type Props = {
    forceShowing? : boolean
}

export default function LoadingOverlay(props: Props) {
    const loadingState = useLoadingStore();

    return ((loadingState.viewState === ViewState.LOADING || props.forceShowing) &&
        <div className="fixed left-0 top-0 right-0 bottom-0 flex-grow bg-[#00000080] flex justify-center items-center z-50">
            <img src="pp-yy-logo.png" className="app-logo" alt="App Logo" />
        </div>
    ) || null
}