'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';
import ModalWrapper from '../components/ModalWrapper';

import { userLogout, userLoginWithTokenThunk } from '../actions/user';

import BaseLess from './base.less';



function mapStateToProps(state){
	return {
		user : state.user,
		modal : state.modal
	};
}

function mapDispatchToProps(dispatch){
	return {
		loginWithToken : () => dispatch(userLoginWithTokenThunk()),
		logout : () => dispatch(userLogout()),
		dispatch : action => dispatch(action)
	}
}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen : true
		};
	}

	componentWillMount(){
		const { loginWithToken } = this.props;
		loginWithToken();
	}

	_toggleMenu(isOpen){
		this.setState({ isOpen });
	}

	_cloneChildrenWithToggle(){
		const { children } = this.props,
			additionalProps = {
				toggleMenu : isOpen => this._toggleMenu(isOpen)
			};

		return React.Children.map(children, child => React.cloneElement(child, additionalProps));
	}

	render(){
		const { user, logout, modal, dispatch } = this.props,
			{ isOpen } = this.state,
			children = this._cloneChildrenWithToggle();
		return (
			<div>
				<Menu isOpen={isOpen}
					logout={logout}
					user={user}
				/>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
				<ModalWrapper dispatch={dispatch}
					modal={modal}
				/>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
