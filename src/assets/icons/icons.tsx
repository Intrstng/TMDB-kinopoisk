import Logo from '@/assets/icons/TMDB_logo.svg?react';
import LogoBig from '@/assets/icons/TMDB_logo-big.svg?react';
import Git from '@/assets/icons/github-icon.svg?react';
import type { FC, SVGProps } from 'react';
import {ICON_VARIANT} from "@/common/enums/enums.ts";

export type SvgComponent = FC<SVGProps<SVGSVGElement>>;

export const icons: Record<ICON_VARIANT, SvgComponent> = {
    logo: Logo,
    logoBig: LogoBig,
    git: Git,
};
