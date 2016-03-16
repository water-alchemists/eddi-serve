'use strict';
import React, { Component, PropTypes } from 'react';

import { createDays, createMonths, createYears } from '../constants';

const MONTHS = createMonths();

class DateSelect extends Component {
	onDayChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			day = event.target.value;

		if(onChange instanceof Function) onChange({ day });
	}
	onMonthChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			month = event.target.value;
		if(onChange instanceof Function) onChange({ month });
	}

	onYearChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			year = event.target.value;

		if(onChange instanceof Function) onChange({ year });
	}

	_renderDays(){
		const { month, year } = this.state,
			days = createDays(month, year);

		return days.map(day => (<option value={day} key={day}>{day}</option>));
	}

	_renderMonths(){
		const months = MONTHS;
		return months.map((month, i) => (<option value={i} key={month}>{month}</option>));
	}

	_renderYears(){
		const {startYear} = this.props,
			years = createYears(start);

		return years.map(year => (<option value={year} key={year}>{year}</option>));
	}

	render(){
		const YearElements = this._renderYears(),
			MonthElements = this._renderMonths(),
			DayElements = this._renderDays();

		return (
			<div>
				<select onChange={event => this.onDayChange(event)}>
					{DayElements}
				</select>
				<select onChange={event => this.onMonthChange(event)}>
					{MonthElements}
				</select>
				<select onChange={event => this.onYearChange(event)}>
					{YearElements}
				</select>
			</div>
		);
	}
}

DateSelect.propTypes = {
	onChange : PropTypes.func.isRequired,
	startYear : PropTypes.number,
	year : PropTypes.number.isRequired,
	day : PropTypes.number.isRequired,
	month : PropTypes.number.isRequired
};

DateSelect.defaultProps = {
	startYear : 2014
};

export default DateSelect;