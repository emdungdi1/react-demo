import * as contant from '../contants/loai_giay';
// import Moment from 'moment';
const initialState = {
    loaiGiayEditting: [],
    ListLoaiGiay: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_LOAIGIAY:
            return {
                ...state,
                ListLoaiGiay: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_LOAIGIAY:
            const { data } = action.payload;
            return {
                ...state,
                ListLoaiGiay: data.data,
                tam: data.data,
            };

        case contant.FETCH_FAIDLED_LOAIGIAY:
            return {
                ...state,
                ListLoaiGiay: [],
                tam: [],
            };
        case contant.THEM_LOAI_GIAY:
            {
                return {
                    ...state,
                };
            }
        case contant.THEM_LOAI_GIAY_SUCCESS:
            {
                let { id, data } = action.payload;
                var newData = {
                    id: id,
                    ten_loai_giay: data.ten_loai_giay,
                    mo_ta: data.mo_ta,
                    trang_thai: data.trang_thai,
                    hinh_anh: data.hinh_anh,
                    date_create: data.date_create,
                };
                return {
                    ...state,
                    ListLoaiGiay: [newData].concat(state.ListLoaiGiay),
                    tam: [newData].concat(state.ListLoaiGiay),
                };
            }
        case contant.FILTER_LOAIGIAY:
            {
                const { keyword } = action.payload;
                const { tam } = state;
                const dataNew = tam.filter((tien) => tien.ten_loai_giay.toLowerCase().includes(keyword.toLowerCase()));
                return {
                    ...state,
                    ListLoaiGiay: dataNew,
                };
            }
        case contant.SET_LOAIGIAY:
            {
                const { tam } = state;
                const dataNew = tam;
                return {
                    ...state,
                    ListLoaiGiay: dataNew,
                };
            }
        case contant.SET_LOAIGIAY_EDITTING:
            {
                const { loaigiay } = action.payload;
                return {
                    ...state,
                    loaiGiayEditting: loaigiay,
                };
            }
        case contant.SET_LOAIGIAY_EDITTING_NULL:
            {
                return {
                    ...state,
                    loaiGiayEditting: [],
                };
            }
        case contant.UPDATE_LOAIGIAY:
            {
                const { data } = action.payload;
                const { ListLoaiGiay } = state;
                const index = ListLoaiGiay.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListLoaiGiay.slice(0, index), data, ...ListLoaiGiay.slice(index + 1)];
                    return {
                        ...state,
                        ListLoaiGiay: newlist,
                        tam: newlist,
                        loaiGiayEditting: [],
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.DELETE_LOAIGIAY:
            {
                const { id } = action.payload;
                const { ListLoaiGiay } = state;
                const index = ListLoaiGiay.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListLoaiGiay.slice(0, index), ...ListLoaiGiay.slice(index + 1)];
                    return {
                        ...state,
                        ListLoaiGiay: newlist,
                        tam: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        default:
            return state;
    }
};

export default reducer;