import { useTranslation } from "react-i18next"
import {Stack, Table, TableBody, TableCell, TableHead, TableRow, Pagination } from "../widget/mui"
import { useLoadingStore } from "../../store/LoadingStore";
import useVideoAnalyticManager from "../../hook/useVideoAnalyticManager";
import { useEffect } from "react";

function VideoAnalyticManager() {
    const { t } = useTranslation();
    const { videoAnalytics, fetch, currentPage, setCurrentPage, totalPage } = useVideoAnalyticManager();

    const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        fetch()
    }, [currentPage])

    return (
        <Stack spacing={1} p={2}>
            <Table sx={{ minWidth: 650, }}
                cellPadding={20}
                aria-label="Video analytic table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('label_thumbnail')}</TableCell>
                        <TableCell sx={{ maxWidth: '200px' }}>{t('label_name')}</TableCell>
                        <TableCell>{t('label_view')}</TableCell>
                        <TableCell>{t('label_likes')}</TableCell>
                        <TableCell>{t('label_comment')}</TableCell>
                        <TableCell>{t('label_favorite')}</TableCell>
                        <TableCell>{t('label_rewarded_points')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videoAnalytics.map(videoAnalytic => 
                        <TableRow key={videoAnalytic.id}>
                            <TableCell align="left" sx={{ width: 100 }} >
                                <img src={ videoAnalytic.thumbnail } alt={ videoAnalytic.title } style={ { maxWidth: '100px' }} />
                            </TableCell>
                            <TableCell sx={{ maxWidth: '180px', minWidth: '150px' }}>
                                {videoAnalytic.title}
                            </TableCell>
                            <TableCell>{videoAnalytic.viewCount}</TableCell>
                            <TableCell>{videoAnalytic.likeCount}</TableCell>
                            <TableCell>{videoAnalytic.commentCount}</TableCell>
                            <TableCell>{videoAnalytic.favoriteCount}</TableCell>
                            <TableCell>{videoAnalytic.rewardedPoints}</TableCell>
                        </TableRow>    
                    )}
                </TableBody>
            </Table>
            {totalPage > 1 && <Pagination count={totalPage} shape="rounded" onChange={onChangePage} />}
        </Stack>
    )
}

export default VideoAnalyticManager