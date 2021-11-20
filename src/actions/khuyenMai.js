import * as api from '../api/khuyen_mai';
import * as contant from '../contants/khuyen_mai';

export const fetchListKhuyenMaiRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistKhuyenMai());
        api.getKhuyenMai().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistKhuyenMaisuccess(data));
        });
    };
};

export const fetchlistKhuyenMai = (params = {}) => {
    return {
        type: contant.FETCH_KHUYENMAI,
        payload: {
            params,
        },
    };
};

export const fetchlistKhuyenMaisuccess = (data) => {
    return {
        type: contant.FETCH_SUCCESS_KHUYENMAI,
        payload: {
            data,
        },
    };
};

export const themKhuyenMai = (id, data) => {
    return {
        type: contant.THEM_KHUYENMAI,
        payload: {
            id,
            data,
        },
    };
};

export const updateKhuyenMai = (data) => {
    return {
        type: contant.UPDATE_KHUYENMAI,
        payload: {
            data,
        },
    };
};

export const setKhuyenMaiEditting = (loaigiay) => {
    return {
        type: contant.SET_KHUYENMAI_EDITTING,
        payload: {
            loaigiay,
        },
    };
};

export const setKhuyenMaiEdittingNull = () => {
    return {
        type: contant.SET_KHUYENMAI_EDITTING_NULL,
    };
};

export const deleteKhuyenMai = (id) => {
    return {
        type: contant.DELETE_KHUYENMAI,
        payload: {
            id,
        },
    };
};