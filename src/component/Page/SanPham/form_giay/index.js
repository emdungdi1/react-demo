import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import './index.scss';
import * as action from '../../../../actions/modal';
import * as actionGiay from '../../../../actions/giay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function form_giay(props) {
	const { modalAtionCrearotors, CreateGiay } = props;
	const { setGiayEdittingNull } = CreateGiay;
	function hideFormThemLoaiGiay() {
		const { hideModalGiay } = modalAtionCrearotors;
		hideModalGiay();
		setGiayEdittingNull();
	}

	function showFormLoaiGiay() {
		const { showmodalGiay, titleGiay, componentGiay, showmodal } = props;
		if (showmodalGiay) {
			return (
				<div className={showmodal === true ? 'form-type opa' : 'form-type'}>
					<Container>
						<div className="row">
							<div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
								<div className="tm-bg-primary-dark tm-block tm-block-h-auto">
									<div className="row">
										<div className="col-12">
											<div className="form-type-title">
												<div className="title-type">{titleGiay}</div>
												<CloseIcon
													className="close-type"
													onClick={hideFormThemLoaiGiay}
												></CloseIcon>
											</div>
										</div>
									</div>
									{componentGiay}
								</div>
							</div>
						</div>
					</Container>
				</div>
			);
		} else {
			return <div> </div>;
		}
	}
	return <div> {showFormLoaiGiay()} </div>;
}

form_giay.propTypes = {
	showmodalGiay: PropTypes.bool,
};

const mapDispatchToProps = (dispatch) => {
	return {
		modalAtionCrearotors: bindActionCreators(action, dispatch),
		CreateGiay: bindActionCreators(actionGiay, dispatch),
	};
};
const mapStateToProps = (state) => {
	return {
		showmodalGiay: state.modal.showmodalGiay,
		titleGiay: state.modal.titleGiay,
		componentGiay: state.modal.componentGiay,
		showmodal: state.modal.showmodal,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(form_giay);
