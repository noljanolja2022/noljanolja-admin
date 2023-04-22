import { useEffect, useState } from "react";
import { ViewState } from "../../data/enum/ViewState";
import { StickerPack } from "../../data/model/StickerModels";
import { useLoadingStore } from "../../store/LoadingStore";
import { parseDate } from "../../util/DateUtil";
import { theme } from "../../util/theme";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "../widget/mui";
import mediaService from "../../service/MediaService";

export default function StickerManager() {
    const theme = useTheme();
    const { setLoading, setIdle, viewState } = useLoadingStore();

    const [data, setData] = useState<StickerPack[]>([]);
    const [stickerDetail, setStickerDetail] = useState<StickerPack | null>(null);

    const fetchSticker = () => {
        setLoading()
        mediaService.getStickerPacks().then(res => {
            if (res.isFailure()) {
                console.log(res.getErrorMsg);
                return;

            }
            setData(res.data || []);
        }).finally(() => {
            setIdle()
        })
    }

    useEffect(() => {
        fetchSticker();
    }, [])

    return (
        <Box p={2}>
            <TableContainer  component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="video table">
                    <TableHead sx={{
                        backgroundColor: theme.palette.secondary.main
                    }}>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell >Publisher</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item =>
                            <TableRow key={item.id} hover sx={{
                                cursor: 'pointer'
                            }} onClick={() => setStickerDetail(item)}>
                                <TableCell >{item.name}</TableCell>
                                <TableCell >{item.publisher}</TableCell>
                            </TableRow>
                        )}
                        {data.length == 0 && viewState != ViewState.LOADING &&
                            <TableRow sx={{
                                padding: theme.spacing(1)

                            }}>
                                No Sticker available. Please Import them first
                            </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}