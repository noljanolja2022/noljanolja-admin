import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "./mui"
import { useTranslation } from "react-i18next";

type Props = {
    visible: boolean;
    title?: string;
    children?: React.ReactNode;
    onSubmit?: () => void,
    onClose: () => void
}

export default function ConfirmDialog(props: Props) {
    const { t } = useTranslation();
    return (
        <Dialog open={props.visible}>
            <DialogTitle>{props.title || 'Warning'}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={props.onSubmit}>{t('label_confirm')}</Button>
                <Button color="neutral" onClick={props.onClose}>{t('label_cancel')}</Button>
            </DialogActions>
        </Dialog>
    )
}