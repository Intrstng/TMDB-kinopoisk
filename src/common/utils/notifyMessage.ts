import { toast } from 'react-toastify';

const successNotifyMessage = (message: string) => {
    toast.success(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

const warningNotifyMessage = (message: string) => {
    toast.warn(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

const errorNotifyMessage = ({ message, handleClose }: ErrorNotifyMessageArgs) => {
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: handleClose,
    });
};

type ErrorNotifyMessageArgs = {
    message: string;
    handleClose?: () => void;
};

export { successNotifyMessage, errorNotifyMessage, warningNotifyMessage };
