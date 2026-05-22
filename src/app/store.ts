import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { appReducer, appSlice } from './model/slices/app-slice';

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        // [baseApi.reducerPath]: baseApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
