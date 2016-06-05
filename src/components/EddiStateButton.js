'use strict';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import style from '../less/EddiStateButton.less';

function setStateText(state){
	switch(state){
	case 0 :
		return 'OFF';
	case 1 : 
		return 'ON';
	default : 
		return 'AUTO';
	};
}

class EddiStateButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			hide : true
		};
	}
	
	componentWillReceiveProps(nextProps){
		const { hide } = this.state;
		this.setState({ hide : true });	
	}
	
	_toggle(event){
		event.preventDefault();
		const { hide } = this.state;
		this.setState({ hide : !hide });
	}
	
	clickHandler(event, value, cb){
		event.preventDefault();
		if(cb instanceof Function) return cb(value);
	}
	
	_renderOptions(){
		const { onClick, value } = this.props;
		
		const options = [
			0,
			1,
			2
		],
		optionsElements = options.map(option => {
			const optionClass = classNames([
				'state-options',
				{ active : option === value }
			]),
			optionName = setStateText(option);
			
			return (
				<div className={optionClass}
					onClick={event => this.clickHandler(event, option, onClick) }
					key={optionName}
				>
					{optionName}
				</div>
			);
		});
		
		
		
		return (
			<div className='state-options-container'>
				{ optionsElements }
			</div>
		)
	}
	
	render(){
		const { value } = this.props,
			{ hide } = this.state,
			stateText = setStateText(value),
			OptionContainerElement = hide ? null : this._renderOptions();

		return (
			<div className='eddi-state-button'
				onClick={event => this._toggle(event)}
			>
				{stateText}
				{ OptionContainerElement }
			</div>
		);
	}
}

EddiStateButton.propTypes = {
	value : PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};

export default EddiStateButton;