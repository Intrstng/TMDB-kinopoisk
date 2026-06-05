import { THEME_MODE } from '@/common/enums';

export const getInitialThemeMode = (): THEME_MODE => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme && Object.values(THEME_MODE).includes(savedTheme as THEME_MODE)) {
        return savedTheme as THEME_MODE;
    }

    return THEME_MODE.LIGHT;
};
