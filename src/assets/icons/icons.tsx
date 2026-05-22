import Logo from '@/assets/icons/TMDB_logo.svg?react';
import LogoBig from '@/assets/icons/TMDB_logo-big.svg?react';
import Git from '@/assets/icons/github-icon.svg?react';
import type { FC, SVGProps } from 'react';
import { IconVariant } from '@/common/enums';

export type SvgComponent = FC<SVGProps<SVGSVGElement>>;

export const icons: Record<IconVariant, SvgComponent> = {
    logo: Logo,
    logoBig: LogoBig,
    git: Git,
};
