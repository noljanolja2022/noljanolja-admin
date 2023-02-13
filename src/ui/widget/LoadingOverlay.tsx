import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { ViewState } from "../../data/enum/ViewState";

function LoadingOverlay() {
    const { viewState } = useContext(AppContext);

    return (viewState === ViewState.LOADING ?
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            flexGrow: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99
        }}>
            <img src="pp-yy-logo.png" className="app-logo" alt="App Logo"/>
        </div>
        : null)
}

export default LoadingOverlay;