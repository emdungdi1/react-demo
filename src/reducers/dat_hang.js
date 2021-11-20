import * as contant from '../contants/dat_hang';
// import Moment from 'moment';
const initialState = {
    DatHangEditting: [],
    ListDatHang: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_DATHANG:
            return {
                ...state,
                ListDatHang: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_DATHANG:
            const { data } = action.payload;
            return {
                ...state,
                ListDatHang: data.data,
                tam: data.data,
            };

        case contant.THEM_DATHANG:
            {
                let { id, data } = action.payload;
                var newData = {
                    id: id,
                    id_khach_hang: data.id_khach_hang,
                    trang_thai: data.trang_thai,
                    thoi_gian_dat: data.thoi_gian_dat,
                    ten_nguoi_nhan: data.ten_nguoi_nhan,
                    sdt_nguoi_nhan: data.sdt_nguoi_nhan,
                    dia_chi_nguoi_nhan: data.dia_chi_nguoi_nhan,
                    date_create: data.date_create,
                };
                return {
                    ...state,
                    ListDatHang: [newData].concat(state.ListDatHang),
                    tam: [newData].concat(state.ListDatHang),
                };
            }

        case contant.SET_DATHANG_EDITTING:
            {
                const { dathang } = action.payload;
                return {
                    ...state,
                    DatHangEditting: dathang,
                };
            }
        case contant.SET_DATHANG_EDITTING_NULL:
            {
                return {
                    ...state,
                    DatHangEditting: [],
                };
            }
        case contant.UPDATE_DATHANG:
            {
                const { data } = action.payload;
                const { ListDatHang } = state;
                const index = ListDatHang.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListDatHang.slice(0, index), data, ...ListDatHang.slice(index + 1)];
                    return {
                        ...state,
                        ListDatHang: newlist,
                        DatHangEditting: [],
                    };
                }
                return {
                    ...state,
                    tam: ListDatHang,
                };
            }
        case contant.DELETE_DATHANG:
            {
                const { id } = action.payload;
                const { ListDatHang } = state;
                const index = ListDatHang.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = [...ListDatHang.slice(0, index), ...ListDatHang.slice(index + 1)];
                    return {
                        ...state,
                        ListDatHang: newlist,
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