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
		const { name, image } = this.props;

		return (
			<div className='home-button' onClick={() => this.clickHandler()}>
				{ image }
				<div>
					<p> {name} </p>
					<p> {'>'} </p>
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

export default HomeButton;
