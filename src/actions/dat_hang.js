import * as api from '../api/dat_hang';
import * as contant from '../contants/dat_hang';

export const fetchListDatHangRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistDatHang());
        api.getList().then((resp) => {
            const { data } = resp;
            dispatch(fetchlistDatHangsuccess(data));
        });
    };
};

export const fetchlistDatHang = (params = {}) => {
    return {
        type: contant.FETCH_DATHANG,
        payload: {
            params,
        },
    };
};

export const fetchlistDatHangsuccess = (data) => {
    return {
        type: contant.FETCH_SUCCESS_DATHANG,
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

export const themDatHang = (id, data) => {
    return {
        type: contant.THEM_DATHANG,
        payload: { id, data },
    };
};

export const updateDatHang = (data) => {
    return {
        type: contant.UPDATE_DATHANG,
        payload: {
            data,
        },
    };
};

export const setDatHangEditting = (dathang) => {
    return {
        type: contant.SET_DATHANG_EDITTING,
        payload: {
            dathang,
        },
    };
};

export const setDatHangEdittingNull = () => {
    return {
        type: contant.SET_DATHANG_EDITTING_NULL,
    };
};

export const deleteDatHang = (id) => {
    return {
        type: contant.DELETE_DATHANG,
        payload: {
            id,
        },
    };
};