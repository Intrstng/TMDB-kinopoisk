import { toast } from 'react-toastify';

export const errorToast = (message: string, error?: unknown) => {
    toast.warn(message, {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    if (error) {
        console.error(`${message}\n`, error);
    }
};
