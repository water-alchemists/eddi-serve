'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import EddiStateButton from './EddiStateButton';

class TroubleshootImage extends Component {
	clickHandler(value){
		const { onClick } = this.props;
		if(onClick instanceof Function) onClick(value);
	}
	_renderSprites(){
		const { current } = this.props,
			states = [0, 1, 2, 3];

		return states.map(state => {
			const spriteClass = classNames(['sprite', 'circle', { blue : state === current }, `state-${state}`]);
			return (
				<div key={`sprite-${state}`} className={spriteClass}>
					<span>{ state + 1 }</span>
				</div>
			);
		})
	}

	_renderBoxes(){
		const { current } = this.props,
			states = [2, 3];

		return states.map(state => {
			const boxClass = classNames(['extensions', { blue : state === current }, `state-${state}`]);
			return (
				<div key={`box-${state}`} className={boxClass}></div>
			);
		})
	}
	render(){
		const { current, state } = this.props;
		return (
			<div className='troubleshoot-image-header'>
				<div className='troubleshoot-image-container'>
					<div className='troubleshoot-image'>
						{ this._renderSprites() }
						{ this._renderBoxes() }
					</div>
				</div>
				<div className='image-footer'>
					<EddiStateButton value={state}
						onClick={value => this.clickHandler(value)}
					/>
				</div>
			</div>
		);
	}
}

TroubleshootImage.propTypes = {
	onClick : PropTypes.func,
	current : PropTypes.number,
	state : PropTypes.number
}

export default TroubleshootImage;