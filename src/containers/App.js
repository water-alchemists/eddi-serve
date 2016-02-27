'use strict';
import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

class App extends Component {
	render(){
		const { children } = this.props;
		return (
			<div>
				<header>
					Links:
					{' '}
					<Link to="/react">Home</Link>
					{' '}
					<Link to="/react/login">Login</Link>
					{' '}
					<Link to="/react/signup">Signup</Link>
				</header>
				<div>
					<button onClick={() => hashHistory.push('/')}>Go to /foo</button>
				</div>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
			</div>
		);
	}
}

export default App;