import './App.css';
import {Header} from '@/common/components/Header/Header.tsx';
import {Main} from '@/common/components/Main/Main.tsx';
import {Footer} from '@/common/components/Footer/Footer.tsx';
import {selectThemeMode} from "@/app/model/slices/app-slice.ts";
import {useAppSelector} from "@/common/hooks";
import {getTheme} from "@/common/theme";
import {ThemeProvider} from "@mui/material/styles";

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    // const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Main />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
