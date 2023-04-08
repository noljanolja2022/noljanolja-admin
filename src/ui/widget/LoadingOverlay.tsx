import { ViewState } from "../../data/enum/ViewState";
import { useLoading } from "../../state/LoadingState";

export default function LoadingOverlay() {
    const loadingState = useLoading();

    return (loadingState.viewState === ViewState.LOADING &&
        <div className="fixed left-0 top-0 right-0 bottom-0 flex-grow bg-[#00000080] flex justify-center items-center z-50">
            <img src="pp-yy-logo.png" className="app-logo" alt="App Logo" />
        </div>
    ) || null
}