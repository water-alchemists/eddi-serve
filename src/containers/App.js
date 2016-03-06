'use strict';
import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import Menu from '../components/Menu';
console.log('this is the Menu', Menu);
class App extends Component {
	render(){
		const { children } = this.props;
		return (
			<div>
				<Menu />
				<div style={{ marginTop: '1.5em' }}>{children}</div>
			</div>
		);
	}
}

export default App;