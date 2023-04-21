import { useTranslation } from "react-i18next";
import { Video } from "../../data/model/VideoModels";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Typography } from "./mui";

type Props = {
    data: Video | null
    onClose: () => void
}

export default function YoutubeVideoCard(props: Props) {
    const { t } = useTranslation();
    if (props.data == null)
        return null;

    return (
        <Dialog open maxWidth={'md'}>
            {/* <DialogTitle>{props.data.title}</DialogTitle> */}
            <DialogContent>
                <Box>
                    <Box >
                        <Link href={props.data.url} target="_blank">
                            <img src={props.data.thumbnail} alt={props.data.title} style={{
                                maxWidth: '500px'
                            }} />
                        </Link>

                        <Typography maxWidth={'500px'} textOverflow="ellipsis">{props.data.title}</Typography>
                        <Box display={'flex'} flexDirection="row" alignItems={'center'} gap={0.5}>
                            <img style={{
                                borderRadius: '100%'
                            }} src={props.data.channel.thumbnail} alt={props.data.channel.title} height={60} width={60} />
                            <Typography variant="h6">{props.data.channel.title}</Typography>
                        </Box>
                        Category: {props.data.category.title}
                        {props.data.isHighlighted && <Typography variant="h6">Highlighted video</Typography>}
                    </Box>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{t('label_save')}</Button>
                <Button color="error" onClick={props.onClose}>{t('label_delete')}</Button>
                <Button color="neutral" onClick={props.onClose}>{t('label_cancel')}</Button>
            </DialogActions>
        </Dialog>
    )
}