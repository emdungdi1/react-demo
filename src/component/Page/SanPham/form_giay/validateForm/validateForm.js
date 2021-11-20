export default function validateInfo(values) {
    let errors = {};
    if (!values.ten_giay) {
        errors.ten_giay = 'Vui lòng nhập tên giày';
    }
    if (!values.id_g) {
        errors.id_g = 'Vui lòng nhập mã giày';
    }
    if (!values.mo_ta) {
        errors.mo_ta = 'Vui lòng nhập mô tả';
    }
    if (!values.gia_ban) {
        errors.gia_ban = 'Vui lòng nhập giá bán';
    }
    if (!values.id_loai_giay) {
        errors.id_loai_giay = 'Vui lòng chọn thương hiệu';
    }

    return errors;
}