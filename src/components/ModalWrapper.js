'use strict';
import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

import { modalHide } from '../actions/modal';

import * as modals from '../modals';



const DEFAULT_STYLES = {
	content: {
		top: "0",
		right: "0",
		bottom: "0",
		left: "0"
	}
};

class ModalWrapper extends Component {
	closeModal(){
		const { dispatch } = this.props;
		dispatch(modalHide());
	}

	_renderContent(){
		const { modal, dispatch } = this.props,
			{ component, props } = modal,
			modalClass = modals[component],
			newProps = {
				...props,
				dispatch,
				closeModal : () => this.closeModal(),
			};

		return modalClass ? React.createElement(modalClass, newProps) : null;
	}
	render(){
		const { modal } = this.props,
			{ on, props } = modal,
			customStyles = { ...DEFAULT_STYLES, ...props.style },
			ContentElement = this._renderContent();

		return (
			<Modal 	isOpen={on}
				onRequestClose={() => this.closeModal()}
				style={customStyles}
			>
				{ContentElement}
			</Modal>
		);
	}
}

ModalWrapper.propTypes = {
	dispatch : PropTypes.func.isRequired,
	modal : PropTypes.shape({
		on : PropTypes.bool.isRequired,
		component : PropTypes.string,
		props : PropTypes.object,
		styles : PropTypes.shape({
			overlay : PropTypes.object,
			content : PropTypes.object
		})
	}),
};

export default ModalWrapper;
