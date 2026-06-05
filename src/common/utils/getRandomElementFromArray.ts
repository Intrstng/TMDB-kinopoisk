import { getRandomNumber } from '@/common/utils/getRandomNumber.ts';

export const getRandomElementFromArray = <T>(array: T[]): T => {
    if (array.length === 0) {
        throw new Error('Cannot get random element from empty array');
    }
    const randomArrayIndex = getRandomNumber(0, array.length);
    return array[randomArrayIndex];
};
