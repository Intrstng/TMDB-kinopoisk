import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {selectAppError, setAppErrorAC} from "@/app/model/slices/app-slice.ts";
import {toast, ToastContainer} from "react-toastify";

export const ErrorToastBar = () => {
    const errorMessage = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setAppErrorAC({error: null}))
    }
    
    toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: handleClose,
    });

    return (
        <ToastContainer/>
    )
};
