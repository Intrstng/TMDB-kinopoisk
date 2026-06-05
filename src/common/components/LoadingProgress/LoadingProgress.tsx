import {useAppSelector} from "@/common/hooks";
import {selectAppStatus} from "@/app/model/slices/app-slice.ts";
import LinearProgress from "@mui/material/LinearProgress";
import {linearProgressSx} from "@/common/components/LoadingProgress/LoadingProgress.styles.ts";

export const LoadingProgress = () => {
    const status = useAppSelector(selectAppStatus)

    return status === "loading" ? <LinearProgress sx={linearProgressSx} /> : null;
};