'use strict';
import React, { Component } from 'react';
import Modal from 'react-modal';

import { modalHide } from '../actions/modal';

import * as modals from '../modals';

const {
	PropTypes
} = React;

class ModalWrapper extends Component {
	closeModal(){
		const { dispatch } = this.props;
		dispatch(modalHide());
	}
	_renderContext(){
		const { modal, dispatch } = this.props,
			{ component, props } = modal,
			modalClass = modals[component],
			newProps = {
				...props,
				dispatch,
				closeModal : () => this.closeModal()
			};

		return modalClass ? React.createElement(modalClass, newProps) : null;
	}
	render(){
		const { modal } = this.props,
			{ on, context, overlay } = modal,
			customStyles = {
				context,
				overlay
			},
			ContextElement = this._renderContext();

		return (
			<Modal isOpen={on}
				onRequestClose={() => this.closeModal()}
				style={customStyles}
			>
				{ContextElement}
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
			context : PropTypes.object
		})
	}),
};

export default ModalWrapper;
