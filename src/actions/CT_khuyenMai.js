import * as api from '../api/ct_khuyen_mai';
import * as contant from '../contants/ct_khuyen_mai';

export const fetchListCTKhuyenMaiRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistCTKhuyenMai());
        api.getCTKhuyenMai().then((resp) => {
            const { data } = resp;

            dispatch(fetchlistCTKhuyenMaisuccess(data));
        });
    };
};

export const fetchlistCTKhuyenMai = (params = {}) => {
    return {
        type: contant.FETCH_CT_KHUYENMAI,
        payload: {
            params,
        },
    };
};

export const fetchlistCTKhuyenMaisuccess = (data) => {
    return {
        type: contant.FETCH_SUCCESS_CT_KHUYENMAI,
        payload: {
            data,
        },
    };
};

export const themCTKhuyenMais = (data) => {
    return {
        type: contant.THEM_CT_KHUYENMAI,
        payload: {
            data,
        },
    };
};

export const updateCTKhuyenMai = (data) => {
    return {
        type: contant.UPDATE_CT_KHUYENMAI,
        payload: {
            data,
        },
    };
};

export const setCTKhuyenMaiEditting = (loaigiay) => {
    return {
        type: contant.SET_CT_KHUYENMAI_EDITTING,
        payload: {
            loaigiay,
        },
    };
};

export const setCTKhuyenMaiEdittingNull = () => {
    return {
        type: contant.SET_CT_KHUYENMAI_EDITTING_NULL,
    };
};

export const deleteCTKhuyenMai = (id_khuyen_mai, id_giay) => {
    return {
        type: contant.DELETE_CT_KHUYENMAI,
        payload: {
            id_khuyen_mai,
            id_giay,
        },
    };
};