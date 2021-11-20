import validator from 'validator';
export default function validateInfo(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Không được để trống';
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'Bạn hãy kiểm tra lại email';
    }
    if (!values.password) {
        errors.password = 'Không được để trống';
    }

    return errors;
}