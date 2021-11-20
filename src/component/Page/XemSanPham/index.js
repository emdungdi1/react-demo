import React, { useState, useEffect } from 'react';
import * as giayAPI from './../../../api/giay';
import './index.scss';
import SelectSize from './select_Size/index';
import SelectFast from './select_Fast/index';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import * as apiImage from './../../../contants/index';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionModal from './../../../actions/modal';
import { useHistory } from 'react-router-dom';
function XemSanPham(props) {
	const { CreateModal } = props;
	const history = useHistory();
	const [data, setData] = useState({});
	const [dataTam, setDataTam] = useState([]);
	const [dataTamAll, setDataTamAll] = useState([]);
	const [dataSubmit, setDataSubmit] = useState({
		id_giay: '',
		ten_giay: '',
		gia_ban: 0,
		id_size: 0,
		ten_size: 0,
		id_mau_sac: 0,
		ten_mau_sac: '',
		soluong: 0,
		hinh_anh: '',
		soluong_con: 0,
	});
	const [mausac, setMausac] = useState([]);
	useEffect(() => {
		if (props.match.params) {
			function fetchPostsLists() {
				if (props.match.params.th) {
					giayAPI
						.xemSanPham({
							id: props.match.params.th,
						})
						.then((res) => {
							const { data } = res;
							if (res.status === 200) {
								setDataTam(data.data);
								giayAPI
									.xemSanPhamAll({
										id: props.match.params.th,
									})
									.then((resP) => {
										const dataAll = resP.data;
										if (resP.status === 200) {
											setDataTamAll(dataAll.data);
										}
									});
							}
						});
				}
			}

			fetchPostsLists();
		}
		return () => (setDataTam([]), setDataTamAll([]));
	}, [props.match.params]);

	useEffect(() => {
		let current = true;
		if (dataTam.length > 0 && dataTamAll.length > 0) {
			let dataTLG = [];
			dataTam.forEach((giay) => {
				const mauTam = [];
				const filterMS = dataTamAll.filter((it) => it.id_giay === giay.id);
				filterMS.forEach((i) => {
					const s = dataTamAll.filter((item) => item.id === i.id);
					if (mauTam.length > 0) {
						let dem = 0;
						mauTam.forEach((ms) => {
							if (ms.id === i.id) {
								dem++;
							}
						});
						if (dem === 0) {
							const m = {
								id: i.id,
								id_giay: i.id_giay,
								id_mau_sac: i.id_mau_sac,
								hinh_anh: i.hinh_anh,
								ten_mau_sac: i.ten_mau_sac,
								size: s,
							};
							mauTam.push(m);
						}
					} else if (mauTam.length === 0) {
						const m = {
							id: i.id,
							id_giay: i.id_giay,
							id_mau_sac: i.id_mau_sac,
							hinh_anh: i.hinh_anh,
							ten_mau_sac: i.ten_mau_sac,
							size: s,
						};
						mauTam.push(m);
					}
				});
				const g = {
					id: giay.id,
					ten_giay: giay.ten_giay,
					mo_ta: giay.mo_ta,
					id_loai_giay: giay.id_loai_giay,
					gia_ban: giay.gia_ban,
					gia_ban_khuyen_mai: giay.gia_ban_khuyen_mai,
					trang_thai: giay.trang_thai,
					mausac: mauTam,
				};
				dataTLG.push(g);
			});
			setData(dataTLG);
			if (dataTLG.length > 0) {
				const d = dataTLG[0].mausac[0].hinh_anh.split(',');
				setDataSubmit((dataSubmit) => ({
					...dataSubmit,
					id_giay: dataTLG[0].id,
					ten_giay: dataTLG[0].ten_giay,
					gia_ban: dataTLG[0].mausac[0].size[0].gia_ban,
					id_size: dataTLG[0].mausac[0].size[0].id_size,
					ten_size: dataTLG[0].mausac[0].size[0].ten_size,
					soluong_con: dataTLG[0].mausac[0].size[0].so_luong,
					id_mau_sac: dataTLG[0].mausac[0].id_mau_sac,
					ten_mau_sac: dataTLG[0].mausac[0].ten_mau_sac,
					soluong: 1,
					hinh_anh: d[0],
				}));
			}
		}

		return () => (current = false);
	}, [dataTam, dataTamAll]);

	function handleSubmit(e) {
		e.preventDefault();
	}
	function fast_select(datas) {
		const m = data[0].mausac.filter((arr, index) => arr.id_mau_sac === datas.id_mau_sac);
		if (m.length > 0) {
			const d = m[0].hinh_anh.split(',');
			let arr = [];
			for (var i = 0; i < d.length; i++) {
				arr.push(d[i]);
			}
			setMausac(arr);
			setDataSubmit((dataSubmit) => ({
				...dataSubmit,
				id_mau_sac: datas.id_mau_sac,
				ten_mau_sac: datas.ten_mau_sac,
				id_size: data[0].mausac[0].size[0].id,
				ten_size: data[0].mausac[0].size[0].ten_size,
				hinh_anh: d[0],
			}));
		}
	}
	function selectSizes(data) {
		setDataSubmit((dataSubmit) => ({
			...dataSubmit,
			id_size: data.id_size,
			ten_size: parseInt(data.ten_size),
			gia_ban: data.gia_ban,
			soluong_con: data.soluong,
		}));
	}
	function handleQuantity(d) {
		if (parseInt(d) + parseInt(dataSubmit.soluong) > 0) {
			setDataSubmit((dataSubmit) => ({
				...dataSubmit,
				soluong: parseInt(d) + parseInt(dataSubmit.soluong),
			}));
		}
	}
	function onChangeSelectQuantity(e) {
		e.persist();
		const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
		if (rx_live.test(e.target.value)) {
			setDataSubmit((dataSubmit) => ({
				...dataSubmit,
				soluong: e.target.value,
			}));
		}
	}

	useEffect(() => {
		if (data.length > 0) {
			const m = data[0].mausac.filter((arr, index) => arr.id_mau_sac === dataSubmit.id_mau_sac);
			if (m.length > 0) {
				const d = m[0].hinh_anh.split(',');
				let arr = [];
				for (var i = 0; i < d.length; i++) {
					arr.push(d[i]);
				}
				setMausac(arr);
			}
		}
	}, [data, dataSubmit]);
	function showModals() {
		const { setterToken } = CreateModal;
		var token = localStorage.getItem('tokenTC');
		if (token) {
			const dd = JSON.parse(localStorage.getItem('product'));
			const gb = dataSubmit.gia_ban;
			const sl = dataSubmit.soluong;
			let d = [];
			var dataTamToken = dataSubmit;
			dataTamToken.tongtien = gb * sl;

			if (dd) {
				let tam = [];
				tam = dd.filter((item) => {
					return item.id_giay === dataTamToken.id_giay;
				});

				if (tam.length > 0) {
					const i = dd.findIndex((item) => item.id_giay === dataTamToken.id_giay);
					dataTamToken.soluong = parseInt(dataTamToken.soluong) + parseInt(tam[0].soluong);
					if (i !== -1) {
						const newlist = [...dd.slice(0, i), dataTamToken, ...dd.slice(i + 1)];

						d = newlist;
					}
				} else {
					d = dd;
					d.push(dataTamToken);
				}
			} else {
				d.push(dataTamToken);
			}

			localStorage.setItem('product', JSON.stringify(d));
			setterToken(d);
			const { showModal } = CreateModal;
			showModal();
		} else {
			history.push('/DangNhap');
		}
	}
	if (mausac.length > 0) {
		return (
			<div className="xem_san_pham">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
							<OwlCarousel items={1} className="owl-theme" loop nav margin={8}>
								{mausac.length > 0 ? (
									mausac.map((item, index) => {
										return (
											<Link key={index + 1} to="/SanPhamMoi" className="title-hp">
												<div className="one-procut">
													<div className="width-image">
														<img
															className="img"
															src={`${apiImage.API_ENPOINT}/images/${item}`}
														/>
													</div>
												</div>
											</Link>
										);
									})
								) : (
									<div>sss</div>
								)}
							</OwlCarousel>
						</div>
						<div className="col-xs-12 col-sm-6 col-lg-6 col-md-6">
							<div className="watch-product">
								<div className="watch-product__name">
									CAPTOE BROGUES OXFORD - LIMITED EDITION - OF21
								</div>
								<div className="watch-product__price mt-3">
									<div className="select-fast__modify">Giá bán:</div>
									<span className="select-fast__modify ml-2">
										{`${dataSubmit.gia_ban.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}₫
									</span>
								</div>
								<div className="watch-product__price mt-3">
									<div className="select-fast__modify">Số lượng còn:</div>
									<span className="select-fast__modify ml-2">{`${dataSubmit.soluong_con}`}</span>
								</div>
								<div className="form_watch  mt-3">
									<form onSubmit={handleSubmit}>
										{dataSubmit.id_size !== 0 ? (
											<SelectSize
												dataSubmits={dataSubmit}
												arrSize={data.length > 0 ? data[0].mausac[0].size : []}
												selectSizes={selectSizes}
											></SelectSize>
										) : (
											<div></div>
										)}

										{dataSubmit.id_mau_sac !== 0 ? (
											<SelectFast
												dataSubmits={dataSubmit}
												fast_select={fast_select}
												arrFast={data.length > 0 ? data[0].mausac : []}
											></SelectFast>
										) : (
											<div></div>
										)}
										<div className="select-quantity mt-3">
											<div className="select-quantity__header">số lượng:</div>
											<div className="select-btn">
												<span className="select-btn__minus" onClick={() => handleQuantity(-1)}>
													-
												</span>
												<input
													type="text"
													value={dataSubmit.soluong}
													pattern="[+-]?\d+(?:[.,]\d+)?"
													name="soluong"
													className="select-btn_quantity"
													onChange={onChangeSelectQuantity}
												/>
												<span className="select-btn__plus" onClick={() => handleQuantity(1)}>
													+
												</span>
											</div>
										</div>
										<div className="clearfix form-group mt-3">
											<div className="btn-mua btnsold">
												<button
													type="submit"
													data-role="addtocart"
													className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
													// disabled="disabled"
													onClick={showModals}
												>
													<span className="txt-main">
														<i className="fa fa-cart-arrow-down padding-right-10"></i> Thêm
														vào giỏ hàng
													</span>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		CreateModal: bindActionCreators(ActionModal, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		showmodal: state.modal.showmodal,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(XemSanPham);
