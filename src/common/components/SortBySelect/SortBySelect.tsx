import {
    FormControl,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { SEARCH_PARAMS, SORT_BY } from '@/common/enums';
import { sortSx } from '@/common/components/SortBySelect/SortBySelect.styles.ts';

export const SortBySelect = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState(() => searchParams.get(SEARCH_PARAMS.SORT) || SORT_BY.POPULARITY_DESC);

    // При загрузке: если параметра нет в URL - добавляем значение по умолчанию
    useEffect(() => {
        const urlSortBy = searchParams.get(SEARCH_PARAMS.SORT);
        if (!urlSortBy) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(SEARCH_PARAMS.SORT, SORT_BY.POPULARITY_DESC);
            setSearchParams(newParams, { replace: true })
                                // setSearchParams(searchParams);
            //  Может вернуть
            // setSortBy(SORT_BY.POPULARITY_DESC);
        }
    }, []);

    // Синхронизация с URL при внешних изменениях (кнопка Reset)
    useEffect(() => {
        const urlSortBy = searchParams.get(SEARCH_PARAMS.SORT);
        if (urlSortBy && urlSortBy !== sortBy) {
            // Параметр есть в URL
            setSortBy(urlSortBy);
        } else if (!urlSortBy) {
            // Параметр удален из URL
            // Если параметр удален из URL, сбрасываем на значение по умолчанию
            const newParams = new URLSearchParams(searchParams);
            newParams.set(SEARCH_PARAMS.SORT, SORT_BY.POPULARITY_DESC);
            setSearchParams(newParams, { replace: true });
            setSortBy(SORT_BY.POPULARITY_DESC);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get(SEARCH_PARAMS.SORT)]);

    const handleChange = (event: SelectChangeEvent) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);

        const newParams = new URLSearchParams(searchParams);

        newParams.set(SEARCH_PARAMS.SORT, newSortBy);
        setSearchParams(newParams);
    };

    return (
        <FormControl size="small" sx={sortSx.form}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleChange}>
                <MenuItem value={SORT_BY.POPULARITY_DESC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Popularity Descending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowDownward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.POPULARITY_ASC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Popularity Ascending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowUpward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.VOTE_AVERAGE_DESC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Rating Descending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowDownward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.VOTE_AVERAGE_ASC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Rating Ascending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowUpward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.PRIMARY_RELEASE_DATE_DESC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Release Date Descending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowDownward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.PRIMARY_RELEASE_DATE_ASC}>
                    <Stack direction="row" spacing={1} sx={sortSx.item}>
                        <ListItemText>Release Date Ascending</ListItemText>
                        <ListItemIcon sx={sortSx.sortIcon}>
                            <ArrowUpward fontSize="inherit" sx={sortSx.sortIconFont} />
                        </ListItemIcon>
                    </Stack>
                </MenuItem>

                <MenuItem value={SORT_BY.ORIGINAL_TITLE_ASC}>Title A-Z</MenuItem>
                <MenuItem value={SORT_BY.ORIGINAL_TITLE_DESC}>Title Z-A</MenuItem>
            </Select>
        </FormControl>
    );
};
