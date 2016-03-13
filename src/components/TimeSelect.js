'use strict';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { hourOptions, 
	minutesOptions, 
	aOptions, 
	convertMilitaryToNormal, 
	convertNormalToMilitary,
	convertMinutesToString,
	convertStringToMinutes
} from '../data';

class TimeSelect extends Component {
	constructor(props){
		super(props);
		const { hour, minute } = this.props,
			hourAndAm = convertMilitaryToNormal(hour),
			hr = parseInt(hourAndAm[0]),
			min = convertMinutesToString(minute),
			a = hourAndAm[1];

		this.state = {
			hr,
			min,
			a
		}
		console.log('this is the state', this.state, 'this is raw', this.props.hour, this.props.minute)
	}
	onHourChanges(event){
		event.preventDefault();

		const hour = event.target.value;
		console.log('hours', hour);
	}

	onMinuteChanges(event){
		event.preventDefault();
		const minute = event.target.value;
		console.log('minutes', minute);
	}

	onAmPmChanges(event){
		event.preventDefault();
		const a = event.target.value;
		console.log('ampm', a);
	}
	_renderHours(){
		const { hr } = this.state;
		return hourOptions.map((h, i) => {
			return (
				<option value={h} key={h}>
					{h}
				</option>
			);
		})
	}

	_renderMinutes(){
		const { min } = this.state;
		return minutesOptions.map((m, i) => {
			return (
				<option value={m} key={m}>
					{m}
				</option>
			);
		});
	}

	_renderAmPm(){
		const { a } = this.state;
		return aOptions.map((am, i) => {
			return (
				<option value={am} key={am}>
					{am}
				</option>
			);
		})
	}

	render(){
		const { hr, min, a } = this.state,
			HourElements = this._renderHours(),
			MinuteElements = this._renderMinutes(),
			AmPmElements = this._renderAmPm();

		console.log('this is hte min', min);
		return (
			<div>
				<select defaultValue={hr}
					onChange={event => this.onHourChanges(event)}
				>
					{HourElements}
				</select>
				<select defaultValue={min}
					onChange={event => this.onMinuteChanges(event)}
				
				>
					{MinuteElements}
				</select>
				<select defaultValue={a}
					onChange={event => this.onAmPmChanges(event)}
				>
					{AmPmElements}
				</select>
			</div>
		);
	}
}

TimeSelect.propTypes = {
	onChange : PropTypes.func,
	hour : PropTypes.number, 
	minute : PropTypes.number
}

TimeSelect.defaultProps = {
	hour : 1,
	minute : 0
};

export default TimeSelect;