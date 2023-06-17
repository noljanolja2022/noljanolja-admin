import { useEffect, useState } from "react";
import { useLoadingStore } from "../../store/LoadingStore";
import { Video } from "../../data/model/VideoModels";
import YoutubeVideoCard from "../widget/YoutubeVideoCard";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme, Box, Button, Link, TableHeadRow, TextField } from "../widget/mui";
import { convertISO8601ToSeconds, convertMsToTime, parseDate } from "../../util/DateUtil";
import { Pagination } from "../widget/mui/Pagination";
import { useTranslation } from "react-i18next";
import SettingsIcon from '@mui/icons-material/Settings';
import VideoSettingCard, { VideoSettingCardProps } from "../widget/VideoSettingCard";
import { VideoRewardConfig } from "../../data/model/ConfigModels";
import rewardService from "../../service/RewardService";
import useVideoManager from "../../hook/useVideoManager";
import { VideoImport } from "./VideoImport";
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';

function VideoManager() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { setLoading, setIdle } = useLoadingStore();
    const { videos, loadVideos, currentPage, setCurrentPage, totalPage } = useVideoManager();
    const [videoSetting, setVideoSetting] = useState<Nullable<VideoSettingCardProps>>();
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
                setVideoSetting({
                    id: res.data.id,
                    isActive: res.data.isActive,
                    maxApplyTimes: res.data.maxApplyTimes,
                    rewardProgresses: res.data.rewardProgresses,
                    videoId: item.id,
                })
            } else {
                setVideoSetting({
                    videoId: item.id,
                })
            }
        }).finally(() => {
            setIdle();
        })
    }

    useEffect(() => {
        loadVideos()
    }, [currentPage])

    return (
        <Stack spacing={1} p={2}>
            <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }}>
                {/* <TextField  sx={{
                    width: '300px',
                }} /> */}
                <Button onClick={() => setShowImport(true)}><AddIcon />{t('label_add')}</Button>
            </Box>
            <Table sx={{ minWidth: 650, }}
                cellSpacing={20}
                aria-label="video table">
                <TableHead>
                    <TableRow >
                        <TableCell>Thumbnail</TableCell>
                        <TableCell sx={{ maxWidth: '300px', fontWeight: 700 }}>{t('label_name')}</TableCell>
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
                                    <SettingsIcon cursor={'pointer'} onClick={() => onOpenVideoSetting(video)} />
                                </Tooltip>
                                {/* <Tooltip title="Delete">
                                    <DeleteIcon cursor={'pointer'} onClick={() => setVideoDetail(video)} />
                                </Tooltip> */}
                            </TableCell>
                        </TableRow>
                    )}
                    {/* {videos.length == 0 && viewState != ViewState.LOADING &&
                            <TableRow sx={{
                                padding: theme.spacing(1)

                            }}>
                                No Video to show
                            </TableRow>} */}
                </TableBody>
            </Table>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            {/* {videoDetail &&
                <YoutubeVideoCard data={videoDetail}
                    onClose={() => setVideoDetail(null)} />
            } */}
            {videoSetting && <VideoSettingCard data={videoSetting}
                onClose={() => setVideoSetting(null)} />}
            {showImport && <VideoImport onClose={() => setShowImport(false)} />}
        </Stack>
    )
}

export default VideoManager;