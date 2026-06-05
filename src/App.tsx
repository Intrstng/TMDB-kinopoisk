import './App.css';
import {Header} from '@/common/components/Header/Header.tsx';
import {Footer} from '@/common/components/Footer/Footer.tsx';
import {selectThemeMode} from '@/app/model/slices/app-slice.ts';
import {useAppSelector} from '@/common/hooks';
import {getTheme} from '@/common/theme';
import {ThemeProvider} from '@mui/material/styles';
import {ScrollRestoration} from 'react-router-dom';
import {MainWrapper} from '@/common/components/MainWrapper/MainWrapper.tsx';
import {ErrorToastBar} from '@/common/components/ErrorToastBar/ErrorToastBar.tsx';

export function App() {
    const themeMode = useAppSelector(selectThemeMode);
    const theme = getTheme(themeMode);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <MainWrapper />
            <ErrorToastBar />
            <ScrollRestoration />
            <Footer />
        </ThemeProvider>
    );
}