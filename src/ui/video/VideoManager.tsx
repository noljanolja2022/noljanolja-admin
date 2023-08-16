import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VideoRewardConfig } from "../../data/model/ConfigModels";
import { Video } from "../../data/model/VideoModels";
import useVideoManager from "../../hook/useVideoManager";
import rewardService from "../../service/RewardService";
import { useLoadingStore } from "../../store/LoadingStore";
import { convertMsToTime, parseDate } from "../../util/DateUtil";
import { Box, Button, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, useTheme } from "../widget/mui";
import { Pagination } from "../widget/mui/Pagination";
import VideoFilter from './VideoFilter';
import { VideoImport } from "./VideoImport";
import VideoSettingEditorDialog from "./VideoSettingEditorDialog";

function VideoManager() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { setLoading, setIdle } = useLoadingStore();
    const { videos, fetch, currentPage, setCurrentPage, totalPage } = useVideoManager();
    const [settingEditor, setSettingEditor] = useState<Nullable<Partial<VideoRewardConfig>>>(null);
    const [showImport, setShowImport] = useState(false);

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const onOpenVideoSetting = (item: Video) => {
        setLoading();
        rewardService.getVideoRewardConfig(item.id).then(res => {
            if (res.isFailure()) {
                console.log(res.error?.message)
                return;
            }
            if (res.data != null) {
                setSettingEditor(res.data)
            } else {
                setSettingEditor({
                    videoId: item.id,
                })
            }
        }).finally(() => {
            setIdle();
        })
    }

    useEffect(() => {
        fetch()
    }, [currentPage])

    return (
        <Stack spacing={1} p={2}>
            <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row', gap: 2 }}>
                <VideoFilter />
                <Button size='small' onClick={() => setShowImport(true)}><AddIcon />{t('label_add')}</Button>
            </Box>

            <Table sx={{ minWidth: 650, }}
                cellSpacing={20}
                aria-label="video table">
                <TableHead>
                    <TableRow >
                        <TableCell>{t('label_thumbnail')}</TableCell>
                        <TableCell sx={{ maxWidth: '300px' }}>{t('label_name')}</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>{t('label_channel')}</TableCell>
                        <TableCell>{t('label_published_date')}</TableCell>
                        <TableCell>{t('label_actions')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map(video =>
                        <TableRow key={video.id}>
                            <TableCell align="left" sx={{ width: 100 }} >
                                <img src={video.thumbnail} alt={video.title} style={{
                                    maxWidth: '100px'
                                }} />
                            </TableCell>
                            <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                                {video.title}
                            </TableCell>
                            <TableCell >{video.viewCount}</TableCell>
                            <TableCell >{video.likeCount}</TableCell>
                            <TableCell >{video.commentCount}</TableCell>
                            <TableCell >{convertMsToTime(video.durationMs)}</TableCell>
                            <TableCell >{video.channel.title}</TableCell>
                            <TableCell >{parseDate(new Date(video.publishedAt))}</TableCell>
                            <TableCell >
                                <Link href={video.url} target="_blank" sx={{ color: 'black' }}>
                                    <Tooltip title="Open">
                                        <OpenInNewIcon />
                                    </Tooltip>
                                </Link>
                                <Tooltip title="Reward setting">
                                    <IconButton onClick={() => onOpenVideoSetting(video)}><SettingsIcon /></IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            {settingEditor && <VideoSettingEditorDialog data={settingEditor}
                onClose={() => setSettingEditor(null)} />}
            {showImport && <VideoImport onClose={() => setShowImport(false)} />}
        </Stack>
    )
}

export default VideoManager;