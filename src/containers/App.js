'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import Menu from '../components/Menu';

import { userLogout, userLoginWithTokenThunk } from '../actions/user';
import { modalHide } from '../actions/modal';

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
		modalHide : () => dispatch(modalHide())
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

	_renderModal(){
		const { modal, modalHide } = this.props,
			{ on, props, component } = modal,
			closeModal = () => modalHide();
		if(!on) return null;
		return (
			<Modal isOpen={on}>
				<div onClick={() => closeModal()}>hello</div>
			</Modal>
		);
	}

	render(){
		const { user, logout } = this.props,
			{ isOpen } = this.state,
			children = this._cloneChildrenWithToggle(),
			ModalElement = this._renderModal();
		return (
			<div>
				<Menu isOpen={isOpen}
					logout={logout}
					user={user}
				/>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
				{ModalElement}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);