import {type SubmitHandler, useForm, useWatch} from 'react-hook-form'
import type {SearchFilmArgs, SearchFilmFormProps} from "@/common/components/SearchFilmForm/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {searchFilmFormSchema} from "@/common/components/SearchFilmForm/model/searchFilmForm.schemas.ts";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import s from './SearchFilmForm.module.css'
import Box from "@mui/material/Box";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const SearchFilmForm = ({isSearchFetching, redirectPath, size, className}: SearchFilmFormProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentQuery = searchParams.get('query') || '';

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: {errors},
    } = useForm<SearchFilmArgs>({
        resolver: zodResolver(searchFilmFormSchema),
        defaultValues: {
            search: currentQuery
        }
    })

    useEffect(() => {
        setValue('search', currentQuery);
    }, [currentQuery, setValue]);

    const searchValue = useWatch({control, name: "search"})
    const isSearchEmpty = !searchValue?.trim()

    const onSubmit: SubmitHandler<SearchFilmArgs> = ({search}) => {
        if (search.trim()) {
            if (redirectPath) {
                navigate(`${redirectPath}?query=${encodeURIComponent(search)}&page=1`);
            }
            else {
                setSearchParams({ query: search, page: '1' });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={className}>
                <TextField
                    label="Search for a movie"
                    error={!!errors.search}
                    size={size}
                    fullWidth
                    {...register("search")}
                />
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
                        }
                    }}>
                    {isSearchFetching ? 'Searching...' : 'Search'}
                </Button>
            </Box>
            <Box className={s.errorContainer}>
                {errors.search && <span className={s.errorMessage}>{errors.search.message}</span>}
            </Box>
        </form>
    )
}