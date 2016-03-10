'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class AddEddiForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			eddi : null
		};
	}

	onIdChange(event){
		const eddi = event.target.value;
		this.setState({ eddi });
	}

	submitHandler(){
		const { eddi } = this.state,
			{ onSubmit } = this.props;

		if(onSubmit instanceof Function) return onSubmit(eddi);
	}

	render(){
		const { eddi } = this.props;

		return (
			<div>
				<form onSubmit={() => this.submitHandler()}>
					<div>
						<div>
							<label htmlFor='id'>Eddi Id : </label>
							<input type='text' 
								name='id'
								onChange={event => this.onIdChange(event)}
								value={eddi}
							/>
						</div>
						<button type='submit'>Add</button>
					</div>
				</form>
			</div>
		)
	}
}

AddEddiForm.propTypes = {
	onSubmit : PropTypes.func,
}

export default AddEddiForm;