import validator from 'validator';
export default function validateInfo(values, data) {
    let errors = {};
    if (!values.ho_khach_hang) {
        errors.ho_khach_hang = 'Không được để trống';
    }
    if (!values.ten_khach_hang) {
        errors.ten_khach_hang = 'Không được để trống';
    }
    if (!values.email) {
        errors.email = 'Không được để trống';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Bạn hãy kiểm tra lại email';
    } else if (values.email === data) {
        errors.email = 'Email đã được sử dụng';
    }
    if (!values.password) {
        errors.password = 'Không được để trống';
    }
    if (!values.phone) {
        errors.phone = 'Không được để trống';
    } else if (!validator.isMobilePhone(values.phone)) {
        errors.phone = 'Bạn hãy kiểm tra lại số điện thoại';
    }

    return errors;
}