import {Logo} from '@/common/components/Logo/Logo.tsx';
import {IconVariant, PATH, THEME_MODE} from '@/common/enum';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {HEADER_NAV_LINKS} from '@/common/constants';
import {useAppSelector} from "@/common/hooks/useAppSelector";
import Switch from "@mui/material/Switch"
import {changeThemeModeAC, selectThemeMode} from "@/app/model/slices/app-slice";
import {useAppDispatch} from "@/common/hooks";

type HeaderProps = {
    className?: string;
};

export const Header = ({ className }: HeaderProps) => {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch()
    // const theme = getTheme(themeMode)
console.log(themeMode)
    const changeMode = () => {
        dispatch(changeThemeModeAC({ themeMode: themeMode === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT }))
    }

    return (
        <header>
            <div className={className}>
                <Logo path={PATH.MAIN} variant={IconVariant.LOGO} className={s.headerLogo} />
                <div className={s.navBlock}>
                    {HEADER_NAV_LINKS.map(navLink => (
                        <NavLink key={navLink.id}
                                 to={navLink.path}
                                 className={({ isActive}) => (isActive ? s.active : s.navLink)}
                        >
                            {navLink.title}
                        </NavLink>
                    ))}
                </div>

                {/*<NavButton background={theme.palette.primary.dark}>Faq</NavButton>*/}
                <Switch color={"default"} onChange={changeMode} />
            </div>
        </header>
    );
};