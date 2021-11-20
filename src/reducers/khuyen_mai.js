import * as contant from '../contants/khuyen_mai';
// import Moment from 'moment';
const initialState = {
    khuyenMaiEditting: [],
    ListKhuyenMai: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_KHUYENMAI:
            return {
                ...state,
                ListKhuyenMai: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_KHUYENMAI:
            const { data } = action.payload;
            return {
                ...state,
                ListKhuyenMai: data.data,
                tam: data.data,
            };

        case contant.THEM_KHUYENMAI:
            {
                let { id, data } = action.payload;
                var newData = {
                    id: id,
                    ngay_bat_dau: data.ngay_bat_dau,
                    ngay_ket_thuc: data.ngay_ket_thuc,
                    ten_khuyen_mai: data.ten_khuyen_mai,
                    mo_ta: data.mo_ta,
                    phan_tram: data.phan_tram,
                    hinh_anh: data.hinh_anh,
                    date_create: data.date_create,
                };
                return {
                    ...state,
                    ListKhuyenMai: [newData].concat(state.ListKhuyenMai),
                    tam: [newData].concat(state.ListKhuyenMai),
                };
            }

        case contant.SET_KHUYENMAI_EDITTING:
            {
                const { loaigiay } = action.payload;
                return {
                    ...state,
                    khuyenMaiEditting: loaigiay,
                };
            }
        case contant.SET_KHUYENMAI_EDITTING_NULL:
            {
                return {
                    ...state,
                    khuyenMaiEditting: [],
                };
            }
        case contant.UPDATE_KHUYENMAI:
            {
                const { data } = action.payload;
                const { ListKhuyenMai } = state;
                const index = ListKhuyenMai.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListKhuyenMai.slice(0, index), data, ...ListKhuyenMai.slice(index + 1)];
                    return {
                        ...state,
                        ListKhuyenMai: newlist,
                        khuyenMaiEditting: [],
                    };
                }
                return {
                    ...state,
                    tam: ListKhuyenMai,
                };
            }
        case contant.DELETE_KHUYENMAI:
            {
                const { id } = action.payload;
                const { ListKhuyenMai } = state;
                const index = ListKhuyenMai.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListKhuyenMai.slice(0, index), ...ListKhuyenMai.slice(index + 1)];
                    return {
                        ...state,
                        ListKhuyenMai: newlist,
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