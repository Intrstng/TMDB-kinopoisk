import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { changeThemeModeAC, selectThemeMode } from '@/app/model/slices/app-slice.ts';
import { THEME_MODE } from '@/common/enums';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeSwitch = () => {
    const themeMode = useAppSelector(selectThemeMode);
    const dispatch = useAppDispatch();
    // const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT }));
    };

    return (
        <IconButton onClick={changeMode} color="default">
            {themeMode === THEME_MODE.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};
