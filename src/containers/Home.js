'use strict';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { PATHS } from '../constants';

import HomeButton from '../components/HomeButton';

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

  componentWillMount(){
		if( this.props.user.email ){
			// user is logged in. go directly to list screen
			browserHistory.push(PATHS.LIST);
		}
	}

	navigateTo(key){
		const destination = PATHS[key];
		if(destination) return browserHistory.push(destination);
	}


	render(){
		return (
			<div id="home">
				<HomeButton onClick={() => this.navigateTo('LOGIN')}
					name={'Login'}
				/>
				<HomeButton onClick={() => this.navigateTo('SIGNUP')}
					name={'Signup'}
				/>
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


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
