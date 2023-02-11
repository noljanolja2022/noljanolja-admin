import React, { useState } from "react"
import { ViewState } from "../data/enum/ViewState"

type AppDataContext = {
    viewState: ViewState,
    setViewState: (viewState: ViewState) => void
}

const AppContext = React.createContext<AppDataContext>({
    viewState: ViewState.IDLE,
    setViewState: (viewState: ViewState) => { }
})

function AppContextProvider(props: any) {
    const [viewState, setViewState] = useState(ViewState.IDLE);

    return (
        <AppContext.Provider value={{
            setViewState, viewState
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };