import React, { useState } from 'react';
import './index.scss';
import useform from './useForm/useForm';
import validate from './validateForm/validateForm';
import * as api from '../../../api/khach_hang';
import FacebookLogin from 'react-facebook-login';
import * as notify from '../../../contants/notifycation';
import { Link, useHistory } from 'react-router-dom';
function DangNhap(props) {
	const { onChangeInput, handleSubmit, data, setData, errors } = useform(submit, validate);
	const { email, password } = data;
	const history = useHistory();
	function submit() {
		api.loginEmail(data)
			.then((response) => {
				if (response.status === 200) {
					if (response.data.success === 0) {
						notify.notificatonWarning('Hãy kiểm tra lại email hoặc mật khẩu');
					} else {
						notify.notificatonSuccess('Đăng nhập thành công');
						setData((data) => ({
							id: 0,
							facebook_id: '',
							ho_khach_hang: '',
							ten_khach_hang: '',
							email: '',
							phone: '',
							avatar: '',
							password: '',
							accessToken: '',
						}));
						localStorage.setItem('tokenTC', response.data.token);
						history.push('/');
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	const responseFacebook = (response) => {
		api.getFBID({ facebook_id: response.id })
			.then((responses) => {
				if (responses.status === 200) {
					if (!responses.data.data) {
						setData((data) => ({
							id: 0,
							facebook_id: response.id,
							ho_khach_hang: '',
							ten_khach_hang: response.name,
							email: response.email ? response.email : '',
							phone: '',
							avatar: '',
							password: '',
							accessToken: response.accessToken,
						}));
						const d = {
							id: 0,
							facebook_id: response.id,
							ho_khach_hang: '',
							ten_khach_hang: response.name,
							email: response.email ? response.email : '',
							phone: '',
							avatar: '',
							password: '',
							accessToken: response.accessToken,
						};
						api.Them(d)
							.then((resT) => {
								if (resT.data.success === 1) {
									api.loginFB({ facebook_id: response.id, accessToken: response.accessToken })
										.then((res) => {
											if (res.status === 200) {
												localStorage.setItem('tokenTC', res.data.token);
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
					} else {
						api.loginFB({ facebook_id: response.id, accessToken: response.accessToken })
							.then((res) => {
								if (res.status === 200) {
									notify.notificatonSuccess('Đăng nhập thành công');
									localStorage.setItem('tokenTC', res.data.token);
									history.push('/');
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
	};

	return (
		<div className="DangKy-tk">
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h1 className="title-head text-center">Đăng nhập tài khoản</h1>
						<div className="text-center fix-sblock">Bạn có thể đăng nhập tại đây</div>
						<div className="login-fb">
							<FacebookLogin
								className="mr-t"
								appId="3494292510682553"
								autoLoad={false}
								fields="name,email,picture"
								callback={responseFacebook}
							/>
						</div>
						<form className="row tm-edit-product-form" onSubmit={handleSubmit}>
							<div className="col-sm-12 margin-top">
								<div className="form-group mb-3">
									<label>EMAIL </label>
									<input
										id="email"
										name="email"
										type="text"
										value={email}
										className="form-control validate"
										onChange={(e) => onChangeInput(e)}
										placeholder="NHẬP EMAIL"
									/>
									{errors.email && <p className="error"> {errors.email} </p>}
								</div>
							</div>
							<div className="col-sm-12 margin-top">
								<div className="form-group mb-3">
									<label> MẬT KHẨU </label>
									<input
										id="password"
										name="password"
										type="password"
										value={password}
										className="form-control validate"
										onChange={(e) => onChangeInput(e)}
										placeholder="NHẬP MẬT KHẨU"
									/>
									{errors.password && <p className="error"> {errors.password} </p>}
								</div>
							</div>
							<div className="centen-button">
								<Link to="/DangKy" className="btn_dangky">
									Đăng ký
								</Link>
							</div>
							<div className="centen-button">
								<button type="submit" className="btn btn-primary text-uppercase add_type">
									Đăng nhập
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DangNhap;
