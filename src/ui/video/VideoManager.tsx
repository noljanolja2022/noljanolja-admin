import { useEffect, useState } from "react";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Video } from "../../data/model/VideoModels";
import YoutubeVideoCard from "../widget/YoutubeVideoCard";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, useTheme } from "../widget/mui";
import { parseDate } from "../../util/DateUtil";
import { Pagination } from "../widget/mui/Pagination";
import { useTranslation } from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoSettingCard, { VideoSettingCardProps } from "../widget/VideoSettingCard";
import { VideoRewardConfig } from "../../data/model/ConfigModels";
import rewardService from "../../service/RewardService";

function VideoManager() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { setLoading, setIdle, viewState } = useLoadingStore();
    const [videoDetail, setVideoDetail] = useState<Video | null>(null);
    const [videoSetting, setVideoSetting] = useState<VideoSettingCardProps | null>();
    const [videos, setVideo] = useState<Array<Video>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)

    const onDeleteVideo = (item: Video) => {
        setLoading()
        mediaService.deleteVideo(item.id).then(res => {
            if (res.isFailure()) {
                alert(res.getErrorMsg())
                return;
            }
            setVideoDetail(null)
            if (videos.length <= 1) {
                setCurrentPage(0)
            } else {
                loadVideos()
            }
        }).finally(() => {
            setIdle()
        })
    }

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    const loadVideos = () => {
        setLoading()
        mediaService.getVideoList(currentPage).then(res => {
            if (res.data?.length === 0) {
                alert('No Video found')
                return;
            }
            setVideo(res.data!)
            if (res.pagination) {
                setTotalPage(Math.ceil(res.pagination?.total / res.pagination?.pageSize))
            }
        }).finally(() => {
            setIdle()
        });
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="video table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{
                                maxWidth: '300px',
                                fontWeight: 700
                            }}>{t('label_name')}</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>{t('label_channel')}</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>{t('label_published_date')}</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>{t('label_actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.map(video =>
                            <TableRow key={video.id} hover>
                                <TableCell sx={{
                                    maxWidth: '300px'
                                }}>{video.title}</TableCell>
                                <TableCell >{video.channel.title}</TableCell>
                                <TableCell >{parseDate(new Date(video.publishedAt))}</TableCell>
                                <TableCell >
                                    <Tooltip title="Edit">
                                        <EditIcon cursor={'pointer'} onClick={() => setVideoDetail(video)} />
                                    </Tooltip>
                                    <Tooltip title="Reward setting">
                                        <SettingsIcon cursor={'pointer'} onClick={() => onOpenVideoSetting(video)} />
                                    </Tooltip>
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
            </TableContainer>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            <YoutubeVideoCard data={videoDetail}
                onDelete={onDeleteVideo}
                onClose={() => setVideoDetail(null)} />
            {videoSetting && <VideoSettingCard data={videoSetting}
                onClose={() => setVideoSetting(null)} />}
        </Stack>
    )
}

export default VideoManager;