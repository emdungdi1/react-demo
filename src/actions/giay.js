import * as apiGiay from '../api/giay';
import * as contantGiay from '../contants/giay';
export const fetchListGiayRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistGiay());
        apiGiay.getGiay().then((resp) => {
            const { data } = resp;

            dispatch(fetchlistGiaysuccess(data));
        });
    };
};

export const fetchListNewProductRequest = () => {
    return (dispatch) => {
        apiGiay.getNewProduct().then((resp) => {
            const { data } = resp;
            if (data.success === 1) {
                apiGiay.getNewProducts().then((resps) => {
                    if (resps.status === 200) {
                        dispatch(fetchlistNewProductsuccess(data, resps));
                    }
                });
            }
        });
    };
};

export const fetchlistNewProductsuccess = (dataNP, dataNPS) => {
    return {
        type: contantGiay.FETCH_NEWPRODUCT,
        payload: {
            dataNP,
            dataNPS,
        },
    };
};

export const fetchlistGiay = (params = {}) => {
    return {
        type: contantGiay.FETCH_GIAY,
        payload: {
            params,
        },
    };
};

export const fetchlistGiaysuccess = (dataGiay) => {
    return {
        type: contantGiay.FETCH_SUCCESS_GIAY,
        payload: {
            dataGiay,
        },
    };
};

export const fetchListChiTietMauSacRequest = () => {
    return (dispatch) => {
        dispatch(fetchlistChiTietMauSac());
        apiGiay.getChiTietMauSac().then((resp) => {
            if (resp.status === 200) {
                const { data } = resp;
                dispatch(fetchlistChiTietMauSacsuccess(data));
            }
        });
    };
};

export const fetchlistChiTietMauSac = (params = {}) => {
    return {
        type: contantGiay.FETCH_CHITIETMAUSAC,
        payload: {
            params,
        },
    };
};

export const fetchlistChiTietMauSacsuccess = (dataNew) => {
    return {
        type: contantGiay.FETCH_SUCCESS_CHITIETMAUSAC,
        payload: {
            dataNew,
        },
    };
};

export const themGiay = (data) => {
    return {
        type: contantGiay.THEM_GIAY,
        payload: data,
    };
};

export const themChiTietMauSac = (data) => {
    return {
        type: contantGiay.THEM_CHITIETMAUSAC,
        payload: data,
    };
};

export const themGiaysuccess = (dataGiay) => {
    return {
        type: contantGiay.THEM_GIAY_SUCCESS,
        payload: {
            dataGiay,
        },
    };
};

export const themChiTietMauSacsuccess = (id, dataMS) => {
    return {
        type: contantGiay.THEM_CHITIETMAUSAC_SUCCESS,
        payload: {
            id,
            dataMS,
        },
    };
};

export const fetchListChiTietSizeRequest = () => {
    return (dispatch) => {
        apiGiay.getChiTietSize().then((resp) => {
            const { data } = resp;
            if (resp.status === 200) {
                dispatch(fetchlistChiTietSizesuccess(data));
            }
        });
    };
};

export const fetchlistChiTietSizesuccess = (dataSize) => {
    return {
        type: contantGiay.FETCH_SUCCESS_CHITIETSIZE,
        payload: {
            dataSize,
        },
    };
};

export const themChiTietSizesuccess = (dataSize) => {
    return {
        type: contantGiay.THEM_CHITIETSIZE_SUCCESS,
        payload: {
            dataSize,
        },
    };
};

export const setGiayEdittings = (idGiay) => {
    return {
        type: contantGiay.SET_GIAY_EDITTING,
        payload: {
            idGiay,
        },
    };
};

export const setGiayEdittingNull = () => {
    return {
        type: contantGiay.SET_GIAY_EDITTING_NULL,
    };
};

export const updateGiay = (data) => {
    return {
        type: contantGiay.UPDATE_GIAY,
        payload: {
            data,
        },
    };
};

export const updateChiTietMSGiay = (data) => {
    return {
        type: contantGiay.UPDATE_CHITIETMAUSAC,
        payload: {
            data,
        },
    };
};

export const updateChiTietSizeGiay = (data) => {
    return {
        type: contantGiay.UPDATE_CHITIETSIZE,
        payload: {
            data,
        },
    };
};

export const deleteGiay = (id) => {
    return {
        type: contantGiay.DELETE_GIAY,
        payload: {
            id,
        },
    };
};

export const deleteMauSac = (id) => {
    return {
        type: contantGiay.DELETE_CHITIETMAUSAC,
        payload: {
            id,
        },
    };
};

export const deleteSize = (id_ct_mau_sac, id_size) => {
    return {
        type: contantGiay.DELETE_CHITIETMAUSAC,
        payload: {
            id_ct_mau_sac,
            id_size,
        },
    };
};

export const setDataByLG = (dataLGS) => {
    return {
        type: contantGiay.SET_DATA_LG,
        payload: {
            dataLGS,
        },
    };
};