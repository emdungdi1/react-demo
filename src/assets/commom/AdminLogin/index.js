import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DashBoard from '../../component/login/login';
class AdminRoute extends Component {
	render() {
		const { component: Yourcomponent, name, ...remainProps } = this.props;
		return (
			<Route
				{...remainProps}
				render={(routeProps) => {
					return (
						<DashBoard name={name}>
							<Yourcomponent {...routeProps}> </Yourcomponent>{' '}
						</DashBoard>
					);
				}}
			></Route>
		);
	}
}

export default AdminRoute;
