import React, { useState, useEffect } from 'react';
import './index.scss';
import * as ActionModal from './../../../actions/modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import * as apiImage from './../../../contants/index';
import { Link } from 'react-router-dom';
import useform from './useForm/useForm';
import validate from './validateForm/validateForm';
import * as apiSize from './../../../api/chi_tiet_size';
import * as apiDH from './../../../api/dat_hang';
import * as apiCDH from './../../../api/ct_don_hang';
import * as apiCTS from './../../../api/chi_tiet_size';
import { useHistory } from 'react-router-dom';
function DatHang(props) {
	const history = useHistory();
	const { onChangeInput, handleSubmit, data, setData, errors } = useform(submit, validate);
	const { token, CreateModal } = props;
	const { setterToken } = CreateModal;
	const [dataSize, setDataSize] = useState([]);
	var t = 0;
	function submit() {
		apiDH
			.Them(data)
			.then((response) => {
				if (response.status === 200) {
					var id = response.data.data.insertId;
					token.map((i, index) => {
						var tam = dataSize;
						apiCDH
							.Them({
								id_giay: i.id_giay,
								id_dat_hang: id,
								so_luong: i.soluong,
								tong_tien: parseInt(i.soluong) * parseInt(i.gia_ban),
								id_chi_tiet_mau_sac: dataSize[index].id_ct_mau_sac,
							})
							.then((response) => {
								if (response.status === 200) {
									var sl = parseInt(dataSize[index].so_luong) - parseInt(i.soluong);
									apiCTS
										.update({
											id_ct_mau_sac: dataSize[index].id_ct_mau_sac,
											id_size: dataSize[index].id_size,
											so_luong: sl,
										})
										.then((response) => {
											if (response.status === 200) {
												localStorage.removeItem('product');
												setterToken([]);
												history.push('/');
											}
										})
										.catch((error) => {
											console.log(error);
										});
								}
							})
							.catch((error) => {
								console.log(error);
							});
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		const tokenss = localStorage.getItem('tokenTC');
		const product = JSON.parse(localStorage.getItem('product'));
		if (tokenss) {
			try {
				var decoded = jwt.verify(tokenss, 'qwe1234');
				if (decoded.result) {
					setData((data) => ({
						...data,
						id_khach_hang: decoded.result.id,
					}));
				}
			} catch (err) {
				// err
			}

			token.map((i) => {
				var d = dataSize;
				apiSize
					.getSize({ id_giay: i.id_giay, id_mau_sac: i.id_mau_sac, id_size: i.id_size })
					.then((response) => {
						if (response.data.success === 1) {
							if (response.data) {
								d.push(response.data.data[0]);
								setDataSize(d);
							}
						} else {
						}
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
	}, [token]);

	if (token) {
		return (
			<div className="dathang">
				<div className="modal-all">
					<div className="container">
						<div className="modal-add__header">GIỎ HÀNG CỦA BẠN </div>
						<div className="modal-table">
							<div className="row">
								<div className="col-md-6 col-xs-12">
									<div className="modal-table__header">Sản phẩm</div>
								</div>
								<div className="col-md-2 col-xs-12">
									<div className="modal-table__header">Đơn giá</div>
								</div>
								<div className="col-md-2 col-xs-12">
									<div className="modal-table__header">Số lượng</div>
								</div>
								<div className="col-md-2 col-xs-12">
									<div className="modal-table__header">Thành tiền</div>
								</div>
							</div>
						</div>
						{token ? (
							token.map((i, index) => {
								t += i.soluong * i.gia_ban;

								return (
									<div key={index + 1} className="modal-list">
										<div className="row">
											<div className="col-md-6 col-xs-12">
												<div className="modal-product">
													<div className="modal-product__image">
														<img
															src={`${apiImage.API_ENPOINT}/images/${i.hinh_anh}`}
															alt=""
														/>
													</div>
													<div className="productGH">
														<div className="productGH-name">{i.ten_giay}</div>
														<div className="productGH-fast">{`${i.ten_mau_sac}/${i.ten_size}`}</div>
														<div className="productGH-delete">
															<i className="fa fa-times" aria-hidden="true"></i>
															<span>Bỏ sản phẩm này</span>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-2 col-xs-12 flex-modle__title">
												<div className="title_block">Đơn giá:</div>
												<div className="modal-price">{`${i.gia_ban
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}</div>
											</div>
											<div className="col-md-2 col-xs-12 flex-modle__title">
												<div className="title_block">Số lượng:</div>
												<span>{i.soluong}</span>
											</div>
											<div className="col-md-2 col-xs-12 flex-modle__title">
												<div className="title_block">Thành tiền:</div>
												<div className="modal-priceAll">
													{(parseInt(i.soluong) * parseInt(i.gia_ban))
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
													₫
												</div>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div></div>
						)}
						<div className="hr"></div>
					</div>
				</div>

				<div className="thkh">
					<div className="container">
						<div className="main-header">Thông tin nhận hàng</div>
						<div className="main-form">
							<div className="row">
								<form action="" onSubmit={handleSubmit}>
									<div className="col-sm-12">
										<input
											type="text"
											value={data.email}
											placeholder="email"
											name="email"
											onChange={onChangeInput}
										/>
										{errors.email && <p className="error"> {errors.email} </p>}
									</div>
									<div className="col-sm-12">
										<input
											type="text"
											value={data.ten_nguoi_nhan}
											placeholder="Tên người nhận"
											name="ten_nguoi_nhan"
											onChange={onChangeInput}
										/>
										{errors.ten_nguoi_nhan && <p className="error"> {errors.ten_nguoi_nhan} </p>}
									</div>
									<div className="col-sm-12">
										<input
											type="text"
											value={data.sdt_nguoi_nhan}
											placeholder="Số điện thoại"
											name="sdt_nguoi_nhan"
											onChange={onChangeInput}
										/>
										{errors.sdt_nguoi_nhan && <p className="error"> {errors.sdt_nguoi_nhan} </p>}
									</div>
									<div className="col-sm-12">
										<input
											type="text"
											value={data.dia_chi_nguoi_nhan}
											placeholder="Địa chỉ"
											name="dia_chi_nguoi_nhan"
											onChange={onChangeInput}
										/>
										{errors.dia_chi_nguoi_nhan && (
											<p className="error"> {errors.dia_chi_nguoi_nhan} </p>
										)}
									</div>
									<div className="col-sm-12">
										<div className="btn-mua btnsold">
											<button
												type="submit"
												data-role="addtocart"
												className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
												// disabled="disabled"
											>
												<span className="txt-main">Đặt hàng</span>
											</button>
										</div>
									</div>
									<div className="col-sm-12 mt-3">
										<div className="centen-button">
											<Link to="/" className="btn_dangky">
												Về trang chủ
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <div>s</div>;
	}
}

DatHang.propTypes = {};

const mapDispatchToProps = (dispatch) => {
	return {
		CreateModal: bindActionCreators(ActionModal, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		token: state.modal.token,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DatHang);
