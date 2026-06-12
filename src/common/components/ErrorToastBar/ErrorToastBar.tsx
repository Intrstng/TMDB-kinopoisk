import {toast, ToastContainer} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {selectAppError, setAppErrorAC} from "@/app/model/slices/app-slice.ts";
import {useEffect, useRef} from "react";
import {errorNotifyMessage} from "@/common/utils/notifyMessage.ts";

export const ErrorToastBar = () => {
    const errorMessage = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()
    const toastId = useRef<string | number | null>(null);

    const handleClose = () => {
        dispatch(setAppErrorAC({error: null}))
        toastId.current = null;
    }

    useEffect(() => {
        if (errorMessage) {
            if (toastId.current !== null) {
                toast.dismiss(toastId.current);
            }
            errorNotifyMessage({message: errorMessage, handleClose})
        }
    }, [errorMessage, dispatch]);

    return (
        <ToastContainer/>
    )
};
