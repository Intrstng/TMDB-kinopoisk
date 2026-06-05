import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ICON_VARIANT, PATH } from '@/common/enums';
import type { LogoProps } from '@/common/components/Logo/types.ts';
import { icons } from '@/assets/icons/icons.tsx';
import s from './Logo.module.css';

export const Logo = ({ path = PATH.MAIN, variant = ICON_VARIANT.LOGO, className }: LogoProps) => {
    const IconComponent = icons[variant];

    return (
        <Link to={path}>
            <IconComponent className={cn(s.logo, className)} />
        </Link>
    );
};
