import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useLoading } from "../../../state/LoadingState";
import { ViewState } from "../../../data/enum/ViewState";
import mediaService from "../../../service/MediaService";
import userService from "../../../service/UserService";

const fileTypes = ["zip", "7z"];

function DashBoard() {
    const { setViewState } = useLoading();
    const [file, setFile] = useState<any>(null);
    const [message, setMsg] = useState('')
    const handleChange = (file: any) => {
        setFile(file);
    };

    const onUploadFile = () => {
        if (file == null) {
            return;
        }
        setViewState(ViewState.LOADING)
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
            setViewState(ViewState.IDLE)
        })
    }

    return (
        <div className="p-4">
            This is dashboard. If you see this exact message, it means this is version updated on 21/3/2023
            <FileUploader handleChange={handleChange}
                name="sticker file"
                fileOrFiles={file}
                types={fileTypes} required >
                <div className="rounded-lg w-56 h-24 bg-gray-300 my-4 flex flex-col justify-center items-center p-2">
                    {file ?
                        file.name
                        : <span>Click to upload or drag zipped file here</span>
                    }
                </div>
            </FileUploader>
            {file && <button className="bg-black mb-4 rounded-lg text-white h-12 cursor-pointer"
                onClick={onUploadFile} >
                Upload sticker
            </button>}
            {file && <button className="bg-red-500 mb-4 rounded-lg text-white h-12 cursor-pointer"
                onClick={() => { setFile(null) }}>Clear</button>}

            <div>
                {message && <span className="text-red-500">{message}</span>}

            </div>

            {/* <button onClick={() => {
                userService.fetchUser().then(res => {
                    console.log(res)
                })
            }}>Test User fetching</button> */}
        </div>
    )
}

export default DashBoard;