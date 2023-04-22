import { useState } from "react";
import { useLoadingStore } from "../../store/LoadingStore";
import mediaService from "../../service/MediaService";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, Stack } from "../widget/mui";

const fileTypes = ["zip", "7z"];

export default function StickerImport() {
    const { setLoading, setIdle } = useLoadingStore();
    const [file, setFile] = useState<any>(null);
    const [message, setMsg] = useState('')
    const handleChange = (file: any) => {
        setFile(file);
    };

    const onUploadFile = () => {
        if (!file) {
            return;
        }
        setLoading()
        mediaService.createStickerPack(file).then(res => {
            if (res.isFailure()) {
                setMsg('Uploaded Failured')
                return;
            }
            setFile(null)
            setMsg('Uploaded Success')
        }).catch(e => {
            setMsg(`Upload failed. ${e}`)
        }).finally(() => {
            setIdle()
        })
    }
    return (
        <Box padding={2}>
            <FileUploader handleChange={handleChange}
                name="sticker file"
                fileOrFiles={file}
                types={fileTypes} required >
                <Box bgcolor={'black'} color={'white'}
                    sx={{
                        cursor: 'pointer'
                    }}
                    width={256}
                    height={128}
                    p={4}
                    borderRadius={4}>

                    {file ?
                        file.name
                        : <span>Click to upload or drag zipped file here</span>
                    }
                </Box>
            </FileUploader>
            <Stack direction={'row'} spacing={1} marginY={1}>
                {file && <Button
                    onClick={onUploadFile} >
                    Upload sticker
                </Button>}
                {file && <Button color="error"
                    onClick={() => { setFile(null) }}>Clear
                </Button>}
            </Stack>


            {message && <Box color={'red'}>{message}</Box>}
        </Box>
    )
}