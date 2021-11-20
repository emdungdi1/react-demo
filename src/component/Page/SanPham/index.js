import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as actionGiay from './../../../actions/giay';
import * as actionMauSac from './../../../actions/mausac';
import * as actionSize from './../../../actions/size';
import * as actionLoaiGiay from './../../../actions/loai_giay';
import * as actionModal from './../../../actions/modal';
import * as actionCTDonHang from './../../../actions/CT_don_hang';
import FormGiay from './form_giay/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Moment from 'moment';
import * as apiGiay from './../../../api/giay';
import * as notify from '../../../contants/notifycation';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-js-pagination';
import { useHistory, useLocation, match } from 'react-router-dom';

function SanPham(props) {
	const {
		modalAtionGiay,
		ListGiay,
		modalGiay,
		CreateActionLoaiGiay,
		createMauSac,
		createSize,
		mausacEditting,
		ListLoaiGiay,
	} = props;
	const location = useLocation();
	const history = useHistory();
	const path = window.location.pathname;

	const {
		fetchListGiayRequest,
		fetchListChiTietSizeRequest,
		setGiayEdittings,
		fetchListChiTietMauSacRequest,
		updateGiay,
		deleteSize,
		deleteMauSac,
		deleteGiay,
	} = modalAtionGiay;
	const [activePage, setActivePage] = useState(1);
	const { fetchListMauSacRequest } = createMauSac;
	const { fetchListSizeRequest } = createSize;
	const { fetchListLoaiGiayRequest } = CreateActionLoaiGiay;
	const [show, setShow] = useState(false);
	const [nd, setNd] = useState('');
	const [dataTam, setDataTam] = useState({});
	const [dataPage, setDataPage] = useState({ id_loai_giay: 0, limit: 4, offset: 0, ten_giay: '' });
	const [dataList, setDataList] = useState([]);
	const [allPage, setAllPage] = useState(0);
	const [searchSP, setSearchSP] = useState('');
	const [tamS, setTamS] = useState(false);
	function onupdateGiay(data) {
		setGiayEdittings(data.id);
		const { showModalGiay, changeModalTitleGiay, changeModalContentGiay } = modalGiay;
		changeModalTitleGiay('Chỉnh sửa giày');
		changeModalContentGiay(<FormGiay> </FormGiay>);
		showModalGiay();
	}

	useEffect(() => {
		async function fetchPostsList() {
			try {
				await fetchListLoaiGiayRequest();
				await fetchListGiayRequest();
				await fetchListMauSacRequest();
				await fetchListSizeRequest();
				await fetchListChiTietSizeRequest();
				await fetchListChiTietMauSacRequest();
			} catch (error) {
				console.log('failed to fetch post list', error.message);
			}
		}
		fetchPostsList();
	}, []);
	useEffect(() => {
		if (!props.match.params.th) {
			setActivePage(1);
			let pageN = 0;
			pageN = 0;
			setDataPage((dataPage) => ({ ...dataPage, offset: pageN }));
			apiGiay
				.pageGiay(dataPage)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
						setAllPage(ListGiay.length);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			let pageN = 0;
			if (parseInt(props.match.params.page) === 1) {
				pageN = 0;
			} else {
				pageN = parseInt(props.match.params.page) * 4 - 4;
			}
			setActivePage(parseInt(props.match.params.page));
			setDataPage((dataPage) => ({
				...dataPage,
				offset: parseInt(props.match.params.page),
				id_loai_giay: parseInt(props.match.params.th),
			}));
			const d = {
				limit: 4,
				offset: pageN,
				id_loai_giay: parseInt(props.match.params.th),
			};
			apiGiay
				.pageGiay(d)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});

			if (parseInt(dataPage.id_loai_giay) === 0) {
				setAllPage(ListGiay.length);
			} else {
				const dataNew = ListGiay.filter(
					(item) => parseInt(item.id_loai_giay) === parseInt(props.match.params.th)
				);
				setAllPage(dataNew.length);
			}
		}
		if (props.match.params.searchSP) {
			setSearchSP(props.match.params.searchSP);
			setActivePage(parseInt(props.match.params.page));
			let pageN = 0;
			if (parseInt(props.match.params.page) === 1) {
				pageN = 0;
			} else {
				pageN = parseInt(props.match.params.page) * 4 - 4;
			}
			const d = { ten_giay: props.match.params.searchSP, limit: 4, offset: pageN };
			apiGiay
				.pageSearchGiay(d)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			const dataNew = ListGiay.filter((item) => item.ten_giay.includes(searchSP.toLowerCase()));
			setAllPage(dataNew.length);
		}
	}, [ListGiay]);
	function searchSanPham(e) {
		e.persist();
		setSearchSP(e.target.value);
		setTamS(true);
	}
	useEffect(() => {
		let delayDebounceFn = null;
		if (searchSP !== '' && tamS === true) {
			delayDebounceFn = setTimeout(() => {
				const d = { ten_giay: searchSP, limit: 4, offset: 0 };
				apiGiay
					.pageSearchGiay(d)
					.then((response) => {
						if (response.status === 200) {
							if (response.data.data.length > 0) {
								setDataList(response.data.data);
								history.push(`/admin/SanPham/page=${1}&&search=${searchSP}`);
								setTamS(false);
							} else {
								setDataList([]);
								history.push(`/admin/SanPham/page=${0}&&search=${searchSP}`);
								setTamS(false);
							}
						}
					})
					.catch((error) => {
						console.log(error);
					});
				const dataNew = ListGiay.filter((item) => item.ten_giay.toLowerCase().includes(searchSP.toLowerCase()));
				setAllPage(dataNew.length);
			}, 1000);
		}
		if (searchSP === '' && tamS === true) {
			history.push(`/admin/SanPham`);
			setTamS(false);
		}
		return () => clearTimeout(delayDebounceFn);
	}, [searchSP]);
	function themGiay() {
		history.push('/admin/SanPham');
		const { showModalGiay, changeModalTitleGiay, changeModalContentGiay } = modalGiay;
		changeModalTitleGiay('Thêm giày');
		changeModalContentGiay(<FormGiay> </FormGiay>);
		showModalGiay();
		fetchListLoaiGiayRequest();
	}
	const handleClosend = () => {
		setShow(false);
	};
	function closeDidalognd() {
		if (dataTam.id) {
			if (mausacEditting.length > 0) {
				for (var i = 0; i < mausacEditting.length; i++) {
					if (mausacEditting[i].size.length > 0) {
						for (var j = 0; j < mausacEditting[i].size.length; j++) {
							const dataS = {
								id_ct_mau_sac: mausacEditting[i].size[j].id_ct_mau_sac,
								id_size: mausacEditting[i].size[j].id_size,
								so_luong: mausacEditting[i].size[j].so_luong,
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
				for (var i = 0; i < mausacEditting.length; i++) {
					const id = mausacEditting[i].id;
					console.log(mausacEditting[i]);
					apiGiay
						.deleteMauSac(mausacEditting[i])
						.then((responseMS) => {
							if (responseMS.status === 200) {
								deleteMauSac(id);
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			}
			apiGiay
				.deleteGiay(dataTam)
				.then((response) => {
					if (response.status === 200) {
						if (response.data.success === 500) {
							setShow(false);
							setNd(`Bạn Không thể xóa giày này hãy cập nhật lại trạng thái của giày`);
							setShow(true);
							setDataTam({});
						} else {
							deleteGiay(dataTam.id);
							notify.notificatonSuccess('Xóa thành công');
							setDataTam({});
						}
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		setShow(false);
	}
	function updateTrangThai(data) {
		let t = 0;
		if (data.trang_thai === 0) {
			t = 1;
		}
		const d = {
			id_g: data.id,
			ten_giay: data.ten_giay,
			mo_ta: data.mo_ta,
			id_loai_giay: data.id_loai_giay,
			gia_ban: data.gia_ban,
			trang_thai: t,
			date_update: Moment(new Date()).format('YYYY-MM-DD HH:mm'),
		};
		apiGiay
			.updateGiay(d)
			.then((response) => {
				if (response.status === 200) {
					updateGiay(d);
					notify.notificatonSuccess('Chỉnh sửa trạng thành công');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	function deleteGiays(data) {
		setShow(true);
		setNd(`Bạn có chắc chăc muốn xóa sản phẩm ${data.ten_giay} ra khỏi danh sách`);
		setDataTam(data);
		setGiayEdittings(data.id);
	}
	function handlePageChange(pageNumber) {
		setActivePage(pageNumber);
		let pageN = 0;
		if (pageNumber === 1) {
			pageN = 0;
		} else {
			pageN = pageNumber * 4 - 4;
		}
		if (searchSP !== '') {
			history.push(`/admin/SanPham/page=${pageNumber}&&search=${searchSP}`);
			const d = { ten_giay: searchSP, limit: 4, offset: pageN };
			apiGiay
				.pageSearchGiay(d)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			console.log(ListGiay);
			const dataNew = ListGiay.filter((item) => item.ten_giay.toLowerCase().includes(searchSP.toLowerCase()));
			setAllPage(dataNew.length);
		} else {
			history.push(`/admin/SanPham/page=${pageNumber}&&ThuongHieu=${dataPage.id_loai_giay}`);
			setDataPage((dataPage) => ({ ...dataPage, offset: pageN, id_loai_giay: parseInt(dataPage.id_loai_giay) }));
			const d = {
				limit: 4,
				offset: pageN,
				id_loai_giay: parseInt(dataPage.id_loai_giay),
			};
			apiGiay
				.pageGiay(d)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			if (parseInt(dataPage.id_loai_giay) === 0) {
				setAllPage(ListGiay.length);
			} else {
				const dataNew = ListGiay.filter(
					(item) => parseInt(item.id_loai_giay) === parseInt(dataPage.id_loai_giay)
				);
				setAllPage(dataNew.length);
			}
		}
	}
	function onchangeSelect(e) {
		e.persist();
		history.push(`/admin/SanPham/page=${1}&&ThuongHieu=${e.target.value}`);
		setActivePage(1);
		let pageN = 0;
		pageN = 0;
		setDataPage((dataPage) => ({ ...dataPage, id_loai_giay: e.target.value, offset: pageN }));
		if (parseInt(e.target.value) === 0) {
			apiGiay
				.pageGiay(dataPage)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
						setAllPage(ListGiay.length);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			apiGiay
				.pageGiay(dataPage)
				.then((response) => {
					if (response.status === 200) {
						setDataList(response.data.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			const dataNew = ListGiay.filter((item) => parseInt(item.id_loai_giay) === parseInt(e.target.value));
			setAllPage(dataNew.length);
		}
	}

	return (
		<div className="product-admin">
			<Modal show={show} onHide={handleClosend} backdrop="static" keyboard={false}>
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
			<div className="type_product">
				<div className="headder-product-admin">
					<Button className="add-product" variant="success" onClick={themGiay}>
						Thêm giày
					</Button>
					<div className="search-thuonghieu">
						<label>Tìm kiếm</label>
						<input type="text" value={searchSP} placeholder="Nhập tên sản phẩm" onChange={searchSanPham} />
					</div>
					{ListLoaiGiay ? (
						<div className="select-thuonghieu">
							<label> Thương hiệu </label>
							<select
								onChange={(e) => onchangeSelect(e)}
								className="custom-select-product"
								id="category"
								value={dataPage.id_loai_giay}
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
						</div>
					) : (
						<div></div>
					)}
				</div>
				<Table striped bordered hover variant="dark" className="table_type">
					<thead>
						<tr>
							<th>STT</th>
							<th>Mã giày</th>
							<th>Tên loại giày</th>
							<th>mô tả</th>
							<th>giá bán</th>
							<th>Điều khiển</th>
							<th>Trạng thái</th>
						</tr>
					</thead>
					<tbody>
						{dataList
							? dataList.map((post, index) => {
									return (
										<tr key={post.id}>
											<td>{index + 1}</td>
											<td className="width-lsp">{post.id}</td>
											<td>{post.ten_giay}</td>
											<td>{post.mo_ta}</td>
											<td>{post.gia_ban}</td>
											<td className="width-lsp">
												{post.trang_thai === 1 ? (
													<Button onClick={() => updateTrangThai(post)} variant="success">
														Còn hoạt động
													</Button>
												) : (
													<Button onClick={() => updateTrangThai(post)} variant="danger">
														Không còn hoạt động
													</Button>
												)}
											</td>
											<td className="Controls_type">
												<Button
													className="button-sanpham mr-t"
													variant="primary update_type"
													onClick={() => onupdateGiay(post)}
												>
													sửa
												</Button>
												<Button
													className="button-sanpham mr-t"
													variant="danger delete_type"
													onClick={() => deleteGiays(post)}
												>
													Xóa
												</Button>
											</td>
										</tr>
									);
							  })
							: null}
					</tbody>
				</Table>
				<div className="pagination">
					<Pagination
						prevPageText="prev"
						nextPageText="next"
						activePage={activePage}
						itemsCountPerPage={4}
						totalItemsCount={allPage}
						pageRangeDisplayed={4}
						onChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}

SanPham.propTypes = {
	ListGiay: PropTypes.array,
};

SanPham.defaultProps = {
	ListGiay: [],
};

const mapDispatchToProps = (dispatch) => {
	return {
		modalAtionGiay: bindActionCreators(actionGiay, dispatch),
		createMauSac: bindActionCreators(actionMauSac, dispatch),
		createSize: bindActionCreators(actionSize, dispatch),
		modalGiay: bindActionCreators(actionModal, dispatch),
		CreateActionLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
		CreateCTDonHang: bindActionCreators(actionCTDonHang, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListGiay: state.giay.ListGiay,
		ListCTKhuyenMai: state.ctkhuyenmai.ListCTKhuyenMai,
		giayEditting: state.giay.giayEditting,
		mausacEditting: state.giay.mausacEditting,
		ListCTDonHang: state.ctDonHang.ListCTDonHang,
		ListLoaiGiay: state.loaigiay.ListLoaiGiay,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SanPham);
