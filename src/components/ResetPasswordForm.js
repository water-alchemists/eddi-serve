'use strict';
import React, { Component } from 'react';

const {
	PropTypes
} = React;

class ResetPasswordForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
		};
	}
    
    componentWillUnmount(){
        const { componentWillUnmount } = this.props;
        if(componentWillUnmount instanceof Function) componentWillUnmount();
    }

	onEmailChange(event){
		const email = event.target.value;
		event.preventDefault();
		this.setState({ email });
	}

	submitHandler(event){
		const { onSubmit } = this.props,
			user = this.state;

		event.preventDefault();
		if(onSubmit) onSubmit(user);
	}
    
    _renderMessage(){
        const { submitted, success, message } = this.props;
        if(!submitted) return null;
        return (
           <div className='message'>
                { message }
           </div>
        );
    }

	render(){
		const { email, password } = this.state
		return (
			<form onSubmit={event => this.submitHandler(event)}>
                { this._renderMessage() }
				<input onChange={event => this.onEmailChange(event)}
					type='email'
					name='email'
					value={email}
					placeholder="email"
				/>
				<button type='submit'>Reset Password > </button>
			</form>
		);
	}
}

ResetPasswordForm.propTypes = {
	onSubmit : PropTypes.func,
    componentWillUnmount : PropTypes.func,
    message : PropTypes.string,
    success : PropTypes.bool,
    submitted : PropTypes.bool
};

export default ResetPasswordForm;
