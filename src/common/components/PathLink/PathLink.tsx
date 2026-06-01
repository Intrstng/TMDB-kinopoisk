// import {Link} from "react-router-dom";
// import {useLocation} from "react-router";
// import type {CategoryButtonProps} from "@/common/components/PathLink/types.ts";
//
// export const PathLink = ({path, title}: CategoryButtonProps) => {
//     const location = useLocation();
//     const basePath = location.pathname.split('/')[1];
//     const fullPath = `/${basePath}/${path}`;
//
//     return (
//         <Link to={fullPath}>
//             {title}
//         </Link>
//     )
// };

// import {NavLink} from "react-router-dom";
// import {useLocation} from "react-router";
// import type {CategoryButtonProps} from "@/common/components/PathLink/types.ts";
// import s from './PathLink.module.css'
//
// export const PathLink = ({path, title}: CategoryButtonProps) => {
//     const location = useLocation();
//     const basePath = location.pathname.split('/')[1];
//     const fullPath = `/${basePath}/${path}`;
//
//     return (
//         <NavLink to={fullPath}
//                  className={({ isActive}) => `${s.navLink} ${isActive ? s.active : ''}`}>
//             {title}
//         </NavLink>
//     )
// };

import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router';
import type { CategoryButtonProps } from '@/common/components/PathLink/types.ts';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    fontFamily: 'ProtestFont, sans-serif',
    transition: 'all 0.3s ease',

    '&:hover': {
        color: theme.palette.action.selected,
        backgroundColor: theme.palette.text.secondary,
    },

    '&.active': {
        color: theme.palette.text.secondary,
        borderColor: theme.palette.text.secondary,
        backgroundColor: theme.palette.action.selected,
    },
}));

export const PathLink = ({ path, title }: CategoryButtonProps) => {
    const location = useLocation();
    const basePath = location.pathname.split('/')[1];
    const fullPath = `/${basePath}/${path}`;

    return <StyledNavLink to={fullPath}>{title}</StyledNavLink>;
};
