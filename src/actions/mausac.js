import * as apiMauSac from '../api/mausac';
import * as contantMauSac from '../contants/mausac';

export const fetchListMauSacRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistMauSac());
        apiMauSac.getMauSac().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistMauSacsuccess(data));
        });
    };
};

export const fetchlistMauSac = (params = {}) => {
    return {
        type: contantMauSac.FETCH_MAUSAC,
        payload: {
            params,
        },
    };
};

export const fetchlistMauSacsuccess = (data) => {
    return {
        type: contantMauSac.FETCH_SUCCESS_MAUSAC,
        payload: {
            data,
        },
    };
};

export const fetchlistMauSacfailed = (error) => {
    return {
        type: contantMauSac.FETCH_FAIDLED_MAUSAC,
        payload: {
            error,
        },
    };
};

export const filterMauSac = (keyword) => ({
    type: contantMauSac.FILTER_MAUSAC,
    payload: {
        keyword,
    },
});

export const SetMS = () => ({
    type: contantMauSac.SET_MAUSAC,
    payload: {},
});

export const themMauSac = (data) => {
    return {
        type: contantMauSac.THEM_MAUSAC,
        payload: data,
    };
};

export const themMauSacsuccess = (id, data) => {
    return {
        type: contantMauSac.THEM_MAUSAC_SUCCESS,
        payload: {
            id,
            data,
        },
    };
};

export const themMauSacfailed = (error) => {
    return {
        type: contantMauSac.THEM_MAUSAC_FAILED,
        payload: {
            error,
        },
    };
};

export const updateMauSac = (data) => {
    return {
        type: contantMauSac.UPDATE_MAUSAC,
        payload: {
            data,
        },
    };
};

export const setMauSacEditting = (mausac) => {
    return {
        type: contantMauSac.SET_MAUSAC_EDITTING,
        payload: {
            mausac,
        },
    };
};

export const setMauSacEdittingNull = () => {
    return {
        type: contantMauSac.SET_MAUSAC_EDITTING_NULL,
    };
};

// export const updateMonansuccess = (data) => {
//     return {
//         type: monancontant.UPDATE_MONAN_SUCCESS,
//         payload: {
//             data,
//         },
//     };
// };

// export const updateMonanfailed = (error) => {
//     return {
//         type: monancontant.UPDATE_MONAN_FAILED,
//         payload: {
//             error,
//         },
//     };
// };

export const deleteMauSac = (id) => {
    return {
        type: contantMauSac.DELETE_MAUSAC,
        payload: {
            id,
        },
    };
};

export const updateCheckMauSac = (id) => {
    return {
        type: contantMauSac.UPDATE_CHECK,
        payload: {
            id,
        },
    };
};

// export const deleteMonansuccess = (id) => {
//     return {
//         type: monancontant.DELETE_MONAN_SUCCESS,
//         payload: {
//             id,
//         },
//     };
// };

// export const deleteMonanfailed = (error) => {
//     return {
//         type: monancontant.DELETE_MONAN_FAILED,
//         payload: {
//             error,
//         },
//     };
// };