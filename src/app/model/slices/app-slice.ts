import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { THEME_MODE } from '@/common/enums';
import { getInitialThemeMode } from '@/common/utils/getInitialThemeMode.ts';
import type { RequestStatus } from '@/app/model/types.ts';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: getInitialThemeMode(),
        status: 'idle' as RequestStatus,
        error: null as string | null,
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
        selectAppStatus: state => state.status,
        selectAppError: state => state.error,
    },
    extraReducers: builder => {
        builder
            .addMatcher(isPending, state => {
                state.status = 'loading';
            })
            .addMatcher(isFulfilled, state => {
                state.status = 'succeeded';
            })
            .addMatcher(isRejected, state => {
                state.status = 'failed';
            });
    },
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: THEME_MODE }>((state, action) => {
            state.themeMode = action.payload.themeMode;
            localStorage.setItem('themeMode', action.payload.themeMode);
        }),
        setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status;
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error;
        }),
    }),
});

export const { selectThemeMode, selectAppStatus, selectAppError } = appSlice.selectors;
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC } = appSlice.actions;
export const appReducer = appSlice.reducer;
