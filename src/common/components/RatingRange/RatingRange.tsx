// import Slider from "@mui/material/Slider";
// import {useEffect, useState} from "react";
// import {RATING_DEFAULT} from "@/common/constants";
// import {ratingRangeSx} from "@/common/components/RatingRange/RatingRange.styles.ts";
// import {useDebounceValue} from "@/common/hooks";
// import { useSearchParams } from "react-router-dom";
//
// export const RatingRange = () => {
//     const [value, setValue] = useState(RATING_DEFAULT);
//     const [searchParams, setSearchParams] = useSearchParams();
//     const debouncedRangeValue = useDebounceValue(value)
//
//     useEffect(() => {
//             console.log("Отправляем запрос с рейтингом:", debouncedRangeValue);
//             // Здесь ваш API запрос
//             // dispatch(setRatingFilter(debouncedRangeValue));
//
//         const newParams = new URLSearchParams(searchParams);
//         newParams.set('rating', debouncedRangeValue.toString());
//         setSearchParams(newParams);
//
//
//     }, [debouncedRangeValue, searchParams, setSearchParams]);
//
//     const handleChange = (_event: Event, newValue: number) => {
//         setValue(newValue);
//     };
//
//     return (
//         <Slider
//             value={value}
//             onChange={handleChange}
//             min={0}
//             max={RATING_DEFAULT}
//             sx={ratingRangeSx}
//             step={0.1}
//             size="medium"
//             aria-label="Volume"
//         />
//     );
// };

import Slider from "@mui/material/Slider";
import {useEffect, useState} from "react";
import {RATING_MAX, RATING_MIN} from "@/common/constants";
import {ratingRangeSx} from "@/common/components/RatingRange/RatingRange.styles.ts";
import {useDebounceValue} from "@/common/hooks";
import {useSearchParams} from "react-router-dom";
import {RATING_RANGE} from "@/common/enums";

export const RatingRange = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const ratingMinValue = searchParams.get(RATING_RANGE.VOTE_AVERAGE_GTE)
    const ratingMaxValue = searchParams.get(RATING_RANGE.VOTE_AVERAGE_LTE)

    const [values, setValues] = useState([Number(ratingMinValue) || RATING_MIN, Number(ratingMaxValue) || RATING_MAX]);

    const debouncedValues = useDebounceValue(values, 700);

    useEffect(() => {
        const [debouncedMin, debouncedMax] = debouncedValues;
        const newParams = new URLSearchParams(searchParams);
        const isDefaultRange = debouncedMin === RATING_MIN && debouncedMax === RATING_MAX;

        if (isDefaultRange) {
            // Удаляем параметры если значения по умолчанию
            newParams.delete(RATING_RANGE.VOTE_AVERAGE_GTE);
            newParams.delete(RATING_RANGE.VOTE_AVERAGE_LTE);
        } else {
            // Устанавливаем оба параметра
            newParams.set(RATING_RANGE.VOTE_AVERAGE_GTE, debouncedMin.toString());
            newParams.set(RATING_RANGE.VOTE_AVERAGE_LTE, debouncedMax.toString());
        }
        setSearchParams(newParams);
    }, [debouncedValues, searchParams, setSearchParams]);

    const handleChange = (_event: Event, newValues: number[]) => {
        setValues(newValues)
    };

    return (
        <Slider
            value={values}
            onChange={handleChange}
            min={RATING_MIN}
            max={RATING_MAX}
            sx={ratingRangeSx}
            step={0.1}
            size="medium"
            disableSwap
            valueLabelDisplay="auto"
            aria-label="Volume"
        />
    );
};