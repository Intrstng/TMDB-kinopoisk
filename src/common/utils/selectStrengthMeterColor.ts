export const selectStrengthMeterColor = (passStrength: number): string => {
    switch (passStrength) {
        case 1:
            return '#ff0000';
        case 2:
            return '#ff9060';
        case 3:
            return '#fff200';
        case 4:
            return '#00ff03';
        default:
            return '#909090';
    }
};
