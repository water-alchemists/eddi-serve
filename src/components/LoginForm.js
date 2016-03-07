'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class LoginForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password : ''
		};
	}

	onEmailChange(event){
		const email = event.target.value;
		event.preventDefault();
		this.setState({ email });
	}

	onPasswordChange(event){
		const password = event.target.value;
		event.preventDefault();
		this.setState({ password });
	}

	submitHandler(event){
		const { onSubmit } = this.props,
			user = this.state;

		event.preventDefault();
		if(onSubmit) onSubmit(user);
	}

	render(){
		const { email, password } = this.state
		return (
			<form onSubmit={event => this.submitHandler(event)}>
				<div>
					<div>
						<label htmlFor='email' >Email : </label>
						<input onChange={event => this.onEmailChange(event)}
							type='email'
							name='email'
							value={email}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password : </label>
						<input onChange={event => this.onPasswordChange(event)} 
							type='text' 
							name='password'
							value={password}
						/>
					</div>
					<button type='submit'>Login</button>
				</div>
			</form>
		);
	}
}

LoginForm.propTypes = {
	onSubmit : PropTypes.func
};

export default LoginForm;