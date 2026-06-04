import {type SubmitHandler, useForm} from 'react-hook-form';
import type {SearchFilmArgs, SearchFilmFormProps} from '@/common/components/SearchFilmForm/types.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {searchFilmFormSchema} from '@/common/components/SearchFilmForm/model/searchFilmForm.schemas.ts';
import Button from '@mui/material/Button';
import s from './SearchFilmForm.module.css';
import Box from '@mui/material/Box';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import {SearchFormContainerSx, SearchInputSx, SubmitBtnSx} from "./SearchFilmForm.styles";

export const SearchFilmForm = ({
                                   isSearchFetching,
                                   redirectPath,
                                   size,
                                   className,
                                   isClearMode = true
                               }: SearchFilmFormProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentQuery = searchParams.get('query') || '';

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {errors},
    } = useForm<SearchFilmArgs>({
        resolver: zodResolver(searchFilmFormSchema),
        defaultValues: {
            search: currentQuery,
        },
    });

    useEffect(() => {
        setValue('search', currentQuery);
    }, [currentQuery, setValue]);

    const searchValue = watch('search');
    const isSearchEmpty = !searchValue?.trim();

    const onSubmit: SubmitHandler<SearchFilmArgs> = ({search}) => {
        if (search.trim()) {
            if (redirectPath) {
                navigate(`${redirectPath}?query=${encodeURIComponent(search)}`);
            } else {
                setSearchParams({query: search});
            }
        }
    };

    const clearSearchQuery = () => {
        reset({search: ''});
        setSearchParams({});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={className}>
                <Box sx={SearchFormContainerSx}>{isClearMode
                        ? <TextField
                            label="Search for a movie"
                            error={!!errors.search}
                            size={size}
                            fullWidth
                            {...register('search')}
                            sx={SearchInputSx}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={'clear-search-input'}
                                                onClick={clearSearchQuery}
                                                edge="end"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        : <TextField
                            label="Search for a movie"
                            error={!!errors.search}
                            size={size}
                            fullWidth
                            {...register('search')}
                            sx={SearchInputSx}
                        />
                    }
                    <Box className={s.errorContainer}>
                        {errors.search && <span className={s.errorMessage}>{errors.search.message}</span>}
                    </Box>
                </Box>
                <Button type="submit"
                        variant="contained"
                        disabled={isSearchFetching || isSearchEmpty}
                        sx={SubmitBtnSx}
                >
                    {isSearchFetching ? 'Searching...' : 'Search'}
                </Button>
            </Box>
        </form>
    );
};
