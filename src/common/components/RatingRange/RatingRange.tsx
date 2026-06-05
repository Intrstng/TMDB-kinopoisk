import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounceValue } from '@/common/hooks';
import { RATING_MAX, RATING_MIN } from '@/common/constants';
import { SEARCH_PARAMS } from '@/common/enums';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { ratingRangeSx } from '@/common/components/RatingRange/RatingRange.styles.ts';

export const RatingRange = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const ratingMinValue = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_GTE);
    const ratingMaxValue = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_LTE);

    const [values, setValues] = useState([Number(ratingMinValue) || RATING_MIN, Number(ratingMaxValue) || RATING_MAX]);

    const debouncedValues = useDebounceValue(values);

    // Синхронизация с URL при внешних изменениях (например, кнопка Reset)
    useEffect(() => {
        const urlMin = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_GTE);
        const urlMax = searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_LTE);

        const newMin = urlMin ? Number(urlMin) : RATING_MIN;
        const newMax = urlMax ? Number(urlMax) : RATING_MAX;

        setValues([newMin, newMax]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_GTE), searchParams.get(SEARCH_PARAMS.VOTE_AVERAGE_LTE)]);

    // Обновление URL при изменении значений (с debounce)
    useEffect(() => {
        const [debouncedMin, debouncedMax] = debouncedValues;
        const newParams = new URLSearchParams(searchParams);

        newParams.set(SEARCH_PARAMS.VOTE_AVERAGE_GTE, debouncedMin.toString());
        newParams.set(SEARCH_PARAMS.VOTE_AVERAGE_LTE, debouncedMax.toString());

        setSearchParams(newParams);
    }, [debouncedValues]);

    const handleChange = (_event: Event, newValues: number[]) => {
        setValues(newValues);
    };

    return (
        <Box sx={ratingRangeSx.container}>
            <Box sx={ratingRangeSx.ratingBlock}>
                <Typography variant="subtitle2" sx={ratingRangeSx.subtitle}>
                    Rating Filter
                </Typography>
                <Box sx={ratingRangeSx.ratingValuesBlock}>
                    <Box sx={ratingRangeSx.currentValues}>
                        <Typography variant="body2" color="text.secondary" sx={ratingRangeSx.subtitle}>
                            From:
                        </Typography>
                        <Typography variant="body1" sx={ratingRangeSx.ratingValue}>
                            {values[0].toFixed(1)}
                        </Typography>
                    </Box>
                    <Box sx={ratingRangeSx.currentValues}>
                        <Typography variant="body2" color="text.secondary" sx={ratingRangeSx.subtitle}>
                            To:
                        </Typography>
                        <Typography variant="body1" sx={ratingRangeSx.ratingValue}>
                            {values[1] === 10 ? values[1].toFixed(0) : values[1].toFixed(1)}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Slider
                value={values}
                onChange={handleChange}
                min={RATING_MIN}
                max={RATING_MAX}
                sx={ratingRangeSx.slider}
                step={0.1}
                size="small"
                disableSwap
                valueLabelDisplay="auto"
                aria-label="Rating range"
            />

            <Box sx={ratingRangeSx.limits}>
                <Typography variant="caption" sx={ratingRangeSx.ratingValue}>
                    {RATING_MIN}
                </Typography>
                <Typography variant="caption" sx={ratingRangeSx.ratingValue}>
                    {RATING_MAX}
                </Typography>
            </Box>
        </Box>
    );
};
