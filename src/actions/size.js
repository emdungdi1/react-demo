import * as apiSize from '../api/size';
import * as contantSize from '../contants/size';

export const fetchListSizeRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistSize());
        apiSize.getSize().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistSizesuccess(data));
        });
    };
};

export const fetchlistSize = (params = {}) => {
    return {
        type: contantSize.FETCH_SIZE,
        payload: {
            params,
        },
    };
};

export const fetchlistSizesuccess = (data) => {
    return {
        type: contantSize.FETCH_SUCCESS_SIZE,
        payload: {
            data,
        },
    };
};

export const fetchlistSizefailed = (error) => {
    return {
        type: contantSize.FETCH_FAIDLED_SIZE,
        payload: {
            error,
        },
    };
};

export const filterSize = (keyword) => ({
    type: contantSize.FILTER_SIZE,
    payload: {
        keyword,
    },
});

export const SetSize = () => ({
    type: contantSize.GET_SIZE,
    payload: {},
});

export const themSize = (data) => {
    return {
        type: contantSize.THEM_SIZE,
        payload: data,
    };
};

export const themSizesuccess = (id, data) => {
    return {
        type: contantSize.THEM_SIZE_SUCCESS,
        payload: {
            id,
            data,
        },
    };
};

export const themSizefailed = (error) => {
    return {
        type: contantSize.THEM_SIZE_FAILED,
        payload: {
            error,
        },
    };
};

export const updateSize = (data) => {
    return {
        type: contantSize.UPDATE_SIZE,
        payload: {
            data,
        },
    };
};

export const setSizeEditting = (size) => {
    return {
        type: contantSize.SET_SIZE_EDITTING,
        payload: {
            size,
        },
    };
};

export const setSizeEdittingNull = () => {
    return {
        type: contantSize.SET_SIZE_EDITTING_NULL,
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

export const deleteSize = (id) => {
    return {
        type: contantSize.DELETE_SIZE,
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