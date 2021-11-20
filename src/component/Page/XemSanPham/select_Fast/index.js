import React, { useState, useEffect } from 'react';
import * as apiImage from './../../../../contants/index';

function SelectFast(props) {
	const [fast, setFast] = useState('');
	const { arrFast, dataSubmits } = props;
	function onChangeValue(e) {
		setFast(e.target.value);
		arrFast.map((arr, index) => {
			if (arr.ten_mau_sac === e.target.value) {
				props.fast_select({ id_mau_sac: arr.id_mau_sac, ten_mau_sac: arr.ten_mau_sac });
			}
		});
	}
	useEffect(() => {
		setFast(dataSubmits.ten_mau_sac);
	}, []);

	return (
		<div className="select-fast mt-3">
			<div className="select-fast__header">Khích thước:</div>
			<div className="select-fast__fast">
				<div className="select-swap">
					{arrFast.length > 0 ? (
						arrFast.map((arr, index) => {
							const d = arr.hinh_anh.split(',');
							let arrIMG = [];
							for (var i = 0; i < d.length; i++) {
								arrIMG.push(d[i]);
							}
							return (
								<div
									key={arr.id}
									data-value={arr.ten_mau_sac}
									className={`n-sd swatch-element color ${arr.ten_mau_sac}`}
								>
									<input
										data-value={arr.ten_mau_sac}
										className="variant-1"
										id={`swatch-1-${arr.ten_mau_sac}`}
										type="radio"
										name="option2"
										value={arr.ten_mau_sac}
										onChange={onChangeValue}
										checked={fast === arr.ten_mau_sac}
									/>

									<label className="black has-thumb" htmlFor={`swatch-1-${arr.ten_mau_sac}`}>
										<img
											src={`${apiImage.API_ENPOINT}/images/${arrIMG[0]}`}
											alt={arr.ten_mau_sac}
											className="ant-swatch"
										/>
										<span>{arr.ten_mau_sac}</span>

										<img
											className="crossed-out"
											src="//bizweb.dktcdn.net/100/292/624/themes/758446/assets/soldout.png?1636539606331"
											alt={`swatch-1-${arr.ten_mau_sac}`}
										/>
										<img
											className="img-check"
											src="//bizweb.dktcdn.net/100/292/624/themes/758446/assets/select-pro.png?1636539606331"
											alt={`swatch-1-${arr.ten_mau_sac}`}
										/>
									</label>
								</div>
							);
						})
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	);
}

export default SelectFast;
