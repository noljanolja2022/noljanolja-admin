import { t } from 'i18next';
import { create } from 'zustand';
import { SnackbarState, ViewState } from '../data/enum/ViewState';

type SnackBarProps = {
    message: string;
    state: SnackbarState
}

type LoadingStore = {
    viewState: ViewState;
    setLoading: () => void
    setIdle: () => void
    setSuccess: () => void
    setIniting: () => void
    snackBarProps: Nullable<SnackBarProps>;
    clearSnackBar: () => void
    showSuccessNoti: (message: string) => void,
    showErrorNoti: (message?: string) => void,
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    viewState: ViewState.IDLE,
    setLoading: () => set(state => ({ viewState: ViewState.LOADING })),
    setIdle: () => set(state => ({ viewState: ViewState.IDLE })),
    setSuccess: () => set(state => ({ viewState: ViewState.SUCCESS })),
    setIniting: () => set(state => ({ viewState: ViewState.INITING })),
    snackBarProps: null,
    clearSnackBar: () => set(state => ({ snackBarProps: null })),
    showSuccessNoti: (message: string) => set(_ => ({ snackBarProps: { message: message, state: SnackbarState.SUCCESS } })),
    showErrorNoti: (message?: string) => set(_ => ({ snackBarProps: { message: message || t('error_common'), state: SnackbarState.ERROR } })),

}))