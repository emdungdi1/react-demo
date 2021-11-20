import { useState, useEffect } from 'react';
import * as api from './../../../../api/khach_hang';
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
        let ob = {};
        ob[`${e.target.name}`] = e.target.value;
        setErrors(validate(data));
    }

    function handleSubmit(e) {
        e.preventDefault();
        api.getEmail({ email: data.email })
            .then((response) => {
                if (response.data.success === 1) {
                    if (response.data) {
                        setIsSubmitting(false);
                        setErrors(validate(data, response.data.data.email));
                    }
                } else {
                    setIsSubmitting(true);
                    setErrors(validate(data));
                }
            })
            .catch((error) => {
                console.log(error);
            });
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