import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Slidebar.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import * as actionLoaiGiay from './../../actions/loai_giay';

function Slidebar(props) {
	const { ListLoaiGiay, CreateActionLoaiGiay } = props;
	function showSidebar() {
		onClickShowSlider(sidebar);
	}
	const { sidebar } = props;
	const { onClickShowSlider } = props;
	useEffect(() => {
		const { fetchListLoaiGiayRequest } = CreateActionLoaiGiay;
		async function fetchPostsList() {
			try {
				await fetchListLoaiGiayRequest();
			} catch (error) {
				console.log('failed to fetch post list', error.message);
			}
		}
		fetchPostsList();
	}, []);

	function dropLoaiGiays() {
		if (ListLoaiGiay.length > 0) {
			let xhtml = null;
			xhtml = ListLoaiGiay.map((route) => {
				return (
					<Link
						key={route.id}
						to={`/ThuongHieu=${route.id}`}
						className="dropdown-item"
						title={route.ten_loai_giay}
						onClick={showSidebar}
					>
						{route.ten_loai_giay}
					</Link>
				);
			});
			return xhtml;
		}
	}

	return (
		<IconContext.Provider className="navbar-slide" value={{ color: '#fff' }}>
			<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
				<ul className="nav-menu-items">
					<li className="row-menu" title="Trang Chủ">
						<Link onClick={showSidebar} to="/">
							<div id="title">Trang Chủ</div>
						</Link>
					</li>
					<li className="row-menu" title="Giày">
						<Dropdown>
							<Dropdown.Toggle id="title" variant="success" id="dropdown-basic">
								Giày Tây
							</Dropdown.Toggle>
							<Dropdown.Menu className="dropdown-item-menu">{dropLoaiGiays()}</Dropdown.Menu>
						</Dropdown>
					</li>
					<li className="row-menu" title="Giới Thiệu">
						<Link onClick={showSidebar} to="/GioiThieu">
							<div id="title">Giới Thiệu</div>
						</Link>
					</li>
					<li className="row-menu" title="Đăng Nhập">
						<Link onClick={showSidebar} to="/DangNhap">
							<div id="title">Đăng Nhập</div>
						</Link>
					</li>
					<li className="row-menu" title="Đăng ký">
						<Link onClick={showSidebar} to="/DangKy">
							<div id="title">Đăng ký</div>
						</Link>
					</li>
				</ul>
			</nav>
		</IconContext.Provider>
	);
}

Slidebar.propTypes = {};
const mapDispatchToProps = (dispatch) => {
	return {
		CreateActionLoaiGiay: bindActionCreators(actionLoaiGiay, dispatch),
	};
};

const mapStateToProps = (state) => {
	return {
		ListLoaiGiay: state.loaigiay.ListLoaiGiay,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Slidebar);
