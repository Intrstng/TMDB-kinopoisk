import type { RefObject } from 'react';

export type LoadingTriggerProps = {
    observerRef: RefObject<HTMLDivElement | null>;
    isFetchingNextPage: boolean;
};
