import React from 'react';
import './index.scss';

function DoiTra(props) {
	return (
		<div className="HuongDanMuaHang">
			<div class="container">
				<div className="title-huongdan text-center">CHÍNH SÁCH ĐỔI HÀNG</div>
				<div class="row">
					<div className="col-xs-12 col-sm-12 col-md-12">
						<div className="content-page rte">
							<ul dir="ltr">
								<li>
									Sản phẩm còn đủ nhãn mác như ban đầu, nguyên vẹn không bị hư tổn. Giày chưa qua sử
									dụng, còn đầy đủ phiếu bảo hành bảo dưỡng, HDSD và tặng phẩm kèm (nếu có).
								</li>
								<li>
									Sản phẩm được chấp nhận đổi hàng khi có lỗi sản xuất, sai kích cỡ giày hoặc giao sai
									mẫu khách đặt ban đầu.
								</li>
								<li>
									Thời hạn quý khách có thể đổi sản phẩm là 7&nbsp;ngày (tính từ thời điểm nhận được
									sản phẩm).
								</li>
								<li>
									Quý khách có thể đến đổi sản phẩm trực tiếp tại tất cả các chi nhánh của Be Classy
									hoặc gửi ship để đổi hàng (hỗ trợ phí ship 1 chiều).
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DoiTra;
