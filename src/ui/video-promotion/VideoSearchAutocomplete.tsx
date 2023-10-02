import Autocomplete from "@mui/material/Autocomplete";
import { HTMLAttributes, useState } from "react";
import { useDebounce } from "react-use";
import { Video } from "../../data/model/VideoModels";
import mediaService from "../../service/MediaService";
import { TextField } from "../widget/mui";

type Props = {
    data?: Video;
    onSelect: (data: Video) => void
}

export default function VideoSearchAutocomplete({ onSelect, data }: Props) {
    const [options, setOptions] = useState<Video[]>([]);
    const [query, setQuery] = useState(data?.title || '');
    const [, cancel] = useDebounce(
        () => {
            fetchVideo(query);
        }, 600, [query]
    )
    const onSearch = (data: string) => {
        setQuery(data);
    }

    const fetchVideo = (data: string) => {
        mediaService.getVideoList(data, 1).then(res => {
            setOptions(res.data || [])
        })
    }

    const onSelectVideo = (event: unknown, value: string | Video | null) => {
        onSelect(value as Video)
    }

    return (
        <Autocomplete options={options}
            value={data || null}
            onChange={onSelectVideo}
            inputValue={query}
            onInputChange={(_, newQuery) => {
                onSearch(newQuery)
            }}
            isOptionEqualToValue={(a, b) => a.id == b.id}
            renderOption={VideoItem}
            getOptionLabel={getVideoLabel}
            blurOnSelect
            renderInput={(params) =>
                <TextField {...params}
                    label={'Video'} />}
        />
    )
}

const VideoItem = (props: HTMLAttributes<HTMLLIElement>, option: Video): React.ReactNode => {
    return (
        <li key={option.id}
            {...props}>
            {option.title}
        </li>
    )
}

const getVideoLabel = (option: Video) => option.title