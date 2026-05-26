import { setAppErrorAC } from '@/app/app-slice';
import { isErrorWithMessage } from './isErrorWithMessage';
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query/react';

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
    if (result.error) {
        let errorMessage = 'Some error occurred';

        switch (result.error.status) {
            case 'FETCH_ERROR':
            case 'PARSING_ERROR':
            case 'CUSTOM_ERROR':
                errorMessage = result.error.error;
                break;
            case 403:
                errorMessage = '403 Forbidden Error. Check API-KEY';
                break;
            case 400:
                if (isErrorWithMessage(result.error.data)) {
                    errorMessage = result.error.data.message;
                } else {
                    errorMessage = JSON.stringify(result.error.data);
                }
                break;
            default:
                if (result.error.status >= 500 && result.error.status < 600) {
                    errorMessage = 'Server error occurred. Please try again later.';
                } else {
                    errorMessage = JSON.stringify(result.error);
                }
                break;
        }
        api.dispatch(setAppErrorAC({ error: errorMessage }));
    }

    // if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    //     const messages = (result.data as { messages: string[] }).messages
    //     error = messages.length ? messages[0] : error
    //     api.dispatch(setAppErrorAC({ error }))
    // }
};
