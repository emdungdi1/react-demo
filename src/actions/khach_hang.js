import * as api from '../api/khach_hang';
import * as contant from '../contants/khach_hang';

export const fetchListKhachHangRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistKhachHang());
        api.getList().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistKhachHangsuccess(data));
        });
    };
};

export const fetchlistKhachHang = (params = {}) => {
    return {
        type: contant.FETCH_KHACHHANG,
        payload: {
            params,
        },
    };
};

export const fetchlistKhachHangsuccess = (data) => {
    return {
        type: contant.FETCH_SUCCESS_KHACHHANG,
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

export const themKhachHang = (id, data) => {
    return {
        type: contant.THEM_KHACHHANG,
        payload: { id, data },
    };
};

export const updateKhachHang = (data) => {
    return {
        type: contant.UPDATE_KHACHHANG,
        payload: {
            data,
        },
    };
};

export const setKhachHangEditting = (khachhang) => {
    return {
        type: contant.SET_KHACHHANG_EDITTING,
        payload: {
            khachhang,
        },
    };
};

export const setKhachHangEdittingNull = () => {
    return {
        type: contant.SET_KHACHHANG_EDITTING_NULL,
    };
};

export const deleteKhachHang = (id) => {
    return {
        type: contant.DELETE_KHACHHANG,
        payload: {
            id,
        },
    };
};