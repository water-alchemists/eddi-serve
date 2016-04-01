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
			const spriteClass = classNames(['sprite', 'circle', { blue : state === current }]);
			return (
				<div key={state} className={spriteClass}>
					<span>{ state + 1 }</span>
				</div>
			);
		})
	}
	render(){
		const { current } = this.props;
		return (
			<div className='troubleshoot-image'>
				{
					this._renderSprites()
				}
				<div className='image-footer'>
					<EddiStateButton value={!!current}
						onClick={value => this.clickHandler(value)}
					/>
				</div>
			</div>
		);
	}
}

TroubleshootImage.propTypes = {
	onClick : PropTypes.func,
	current : PropTypes.number
}

export default TroubleshootImage;