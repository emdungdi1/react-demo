import { useState, useEffect } from 'react';
import * as api from '../../../../api/khach_hang';
const useForm = (callback, validate) => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState({
        id: 0,
        facebook_id: '',
        ho_khach_hang: '',
        ten_khach_hang: '',
        email: '',
        phone: '',
        avatar: '',
        password: '',
        accessToken: '',
    });

    function onChangeInput(e) {
        e.persist();
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(data));
        setIsSubmitting(true);
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