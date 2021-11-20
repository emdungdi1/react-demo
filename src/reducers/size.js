import * as contant from '../contants/size';
// import Moment from 'moment';
const initialState = {
    sizeEditting: [],
    ListSize: [],
    tam: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case contant.FETCH_SIZE:
            return {
                ...state,
                ListSize: [],
                tam: [],
            };
        case contant.FETCH_SUCCESS_SIZE:
            const { data } = action.payload;
            return {
                ...state,
                ListSize: data.data,
                tam: data.data,
            };

        case contant.THEM_SIZE:
            {
                return {
                    ...state,
                };
            }
        case contant.THEM_SIZE_SUCCESS:
            {
                let { data, id } = action.payload;
                var dataNew = {
                    id: id,
                    ten_size: parseInt(data.ten_size),
                    date_create: data.date_create,
                    date_update: data.date_update,
                };
                return {
                    ...state,
                    ListSize: [dataNew].concat(state.ListSize),
                    tam: [dataNew].concat(state.ListSize),
                };
            }

        case contant.SET_SIZE_EDITTING:
            {
                const { size } = action.payload;
                return {
                    ...state,
                    sizeEditting: size,
                };
            }

        case contant.SET_SIZE_EDITTING_NULL:
            {
                return {
                    ...state,
                    sizeEditting: [],
                };
            }
        case contant.FILTER_SIZE:
            {
                const { keyword } = action.payload;
                const { tam } = state;

                const dataNew = tam.filter((tien) =>
                    tien.ten_size.toString().toLowerCase().includes(keyword.toString().toLowerCase())
                );
                return {
                    ...state,
                    ListSize: dataNew,
                };
            }
        case contant.GET_SIZE:
            {
                const { tam } = state;
                const dataNew = tam;
                return {
                    ...state,
                    ListSize: dataNew,
                };
            }
        case contant.UPDATE_SIZE:
            {
                const { data } = action.payload;
                const { ListSize } = state;
                const index = ListSize.findIndex((item) => item.id === data.id);

                if (index !== -1) {
                    const newlist = [...ListSize.slice(0, index), data, ...ListSize.slice(index + 1)];
                    return {
                        ...state,
                        ListSize: newlist,
                        tam: newlist,
                        sizeEditting: [],
                    };
                }
                return {
                    ...state,
                };
            }
        case contant.DELETE_SIZE:
            {
                const { id } = action.payload;
                const { ListSize } = state;
                const index = ListSize.findIndex((item) => item.id === id);
                if (index !== -1) {
                    console.log(index);
                    const newlist = [...ListSize.slice(0, index), ...ListSize.slice(index + 1)];
                    return {
                        ...state,
                        tam: newlist,
                        ListSize: newlist,
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