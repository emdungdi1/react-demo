import React, { useEffect, useState } from 'react';
import './homePage.scss';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionLoaiGiay from './../../../actions/loai_giay';
import * as actionGiay from './../../../actions/giay';
import * as apiGiay from './../../../api/giay';
import * as apiImage from './../../../contants/index';
function TrangChu(props) {
	const { createActionNP, ListGiay, CreateActionLoaiGiay, ListLoaiGiay, giayNP, mausacNP } = props;
	const { setDataByLG, fetchListNewProductRequest, fetchListGiayRequest } = createActionNP;
	const { fetchListLoaiGiayRequest } = CreateActionLoaiGiay;
	const [dataLGS, setDataLGS] = useState([]);

	useEffect(() => {
		let current = true;
		(async () => {
			async function fetchPostsList() {
				await fetchListNewProductRequest();
				await fetchListLoaiGiayRequest();
				await fetchListGiayRequest();
				apiGiay.getProductLG().then((res) => {
					const { data } = res;
					if (res.status === 200) {
						setDataLGS(data.data);
					}
				});
			}
			await fetchPostsList();
		})();

		return () => (current = false);
	}, []);
	useEffect(() => {
		const dataTLG = [];
		(async () => {
			async function fetchPostsLists() {
				if (ListLoaiGiay.length > 0) {
				}
			}
			await fetchPostsLists();
			await setDataByLG(dataTLG);
		})();
	}, [ListLoaiGiay]);
	return (
		<div className="homePage">
			<div className="container">
				<div className="newProduct">
					<div className="title-newProdcut">
						<Link to="/SanPhamMoi" className="title-hp">
							Sản Phẩm mới
						</Link>
					</div>
					<OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
						{giayNP.length > 0 ? (
							giayNP.map((item, index) => {
								const data = mausacNP.filter((i) => i.id_giay === item.id);
								const d = data[0].hinh_anh.split(',');
								let arr = [];
								for (var i = 0; i < d.length; i++) {
									arr.push(d[i]);
								}
								return (
									<Link key={item.id} to={`/XemSamPham/${item.id}`} className="title-hp">
										<div className="one-procut">
											<div className="width-image">
												<img className="img" src={`${apiImage.API_ENPOINT}/images/${arr[0]}`} />
											</div>

											<div className="name-price">
												<div className="name-product">{data[0].ten_giay}</div>
												<div className="price-product">
													{`${data[0].gia_ban
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
												</div>
											</div>
										</div>
									</Link>
								);
							})
						) : (
							<div></div>
						)}
					</OwlCarousel>

					<div className="center-button">
						<Link to="/SanPhamMoi" title="Xem tất cả  SẢN PHẨM MỚI " className="evo-button mobile-viewmore">
							Xem tất cả . <strong>SẢN PHẨM MỚI</strong>
						</Link>
					</div>
				</div>
				<div className="th-prodcut">
					{ListLoaiGiay.length > 0 && dataLGS.length > 0 && ListGiay.length > 0 ? (
						ListLoaiGiay.map((item, index) => {
							const dataGiay = ListGiay.filter((iG) => iG.id_loai_giay === item.id);
							const dataTLG = [];
							dataGiay.forEach((giay) => {
								const mauTam = [];
								const filterMS = dataLGS.filter((it) => it.id_giay === giay.id);
								filterMS.forEach((i) => {
									const s = dataLGS.filter((item) => item.id === i.id);
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
							return (
								<div key={item.id} className="newProduct">
									<div className="title-newProdcut">
										<Link to="/SanPhamMoi" className="title-hp">
											{item.ten_loai_giay}
										</Link>
									</div>
									<OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
										{dataTLG.length > 0 && dataTLG[0].mausac.length > 0 ? (
											dataTLG.map((m, index) => {
												const d = m.mausac[0].hinh_anh.split(',');
												let arr = [];
												for (var i = 0; i < d.length; i++) {
													arr.push(d[i]);
												}
												return (
													<Link
														key={index + 1}
														to={`/XemSamPham/${m.id}`}
														className="title-hp"
													>
														<div className="one-procut">
															<div className="width-image">
																<img
																	className="img"
																	src={`${apiImage.API_ENPOINT}/images/${arr[0]}`}
																/>
															</div>

															<div className="name-price">
																<div className="name-product">{m.ten_giay}</div>
																<div className="price-product">
																	{`${m.gia_ban
																		.toString()
																		.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
																</div>
															</div>
														</div>
													</Link>
												);
											})
										) : (
											<div></div>
										)}
									</OwlCarousel>
									<div className="center-button">
										<Link
											to={`/ThuongHieu=${item.id}`}
											title={`Xem tất cả  ${item.ten_loai_giay}`}
											className="evo-button mobile-viewmore"
										>
											Xem tất cả . <strong>{item.ten_loai_giay}</strong>
										</Link>
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
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		CreateActionLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
		createActionNP: bindActionCreators(actionGiay, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListLoaiGiay: state.loaigiay.ListLoaiGiay,
		ListChiTietMauSac: state.giay.ListChiTietMauSac,
		ListChiTietSize: state.giay.ListChiTietSize,
		giayNP: state.giay.giayNP,
		mausacNP: state.giay.mausacNP,
		dataLG: state.giay.dataLG,
		ListGiay: state.giay.ListGiay,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TrangChu);
