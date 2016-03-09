'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

import HomeButton from '../components/HomeButton';
import LoggedOutHome from '../components/LoggedOutHome';

function mapStateToProps(state){
	return {
		user : state.user,
		eddis : state.eddis
	};
}

function mapDispatchToProps(dispatch){
	return {
		navigateTo : (pathname, query) => browserHistory.push({ pathname, query })
	};
}

class Home extends Component {
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
		console.log('at home', this.props);
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