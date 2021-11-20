import React, { useEffect, useState } from 'react';
import './index.scss';
import imageNot from './../../../assets/image/404.png';
import { useHistory } from 'react-router-dom';

function NotFound(props) {
	const history = useHistory();
	function backHone() {
		history.push('/');
	}
	return (
		<div className="notFound">
			<div className="container">
				<div className="heigth-not">
					<img className="img-not" src={imageNot}></img>
					<div className="title-big">Lỗi không tìm thấy trang</div>
					<button className="back-home" onClick={backHone}>
						VỀ TRANG CHỦ
					</button>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
