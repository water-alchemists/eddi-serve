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
					{' '}
					<Link to="/react/dashboard">Dashboard</Link>
					{' '}
					<Link to="/react/report">Report</Link>
					{' '}
					<Link to="/react/settings">Settings</Link>
					{' '}
					<Link to="/react/troubleshoot">Troubleshoot</Link>
				</header>
				<div>
					<button onClick={() => hashHistory.push('/')}>Go to Home</button>
				</div>
				<div style={{ marginTop: '1.5em' }}>{children}</div>
			</div>
		);
	}
}

export default App;