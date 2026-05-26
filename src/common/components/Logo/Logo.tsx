import { Link } from 'react-router-dom';
import { icons } from '@/assets/icons/icons.tsx';
import { ICON_VARIANT, PATH } from '@/common/enums';
import s from './Logo.module.css';
import cn from 'classnames';
import type {LogoProps} from "@/common/components/Logo/types.ts";

export const Logo = ({ path = PATH.MAIN, variant = ICON_VARIANT.LOGO, className }: LogoProps) => {
    const IconComponent = icons[variant];

    return (
        <Link to={path}>
            <IconComponent className={cn(s.logo, className)} />
        </Link>
    );
};
