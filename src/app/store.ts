import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appReducer, appSlice } from './model/slices/app-slice';
import { baseApi } from '@/app/api/baseApi.ts';
import { vpnNoticeReducer, vpnNoticeSlice } from '@/app/model/slices/vpn-notice-slice.ts';

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [vpnNoticeSlice.name]: vpnNoticeReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
