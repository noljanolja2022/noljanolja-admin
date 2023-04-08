import { create } from 'zustand'
import { ViewState } from '../data/enum/ViewState'

type LoadingStore = {
    viewState: ViewState;
    setViewState: (newState: ViewState) => void
}

export const useLoading = create<LoadingStore>((set) => ({
    viewState: ViewState.IDLE,
    setViewState: (newState: ViewState) => set((state) => ({ viewState: newState })),
}))