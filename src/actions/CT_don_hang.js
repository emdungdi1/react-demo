import * as api from '../api/ct_don_hang';
import * as contant from '../contants/ct_don_hang';

export const fetchListCTDonHangRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistCTDonHang());
        api.getList().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistCTDonHangsuccess(data));
        });
    };
};

export const fetchlistCTDonHang = (params = {}) => {
    return {
        type: contant.FETCH_CTDONHANG,
        payload: {
            params,
        },
    };
};

export const fetchlistCTDonHangsuccess = (data) => {
    return {
        type: contant.FETCH_SUCCESS_CTDONHANG,
        payload: {
            data,
        },
    };
};

// export const filterMonan = (keyword) => ({
// 	type: monancontant.FILTER_MONAN,
// 	payload: {
// 		keyword,
// 	},
// });

// export const filterMonanSuccess = (data) => ({
// 	type: monancontant.FILTER_MONAN_SUCCESS,
// 	payload: {
// 		data,
// 	},
// });

export const themCTDonHang = (id, data) => {
    return {
        type: contant.THEM_CTDONHANG,
        payload: { id, data },
    };
};

export const updateCTDonHang = (data) => {
    return {
        type: contant.UPDATE_CTDONHANG,
        payload: {
            data,
        },
    };
};

export const setCTDonHangEditting = (CTDonHang) => {
    return {
        type: contant.SET_CTDONHANG_EDITTING,
        payload: {
            CTDonHang,
        },
    };
};

export const setCTDonHangEdittingNull = () => {
    return {
        type: contant.SET_CTDONHANG_EDITTING_NULL,
    };
};

export const deleteCTDonHang = (id) => {
    return {
        type: contant.DELETE_CTDONHANG,
        payload: {
            id,
        },
    };
};