import { createSlice } from '@reduxjs/toolkit';
import { THEME_MODE } from '@/common/enums';
import { getInitialThemeMode } from '@/common/utils/getInitialThemeMode.ts';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: getInitialThemeMode(),
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
    },
    // extraReducers: builder => {},
    reducers: create => ({
        changeThemeModeAC: create.reducer<{ themeMode: THEME_MODE }>((state, action) => {
            state.themeMode = action.payload.themeMode;
            localStorage.setItem('themeMode', action.payload.themeMode);
        }),
    }),
});

export const { selectThemeMode } = appSlice.selectors;
export const { changeThemeModeAC } = appSlice.actions;
export const appReducer = appSlice.reducer;
