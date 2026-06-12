import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import {powerMeterSx, powerScaleSx} from "@/common/components/PasswordStrength/PasswordStrength.styles.ts";
import {getPassStrengthValue} from "@/common/utils/getPassStrengthValue.ts";
import {selectStrengthMeterColor} from "@/common/utils/selectStrengthMeterColor.ts";

export const PasswordStrength = ({ password }: {password: string}) => {
    const passStrengthMeterRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const passStrengthMeter = passStrengthMeterRef.current as HTMLElement;
        const passStrength = getPassStrengthValue(password);
        const color = selectStrengthMeterColor(passStrength);
        passStrengthMeter.style.width = `${(passStrength / 4) * 100}%`;
        passStrengthMeter.style.backgroundColor = color;
    }, [password]);

    return (
        <Box sx={powerMeterSx}>
            <Box sx={powerScaleSx} ref={passStrengthMeterRef} data-testid='meter'></Box>
        </Box>
    );
};
