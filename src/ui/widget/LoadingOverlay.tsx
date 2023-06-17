import Backdrop from "@mui/material/Backdrop";
import { ViewState } from "../../data/enum/ViewState";
import { useLoadingStore } from "../../store/LoadingStore";

type Props = {
    forceShowing?: boolean
}

export default function LoadingOverlay(props: Props) {
    const loadingState = useLoadingStore();
    //TODO:  Implement snackbar
    return (
        <Backdrop open={loadingState.viewState === ViewState.LOADING ||
            loadingState.viewState === ViewState.INITING ||
            props.forceShowing == true} sx={{ zIndex: 2000 }}>
            <img src="pp-yy-logo.png" className="app-logo" alt="App Logo" />
        </Backdrop>
    )
}