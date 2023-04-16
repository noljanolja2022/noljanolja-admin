import { Video } from "../../data/model/VideoModels";

type Props = {
    data: Video
}

export default function YoutubeVideoCard(props: Props) {


    return (
        <div className="flex flex-col w-96">
            <img src={props.data.thumbnail} alt={props.data.title} height={200} width={300} className="rounded-lg" />
            <span className="text-ellipsis overflow-hidden text-2xl w-[300px] h-16">{props.data.title}</span>
            <div className="flex flex-row gap-2 items-center">
                <img src={props.data.channel.thumbnail} alt={props.data.channel.title} height={60} width={60} className="rounded-full"/>
                <span className="text-xl">{props.data.channel.title}</span>
            </div>
            Category: {props.data.category.title}
        </div>
    )
}