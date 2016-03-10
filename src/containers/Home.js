'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

import HomeButton from '../components/HomeButton';
import LoggedOutHome from '../components/LoggedOutHome';

import { getAllEddiByUserThunk } from '../actions/eddis';

function mapStateToProps(state){
	return {
		user : state.user,
		eddis : state.eddis
	};
}

function mapDispatchToProps(dispatch){
	return {
		navigateTo : (pathname, query) => browserHistory.push({ pathname, query }),
		getEddisByUser : () => dispatch(getAllEddiByUserThunk())
	};
}

class Home extends Component {
	componentWillReceiveProps(nextProps){
		const { user, getEddisByUser } = this.props;
		if(nextProps.user !== user) return getEddisByUser();
	}

	clickHandler(destination, query){
		const { navigateTo } = this.props;
		navigateTo(destination, query);
	}

	_renderLoggedIn(){
		const { eddis } = this.props;
		return (
			<div></div>
		);
	}

	render(){
		const { user } = this.props,
			LoggedOutElement = <LoggedOutHome />,
			LoggedInElement = <HomeButton name={'Hello'} />,
			showHome = user.name ? LoggedInElement : LoggedOutElement;

		return (
			<div>
				{showHome}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);