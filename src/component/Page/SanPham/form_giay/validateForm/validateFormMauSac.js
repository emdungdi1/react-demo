export default function validateInfoMauSac(values) {
    let errorsMS = {};
    if (!values) {
        errorsMS.mau_sac = 'Vui chọn màu sắc';
    }

    return errorsMS;
}