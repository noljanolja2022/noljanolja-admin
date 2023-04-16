import Button from "@mui/material/Button";
import { PrimaryTextField } from "../widget/MuiTextField";
import { t } from "i18next";
import { useState } from "react";
import mediaService from "../../service/MediaService";
import { useLoadingStore } from "../../store/LoadingStore";
import { Video } from "../../data/model/VideoModels";
import YoutubeVideoCard from "../widget/YoutubeVideoCard";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/material";

function VideoManagement() {
    const { setLoading, setIdle } = useLoadingStore();
    const [url, setUrl] = useState('')
    const [error, setError] = useState('');
    const [resultMsg, setResultMsg] = useState('');

    const [deleteVideoId, setDeleteVideoId] = useState('');
    const [deleteError, setDeleteErr] = useState('');
    const [deleteRes, setDeleteRes] = useState('');

    const [videos, setVideo] = useState<Array<Video>>([]);

    const onImportVideo = () => {
        if (!url) {
            setError("Youtube url can't be empty")
            return;
        }
        setLoading()
        mediaService.importVideo(url).then(res => {
            if (res.isFailure()) {
                setError(res.getErrorMsg())
                return;
            }
            setResultMsg(`Imported success for video Id ${res.data?.id}`)
            setUrl('')
        }).finally(() => {
            setIdle()
        })
    }

    const onDeleteVideo = () => {
        if (!deleteVideoId) {
            setDeleteErr("Id can't be empty")
            return;
        }
        setLoading()
        mediaService.deleteVideo(deleteVideoId).then(res => {
            if (res.isFailure()) {
                setError(res.getErrorMsg())
                return;
            }
            setDeleteRes(`Delete success for video Id ${deleteVideoId}`)
            setDeleteVideoId('')
        }).finally(() => {
            setIdle()
        })
    }

    const onFetchVideo = () => {
        setLoading()
        mediaService.getVideoList().then(res => {
            if (res.data?.length == 0) {
                alert('No Video found')
                return;
            }
            setVideo(res.data!)
        }).finally(() => {
            setIdle()
        });
    }


    return (
        <div className="flex flex-col gap-2 p-4">
            <PrimaryTextField id="input-url"
                label={t('hint_enter_youtube_url')} required
                className="mb-3 mt-8 border-white hover:border-white"
                value={url} error={error.length > 0} helperText={error}
                onChange={(event) => setUrl(event.target.value)} />
            <Button variant="contained" onClick={onImportVideo}>Import video</Button>

            <PrimaryTextField id="input-url"
                label={'Please enter video ID to delete'} required
                className="mb-3 mt-8 border-white hover:border-white"
                value={deleteVideoId} error={deleteError.length > 0} helperText={deleteError}
                onChange={(event) => setUrl(event.target.value)} />
            <Button variant="contained" onClick={onDeleteVideo}>Delete video</Button>

            {resultMsg && <span className="text-red-500">{resultMsg}</span>}

            <div className="flex flex-col gap-8 p-2">
                <Button variant="contained" onClick={onFetchVideo} className="w-64">Fetch video</Button>
                <div className="flex flex-row gap-2 flex-wrap">
                    {videos.map(video =>
                        <YoutubeVideoCard key={video.id} data={video} />
                    )}
                </div>

            </div>
        </div>
    )
}

export default VideoManagement;