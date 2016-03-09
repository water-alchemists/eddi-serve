'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class HomeButton extends Component {
	render(){
		const { name, image } = this.props,
			Image = (<div style={styles.textCenter}>{image}</div>),
			showImage = image ? Image : null;

		return (
			<div>
				{showImage}
				<div style={styles.bottomLine}>
					<p>{name}</p>
					<p>{'>'}</p>
				</div>
			</div>
		);
	}
}

HomeButton.propTypes = {
	name : PropTypes.string.isRequired,
	image : PropTypes.string
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

export default HomeButton;