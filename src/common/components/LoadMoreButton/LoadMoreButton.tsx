import {NavLink} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {PATH} from "@/common/enums";
import type {LoadMoreButtonProps} from "@/common/components/LoadMoreButton/types.ts";

const StyledLoadMoreButton = styled(NavLink)(({theme}) => ({
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

export const LoadMoreButton = ({path, title}: LoadMoreButtonProps) => {
    return <StyledLoadMoreButton to={`${PATH.CATEGORY}/${path}`}>
                {title}
           </StyledLoadMoreButton>
};