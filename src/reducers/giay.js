import * as contant from '../contants/giay';
// import Moment from 'moment';
const initialState = {
    giayEditting: {},
    mausacEditting: [],
    ListGiay: [],
    tam: [],
    ListChiTietMauSac: [],
    tamMauSac: [],
    ListChiTietSize: [],
    tamSize: [],
    ListNP: [],
    giayNP: [],
    mausacNP: [],
    dataLG: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_GIAY:
            return {
                ...state,
                ListLoaiGiay: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_GIAY:
            const { dataGiay } = action.payload;
            return {
                ...state,
                ListGiay: dataGiay.data,
                tam: dataGiay.data,
            };
        case contant.FETCH_NEWPRODUCT:
            const { dataNP, dataNPS } = action.payload;
            let dataT = [];

            dataT = dataNP.data.slice(0, 9);
            return {
                ...state,
                mausacNP: dataNPS.data.data,
                giayNP: dataT,
                ListNP: dataNP,
            };

        case contant.THEM_GIAY:
            {
                return {
                    ...state,
                };
            }
        case contant.THEM_GIAY_SUCCESS:
            {
                let { dataGiay } = action.payload;
                const d = {
                    id: dataGiay.id_g,
                    ten_giay: dataGiay.ten_giay,
                    mo_ta: dataGiay.mo_ta,
                    id_loai_giay: dataGiay.id_loai_giay,
                    gia_ban: dataGiay.gia_ban,
                    trang_thai: dataGiay.trang_thai,
                    date_create: dataGiay.date_create,
                };
                return {
                    ...state,
                    ListGiay: [d].concat(state.ListGiay),
                    tam: [d].concat(state.ListGiay),
                };
            }

        case contant.UPDATE_GIAY:
            {
                const { data } = action.payload;
                const { ListGiay } = state;
                const index = ListGiay.findIndex((item) => item.id === data.id_g);

                if (index !== -1) {
                    const newlist = [
                        ...ListGiay.slice(0, index),
                        {
                            id: data.id_g,
                            ten_giay: data.ten_giay,
                            mo_ta: data.mo_ta,
                            id_loai_giay: data.id_loai_giay,
                            gia_ban: data.gia_ban,
                            trang_thai: data.trang_thai,
                            date_update: data.date_update,
                        },
                        ...ListGiay.slice(index + 1),
                    ];
                    return {
                        ...state,
                        ListGiay: newlist,
                    };
                }
                return {
                    ...state,
                    tam: ListGiay,
                };
            }
        case contant.UPDATE_CHITIETMAUSAC:
            {
                const { data } = action.payload;
                const { ListChiTietMauSac } = state;
                const newData = {
                    id: data.id,
                    id_giay: data.id_giay,
                    id_mau_sac: data.id_mau_sac,
                    hinh_anh: data.hinh_anh,
                };
                const index = ListChiTietMauSac.findIndex((item) => item.id === newData.id);

                if (index !== -1) {
                    const newlist = [...ListChiTietMauSac.slice(0, index), newData, ...ListChiTietMauSac.slice(index + 1)];
                    return {
                        ...state,
                        ListChiTietMauSac: newlist,
                    };
                }
                return {
                    ...state,
                    tam: ListChiTietMauSac,
                };
            }
        case contant.UPDATE_CHITIETSIZE:
            {
                const { data } = action.payload;
                const { ListChiTietSize } = state;
                const indexCTMS = ListChiTietSize.findIndex(
                    (item) => item.id_ct_mau_sac === data.id_ct_mau_sac && item.id_size === data.id_size
                );

                if (indexCTMS !== -1) {
                    const newlist = [...ListChiTietSize.slice(0, indexCTMS), data, ...ListChiTietSize.slice(indexCTMS + 1)];
                    return {
                        ...state,
                        ListChiTietSize: newlist,
                    };
                }
                return {
                    ...state,
                    tam: ListChiTietSize,
                };
            }

        case contant.FETCH_CHITIETMAUSAC:
            return {
                ...state,
                ListChiTietMauSac: [],
                tamMauSac: [],
            };
        case contant.FETCH_SUCCESS_CHITIETMAUSAC:
            const { dataNew } = action.payload;

            return {
                ...state,
                ListChiTietMauSac: dataNew.data,
                tamMauSac: dataNew.data,
            };

        case contant.THEM_CHITIETMAUSAC:
            {
                return {
                    ...state,
                };
            }
        case contant.THEM_CHITIETMAUSAC_SUCCESS:
            {
                let { id, dataMS } = action.payload;
                const newData = {
                    id: id,
                    id_giay: dataMS.id_giay,
                    id_mau_sac: dataMS.id_mau_sac,
                    hinh_anh: dataMS.hinh_anh,
                };
                return {
                    ...state,
                    ListChiTietMauSac: [newData].concat(state.ListChiTietMauSac),
                    tamMauSac: [newData].concat(state.ListChiTietMauSac),
                };
            }

        case contant.FETCH_CHITIETSIZE:
            return {
                ...state,
                ListChiTietSize: [],
                tamSize: [],
            };
        case contant.FETCH_SUCCESS_CHITIETSIZE:
            const { dataSize } = action.payload;
            return {
                ...state,
                ListChiTietSize: dataSize.data,
                tamSize: dataSize.data,
            };
        case contant.THEM_CHITIETSIZE_SUCCESS:
            {
                let { dataSize } = action.payload;
                return {
                    ...state,
                    ListChiTietSize: [dataSize].concat(state.ListChiTietSize),
                    tamMauSac: [dataSize].concat(state.ListChiTietSize),
                };
            }

        case contant.SET_GIAY_EDITTING:
            {
                let { idGiay } = action.payload;
                const { ListGiay, ListChiTietMauSac, ListChiTietSize } = state;
                const dataTam = ListGiay.filter((item) => item.id === idGiay);
                const mauTam = [];
                for (var i = 0; i < ListChiTietMauSac.length; i++) {
                    if (ListChiTietMauSac[i].id_giay === idGiay) {
                        const s = ListChiTietSize.filter((item) => item.id_ct_mau_sac === ListChiTietMauSac[i].id);
                        const m = {
                            id: ListChiTietMauSac[i].id,
                            id_giay: ListChiTietMauSac[i].id_giay,
                            id_mau_sac: ListChiTietMauSac[i].id_mau_sac,
                            hinh_anh: ListChiTietMauSac[i].hinh_anh,
                            size: s,
                        };
                        mauTam.push(m);
                    }
                }

                return {
                    ...state,
                    giayEditting: dataTam[0],
                    mausacEditting: mauTam,
                };
            }
        case contant.SET_GIAY_EDITTING_NULL:
            {
                return {
                    ...state,
                    giayEditting: {},
                    mausacEditting: [],
                };
            }
        case contant.DELETE_GIAY:
            {
                const { id } = action.payload;
                const { ListGiay } = state;
                const index = ListGiay.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListGiay.slice(0, index), ...ListGiay.slice(index + 1)];
                    return {
                        ...state,
                        ListGiay: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.DELETE_CHITIETMAUSAC:
            {
                const { id } = action.payload;
                const { ListChiTietMauSac } = state;
                const index = ListChiTietMauSac.findIndex((item) => item.id === id);

                if (index !== -1) {
                    const newlist = [...ListChiTietMauSac.slice(0, index), ...ListChiTietMauSac.slice(index + 1)];
                    return {
                        ...state,
                        ListChiTietMauSac: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.DELETE_CHITIETSIZE:
            {
                const { id_ct_mau_sac, id_size } = action.payload;
                const { ListChiTietSize } = state;
                const indexCTMS = ListChiTietSize.findIndex(
                    (item) => item.id_ct_mau_sac === id_ct_mau_sac && item.id_size === id_size
                );
                if (indexCTMS !== -1) {
                    const newlist = [...ListChiTietSize.slice(0, indexCTMS), ...ListChiTietSize.slice(indexCTMS + 1)];
                    return {
                        ...state,
                        ListChiTietSize: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.SET_DATA_LG:
            {
                const { dataLGS } = action.payload;

                return {
                    ...state,
                    dataLG: dataLGS,
                };
            }
        default:
            return state;
    }
};

export default reducer;