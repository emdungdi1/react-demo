import { useState, useEffect } from 'react';
import Moment from 'moment';
const useForm = (callback, validate) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        id_khac_hang: 0,
        trang_thai: 'DATHANG',
        thoi_gian_dat: '',
        ten_nguoi_nhan: '',
        sdt_nguoi_nhan: '',
        dia_chi_nguoi_nhan: '',
        email: '',
        date_create: '',
    });

    function onChangeInput(e) {
        e.persist();
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
        let ob = {};
        ob[`${e.target.name}`] = e.target.value;
        setErrors(validate(data));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setData((data) => ({
            ...data,
            thoi_gian_dat: Moment(new Date()).format('YYYY-MM-DD HH:mm'),
            date_create: Moment(new Date()).format('YYYY-MM-DD HH:mm'),
        }));
        // api.getEmail({ email: data.email })
        //     .then((response) => {
        //         if (response.data.success === 1) {
        //             if (response.data) {
        //                 setIsSubmitting(false);
        //                 setErrors(validate(data, response.data.data.email));
        //             }
        //         } else {
        //             setIsSubmitting(true);
        //             setErrors(validate(data));
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        setIsSubmitting(true);
        setErrors(validate(data));
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        onChangeInput,
        handleSubmit,
        data,
        setData,
        errors,
    };
};

export default useForm;