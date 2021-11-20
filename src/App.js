import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import * as contant from './contants/index';
import Adminroute from './commom/AdminRoute/index';
import AdminrouteDH from './commom/AdminRouteDH/index';
import 'react-notifications-component/dist/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotifications from 'react-notifications-component';
import { Provider } from 'react-redux';
import configstore from './redux/configstore';
import ModalProduct from './component/modalProduct/index';
const store = configstore();

function App(props) {
	function renderAdminRoute() {
		let xhtml = null;
		xhtml = contant.ROUTESSTC.map((route) => {
			return (
				<Adminroute
					key={route.path}
					path={route.path}
					component={route.component}
					name={route.name}
					exact={route.exact}
				></Adminroute>
			);
		});
		return xhtml;
	}

	function renderAdminRouteDH() {
		let xhtml = null;
		xhtml = contant.ROUTESDH.map((route) => {
			return (
				<AdminrouteDH
					key={route.path}
					path={route.path}
					component={route.component}
					name={route.name}
					exact={route.exact}
				></AdminrouteDH>
			);
		});
		return xhtml;
	}

	return (
		<Provider store={store}>
			<BrowserRouter>
				<ReactNotifications> </ReactNotifications>
				<div className="tong">
					<ModalProduct></ModalProduct>
					<Switch>
						{renderAdminRouteDH()}
						{renderAdminRoute()}
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
