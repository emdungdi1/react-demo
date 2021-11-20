import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DashBoard from './../../component/listmenu';

function AdminRoute(props) {
	const token = JSON.parse(localStorage.getItem('token'));
	const { component: Yourcomponent, name, ...remainProps } = props;
	return (
		<Route
			{...remainProps}
			render={(routeProps) =>
				token != null ? (
					<DashBoard name={name}>
						<Yourcomponent {...routeProps}> </Yourcomponent>{' '}
					</DashBoard>
				) : (
					<Redirect
						to={{
							pathname: '/dangnhap',
							state: { from: routeProps.location },
						}}
					></Redirect>
				)
			}
		></Route>
	);
}

AdminRoute.propTypes = {};

export default AdminRoute;
