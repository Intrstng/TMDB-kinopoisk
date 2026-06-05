export type ImagePreloaderProps = {
    imageUrl: string | undefined;
    isImageLoaded: boolean;
    onLoadCb: (isLoaded: boolean) => void;
};
