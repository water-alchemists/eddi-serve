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

	componentWillReceiveProps(nextProps, oldProps){
		const { hour, minute } = nextProps,
			hourAndAm = convertMilitaryToNormal(hour),
			hr = parseInt(hourAndAm[0]),
			min = convertMinutesToString(minute),
			a = hourAndAm[1];
		console.log('these are the next props', nextProps, hr, min, a);

		this.setState({ hr, min, a});
	}

	onHourChanges(event){
		event.preventDefault();

		const { onChange } = this.props,
			{ a } = this.state,
			hour = event.target.value,
			formattedHour = convertNormalToMilitary(hour, a);
		if(onChange) return onChange({ hour : formattedHour });
	}

	onMinuteChanges(event){
		event.preventDefault();
		const { onChange } = this.props,
			minute = event.target.value,
			formattedMinute = convertStringToMinutes(minute);
		console.log('minutes', minute);
		if(onChange) return onChange({ minute : formattedMinute });
	}

	onAmPmChanges(event){
		event.preventDefault();
		const { onChange } = this.props,
			{ hr } = this.state,
			a = event.target.value,
			formattedHour = convertNormalToMilitary(hr, a);
		if(onChange) return onChange({ hour : formattedHour });
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

		return (
			<div>
				<select value={hr}
					onChange={event => this.onHourChanges(event)}
				>
					{HourElements}
				</select>
				<select value={min}
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