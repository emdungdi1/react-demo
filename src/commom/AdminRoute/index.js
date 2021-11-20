import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DashBoard from './../../component/listmenu';

function AdminRoute(props) {
	const { component: Yourcomponent, name, ...remainProps } = props;
	return (
		<Route
			{...remainProps}
			render={(routeProps) => (
				<DashBoard name={name}>
					<Yourcomponent {...routeProps}> </Yourcomponent>{' '}
				</DashBoard>
			)}
		></Route>
	);
}

AdminRoute.propTypes = {};

export default AdminRoute;
