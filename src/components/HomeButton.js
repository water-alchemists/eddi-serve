'use strict';
import React, { Component } from 'react';

const { 
	PropTypes
} = React;

class HomeButton extends Component {
	clickHandler(){
		const { onClick } = this.props;
		if(onClick instanceof Function) return onClick();
	}

	render(){
		const { name, image } = this.props,
			Image = (<div style={styles.textCenter}>{image}</div>),
			showImage = image ? Image : null;

		return (
			<div onClick={() => this.clickHandler()}>
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
	image : PropTypes.string,
	onClick : PropTypes.func
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