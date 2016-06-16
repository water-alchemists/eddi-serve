'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { PATHS } from '../../constants';

import HomeButton from '../../components/HomeButton';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import ResetPasswordForm from '../../components/ResetPasswordForm';

import { getAllEddiByUserThunk } from '../../actions/eddis';
import { userLoginWithPasswordThunk, userCreateThunk, userResetPasswordThunk } from '../../actions/user';
import { formClear } from '../../actions/form';

import style from './Home.less';




const Modes = {
	BASE: 0,
	LOGIN: 1,
	SIGNUP: 2,
	RESET : 3
};

const ROUTES = {
	LOGIN : { pathname : PATHS.HOME, query : { view : 'login' } },
	SIGNUP : { pathname : PATHS.HOME, query : { view : 'signup' } },
	RESET : { pathname : PATHS.HOME, query : { view : 'reset' } }
}

function mapStateToProps(state){
	return {
		user : state.user,
		eddis : state.eddis.list,
		form : state.form
	};
}

function mapDispatchToProps(dispatch){
	return {
		navigateTo: (pathname, query) => browserHistory.push({ pathname, query }),
		login: ({ email, password }) => dispatch(userLoginWithPasswordThunk(email, password)),
		signup: (user) => dispatch(userCreateThunk(user)),
		reset : result => dispatch(userResetPasswordThunk(result.email)),
		formClear : () => dispatch(formClear)
	};
}


class Home extends Component {
	constructor(props, context){
		super(props, context);
		const { router } = this.context;

		let mode;
		if(router.isActive(ROUTES.LOGIN)) mode = Modes.LOGIN;
		else if(router.isActive(ROUTES.SIGNUP)) mode = Modes.SIGNUP;
		else if(router.isActive(ROUTES.RESET)) mode = Modes.RESET;
		else mode = Modes.BASE;
		
		this.state = {
			mode
		};
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.user.email ){
			// user is logged in. go directly to list screen
			browserHistory.replace(PATHS.LIST);
		}

		const { router } = this.context;
		let mode;
		if(router.isActive(ROUTES.LOGIN)) mode = Modes.LOGIN;
		else if(router.isActive(ROUTES.SIGNUP)) mode = Modes.SIGNUP;
		else if(router.isActive(ROUTES.RESET)) mode = Modes.RESET;
		else mode = Modes.BASE;
		this.setState({ mode });
	}

	navigateTo(key){
		const destination = PATHS[key];
		if(destination) return browserHistory.push(destination);
	}

	_renderBase(){
		return [
			(<div className='auth-button'
				onClick={ () => browserHistory.push(ROUTES.LOGIN)}
			>
				LOGIN
			</div>),
			(<div className='auth-button'
				onClick={ () => browserHistory.push(ROUTES.SIGNUP)}
				>
				SIGN UP
			</div>),
			(<div className='auth-button'
				onClick={ () => browserHistory.push(ROUTES.RESET)}
				>
				RESET
			</div>)
		];
	}

	_renderLogin(){
		return <LoginForm onSubmit={this.props.login} />;
	}

	_renderSignup(){
		return <SignupForm onSubmit={this.props.signup} />;
	}
	
	_renderReset(){
		const { reset, formClear, form } = this.props,
			{ submitted, success, message } = form; 
		return <ResetPasswordForm 
			submitted={submitted}
			success={success}
			message={message}
			onSubmit={this.props.reset} 
			componentWillUnmount={this.props.formClear}
		/>;
	}

	render(){
		var modeContent;
		switch(this.state.mode){
			case Modes.BASE:
				modeContent = this._renderBase();
				break;
			case Modes.LOGIN:
				modeContent = this._renderLogin();
				break;
			case Modes.SIGNUP:
				modeContent = this._renderSignup();
				break;
			case Modes.RESET:
				modeContent = this._renderReset();
				break;
			default:
				return null;
		}

		return (
			<div id="home" className="page dark">
				<div className="content" >
					<div className="logo-container">
						<img src='/assets/logo.png' />
					</div>
					{ modeContent }
				</div>
			</div>
		);
	}
}


Home.propTypes = {
	eddis : PropTypes.arrayOf(
		PropTypes.shape({
			name : PropTypes.string
		})
	)
};

Home.contextTypes = {
	router : PropTypes.object.isRequired
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
