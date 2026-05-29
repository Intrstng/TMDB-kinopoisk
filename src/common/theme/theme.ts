import { createTheme } from '@mui/material/styles';
import { THEME_MODE } from '@/common/enums';

export const getTheme = (themeMode: THEME_MODE) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                dark: '#0d253f',
                main: '#E7E1B1',
                light: '#90cea1',
            },
            text: {
                primary: themeMode === THEME_MODE.LIGHT ? '#0d253f' : '#E8EDF2',
                secondary: themeMode === THEME_MODE.LIGHT ? '#5C766D' : '#FFF1D3',
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    // root: { backgroundColor: '#000' },
                    input: {
                        // backgroundColor: '#978F66',
                        backgroundColor: themeMode === THEME_MODE.LIGHT ? '#F1F7D4' : '#294669',
                        borderRadius: '0.25rem',
                    },
                },
            },
        },
    });
};
