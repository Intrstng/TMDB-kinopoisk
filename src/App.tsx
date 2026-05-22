import './App.css';
import {Header} from '@/common/components/Header/Header.tsx';
import {Footer} from '@/common/components/Footer/Footer.tsx';
import {selectThemeMode} from "@/app/model/slices/app-slice.ts";
import {useAppSelector} from "@/common/hooks";
import {getTheme} from "@/common/theme";
import {ThemeProvider} from "@mui/material/styles";
import {Outlet} from "react-router";

function App() {
    const themeMode = useAppSelector(selectThemeMode)
    // const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Outlet />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
