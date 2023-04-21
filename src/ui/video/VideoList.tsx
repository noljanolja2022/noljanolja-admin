import { useEffect, useState } from "react";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Video } from "../../data/model/VideoModels";
import YoutubeVideoCard from "../widget/YoutubeVideoCard";
import { Box, Button, Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from "../widget/mui";
import { parseDate } from "../../util/DateUtil";
import { ViewState } from "../../data/enum/ViewState";


function VideoManagement() {
    const theme = useTheme();
    const { setLoading, setIdle, viewState } = useLoadingStore();
    const [videoDetail, setVideoDetail] = useState<Video | null>(null);

    const [videos, setVideo] = useState<Array<Video>>([]);

    // const onDeleteVideo = () => {
    //     setLoading()
    //     mediaService.deleteVideo(deleteVideoId).then(res => {
    //         if (res.isFailure()) {
    //             // setResultMsg(res.getErrorMsg())
    //             return;
    //         }
    //         // setResultMsg(`Delete success for video Id ${deleteVideoId}`)
    //         setDeleteVideoId('')
    //     }).finally(() => {
    //         setIdle()
    //     })
    // }

    const loadVideos = (page: number) => {
        setLoading()
        mediaService.getVideoList(page).then(res => {
            if (res.data?.length === 0) {
                alert('No Video found')
                return;
            }
            setVideo(res.data!)
        }).finally(() => {
            setIdle()
        });
    }

    useEffect(() => {
        loadVideos(1)
    }, [])

    return (
        <Box gap={1} display={"flex"} flexDirection={"column"} padding={2}>
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
            <YoutubeVideoCard data={videoDetail} onClose={() => setVideoDetail(null)} />
        </Box>
    )
}

export default VideoManagement;