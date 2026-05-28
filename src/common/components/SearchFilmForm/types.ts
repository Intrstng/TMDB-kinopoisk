import { z } from 'zod';
import { searchFilmArgsSchema } from '@/common/components/SearchFilmForm/model/searchFilmForm.schemas.ts';
import { PATH, SEARCH_SIZES } from '@/common/enums';

export type SearchFilmArgs = z.infer<typeof searchFilmArgsSchema>;

export type SearchFilmFormProps = {
    isSearchFetching?: boolean;
    className?: string;
    size?: SEARCH_SIZES;
    redirectPath?: PATH;
};
