import React, { useState, useEffect } from 'react';
import './index.scss';
import * as giayAPI from './../../../api/giay';
import { Link, useHistory } from 'react-router-dom';
import * as apiGiay from './../../../api/giay';
import * as apiImage from '../../../contants/index';
import Pagination from 'react-js-pagination';

function ThuongHieuTC(props) {
	const [activePage, setActivePage] = useState(1);
	const [allPage, setAllPage] = useState(0);
	const [data, setData] = useState([]);
	const [dataTam, setDataTam] = useState([]);
	const [dataTamAll, setDataTamAll] = useState([]);
	const history = useHistory();
	const [isActive, setActive] = useState('');
	const [dataPost, setDataPost] = useState({
		id_loai_giay: 41,
		sortBy: 'ten_giay',
		groupBy: 'DESC',
		limit: 12,
		offset: 0,
	});

	useEffect(() => {
		if (props.match.params) {
			setDataPost((dataPost) => ({ ...dataPost, id_loai_giay: parseInt(props.match.params.th) }));
			function fetchPostsLists() {
				if (props.match.params.SortBy && props.match.params.page) {
					let pageN = 0;
					if (parseInt(props.match.params.page) === 1) {
						pageN = 0;
					} else {
						pageN = parseInt(props.match.params.page) * 12 - 12;
					}
					setActivePage(parseInt(props.match.params.page));
					giayAPI
						.getProductsPageByLG({
							id_loai_giay: parseInt(props.match.params.th),
							sortBy: props.match.params.SortBy,
							groupBy: props.match.params.GroupBy,
							limit: 12,
							offset: pageN,
						})
						.then((res) => {
							const { data } = res;
							if (res.status === 200) {
								setDataTam(data.data);

								giayAPI
									.productsAllByLG({
										id_loai_giay: parseInt(props.match.params.th),
										sortBy: props.match.params.SortBy,
										groupBy: props.match.params.GroupBy,
										limit: 12,
										offset: pageN,
									})
									.then((resP) => {
										const dataAll = resP.data;

										if (resP.status === 200) {
											setDataTamAll(dataAll.data);
											apiGiay.getGiay().then((resP) => {
												const dataLG = resP.data;
												if (resP.status === 200) {
													const dataG = dataLG.data.filter(
														(item) => item.id_loai_giay === parseInt(props.match.params.th)
													);
													setAllPage(dataG.length);
												}
											});
										}
									});
							}
						});
				} else {
					giayAPI
						.getProductsPageByLG({
							id_loai_giay: parseInt(props.match.params.th),
							sortBy: 'ten_giay',
							groupBy: 'DESC',
							limit: 12,
							offset: 0,
						})
						.then((res) => {
							const { data } = res;
							if (res.status === 200) {
								setDataTam(data.data);
								giayAPI
									.productsAllByLG({
										id_loai_giay: parseInt(props.match.params.th),
										sortBy: 'ten_giay',
										groupBy: 'DESC',
										limit: 12,
										offset: 0,
									})
									.then((resP) => {
										const dataAll = resP.data;
										if (resP.status === 200) {
											setDataTamAll(dataAll.data);
										}
									});
							}
						});
					apiGiay.getGiay().then((resP) => {
						const dataLG = resP.data;
						if (resP.status === 200) {
							const dataG = dataLG.data.filter(
								(item) => item.id_loai_giay === parseInt(props.match.params.th)
							);
							setAllPage(dataG.length);
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
		}
		return () => (current = false);
	}, [dataTam, dataTamAll]);
	function handlePageChange(pageNumber) {
		if (props.match.params.SortBy && props.match.params.page) {
			history.push(
				`/ThuongHieu=${props.match.params.th}&&SortBy=${props.match.params.SortBy}&&GroupBy=${props.match.params.GroupBy}&&Page=${pageNumber}`
			);
		} else {
			history.push(
				`/ThuongHieu=${props.match.params.th}&&SortBy=${'ten_giay'}&&GroupBy=${'DESC'}&&Page=${pageNumber}`
			);
		}
	}

	function sortby(data) {
		if (data === 'alpha-asc') {
			setActive('alpha-asc');
			history.push(`/ThuongHieu=${props.match.params.th}&&SortBy=${'ten_giay'}&&GroupBy=${'asc'}&&Page=${1}`);
		} else if (data === 'alpha-desc') {
			setActive('alpha-desc');
			history.push(`/ThuongHieu=${props.match.params.th}&&SortBy=${'ten_giay'}&&GroupBy=${'desc'}&&Page=${1}`);
		} else if (data === 'date_create-desc') {
			setActive('date_create-desc');
			history.push(`/ThuongHieu=${props.match.params.th}&&SortBy=${'date_create'}&&GroupBy=${'desc'}&&Page=${1}`);
		} else if (data === 'price-asc') {
			setActive('price-asc');
			history.push(`/ThuongHieu=${props.match.params.th}&&SortBy=${'gia_ban'}&&GroupBy=${'asc'}&&Page=${1}`);
		} else if (data === 'price-desc') {
			setActive('price-desc');
			history.push(`/ThuongHieu=${props.match.params.th}&&SortBy=${'gia_ban'}&&GroupBy=${'desc'}&&Page=${1}`);
		}
	}
	return (
		<div className="ThuongHieuTC">
			<div className="container">
				<div className="sort-cate clearfix margin-bottom-10 hidden-xs">
					<div className="sort-cate-left hidden-xs">
						<h3>Xếp theo:</h3>
						<ul>
							<li
								className={`btn-quick-sort alpha-asc`}
								className={isActive === 'alpha-asc' ? 'active' : null}
							>
								<a onClick={() => sortby('alpha-asc')} title="Tên A-Z">
									<i></i>Tên A-Z
								</a>
							</li>
							<li
								className="btn-quick-sort alpha-desc"
								className={isActive === 'alpha-desc' ? 'active' : null}
							>
								<a onClick={() => sortby('alpha-desc')} title="Tên Z-A">
									<i></i>Tên Z-A
								</a>
							</li>
							<li
								className="btn-quick-sort date_create-desc"
								className={isActive === 'date_create-desc' ? 'active' : null}
							>
								<a onClick={() => sortby('date_create-desc')} title="Hàng mới">
									<i></i>Hàng mới
								</a>
							</li>
							<li
								className="btn-quick-sort price-asc"
								className={isActive === 'price-asc' ? 'active' : null}
							>
								<a onClick={() => sortby('price-asc')} title="Giá thấp đến cao">
									<i></i>Giá thấp đến cao
								</a>
							</li>
							<li
								className="btn-quick-sort price-desc"
								className={isActive === 'price-desc' ? 'active' : null}
							>
								<a onClick={() => sortby('price-desc')} title="Giá cao xuống thấp">
									<i></i>Giá cao xuống thấp
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					{data.length > 0 && data[0].mausac.length > 0 ? (
						data.map((item, index) => {
							const d = item.mausac[0].hinh_anh.split(',');
							let arr = [];
							for (var i = 0; i < d.length; i++) {
								arr.push(d[i]);
							}
							return (
								<div key={item.id} className="height-margin col-xs-6 col-sm-4 col-md-4 col-lg-4">
									<Link to={`/XemSamPham/${item.id}`} className="title-hp">
										<div className="one-procuts">
											<div className="width-image">
												<img className="img" src={`${apiImage.API_ENPOINT}/images/${arr[0]}`} />
											</div>

											<div className="name-price">
												<div className="name-product">{item.ten_giay}</div>
												<div className="price-product">
													{`${item.gia_ban
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`}
												</div>
											</div>
										</div>
									</Link>
								</div>
							);
						})
					) : (
						<div></div>
					)}
				</div>
				<div className="col-sm-12">
					<div className="pagination">
						<Pagination
							prevPageText="prev"
							nextPageText="next"
							activePage={activePage}
							itemsCountPerPage={12}
							totalItemsCount={allPage}
							pageRangeDisplayed={12}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

ThuongHieuTC.propTypes = {};

export default ThuongHieuTC;
