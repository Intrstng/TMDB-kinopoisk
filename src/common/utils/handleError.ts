import type {
    BaseQueryApi,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
import { STATUS_CODES } from '@/common/constants';
import { isErrorWithMessage } from '@/common/utils/isErrorWithMessage.ts';
import { setAppErrorAC } from '@/app/model/slices/app-slice.ts';
import { incrementVpnNetworkErrorAC } from '@/app/model/slices/vpn-notice-slice.ts';

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
    if (result.error) {
        let errorMessage = 'Some error occurred';
        const status = Number(result.error.status);
        const isServerErrorOrHigher = !isNaN(status) && status >= STATUS_CODES.INTERNAL_SERVER_ERROR;
        const isServerErrorOrLower = !isNaN(status) && status <= STATUS_CODES.CONNECT_TIMEOUT;

        switch (result.error.status) {
            case 'FETCH_ERROR': {
                errorMessage = result.error.error;

                const requestUrl = result.meta?.request?.url;
                const tmdbBaseUrl: string | undefined = import.meta.env.VITE_BASE_URL;

                if (requestUrl && tmdbBaseUrl) {
                    try {
                        const requestOrigin = new URL(requestUrl).origin;
                        const tmdbOrigin = new URL(tmdbBaseUrl).origin;

                        if (requestOrigin === tmdbOrigin) {
                            // Отсчитываем fetch ошибки до определенного (для запуска логики в компоненте - открыть модалку если нет доступа к TMDB API например из-за отключенного VPN)
                            api.dispatch(incrementVpnNetworkErrorAC());
                        }
                    } catch {
                        // Не открываем VPN-модалку, если URL некорректен.
                    }
                }
                break;
            }

            case 'CUSTOM_ERROR':
                errorMessage = result.error.error;
                break;
            case STATUS_CODES.NOT_FOUND:
            case STATUS_CODES.UNAUTHORIZED:
                if (isErrorWithMessage(result.error.data)) {
                    errorMessage = result.error.data.status_message;
                } else {
                    errorMessage = JSON.stringify(result.error.data);
                }
                break;
            default:
                if (isServerErrorOrHigher && isServerErrorOrLower) {
                    errorMessage = 'Server error occurred. Please try again later.';
                } else {
                    errorMessage = JSON.stringify(result.error);
                }
                break;
        }
        api.dispatch(setAppErrorAC({ error: errorMessage }));
    }
};
