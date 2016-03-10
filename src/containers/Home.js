'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

import HomeButton from '../components/HomeButton';
import LoggedOutHome from '../components/LoggedOutHome';
import LoggedInHome from '../components/LoggedInHome';

import { getAllEddiByUserThunk } from '../actions/eddis';

function mapStateToProps(state){
	return {
		user : state.user,
		eddis : state.eddis.list
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

	render(){
		const { user, eddis } = this.props,
			{ email } = user,
			LoggedOutElement = <LoggedOutHome />,
			LoggedInElement = <LoggedInHome eddis={eddis} />,
			showHome = email ? LoggedInElement : LoggedOutElement;
		console.log('these are teh eddis', eddis);
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