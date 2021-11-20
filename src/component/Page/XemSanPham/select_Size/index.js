import React, { useEffect, useState } from 'react';

function SelectSize(props) {
	const { arrSize, dataSubmits } = props;
	const [size, setSize] = useState(0);
	function onChangeSize(e) {
		setSize(e.target.value);
		arrSize.map((arr, index) => {
			if (parseInt(e.target.value) === arr.ten_size) {
				props.selectSizes({
					id_size: arr.ten_size,
					ten_size: arr.ten_size,
					gia_ban: arr.gia_ban,
					soluong: arr.so_luong,
				});
			}
		});
	}
	useEffect(() => {
		setSize(dataSubmits.ten_size);
	}, [dataSubmits]);
	return (
		<div className="select-size mt-3">
			<div className="select-size__header">Màu sắc:</div>
			<div className="select-size__size">
				<div className="select-swap">
					{arrSize.map((arr, index) => {
						return (
							<div key={arr.id_size} data-value={`${arr.ten_size}`} className="n-sd swatch-element 38 ">
								<input
									data-value={arr.ten_size}
									className="variant-0"
									id={`swatch-0-${arr.ten_size}`}
									type="radio"
									name="option1"
									value={arr.ten_size}
									onChange={onChangeSize}
									checked={size === arr.ten_size}
								/>

								<label htmlFor={`swatch-0-${arr.ten_size}`}>
									{arr.ten_size}
									<img
										className="crossed-out"
										src="//bizweb.dktcdn.net/100/292/624/themes/758446/assets/soldout.png?1636539606331"
										alt={arr.ten_size}
									/>
									<img
										className="img-check"
										src="//bizweb.dktcdn.net/100/292/624/themes/758446/assets/select-pro.png?1636539606331"
										alt={arr.ten_size}
									/>
								</label>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SelectSize;
