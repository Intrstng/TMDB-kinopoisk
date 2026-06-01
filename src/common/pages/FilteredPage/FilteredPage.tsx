import { containerSx } from '@/common/styles/container.styles';
import Container from '@mui/material/Container';
import { FilterControls } from '@/common/components/FilterControls/FilterControls.tsx';
import { SortedFilmsGallery } from '@/common/components/SortedFilmsGallery/SortedFilmsGallery.tsx';
import { containerResponsiveSx } from '@/common/pages/FilteredPage/FilteredPage.styles.ts';

export const FilteredPage = () => {
    return (
        <Container sx={{ ...containerSx, ...containerResponsiveSx }}>
            <FilterControls />
            <SortedFilmsGallery />
        </Container>
    );
};
