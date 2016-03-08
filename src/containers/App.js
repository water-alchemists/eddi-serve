'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';

import { userLogout, userLoginWithTokenThunk } from '../actions/user';

function mapStateToProps(state){
	return {
		user : state.user,
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		loginWithToken : () => dispatch(userLoginWithTokenThunk()),
		logout : () => dispatch(userLogout())
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
		console.log('this is the children', children);
		return React.Children.map(children, child => React.cloneElement(child, additionalProps));
	}

	render(){
		const { user, eddi, logout } = this.props,
			{ isOpen } = this.state,
			children = this._cloneChildrenWithToggle();
		return (
			<div>
				<Menu isOpen={isOpen}
					logout={logout}
					user={user}
				/>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);