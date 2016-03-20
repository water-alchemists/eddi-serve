'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';
import ModalWrapper from '../components/ModalWrapper';

import { userLogout } from '../actions/user';
import { appStartThunk } from '../actions/app';

import style from '../less/base.less';


function mapStateToProps(state){
	return {
		user : state.user,
		modal : state.modal,
		menu : state.menu,
		eddis : state.eddis,
	};
}

function mapDispatchToProps(dispatch){
	return {
		getInitialData : (eddiId) => dispatch(appStartThunk(eddiId)),
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
		const { getInitialData, location } = this.props,
			{ query={} } = location;
		getInitialData(query.id);
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
		const { user, modal, menu, eddis, logout,  dispatch, location } = this.props,
			{ isOpen } = this.state,
			children = this._cloneChildrenWithToggle(),
			{ pathname } = location;

		return (
			<div>
				<Menu isOpen={isOpen}
					logout={logout}
					user={user}
					eddis={eddis}
					menu={menu}
					current={pathname}
				/>
				{children}
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
