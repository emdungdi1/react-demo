import * as contant from '../contants/mausac';
// import Moment from 'moment';
const initialState = {
    mausacEditting: [],
    ListMauSac: [],
    listMauSacTam: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_MAUSAC:
            return {
                ...state,
                ListMauSac: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_MAUSAC:
            const { data } = action.payload;

            const arr = data.data;
            const newData = [];
            if (data.data) {
                for (var i = 0; i < arr.length; i++) {
                    const s = {
                        id: arr[i].id,
                        ten_mau_sac: arr[i].ten_mau_sac,
                        hinh_anh: arr[i].hinh_anh,
                        check: false,
                    };
                    newData.push(s);
                }
            }
            return {
                ...state,
                ListMauSac: data.data,
                tam: data.data,
                listMauSacTam: newData,
            };

        case contant.FETCH_FAIDLED_MAUSAC:
            return {
                ...state,
                ListMauSac: [],
                tam: [],
            };
        case contant.THEM_MAUSAC:
            {
                return {
                    ...state,
                };
            }
        case contant.THEM_MAUSAC_SUCCESS:
            {
                let { data, id } = action.payload;
                var dataNew = { id: id, ten_mau_sac: data.ten_mau_sac, hinh_anh: data.hinh_anh };
                console.log(dataNew);
                return {
                    ...state,
                    ListMauSac: [dataNew].concat(state.ListMauSac),
                    tam: [dataNew].concat(state.ListMauSac),
                };
            }

        case contant.SET_MAUSAC_EDITTING:
            {
                const { mausac } = action.payload;
                return {
                    ...state,
                    mausacEditting: mausac,
                };
            }

        case contant.SET_MAUSAC_EDITTING_NULL:
            {
                return {
                    ...state,
                    mausacEditting: [],
                };
            }
        case contant.FILTER_MAUSAC:
            {
                const { keyword } = action.payload;
                const { tam } = state;
                const dataNew = tam.filter((tien) => tien.ten_mau_sac.toLowerCase().includes(keyword.toLowerCase()));
                return {
                    ...state,
                    ListMauSac: dataNew,
                };
            }
        case contant.SET_MAUSAC:
            {
                const { tam } = state;
                const dataNew = tam;
                return {
                    ...state,
                    ListMauSac: dataNew,
                };
            }
        case contant.UPDATE_MAUSAC:
            {
                const { data } = action.payload;
                const { ListMauSac } = state;
                const index = ListMauSac.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListMauSac.slice(0, index), data, ...ListMauSac.slice(index + 1)];
                    return {
                        ...state,
                        ListMauSac: newlist,
                        tam: newlist,
                        mausacEditting: [],
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.DELETE_MAUSAC:
            {
                const { id } = action.payload;
                const { ListMauSac } = state;
                const index = ListMauSac.findIndex((item) => item.id === id);
                if (index !== -1) {
                    console.log(index);
                    const newlist = [...ListMauSac.slice(0, index), ...ListMauSac.slice(index + 1)];
                    return {
                        ...state,
                        ListMauSac: newlist,
                        tam: newlist,
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.UPDATE_CHECK:
            {
                const { id } = action.payload;
                const { listMauSacTam } = state;
                const index = listMauSacTam.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const newlist = listMauSacTam;
                    listMauSacTam[index].check = !listMauSacTam[index].check;
                    return {
                        ...state,
                        ListMauSac: newlist,
                        mausacEditting: [],
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