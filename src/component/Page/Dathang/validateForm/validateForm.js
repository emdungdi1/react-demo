import validator from 'validator';
export default function validateInfo(values, data) {
    let errors = {};
    if (!values.ten_nguoi_nhan) {
        errors.ten_nguoi_nhan = 'Không được để trống';
    }

    if (!values.email) {
        errors.email = 'Không được để trống';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Bạn hãy kiểm tra lại email';
    } else if (values.email === data) {
        errors.email = 'Email đã được sử dụng';
    }
    if (!values.dia_chi_nguoi_nhan) {
        errors.dia_chi_nguoi_nhan = 'Không được để trống';
    }
    if (!values.sdt_nguoi_nhan) {
        errors.sdt_nguoi_nhan = 'Không được để trống';
    } else if (!validator.isMobilePhone(values.sdt_nguoi_nhan)) {
        errors.sdt_nguoi_nhan = 'Bạn hãy kiểm tra lại số điện thoại';
    }

    return errors;
}