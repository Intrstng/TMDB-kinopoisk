import type {LoadingTriggerProps} from "@/common/components/LoadingTrigger/types.ts";
import Box from "@mui/material/Box"
import CircularProgress from '@mui/material/CircularProgress';
import {
    blankContainerSx,
    loaderSx,
    triggerContainerSx
} from "@/common/components/LoadingTrigger/LoadingTrigger.styles.ts";

export const LoadingTrigger = ({ observerRef, isFetchingNextPage }: LoadingTriggerProps) => {
    // Этот элемент отслеживается IntersectionObserver
    return (
        <Box ref={observerRef} sx={triggerContainerSx}>
            {/*`<div style={{ height: '20px' }} />` создает "невидимую зону" в 20px в конце списка (см.ниже),*/}
            {/*при достижении которой автоматически загружаются новые треки. Без размеров*/}
            {/*IntersectionObserver не будет работать корректно.*/}
            {isFetchingNextPage
                ? <CircularProgress sx={loaderSx} aria-label="Loading…" />
                : <Box sx={blankContainerSx} />}
        </Box>
    )
}