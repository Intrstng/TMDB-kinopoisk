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
                <Box className={s.inputContainer}>{isClearMode
                        ? <TextField
                            label="Search for a movie"
                            error={!!errors.search}
                            size={size}
                            fullWidth
                            {...register('search')}
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
                        />
                    }
                    <Box className={s.errorContainer}>
                        {errors.search && <span className={s.errorMessage}>{errors.search.message}</span>}
                    </Box>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={s.formButton}
                    disabled={isSearchFetching || isSearchEmpty}
                    sx={{
                        width: '12rem',
                        '&.Mui-disabled': {
                            opacity: 0.6,
                            cursor: 'not-allowed',
                            backgroundColor: '#1976d2',
                        },
                    }}
                >
                    {isSearchFetching ? 'Searching...' : 'Search'}
                </Button>
            </Box>
        </form>
    );
};
