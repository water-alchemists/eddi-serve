'use strict';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import HomeButton from './HomeButton';

import { PATHS } from '../constants';

class LoggedOutHome extends Component {
	navigateTo(key){
		const destination = PATHS[key];
		if(destination) return browserHistory.push(destination);
	}
	render(){
		return (
			<div>
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

export default LoggedOutHome;