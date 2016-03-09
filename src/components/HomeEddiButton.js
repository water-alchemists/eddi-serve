'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class HomeEddiButton extends Component {
	render(){
		const { name } = this.props;

		return (
			<div>
				<div style={styles.textCenter}>Insert Image</div>
				<div style={styles.bottomLine}>
					<p>{name}</p>
					<p>{'>'}</p>
				</div>
			</div>
		);
	}
}

HomeEddiButton.propTypes = {
	name : PropTypes.string.isRequired
};

const styles = {
	textCenter : {
		textAlign: 'center'
	},
	bottomLine : {
		display : 'flex',
		flexDirection : 'row',
		alignItems : 'center',
		justifyContent : 'space-between'
	}
}

export default HomeEddiButton;