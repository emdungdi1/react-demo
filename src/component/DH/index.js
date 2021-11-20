import React from 'react';

function DashBoard(props) {
	const { name, children } = props;
	return (
		<div key={name} className="chia">
			{children}
		</div>
	);
}

export default DashBoard;
