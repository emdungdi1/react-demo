import * as apiLoaiGiay from '../api/loai_giay';
import * as contantLoaiGiay from '../contants/loai_giay';

export const fetchListLoaiGiayRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistLoaiGiay());
        apiLoaiGiay.getLoaiGiay().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistLoaiGiaysuccess(data));
        });
    };
};

export const fetchlistLoaiGiay = (params = {}) => {
    return {
        type: contantLoaiGiay.FETCH_LOAIGIAY,
        payload: {
            params,
        },
    };
};

export const fetchlistLoaiGiaysuccess = (data) => {
    return {
        type: contantLoaiGiay.FETCH_SUCCESS_LOAIGIAY,
        payload: {
            data,
        },
    };
};

export const fetchlistLoaiGiayfailed = (error) => {
    return {
        type: contantLoaiGiay.FETCH_FAIDLED_LOAIGIAY,
        payload: {
            error,
        },
    };
};

export const filterThuongHieu = (keyword) => ({
    type: contantLoaiGiay.FILTER_LOAIGIAY,
    payload: {
        keyword,
    },
});

export const SetTH = () => ({
    type: contantLoaiGiay.SET_LOAIGIAY,
    payload: {},
});

export const themLoaiGiay = (data) => {
    return {
        type: contantLoaiGiay.THEM_LOAI_GIAY,
        payload: data,
    };
};

export const themLoaiGiaysuccess = (id, data) => {
    return {
        type: contantLoaiGiay.THEM_LOAI_GIAY_SUCCESS,
        payload: {
            id,
            data,
        },
    };
};

export const themLoaiGiayfailed = (error) => {
    return {
        type: contantLoaiGiay.THEM_LOAI_GIAY_FAILED,
        payload: {
            error,
        },
    };
};

export const updateLoaiGiay = (data) => {
    return {
        type: contantLoaiGiay.UPDATE_LOAIGIAY,
        payload: {
            data,
        },
    };
};

export const setLoaiGiayEditting = (loaigiay) => {
    return {
        type: contantLoaiGiay.SET_LOAIGIAY_EDITTING,
        payload: {
            loaigiay,
        },
    };
};

export const setLoaiGiayEdittingNull = () => {
    return {
        type: contantLoaiGiay.SET_LOAIGIAY_EDITTING_NULL,
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

export const deleteLoaiGiay = (id) => {
    return {
        type: contantLoaiGiay.DELETE_LOAIGIAY,
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