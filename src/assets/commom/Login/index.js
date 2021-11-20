import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import * as apiLogin from './../../api/login';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import * as noti from './../../contants/notifycation';
import loading from './../../assets/loading.gif';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions/loading';
import * as actionSize from './../../actions/size';
import * as actionMauSac from './../../actions/mausac';
import * as actionKhuyenMai from './../../actions/khuyenMai';
import * as actionCTKhuyenMai from './../../actions/CT_khuyenMai';
import * as actionsGiay from './../../actions/giay';
import * as actionsLoaiGiay from './../../actions/loai_giay';
import * as actionKhacHang from './../../actions/khach_hang';
import * as actionDatHang from './../../actions/dat_hang';
import * as actionCTDonHang from './../../actions/CT_don_hang';

function Login(props) {
	const [account, setAccount] = useState({
		username: '',
		password: '',
	});
	const {
		showLoading,
		hideLoading,
		loadings,
		fetchMauSac,
		fetchSize,
		fetchLoaiGiay,
		fetchGiay,
		fetchCTMauSac,
		fetchKhuyenMai,
		fetchCTKhuyenMai,
		fetchKhachHang,
		fetchDatHang,
		fetchCTDonHang,
	} = props;
	const { username, password } = account;
	const [from, setFrom] = useState('');

	function handleChange(event) {
		setAccount((values) => ({ ...values, [event.target.name]: event.target.value }));
	}

	useEffect(() => {
		const lo = window.location.state;
		if (lo) {
			setFrom(lo.from.pathname);
		} else {
			setFrom('/');
		}
	}, [props.data]);

	let history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		await apiLogin
			.loginAdmin(account)
			.then((response) => {
				if (response.data.success === 1) {
					localStorage.setItem('token', JSON.stringify(response.data.token));
					noti.notificatonSuccess('Đăng nhập thành công');
					showLoading();
				} else {
					noti.notificatonWarning('Kiểm tra lại username hoặc password');
				}
			})
			.catch((error) => {
				console.log(error);
			});
		await fetchMauSac();
		await fetchSize();
		await fetchLoaiGiay();
		await fetchGiay();
		await fetchCTMauSac();
		await fetchCTMauSac();
		await fetchKhuyenMai();
		await fetchCTKhuyenMai();
		await fetchKhachHang();
		await fetchDatHang();
		await fetchCTDonHang();
	}
	useEffect(() => {
		if (loadings) {
			let timer1 = setTimeout(() => {
				hideLoading();
				history.push(from);
			}, 2 * 1000);

			return () => {
				clearTimeout(timer1);
			};
		}
	});

	function showload() {
		if (loadings) {
			return (
				<div className="adminLoading">
					<img className="loadding" src={loading} alt="loading" />
				</div>
			);
		} else {
			return <div> </div>;
		}
	}
	return (
		<div className="dangnhap">
			{showload()}
			<div className="center-dangnhap">
				<form className="form-signin" onSubmit={handleSubmit}>
					<div className="thongbao"> </div> <div className="form-signin-heading"> Đăng nhập </div>
					<div className="login-base">
						<div className="login-left">Username</div>
						<input
							type="text"
							onChange={handleChange}
							className="login-rigth"
							placeholder="Tên đăng nhập"
							name="username"
							value={username}
						/>
					</div>
					<div className="login-base">
						<div className="login-left"> Password </div>
						<input
							type="password"
							name="password"
							onChange={handleChange}
							className="login-rigth"
							value={password}
							placeholder="Nhập password"
						/>
					</div>
					<div className="text-xs-center nutdangnhap">
						<button type="submit" className="btn btn-lg btn-primary btndn">
							Đăng nhập
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

Login.propTypes = {
	onSubmit: PropTypes.func,
	account: PropTypes.object,
	from: PropTypes.string,
};

Login.defaultProps = {
	onSubmit: null,
	account: null,
	from: null,
};

const mapstatetoprops = (state) => {
	return {
		loadings: state.loadings.showLD,
	};
};

const mapdispatchtoprops = (dispatch, props) => {
	return {
		showLoading: () => {
			dispatch(actions.showLoadding());
		},
		hideLoading: () => {
			dispatch(actions.hideLoading());
		},
		fetchMauSac: () => {
			dispatch(actionMauSac.fetchListMauSacRequest());
		},
		fetchSize: () => {
			dispatch(actionSize.fetchListSizeRequest());
		},
		fetchLoaiGiay: () => {
			dispatch(actionsLoaiGiay.fetchListLoaiGiayRequest());
		},
		fetchGiay: () => {
			dispatch(actionsGiay.fetchListGiayRequest());
		},
		fetchCTMauSac: () => {
			dispatch(actionsGiay.fetchListChiTietMauSacRequest());
		},
		fetchCTSize: () => {
			dispatch(actionsGiay.fetchListChiTietSizeRequest());
		},
		fetchKhuyenMai: () => {
			dispatch(actionKhuyenMai.fetchListKhuyenMaiRequest());
		},
		fetchCTKhuyenMai: () => {
			dispatch(actionCTKhuyenMai.fetchListCTKhuyenMaiRequest());
		},
		fetchKhachHang: () => {
			dispatch(actionKhacHang.fetchListKhachHangRequest());
		},
		fetchDatHang: () => {
			dispatch(actionDatHang.fetchListDatHangRequest());
		},
		fetchCTDonHang: () => {
			dispatch(actionCTDonHang.fetchListCTDonHangRequest());
		},
	};
};

export default connect(mapstatetoprops, mapdispatchtoprops)(Login);
