export const getPassStrengthValue = (pass: string): number => {
    let passStrength: number = 0;
    if (pass?.length > 0 && /(?=.*\p{L})/u.test(pass)) {
        passStrength += 1;
    }
    if (/(?=.*\d)/u.test(pass)) {
        passStrength += 1;
    }
    if (/(?=.*[@$#№:;^!%*?&*()_+,."'~/|])/.test(pass)) {
        passStrength += 1;
    }
    if (pass?.length >= 8) {
        passStrength += 1;
    }
    return passStrength;
};
