import React, { useState, useEffect } from 'react';
import './component_type.scss';
import * as apiUpload from '../../../../api/loai_giay';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loaigiayAction from '../../../../actions/loai_giay';
import * as mausacAction from '../../../../actions/mausac';
import * as modalAction from '../../../../actions/modal';
import * as actionGiay from '../../../../actions/giay';
import useForm from './useForm/useForm';
import validate from './validateForm/validateForm';
import validateMS from './validateForm/validateFormMauSac';
import * as apiGiay from './../../../../api/giay';
import Moment from 'moment';
import Carousel from 'react-bootstrap/Carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@material-ui/icons/Close';
import ComponentMauSac from './../../MauSac/form_mau_sac/component';

function Component_type(props) {
	const {
		onUpload,
		onChangeInput,
		onchangeSelect,
		handleChange,
		handleSubmit,
		data,
		setData,
		errors,
		mausac,
		setMauSac,
		imageArray,
		addMS,
		setAddMS,
		addSize,
		setAddSize,
		onUploadAddMS,
		deleteMS,
		setdeleteMS,
		errorsMS,
	} = useForm(submit, validate, apiUpload, validateMS);

	const {
		ListLoaiGiay,
		modalFormCreator,
		ListMauSac,
		ListSize,
		createGiay,
		giayEditting,
		mausacEditting,
		ListGiay,
	} = props;
	const {
		updateGiay,
		updateChiTietMSGiay,
		updateChiTietSizeGiay,
		themGiaysuccess,
		themChiTietMauSacsuccess,
		themChiTietSizesuccess,
		setGiayEdittingNull,

		deleteMauSac,
		deleteSize,
	} = createGiay;
	const { hideModalGiay } = modalFormCreator;
	const [show, setShow] = useState(false);
	const [showSize, setShowSize] = useState(false);
	const [showDeleteMS, setShowDeleteMS] = useState(false);
	const [indexTam, setIndexTam] = useState(0);
	const [indexTamMS, setIndexTamMS] = useState(-1);
	const [shownd, setShownd] = useState(false);
	const [nd, setNd] = useState('');
	const [ListTam, setListTam] = useState([]);
	const [ListTamSize, setListTamSize] = useState([]);

	function closeDidalognd() {
		setShownd(false);
	}
	const handleClose = () => {
		setShownd(false);
		setShow(false);
	};
	function closeDidalog() {
		setAddMS(ListTam);
		setShow(false);
	}
	const handleShow = () => {
		setShow(true);
	};
	const handleCloseSize = () => {
		setShowSize(false);
	};
	function closeDidalogSize() {
		setAddSize(ListTamSize);
		setShowSize(false);
	}
	const handleShowSize = (index) => {
		setShowSize(true);
		setIndexTam(index);
	};
	const handleCloseDeleteMS = () => {
		setShowDeleteMS(false);
	};
	function closeDidalogDeleteMS() {
		const newlist = [...mausac.slice(0, indexTamMS), ...mausac.slice(indexTamMS + 1)];
		setMauSac(newlist);
		let d = deleteMS;
		d.push(mausac[indexTamMS]);
		setdeleteMS(d);

		setShowDeleteMS(false);
		setIndexTamMS(-1);
	}

	const { id_g, ten_giay, mo_ta, date_create, gia_ban, id_loai_giay } = data;

	function submit() {
		let ktCS = ListGiay.filter((item) => item.ten_giay !== giayEditting.ten_giay);
		let k = ktCS.filter((item) => item.ten_giay === data.ten_giay);
		const kt = ListGiay.filter((item) => item.ten_giay === data.ten_giay);
		let ktCSID = ListGiay.filter((item) => item.id !== giayEditting.id);
		let kID = ktCSID.filter((item) => item.id === data.id_g);
		const ktID = ListGiay.filter((item) => item.id === data.id_g);

		if (giayEditting.id) {
			if (kID.length > 0) {
				setShownd(true);
				setNd(`Mã giày ${data.id_g} đã có trong danh sách`);
			} else {
				if (k.length > 0) {
					setShownd(true);
					setNd(`Giày ${data.ten_giay} đã có trong danh sách`);
				} else {
					apiGiay
						.updateGiay(data)
						.then((response) => {
							if (response.status === 200) {
								updateGiay(data);
								for (var i = 0; i < mausac.length; i++) {
									const dataMS = {
										id: mausac[i].id,
										id_giay: id_g,
										id_mau_sac: mausac[i].id_mau_sac,
										ten_mau_sac: mausac[i].ten_mau_sac,
										hinh_anh: mausac[i].hinh_anh,
										size: mausac[i].size,
									};

									let s = mausac[i].size;
									apiGiay
										.updateChiTietMSGiay(dataMS)
										.then((responseMS) => {
											if (responseMS.status === 200) {
												updateChiTietMSGiay(dataMS);
												for (var j = 0; j < s.length; j++) {
													const dataS = {
														id_ct_mau_sac: s[j].id_ct_mau_sac,
														id_size: s[j].id_size,
														so_luong: s[j].so_luong,
													};

													apiGiay
														.updateChiTietSizeGiay(dataS)
														.then((responseS) => {
															if (responseS.status === 200) {
																updateChiTietSizeGiay(dataS);
																hideModalGiay();
															}
														})
														.catch((error) => {
															console.log(error);
														});
												}
											}
										})
										.catch((error) => {
											console.log(error);
										});
								}

								setData((data) => ({
									...data,
									id_g: '',
									ten_giay: '',
									mo_ta: '',
									id_loai_giay: 0,
									gia_ban: 0,
								}));
								setMauSac([]);
								setGiayEdittingNull();
							}
						})
						.catch((error) => {
							console.log(error);
						});
					if (addSize.length > 0) {
						for (var i = 0; i < addSize.length; i++) {
							if (addSize[i].size.length > 0) {
								for (var j = 0; j < addSize[i].size.length; j++) {
									const dataS = {
										id_ct_mau_sac: addSize[i].size[j].id_ct_mau_sac,
										id_size: addSize[i].size[j].id_size,
										so_luong: addSize[i].size[j].so_luong,
									};

									apiGiay
										.ThemChiTietSize(dataS)
										.then((responseS) => {
											if (responseS.status === 200) {
												themChiTietSizesuccess(dataS);
											}
										})
										.catch((error) => {
											console.log(error);
										});
									setData((data) => ({
										...data,
										id_g: '',
										ten_giay: '',
										mo_ta: '',
										id_loai_giay: 0,
										gia_ban: 0,
									}));
									setMauSac([]);
									setGiayEdittingNull();
								}
							}
						}
					}
					if (addMS.length > 0) {
						for (var i = 0; i < addMS.length; i++) {
							const dataMS = {
								id_giay: data.id_g,
								id_mau_sac: addMS[i].id_mau_sac,
								ten_mau_sac: addMS[i].ten_mau_sac,
								hinh_anh: addMS[i].hinh_anh,
								size: addMS[i].size,
							};

							let s = addMS[i].size;
							apiGiay
								.ThemChiTietMauSac(dataMS)
								.then((responseMS) => {
									if (responseMS.status === 200) {
										themChiTietMauSacsuccess(responseMS.data.data.insertId, dataMS);
										for (var j = 0; j < s.length; j++) {
											const dataS = {
												id_ct_mau_sac: responseMS.data.data.insertId,
												id_size: s[j].id_size,
												so_luong: s[j].so_luong,
											};

											apiGiay
												.ThemChiTietSize(dataS)
												.then((responseS) => {
													if (responseS.status === 200) {
														themChiTietSizesuccess(dataS);
														setData((data) => ({
															...data,
															id_g: '',
															ten_giay: '',
															mo_ta: '',
															id_loai_giay: 0,
															gia_ban: 0,
														}));
														setMauSac([]);
														setGiayEdittingNull();
														hideModalGiay();
													}
												})
												.catch((error) => {
													console.log(error);
												});
										}
									}
								})
								.catch((error) => {
									console.log(error);
								});
						}
					}
					if (deleteMS.length > 0) {
						for (var i = 0; i < deleteMS.length; i++) {
							if (deleteMS[i].size.length > 0) {
								for (var j = 0; j < deleteMS[i].size.length; j++) {
									const dataS = {
										id_ct_mau_sac: deleteMS[i].size[j].id_ct_mau_sac,
										id_size: deleteMS[i].size[j].id_size,
										so_luong: deleteMS[i].size[j].so_luong,
									};
									apiGiay
										.deleteSize(dataS)
										.then((response) => {
											if (response.status === 200) {
												deleteSize(dataS.id_ct_mau_sac, dataS.id_size);
											}
										})
										.catch((error) => {
											console.log(error);
										});
								}
							}
						}
						for (var i = 0; i < deleteMS.length; i++) {
							const id = deleteMS[i].id;
							apiGiay
								.deleteMauSac(deleteMS[i])
								.then((response) => {
									if (response.status === 200) {
										deleteMauSac(id);
									}
								})
								.catch((error) => {
									console.log(error);
								});
						}
						setGiayEdittingNull();
					}
					hideModalGiay();
				}
			}
		} else {
			if (ktID.length > 0) {
				setShownd(true);
				setNd(`Mã giày ${data.id_g} đã có trong danh sách`);
			} else {
				if (kt.length > 0) {
					setShownd(true);
					setNd(`Giày ${data.ten_giay} đã có trong danh sách`);
				} else {
					apiGiay
						.ThemLoaiGiay(data)
						.then((response) => {
							if (response.status === 200) {
								themGiaysuccess(data);
								for (var i = 0; i < mausac.length; i++) {
									const dataMS = {
										id_giay: data.id_g,
										id_mau_sac: mausac[i].id_mau_sac,
										ten_mau_sac: mausac[i].ten_mau_sac,
										hinh_anh: mausac[i].hinh_anh,
										size: mausac[i].size,
									};

									let s = mausac[i].size;
									apiGiay
										.ThemChiTietMauSac(dataMS)
										.then((responseMS) => {
											if (responseMS.status === 200) {
												themChiTietMauSacsuccess(responseMS.data.data.insertId, dataMS);
												for (var j = 0; j < s.length; j++) {
													const dataS = {
														id_ct_mau_sac: responseMS.data.data.insertId,
														id_size: s[j].id_size,
														so_luong: s[j].so_luong,
													};

													apiGiay
														.ThemChiTietSize(dataS)
														.then((responseS) => {
															if (responseS.status === 200) {
																themChiTietSizesuccess(dataS);
																setData((data) => ({
																	...data,
																	id_g: '',
																	ten_giay: '',
																	mo_ta: '',
																	id_loai_giay: 0,
																	gia_ban: 0,
																}));
															}
														})
														.catch((error) => {
															console.log(error);
														});
												}
											}
										})
										.catch((error) => {
											console.log(error);
										});
								}
							}
						})
						.catch((error) => {
							console.log(error);
						});
					setMauSac([]);
					setGiayEdittingNull();
					hideModalGiay();
				}
			}
		}
	}
	useEffect(() => {
		setData((data) => ({
			...data,
			id_g: giayEditting.id,
			ten_giay: giayEditting.ten_giay,
			mo_ta: giayEditting.mo_ta,
			id_loai_giay: giayEditting.id_loai_giay,
			gia_ban: giayEditting.gia_ban,
			date_update: Moment(date_create).format('YYYY-MM-DD HH:mm'),
		}));
		let mau = [];
		for (var i = 0; i < mausacEditting.length; i++) {
			let ms = ListMauSac.filter((item) => item.id === mausacEditting[i].id_mau_sac);
			let st = [];
			for (var j = 0; j < mausacEditting[i].size.length; j++) {
				const s = ListSize.filter((item) => item.id === mausacEditting[i].size[j].id_size);
				st.push({
					id_ct_mau_sac: mausacEditting[i].size[j].id_ct_mau_sac,
					id_size: mausacEditting[i].size[j].id_size,
					so_luong: mausacEditting[i].size[j].so_luong,
					ten_size: s[0].ten_size,
				});
			}

			mau.push({
				id: mausacEditting[i].id,
				id_giay: mausacEditting[i].id_giay,
				id_mau_sac: mausacEditting[i].id_mau_sac,
				ten_mau_sac: ms[0].ten_mau_sac,
				hinh_anh: mausacEditting[i].hinh_anh,
				size: st,
			});
		}
		setMauSac(mau);
	}, [giayEditting]);

	function handleCheckboxChange(e) {
		e.persist();
		const hero = ListMauSac[e.target.dataset.id];
		let newCheckedValues = mausac.filter((item) => item.id_mau_sac !== hero.id);

		if (e.target.checked) {
			newCheckedValues.push({
				id: 0,
				id_giay: '',
				mo_ta: '',
				id_mau_sac: ListMauSac[e.target.dataset.id].id,
				ten_mau_sac: ListMauSac[e.target.dataset.id].ten_mau_sac,
				hinh_anh: '',
				size: [],
			});
		}

		setMauSac(newCheckedValues);
	}

	function handleCheckboxChanges(e) {
		e.persist();
		const hero = getMauSac(ListMauSac, mausac)[e.target.dataset.id];
		let newCheckedValues = addMS.filter((item) => item.id_mau_sac !== hero.id);

		if (e.target.checked) {
			newCheckedValues.push({
				id: 0,
				id_giay: '',
				mo_ta: '',
				id_mau_sac: getMauSac(ListMauSac, mausac)[e.target.dataset.id].id,
				ten_mau_sac: getMauSac(ListMauSac, mausac)[e.target.dataset.id].ten_mau_sac,
				hinh_anh: '',
				size: [],
			});
		}

		setListTam(newCheckedValues);
	}

	function handleCheckboxChangeSize(e) {
		e.persist();
		const size = ListSize[e.target.dataset.idsize];
		const ms = mausac[e.target.dataset.id];
		const sizeTam = ms.size;
		let newCheckedValuesSize = sizeTam.filter((item) => item.id_size !== size.id);
		if (e.target.checked) {
			newCheckedValuesSize.push({
				id_size: size.id,
				ten_size: size.ten_size,
				so_luong: '',
			});
		}
		const datag = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [
			...mausac.slice(0, parseInt(e.target.dataset.id)),
			datag,
			...mausac.slice(parseInt(e.target.dataset.id) + 1),
		];
		setMauSac(newlist);
	}

	function handleCheckboxChangeSizes(e) {
		e.persist();
		let ms = [];
		let tam = ListTamSize;
		if (tam.length === 0) {
			let d = [];
			for (var i = 0; i < mausac.length; i++) {
				const a = {
					id: mausac[i].id,
					id_giay: mausac[i].id_giay,
					id_mau_sac: mausac[i].id_mau_sac,
					ten_mau_sac: mausac[i].ten_mau_sac,
					hinh_anh: mausac[i].hinh_anh,
					size: [],
				};
				d.push(a);
			}
			ms = d[e.target.dataset.id];
			tam = d;
		} else {
			ms = tam[e.target.dataset.id];
		}
		console.log(ms);
		const size = getSize(ListSize, mausac)[e.target.dataset.idsize];
		const sizeTam = ms.size;
		let newCheckedValuesSize = sizeTam.filter((item) => item.id_size !== size.id);
		if (e.target.checked) {
			newCheckedValuesSize.push({
				id_ct_mau_sac: ms.id,
				id_size: size.id,
				ten_size: size.ten_size,
				so_luong: '',
			});
		}
		const datag = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [...tam.slice(0, e.target.dataset.id), datag, ...tam.slice(e.target.dataset.id + 1)];
		setListTamSize(newlist);
	}
	function handleCheckboxChangeSizeAddMS(e) {
		e.persist();
		const size = ListSize[e.target.dataset.idsize];
		const ms = addMS[e.target.dataset.id];
		const sizeTam = ms.size;
		let newCheckedValuesSize = sizeTam.filter((item) => item.id_size !== size.id);
		if (e.target.checked) {
			newCheckedValuesSize.push({
				id_size: size.id,
				ten_size: size.ten_size,
				so_luong: '',
			});
		}
		const datag = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [...addMS.slice(0, e.target.dataset.id), datag, ...addMS.slice(e.target.dataset.id + 1)];
		setAddMS(newlist);
	}
	function onChangeInputSize(e) {
		e.persist();
		const size = mausac[e.target.dataset.id].size[e.target.dataset.idsizes];
		const ms = mausac[e.target.dataset.id];
		const sizeTam = ms.size;
		let newCheckedValuesSize = mausac[e.target.dataset.id].size;
		newCheckedValuesSize = [
			...sizeTam.slice(0, parseInt(e.target.dataset.idsizes)),
			{
				id_ct_mau_sac: size.id_ct_mau_sac,
				id_size: size.id_size,
				ten_size: size.ten_size,
				so_luong: parseInt(e.target.value),
			},
			...sizeTam.slice(parseInt(e.target.dataset.idsizes) + 1),
		];

		const data = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [
			...mausac.slice(0, parseInt(e.target.dataset.id)),
			data,
			...mausac.slice(parseInt(e.target.dataset.id) + 1),
		];

		setMauSac(newlist);
	}

	function onChangeInputSizeAddMS(e) {
		e.persist();
		const size = addMS[e.target.dataset.id].size[e.target.dataset.idsizes];
		const ms = addMS[e.target.dataset.id];
		const sizeTam = ms.size;
		let newCheckedValuesSize = addMS[e.target.dataset.id].size;
		newCheckedValuesSize = [
			...sizeTam.slice(0, parseInt(e.target.dataset.idsizes)),
			{
				id_ct_mau_sac: size.id_ct_mau_sac,
				id_size: size.id_size,
				ten_size: size.ten_size,
				so_luong: parseInt(e.target.value),
			},
			...sizeTam.slice(parseInt(e.target.dataset.idsizes) + 1),
		];

		const data = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [
			...addMS.slice(0, parseInt(e.target.dataset.id)),
			data,
			...addMS.slice(parseInt(e.target.dataset.id) + 1),
		];

		setAddMS(newlist);
	}

	function onChangeInputSizes(e) {
		e.persist();
		const size = addSize[e.target.dataset.id].size[e.target.dataset.idsizes];
		const ms = addSize[e.target.dataset.id];
		const sizeTam = ms.size;
		const newCheckedValuesSize = [
			...sizeTam.slice(0, parseInt(e.target.dataset.idsizes)),
			{
				id_ct_mau_sac: size.id_ct_mau_sac,
				id_size: size.id_size,
				ten_size: size.ten_size,
				so_luong: parseInt(e.target.value),
			},
			...sizeTam.slice(parseInt(e.target.dataset.idsizes) + 1),
		];

		const data = {
			id: ms.id,
			id_giay: ms.id_giay,
			id_mau_sac: ms.id_mau_sac,
			ten_mau_sac: ms.ten_mau_sac,
			hinh_anh: ms.hinh_anh,
			size: newCheckedValuesSize,
		};
		const newlist = [
			...addSize.slice(0, parseInt(e.target.dataset.id)),
			data,
			...addSize.slice(parseInt(e.target.dataset.id) + 1),
		];
		setAddSize(newlist);
	}

	function getMauSac(ListMauSacs, mausacs) {
		const msTam = [];
		for (var i = 0; i < ListMauSacs.length; i++) {
			let dem = 0;
			for (var j = 0; j < mausacs.length; j++) {
				if (ListMauSacs[i].id === mausacs[j].id_mau_sac) {
					dem++;
				}
			}
			if (addMS.length > 0) {
				for (var h = 0; h < addMS.length; h++) {
					if (ListMauSacs[i].id === addMS[h].id_mau_sac) {
						dem++;
					}
				}
			}
			if (dem === 0) {
				msTam.push(ListMauSacs[i]);
			}
		}

		return msTam;
	}
	function getSize(Listsizes, mausacs) {
		const msTam = [];
		for (var i = 0; i < Listsizes.length; i++) {
			let dem = 0;
			const sizes = mausacs[indexTam].size;

			for (var j = 0; j < sizes.length; j++) {
				if (Listsizes[i].id === sizes[j].id_size) {
					dem++;
				}
			}
			if (addSize.length > 0 && addSize[indexTam].size.length > 0) {
				const sizesAdd = addSize[indexTam].size;
				for (var h = 0; h < sizesAdd.length; h++) {
					if (Listsizes[i].id === sizesAdd[h].id_size) {
						dem++;
					}
				}
			}

			if (dem === 0) {
				msTam.push(Listsizes[i]);
			}
		}

		return msTam;
	}

	function addSizes(index) {
		for (var i = 0; i < addSize.length; i++) {
			if (addSize[i].id === mausac[index].id) {
				return i;
			}
		}
	}
	function deleteMauSacs(index) {
		setIndexTamMS(index);
		setShowDeleteMS(true);
	}
	function themMauSacGiay() {
		const { showModal, changeModalTitle, changeModalContent } = modalFormCreator;
		changeModalTitle('Thêm màu sắc');
		changeModalContent(<ComponentMauSac></ComponentMauSac>);
		showModal();
	}

	return (
		<div className=" tm-edit-product-row">
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Thêm màu sắc cho giày</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{getMauSac(ListMauSac, mausac).map((l, index) => {
						// let check = checkedMS(l);
						return (
							<div key={l.id} className="select-mausac">
								<img src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${l.hinh_anh}`} alt="" />
								<div className="title-mausacs">{l.ten_mau_sac}</div>
								<input type="checkbox" data-id={index} onClick={handleCheckboxChanges} />
							</div>
						);
					})}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={closeDidalog}>
						Đồng ý
					</Button>
				</Modal.Footer>
			</Modal>
			{indexTamMS !== -1 ? (
				<Modal show={showDeleteMS} onHide={handleCloseDeleteMS} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Thông báo</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{`Bạn có chắc muốn xóa màu sắc ${mausac[indexTamMS].ten_mau_sac} của giày ${data.ten_giay}`}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleCloseDeleteMS}>
							không
						</Button>
						<Button variant="primary" onClick={closeDidalogDeleteMS}>
							Đồng ý
						</Button>
					</Modal.Footer>
				</Modal>
			) : (
				<div></div>
			)}
			{showSize === true ? (
				<Modal show={showSize} onHide={handleCloseSize} backdrop="static" keyboard={false}>
					<Modal.Header>
						<Modal.Title>Thêm Size</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{getSize(ListSize, mausac).map((l, index) => {
							// let check = checkedMS(l);
							return (
								<div key={index} className="select-mausacs">
									<div className="title-mausacss">{l.ten_size}</div>
									<input
										type="checkbox"
										data-id={indexTam}
										data-idsize={index}
										onClick={handleCheckboxChangeSizes}
									/>
								</div>
							);
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={closeDidalogSize}>
							Đồng ý
						</Button>
					</Modal.Footer>
				</Modal>
			) : (
				<div></div>
			)}
			<Modal show={shownd} onHide={closeDidalognd} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Thông báo</Modal.Title>
				</Modal.Header>
				<Modal.Body>{nd}</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={closeDidalognd}>
						Đồng ý
					</Button>
				</Modal.Footer>
			</Modal>
			<form className=" tm-edit-product-form" onSubmit={handleSubmit}>
				<div className="col-xl-12 col-lg-12 col-md-12">
					<div className="form-group">
						<label> Mã loại giày </label>
						<input
							id="id_g"
							name="id_g"
							type="text"
							readOnly={giayEditting.id ? true : false}
							value={id_g}
							className="form-control validate"
							onChange={(e) => onChangeInput(e)}
						/>
						{errors.id_g && <p className="error">{errors.id_g}</p>}
					</div>
					<div className="form-group">
						<label> Tên loại giày </label>
						<input
							id="ten_giay"
							name="ten_giay"
							type="text"
							value={ten_giay}
							className="form-control validate"
							onChange={(e) => onChangeInput(e)}
						/>
						{errors.ten_giay && <p className="error">{errors.ten_giay}</p>}
					</div>
					<div className="form-group">
						<label> Mô tả </label>
						<textarea
							id="mo_ta"
							name="mo_ta"
							value={mo_ta}
							className="form-control validate"
							rows="3"
							onChange={(e) => onChangeInput(e)}
						></textarea>
						{errors.mo_ta && <p className="error">{errors.mo_ta}</p>}
					</div>
					<div className="form-group">
						<label>Giá bán </label>
						<input
							type="number"
							id="gia_ban"
							name="gia_ban"
							value={gia_ban}
							className="form-control validate"
							onChange={(e) => onChangeInput(e)}
						/>
						{errors.gia_ban && <p className="error">{errors.gia_ban}</p>}
					</div>
					<div className="form-group">
						<label> Thương hiệu </label>
						<select
							onChange={(e) => onchangeSelect(e)}
							className="custom-select tm-select-accounts"
							id="category"
							value={id_loai_giay}
						>
							<option value={0}> </option>
							{ListLoaiGiay.map((l, index) => {
								return (
									<option key={l.id} value={l.id}>
										{l.ten_loai_giay}
									</option>
								);
							})}
						</select>
						{errors.id_loai_giay && <p className="error">{errors.id_loai_giay}</p>}
					</div>

					<div className="row">
						<div className="title-mausac">
							<div className="title">thêm màu sắc và size cho giày</div>
							<div className="add-mausac">
								<button type="button" onClick={themMauSacGiay}>
									Thêm màu sắc
								</button>
							</div>
						</div>
						{!giayEditting.id ? (
							<div className="padding-null col-xl-12 col-lg-12 col-md-12 mx-auto mb-4">
								<div className="form-group mb-3">
									<div className="all-mausac">
										{ListMauSac.map((l, index) => {
											// let check = checkedMS(l);
											return (
												<div key={l.id} className="select-mausac">
													<img
														src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${l.hinh_anh}`}
														alt=""
													/>
													<div className="title-mausacs">{l.ten_mau_sac}</div>
													<input
														type="checkbox"
														data-id={index}
														// checked={check}
														onClick={handleCheckboxChange}
													/>
												</div>
											);
										})}
									</div>
									{errorsMS.mau_sac && <p className="error">{errorsMS.mau_sac}</p>}
								</div>
							</div>
						) : (
							<Button variant="primary" onClick={handleShow}>
								{`Lựa chọn màu sắc thêm cho giày ${data.ten_giay}`}
							</Button>
						)}
						<div className="padding-null col-xl-12 col-lg-12 col-md-12 mx-auto mb-4">
							<div className="form-group mb-3">
								{mausac.length > 0 ? (
									mausac.map((l, index) => {
										return (
											<div key={index} className="border-mausac col-xl-12 col-lg-12 col-md-12">
												<div className="name-mausac">
													<div className="name-ms">{l.ten_mau_sac}</div>
													{giayEditting.id ? (
														<CloseIcon
															className="iconCLoseMS"
															onClick={() => deleteMauSacs(index)}
														></CloseIcon>
													) : (
														<div></div>
													)}
												</div>
												<div key={index} className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
														{!giayEditting.id ? (
															<div className="form-group mb-3">
																<div className="all-mausac">
																	{ListSize.map((l, indexs) => {
																		// let checkS = checkedS(l, index);
																		return (
																			<div key={l.id} className="select-mausac">
																				<div className="title-mausacs">
																					{l.ten_size}
																				</div>

																				<input
																					type="checkbox"
																					data-id={index}
																					data-idsize={indexs}
																					onClick={handleCheckboxChangeSize}
																				/>
																			</div>
																		);
																	})}
																</div>
															</div>
														) : (
															<Button
																variant="primary"
																onClick={() => handleShowSize(index)}
															>
																Thêm size
															</Button>
														)}
														{mausac[index].size.length > 0 ? (
															<div className="form-group mb-3">
																<div className="all-size">
																	{mausac[index].size.map((l, indexss) => {
																		return (
																			<div key={indexss}>
																				<div className="select-size">
																					<div className="title-sizes">
																						Size: {l.ten_size}
																					</div>
																					<div className="form-group mb-3 size-soluong">
																						<label>Số lượng</label>
																						<input
																							id="so_luong"
																							name="so_luong"
																							type="number"
																							data-id={index}
																							data-idsizes={indexss}
																							value={
																								mausac[index].size[
																									indexss
																								].so_luong
																							}
																							className="form-control validate"
																							onChange={(e) =>
																								onChangeInputSize(e)
																							}
																						/>
																					</div>
																				</div>
																			</div>
																		);
																	})}
																	{addSize.length > 0 ? (
																		addSize[addSizes(index)].size.map(
																			(ll, indexss) => {
																				return (
																					<div
																						key={indexss + 10}
																						className="select-size"
																					>
																						<div className="title-sizes">
																							Size:
																							{ll.ten_size}
																						</div>
																						<div className="form-group mb-3 size-soluong">
																							<label>Số lượng</label>
																							<input
																								id="so_luong"
																								name="so_luong"
																								type="number"
																								data-id={addSizes(
																									index
																								)}
																								data-idsizes={indexss}
																								value={ll.so_luong}
																								className="form-control validate"
																								onChange={(e) =>
																									onChangeInputSizes(
																										e
																									)
																								}
																							/>
																						</div>
																					</div>
																				);
																			}
																		)
																	) : (
																		<div></div>
																	)}
																</div>
															</div>
														) : (
															<div></div>
														)}
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
														<div className="title-hinhanh">
															Lựa chọn hình ảnh cho màu sắc
															{` ${mausac[index].ten_mau_sac}`}
														</div>
														<div className="tm-product-img-dummy">
															{!mausac[index].hinh_anh ? (
																<i className="fas fa-cloud-upload-alt tm-upload-icon"></i>
															) : (
																<Carousel
																	nextIcon={
																		<span className="glyphicon glyphicon-glass">
																			<NavigateNextIcon className="iconCoursel"></NavigateNextIcon>
																		</span>
																	}
																	prevIcon={
																		<span className="glyphicon-pre glyphicon-glass">
																			<NavigateBeforeIcon className="iconCoursel"></NavigateBeforeIcon>
																		</span>
																	}
																>
																	{imageArray(mausac[index].hinh_anh).map(
																		(l, indexImage) => {
																			return (
																				<Carousel.Item key={indexImage}>
																					<img
																						className="d-block w-100"
																						src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${l}`}
																						alt=""
																					/>
																				</Carousel.Item>
																			);
																		}
																	)}
																</Carousel>
																// <img
																// 	src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${data.hinh_anh}`}
																// ></img>
															)}
														</div>
														{/* {errors.hinh_anh && <p className="error"> {errors.hinh_anh} </p>} */}
														<div className="custom-file mt-3 mb-3">
															<input
																type="file"
																name="file"
																accept="image/*"
																data-id={index}
																multiple
																onChange={(e) => handleChange(e)}
															/>
															<button
																type="button"
																className="btn btn-primary btn-block text-uppercase add_type"
																onClick={() => onUpload(index)}
															>
																Upload
															</button>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<div></div>
								)}
							</div>
						</div>
						<div className="padding-null col-xl-12 col-lg-12 col-md-12 mx-auto mb-4">
							<div className="form-group mb-3">
								{addMS.length > 0 ? (
									addMS.map((l, index) => {
										return (
											<div key={index} className="border-mausac col-xl-12 col-lg-12 col-md-12">
												<div className="name-mausac">{l.ten_mau_sac}</div>
												<div key={index} className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
														<div className="form-group mb-3">
															<div className="all-mausac">
																{ListSize.map((l, indexs) => {
																	// let checkS = checkedS(l, index);
																	return (
																		<div key={l.id} className="select-mausac">
																			<div className="title-mausacs">
																				{l.ten_size}
																			</div>
																			<input
																				type="checkbox"
																				data-id={index}
																				data-idsize={indexs}
																				onClick={handleCheckboxChangeSizeAddMS}
																			/>
																		</div>
																	);
																})}
															</div>
														</div>
														{addMS[index].size.length > 0 ? (
															<div className="form-group mb-3">
																<div className="all-size">
																	{addMS[index].size.map((l, indexss) => {
																		return (
																			<div key={indexss} className="select-size">
																				<div className="title-sizes">
																					Size: {l.ten_size}
																				</div>
																				<div className="form-group mb-3 size-soluong">
																					<label>Số lượng</label>
																					<input
																						id="so_luong"
																						name="so_luong"
																						type="number"
																						data-id={index}
																						data-idsizes={indexss}
																						value={
																							addMS[index].size[indexss]
																								.so_luong
																						}
																						className="form-control validate"
																						onChange={(e) =>
																							onChangeInputSizeAddMS(e)
																						}
																					/>
																				</div>
																			</div>
																		);
																	})}
																</div>
															</div>
														) : (
															<div></div>
														)}
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
														<div className="title-hinhanh">
															Lựa chọn hình ảnh cho màu sắc
															{` ${addMS[index].ten_mau_sac}`}
														</div>
														<div className="tm-product-img-dummy">
															{!addMS[index].hinh_anh ? (
																<i className="fas fa-cloud-upload-alt tm-upload-icon"></i>
															) : (
																<Carousel
																	nextIcon={
																		<span className="glyphicon glyphicon-glass">
																			<NavigateNextIcon className="iconCoursel"></NavigateNextIcon>
																		</span>
																	}
																	prevIcon={
																		<span className="glyphicon-pre glyphicon-glass">
																			<NavigateBeforeIcon className="iconCoursel"></NavigateBeforeIcon>
																		</span>
																	}
																>
																	{imageArray(addMS[index].hinh_anh).map(
																		(l, indexImage) => {
																			return (
																				<Carousel.Item key={indexImage}>
																					<img
																						className="d-block w-100"
																						src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${l}`}
																						alt=""
																					/>
																				</Carousel.Item>
																			);
																		}
																	)}
																</Carousel>
																// <img
																// 	src={`https://do-an-tot-nghiep-98.herokuapp.com/images/${data.hinh_anh}`}
																// ></img>
															)}
														</div>
														{/* {errors.hinh_anh && <p className="error"> {errors.hinh_anh} </p>} */}
														<div className="custom-file mt-3 mb-3">
															<input
																type="file"
																name="file"
																accept="image/*"
																data-id={index}
																multiple
																onChange={(e) => handleChange(e)}
															/>
															<button
																type="button"
																className="btn btn-primary btn-block text-uppercase add_type"
																onClick={() => onUploadAddMS(index)}
															>
																Upload
															</button>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<div></div>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="col-12">
					<button type="submit" className="btn btn-primary btn-block text-uppercase add_type">
						thực hiện
					</button>
				</div>
			</form>
		</div>
	);
}

// Component_type.propTypes = {
// 	loagiayCreator: PropTypes.func,
// };

// Component_type.defaultProps = {
// 	loagiayCreator: null,
// };

const mapDispatchToProps = (dispatch) => {
	return {
		loagiayCreator: bindActionCreators(loaigiayAction, dispatch),
		modalFormCreator: bindActionCreators(modalAction, dispatch),
		createMauSac: bindActionCreators(mausacAction, dispatch),
		createGiay: bindActionCreators(actionGiay, dispatch),
		createModal: bindActionCreators(modalAction, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListLoaiGiay: state.loaigiay.ListLoaiGiay,
		ListGiay: state.giay.ListGiay,
		loaiGiayEditting: state.loaigiay.loaiGiayEditting,
		ListMauSac: state.mausac.ListMauSac,
		ListSize: state.size.ListSize,
		giayEditting: state.giay.giayEditting,
		mausacEditting: state.giay.mausacEditting,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component_type);
