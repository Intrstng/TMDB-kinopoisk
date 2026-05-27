import { z } from 'zod';
import { searchFilmArgsSchema } from '@/common/components/SearchFilmForm/model/searchFilmForm.schemas.ts';

export type SearchFilmArgs = z.infer<typeof searchFilmArgsSchema>;

export type SearchFilmFormProps = {
    onSearch: (search: string) => void;
    isSearchFetching: boolean;
    className?: string;
};
