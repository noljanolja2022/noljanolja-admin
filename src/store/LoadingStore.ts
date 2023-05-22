import { create } from 'zustand'
import { ViewState } from '../data/enum/ViewState'

type LoadingStore = {
    viewState: ViewState;
    setLoading: () => void
    setIdle: () => void
    setSuccess: () => void
    setIniting: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    viewState: ViewState.IDLE,
    setLoading: () => set(state => ({ viewState: ViewState.LOADING })),
    setIdle: () => set(state => ({ viewState: ViewState.IDLE })),
    setSuccess: () => set(state => ({ viewState: ViewState.SUCCESS })),
    setIniting: () => set(state => ({ viewState: ViewState.INITING })),
}))