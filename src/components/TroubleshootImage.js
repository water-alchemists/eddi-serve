'use strict';
import React, { Component, PropTypes } from 'react';

import EddiStateButton from './EddiStateButton';

class TroubleshootImage extends Component {
	clickHandler(value){
		const { onClick } = this.props;
		if(onClick instanceof Function) onClick(value);
	}
	render(){
		const { current } = this.props;
		return (
			<div className='troubleshoot-image'>
				<div className='sprite circle'><span>1</span></div>
				<div className='sprite circle blue'><span>2</span></div>
				<div className='image-footer'>
					<EddiStateButton 
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