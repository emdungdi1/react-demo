import React, { useEffect, useState } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionModal from './../../actions/modal';
import * as apiImage from './../../contants/index';
import { Link } from 'react-router-dom';
// import * as apiDatHang from './../../api/dat_hang';
function ModalProduct(props) {
	const { showmodal, CreateModal, token } = props;
	const { hideModal, setterToken } = CreateModal;
	const [data, setData] = useState();
	let t = 0;
	useEffect(() => {
		setData(token);
	}, [token]);
	function hidaModals() {
		hideModal();
	}

	function onChangeSelectQuantity(id, e) {
		e.persist();
		const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
		if (rx_live.test(e.target.value)) {
			const i = data.findIndex((item) => item.id_giay === id);
			const dataTamToken = data[i];
			dataTamToken.soluong = e.target.value;
			if (i !== -1) {
				const newlist = [...data.slice(0, i), dataTamToken, ...data.slice(i + 1)];
				setterToken(newlist);
				localStorage.setItem('product', JSON.stringify(newlist));
				setData(newlist);
			}
		}
	}

	function handleQuantity(id, d) {
		const i = data.findIndex((item) => item.id_giay === id);
		const dataTamToken = data[i];
		dataTamToken.soluong = parseInt(d) + parseInt(data[i].soluong);
		if (i !== -1) {
			const newlist = [...data.slice(0, i), dataTamToken, ...data.slice(i + 1)];
			setterToken(newlist);
			localStorage.setItem('product', JSON.stringify(newlist));
			setData(newlist);
		}
	}
	function deleteProduct(id) {
		const i = data.findIndex((item) => item.id_giay === id);

		if (i !== -1) {
			const newlist = [...data.slice(0, i), ...data.slice(i + 1)];
			setData(newlist);
			localStorage.setItem('product', JSON.stringify(newlist));
			setData(newlist);
		}
	}

	function submit() {}
	return (
		<div className={showmodal ? `product-modal` : `product-modal product-modal__block`}>
			<form onSubmit={submit}>
				<div className="product-modal__all">
					<div className="background-modal" onClick={hidaModals}></div>
					<div className="modal-add">
						<div className="modal-all">
							<div className="container">
								<i aria-hidden="true" className="close_product fa fa-times" onClick={hidaModals}></i>
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
								{data ? (
									data.map((i, index) => {
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
																<div
																	className="productGH-delete"
																	onClick={() => deleteProduct(i.id_giay)}
																>
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
														<div className="select-btn">
															<span
																className="select-btn__minus"
																onClick={(e) => handleQuantity(i.id_giay, -1)}
															>
																-
															</span>
															<input
																type="text"
																value="10"
																pattern="[+-]?\d+(?:[.,]\d+)?"
																name="soluong"
																className="select-btn_quantity"
																value={i.soluong}
																onChange={(e) => onChangeSelectQuantity(i.id_giay, e)}
															/>
															<span
																className="select-btn__plus"
																onClick={(e) => handleQuantity(i.id_giay, 1)}
															>
																+
															</span>
														</div>
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
								<div className="price-all">
									<div className="continue-product" onClick={hidaModals}>
										Tiếp tục mua hàng
									</div>
									<div className="price-all__price">
										{`${t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}₫
									</div>
								</div>
								<div className="btn-mua btnsold">
									<Link
										to="/DatHang"
										className="btn btn-lg btn-gray btn-cart btn_buy add_to_cart"
										// disabled="disabled"
										onClick={hidaModals}
									>
										<span className="txt-main">Thanh toán</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		CreateModal: bindActionCreators(ActionModal, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		showmodal: state.modal.showmodal,
		token: state.modal.token,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
