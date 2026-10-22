import {
    API_UNAVAILABLE_MODAL_INSTRUCTION,
    API_UNAVAILABLE_MODAL_MESSAGE,
    API_UNAVAILABLE_MODAL_TITLE,
    NUMBER_UNSUCCESSFUL_REQUESTS,
    UNSUCCESSFUL_REQUESTS_DELAY,
} from '@/common/constants';
import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import {
    closeVpnNoticeAC,
    selectVpnNetworkErrorCount,
    selectVpnNoticeOpen,
    setVpnNoticeOpenAC,
} from '@/app/model/slices/vpn-notice-slice.ts';
import { useEffect } from 'react';
import s from './ServiceUnavailableModal.module.css'

export const ServiceUnavailableModal = () => {
    const dispatch = useAppDispatch();
    const networkErrorCount = useAppSelector(selectVpnNetworkErrorCount);
    const isVpnNoticeOpen = useAppSelector(selectVpnNoticeOpen);

    // Display a modal window indicating that the TMDB API is unavailable
    // (for example, due to a disabled VPN)
    // upon the { NUMBER_UNSUCCESSFUL_REQUESTS } failed request
    useEffect(() => {
        if (networkErrorCount < NUMBER_UNSUCCESSFUL_REQUESTS || isVpnNoticeOpen) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            dispatch(setVpnNoticeOpenAC(true));
        }, UNSUCCESSFUL_REQUESTS_DELAY);

        return () => window.clearTimeout(timeoutId);
    }, [networkErrorCount, isVpnNoticeOpen, dispatch]);

    const onCloseModal = () => dispatch(closeVpnNoticeAC());

    return (
        <Modal
            open={isVpnNoticeOpen}
            onClose={onCloseModal}
            modalTitle={API_UNAVAILABLE_MODAL_TITLE}
            size={'xs'}
            showHeader
            className={s.serviceModal}
        >
            <div className={s.modalContent}>
                <Typography variant={'subtitle1'} mb={'1rem'}>
                    {API_UNAVAILABLE_MODAL_MESSAGE}
                </Typography>
                <Typography variant={'subtitle1'} mb={'1.5rem'}>
                    {API_UNAVAILABLE_MODAL_INSTRUCTION}
                </Typography>
                <div className={s.modalControls}>
                    <Button variant={'primary'} onClick={onCloseModal}>
                        Ok
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
