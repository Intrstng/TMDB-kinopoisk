import {type SubmitHandler, useForm} from 'react-hook-form'
import type {SearchFilmArgs, SearchFilmFormProps} from "@/common/components/SearchFilmForm/types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {searchFilmFormSchema} from "@/common/components/SearchFilmForm/model/searchFilmForm.schemas.ts";
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import s from './SearchFilmForm.module.css'
import { useWatch } from 'react-hook-form'

export const SearchFilmForm = ({isSearchFetching, onSearch, className}: SearchFilmFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<SearchFilmArgs>({
        resolver: zodResolver(searchFilmFormSchema),
        // defaultValues: { search: "Search for a movie"},
    })

    const searchValue = useWatch({ control, name: "search" })
    const isSearchEmpty = !searchValue?.trim()

    const onSubmit: SubmitHandler<SearchFilmArgs> = ({search}) => {
        if (search.trim()) {
            onSearch(search)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className={className}>
                <TextField label="Search for a movie" margin="normal" error={!!errors.search} {...register("search")} />
                {errors.search && <span className={s.errorMessage}>{errors.search.message}</span>}
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSearchFetching || isSearchEmpty}
                    sx={{
                        '&.Mui-disabled': {
                            opacity: 0.6,
                            cursor: 'not-allowed',
                            backgroundColor: '#1976d2',
                        }}
                    }>
                    {isSearchFetching ? 'Searching...' : 'Search'}
                </Button>
            </FormGroup>
        </form>
    )
}