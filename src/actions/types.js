const createType = type => {
    return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, value) => {
        acc[value] = `${type}_${value}`;
        return acc;
    }, {});
};

export const SIGN_UP = createType('SIGN_UP');