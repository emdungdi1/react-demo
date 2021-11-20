import * as contant from '../contants/ct_don_hang';
// import Moment from 'moment';
const initialState = {
    CTDonHangEditting: [],
    ListCTDonHang: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_CTDONHANG:
            return {
                ...state,
                ListCTDonHang: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_CTDONHANG:
            const { data } = action.payload;
            return {
                ...state,
                ListCTDonHang: data.data,
                tam: data.data,
            };

        case contant.THEM_CTDONHANG:
            {
                let { id, data } = action.payload;
                var newData = {
                    id: id,
                    id_giay: data.id_giay,
                    id_dat_hang: data.id_dat_hang,
                    so_luong: data.so_luong,
                    tong_tien: data.tong_tien,
                };
                return {
                    ...state,
                    ListCTDonHang: [newData].concat(state.ListCTDonHang),
                    tam: [newData].concat(state.ListCTDonHang),
                };
            }

        case contant.SET_CTDONHANG_EDITTING:
            {
                const { khachhang } = action.payload;
                return {
                    ...state,
                    CTDonHangEditting: khachhang,
                };
            }
        case contant.SET_CTDONHANG_EDITTING_NULL:
            {
                return {
                    ...state,
                    CTDonHangEditting: [],
                };
            }
        case contant.UPDATE_CTDONHANG:
            {
                const { data } = action.payload;
                const { ListCTDonHang } = state;
                const index = ListCTDonHang.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListCTDonHang.slice(0, index), data, ...ListCTDonHang.slice(index + 1)];
                    return {
                        ...state,
                        ListCTDonHang: newlist,
                        CTDonHangEditting: [],
                    };
                }
                return {
                    ...state,
                    tam: ListCTDonHang,
                };
            }
        case contant.DELETE_CTDONHANG:
            {
                const { id } = action.payload;
                const { ListCTDonHang } = state;
                const index = ListCTDonHang.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListCTDonHang.slice(0, index), ...ListCTDonHang.slice(index + 1)];
                    return {
                        ...state,
                        ListCTDonHang: newlist,
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