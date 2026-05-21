import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '@/common/types/types.ts';

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    });
};
