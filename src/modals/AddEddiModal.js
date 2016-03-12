'use strict';
import React, { Component } from 'react';

import { assignEddiThunk } from '../actions/eddis';

import AddEddiForm from '../components/AddEddiForm';

const {
	PropTypes
} = React;

class AddEddiModal extends Component {
	_onCancel(){
		const { closeModal } = this.props;
		closeModal();
	}

	_onSubmit(id, settings){
		const { dispatch, closeModal } = this.props;
		dispatch(assignEddiThunk(id, settings));
		dispatch(closeModal());
	}

	render(){
		return (
			<AddEddiForm onSubmit={(id, name) => this._onSubmit(id, name)}
				onCancel={() => this._onCancel()}
			/>
		);
	}
}

AddEddiModal.propTypes = {
	closeModal : PropTypes.func.isRequired,
	dispatch : PropTypes.func.isRequired,
};

export default AddEddiModal;