'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class SignupForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : '',
			name : ''
		};
	}

	onEmailChange(event){
		const email = event.target.value;
		event.preventDefault();
		this.setState({ email })
	}

	onPasswordChange(event){
		const password = event.target.value;
		event.preventDefault();
		this.setState({ password });
	}

	onNameChange(event){
		const name = event.target.value;
		event.preventDefault();
		this.setState({ name });
	}

	submitHandler(event){
		const { onSubmit } = this.props,
			user = this.state;
		event.preventDefault();
		if(onSubmit) onSubmit(user);
	}

	render(){
		const { email, password, name } = this.state;
		return (
			<form onSubmit={event => this.submitHandler(event)}>
				<div>
					<div>
						<input 
							onChange={event => this.onEmailChange(event)}
							name='email' 
							type='text'
							placeholder='email'
							value={email}
						/>
					</div>
					<div>
						<input 
							onChange={event => this.onPasswordChange(event)}
							name='password'
							type='password'
							placeholder='password'
							value={password}
						/>
					</div>
					<div>
						<input
							onChange={event => this.onNameChange(event)}
							name='name'
							type='text'
							placeholder='name'
							value={name}
						/>
					</div>
					<button type='submit'>Signup</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	onSubmit : PropTypes.func
};

export default SignupForm;