import Backdrop from "@mui/material/Backdrop";
import { ViewState } from "../../data/enum/ViewState";
import { useLoadingStore } from "../../store/LoadingStore";

type Props = {
    forceShowing?: boolean
}

export default function LoadingOverlay(props: Props) {
    const loadingState = useLoadingStore();

    return (
        <Backdrop open={loadingState.viewState === ViewState.LOADING || props.forceShowing == true} sx={{zIndex: 99}}>
            <img src="pp-yy-logo.png" className="app-logo" alt="App Logo" />
        </Backdrop>
    )
}