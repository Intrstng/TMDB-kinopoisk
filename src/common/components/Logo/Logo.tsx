import { Link } from 'react-router-dom';
import { icons } from '@/assets/icons/icons.tsx';
import { IconVariant, PATH } from '@/common/enums';
import s from './Logo.module.css';
import cn from 'classnames';

type LogoProps = {
    path: PATH;
    variant: IconVariant;
    className?: string;
};

export const Logo = ({ path = PATH.MAIN, variant = IconVariant.LOGO, className }: LogoProps) => {
    const IconComponent = icons[variant];

    return (
        <Link to={path}>
            <IconComponent className={cn(s.logo, className)} />
        </Link>
    );
};
