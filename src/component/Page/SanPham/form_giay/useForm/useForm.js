import { useState, useEffect } from 'react';
import Moment from 'moment';

const useForm = (callback, validate, apiUpload, validateMS) => {
    const [errors, setErrors] = useState({});
    const [errorsMS, setErrorsMS] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState([]);
    const [mausac, setMauSac] = useState([]);
    const [addSize, setAddSize] = useState([]);
    const [addMS, setAddMS] = useState([]);
    const [deleteMS, setdeleteMS] = useState([]);
    const [data, setData] = useState({
        id_g: '',
        ten_giay: '',
        mo_ta: '',
        id_loai_giay: 0,
        gia_ban: '',
        trang_thai: 1,
        date_create: new Date(),
        date_update: new Date(),
    });

    function handleChange(e) {
        e.persist();
        if (e.target.files) {
            setFile(e.target.files);
        }
    }

    function onUpload(index) {
        apiUpload
            .uploadMultiple(file)
            .then((response) => {
                let h = [];
                if (response.status === 201) {
                    for (var i = 0; i < response.data.url.length; i++) {
                        h.push(response.data.url[i].filename);
                    }
                    const ms = mausac[index];
                    const data = {
                        id: ms.id,
                        id_giay: ms.id_giay,
                        mo_ta: ms.mo_ta,
                        id_mau_sac: ms.id_mau_sac,
                        ten_mau_sac: ms.ten_mau_sac,
                        hinh_anh: h.toString(),
                        size: ms.size,
                    };
                    const newlist = [...mausac.slice(0, index), data, ...mausac.slice(index + 1)];
                    setMauSac(newlist);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onUploadAddMS(index) {
        apiUpload
            .uploadMultiple(file)
            .then((response) => {
                let h = [];
                if (response.status === 201) {
                    for (var i = 0; i < response.data.url.length; i++) {
                        h.push(response.data.url[i].filename);
                    }
                    const ms = addMS[index];
                    const data = {
                        id: ms.id,
                        id_giay: ms.id_giay,
                        mo_ta: ms.mo_ta,
                        id_mau_sac: ms.id_mau_sac,
                        ten_mau_sac: ms.ten_mau_sac,
                        hinh_anh: h.toString(),
                        size: ms.size,
                    };
                    const newlist = [...addMS.slice(0, index), data, ...addMS.slice(index + 1)];
                    setAddMS(newlist);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function onChangeInput(e) {
        e.persist();
        if (e.target.name === 'gia_ban' && e.target.value !== isNaN) {
            setData((data) => ({
                ...data,
                gia_ban: parseInt(e.target.value),
            }));
        } else {
            setData((data) => ({
                ...data,
                [e.target.name]: e.target.value,
            }));
        }
    }

    function onchangeSelect(e) {
        e.persist();
        setData((data) => ({
            ...data,
            id_loai_giay: e.target.value,
        }));
    }

    function onchangeSelectMauSac(e) {
        e.persist();
        setData((mausac) => ({
            ...mausac,
            id_mau_sac: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { date_create } = data;
        setData((data) => ({
            ...data,

            date_create: Moment(date_create).format('YYYY-MM-DD HH:mm'),
        }));
        setErrors(validate(data));
        setErrorsMS(validateMS(mausac));
        setIsSubmitting(true);
    }

    function imageArray(h) {
        const d = h.split(',');
        let arr = [];
        for (var i = 0; i < d.length; i++) {
            arr.push(d[i]);
        }
        return arr;
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && Object.keys(errorsMS).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        onUpload,
        onChangeInput,
        onchangeSelect,
        handleChange,
        handleSubmit,
        file,
        data,
        setData,
        errors,
        mausac,
        setMauSac,
        onchangeSelectMauSac,
        imageArray,
        addMS,
        setAddMS,
        addSize,
        setAddSize,
        onUploadAddMS,
        deleteMS,
        setdeleteMS,
        errorsMS,
        setErrorsMS,
    };
};

export default useForm;