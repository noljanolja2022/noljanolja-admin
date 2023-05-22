import { useState, FormEvent } from "react";
import mediaService from "../../service/MediaService";
import { Box, Button, Menu, MenuItem, Paper, Switch, TextField, Typography } from "../widget/mui";
import { t } from "i18next";
import { useLoadingStore } from "../../store/LoadingStore";

export default function VideoList() {
    const { setLoading, setIdle } = useLoadingStore();
    const [url, setUrl] = useState('')
    const [isHighlight, setIsHighlight] = useState(false)
    const [resultMsg, setResultMsg] = useState('');

    const onSelectDropdown = (event: React.MouseEvent<HTMLElement>,
        value: boolean) => {
        setIsHighlight(value);
    };

    const onImportVideo = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading()
        mediaService.importVideo(url, isHighlight).then(res => {
            if (res.isFailure()) {
                setResultMsg(res.getErrorMsg())
                return;
            }
            setResultMsg(`Imported success for video Id ${res.data?.id}`)
            setUrl('')
        }).finally(() => {
            setIdle()
        })
    }

    return (
        <Box gap={1} display={"flex"} flexDirection={"column"} p={2}>
            <Paper elevation={3} sx={{
                padding: 2
            }}>
                <form onSubmit={onImportVideo}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        width: '360px'
                    }}>
                    <TextField id="input-url"
                        fullWidth
                        label={t('hint_enter_youtube_url')} required
                        value={url}
                        onChange={(event) => setUrl(event.target.value)} />
                    <Box>
                        <Box display={'flex'} alignItems={'center'}>
                            <Typography>Is Highlighted:</Typography>
                            <Switch />
                            {/* <Button onClick={handleClick}
                            >{isHighlight.toString().toUpperCase()}</Button>
                            <Menu anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}>
                                <MenuItem onClick={(e) => onSelectDropdown(e, true)} >
                                    True
                                </MenuItem>
                                <MenuItem onClick={(e) => onSelectDropdown(e, false)}>
                                    False
                                </MenuItem>
                            </Menu> */}
                        </Box>

                    </Box>

                    <Button type="submit" >Import video</Button>
                </form>
            </Paper>

            <Typography color={'red'}>{resultMsg}</Typography>
        </Box>
    )
}