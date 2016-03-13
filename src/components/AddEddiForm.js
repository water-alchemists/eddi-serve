'use strict';
import React, { Component } from 'react';

import style from '../less/AddEddiForm.less';



const {
	PropTypes
} = React;

class AddEddiForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			id : null,
			name : null
		};
	}

	onIdChange(event){
		const id = event.target.value;
		event.preventDefault();
		this.setState({ id });
	}

	onNameChange(event){
		const name = event.target.value;
		event.preventDefault();
		this.setState({ name });
	}

	submitHandler(event){
		const { id, name } = this.state,
			{ onSubmit } = this.props;
		event.preventDefault();
		if(onSubmit instanceof Function) return onSubmit(id, { name });
	}

	cancelHandler(event){
		const { onCancel } = this.props;
		event.preventDefault();
		if(onCancel instanceof Function) return onCancel();
	}

	render(){
		const { id, name } = this.props;

		return (
			<form className='eddi-add light' onSubmit={event => this.submitHandler(event)}>
				<div className='input-container'>
					<input type='text'
						name='id'
						onChange={event => this.onIdChange(event)}
						value={id}
						placeholder="eddi id"
					/>
					<input type='text'
						name='name'
						onChange={event => this.onNameChange(event)}
						value={name}
						placeholder="nickname"
					/>
				</div>
				<div className='button-container'>
					<button className='cancel' type='button' onClick={event => this.cancelHandler(event)}>
						Cancel
					</button>
					<button type='submit'>Add</button>
				</div>
			</form>
		)
	}
}

AddEddiForm.propTypes = {
	onSubmit : PropTypes.func,
	onCancel : PropTypes.func
}

export default AddEddiForm;
