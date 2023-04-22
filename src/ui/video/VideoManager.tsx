import { useEffect, useRef, useState } from "react";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Video } from "../../data/model/VideoModels";
import YoutubeVideoCard from "../widget/YoutubeVideoCard";
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "../widget/mui";
import { parseDate } from "../../util/DateUtil";
import { ViewState } from "../../data/enum/ViewState";
import { Pagination } from "../widget/mui/Pagination";


function VideoManager() {
    const theme = useTheme();
    const { setLoading, setIdle, viewState } = useLoadingStore();
    const [videoDetail, setVideoDetail] = useState<Video | null>(null);

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

    useEffect(() => {
        console.log('init')
        loadVideos()
    }, [currentPage])

    return (
        <Stack spacing={1} p={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="video table">
                    <TableHead sx={{
                        backgroundColor: theme.palette.secondary.main
                    }}>
                        <TableRow>
                            <TableCell sx={{
                                maxWidth: '300px'
                            }}>Name</TableCell>
                            <TableCell >Channel</TableCell>
                            <TableCell >Published Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.map(video =>
                            <TableRow key={video.id} hover sx={{
                                cursor: 'pointer'
                            }} onClick={() => setVideoDetail(video)}>
                                <TableCell sx={{
                                    maxWidth: '300px'
                                }}>{video.title}</TableCell>
                                <TableCell >{video.channel.title}</TableCell>
                                <TableCell >{parseDate(new Date(video.publishedAt))}</TableCell>
                            </TableRow>
                        )}
                        {videos.length == 0 && viewState != ViewState.LOADING &&
                            <TableRow sx={{
                                padding: theme.spacing(1)

                            }}>
                                No Video to show
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPage > 0 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
            <YoutubeVideoCard data={videoDetail}
                onDelete={onDeleteVideo}
                onClose={() => setVideoDetail(null)} />
        </Stack>
    )
}

export default VideoManager;