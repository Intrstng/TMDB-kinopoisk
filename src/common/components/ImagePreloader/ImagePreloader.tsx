import type { ImagePreloaderProps } from '@/common/components/ImagePreloader/types.ts';

export const ImagePreloader = ({ imageUrl, isImageLoaded, onLoadCb }: ImagePreloaderProps) => {
    return (
        <>
            {imageUrl && !isImageLoaded && (
                <img src={imageUrl} style={{ display: 'none' }} onLoad={() => onLoadCb(true)} alt="backdropLoader" />
            )}
        </>
    );
};
