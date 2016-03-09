'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

import HomeButton from '../components/HomeButton';

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

	_renderLoggedOut(){

	}

	render(){
		const { user } = this.props;
		console.log('at home', this.props);
		return (
			<div>
				<HomeButton name={'Hello'} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);