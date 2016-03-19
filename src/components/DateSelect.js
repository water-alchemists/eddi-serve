'use strict';
import React, { Component, PropTypes } from 'react';

import { createDays, createMonths, createYears } from '../data';

import style from '../less/DateTimeSelect.less';

const MONTHS = createMonths();


class DateSelect extends Component {
	onDayChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			day = parseInt(event.target.value);

		if(onChange instanceof Function) onChange({ day });
	}
	onMonthChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			month = parseInt(event.target.value);
		if(onChange instanceof Function) onChange({ month });
	}

	onYearChange(event){
		event.preventDefault();
		const { onChange } = this.props,
			year = parseInt(event.target.value);

		if(onChange instanceof Function) onChange({ year });
	}

	_renderDays(){
		const { month, year } = this.props,
			days = createDays(month, year);

		return days.map(day => (<option value={day} key={day}>{day}</option>));
	}

	_renderMonths(){
		const months = MONTHS;
		return months.map((month, i) => (<option value={i} key={month}>{month}</option>));
	}

	_renderYears(){
		const { startYear } = this.props,
			years = createYears(startYear);

		return years.map(year => (<option value={year} key={year}>{year}</option>));
	}

	render(){
		const { year, day, month } = this.props,
			YearElements = this._renderYears(),
			MonthElements = this._renderMonths(),
			DayElements = this._renderDays();

		return (
			<div className='date-time-select'>
				<select onChange={event => this.onDayChange(event)}
					value={day}
				>
					{DayElements}
				</select>
				<select onChange={event => this.onMonthChange(event)}
					value={month}
				>
					{MonthElements}
				</select>
				<select onChange={event => this.onYearChange(event)}
					value={year}
				>
					{YearElements}
				</select>
			</div>
		);
	}
}

DateSelect.propTypes = {
	onChange : PropTypes.func.isRequired,
	startYear : PropTypes.number,
	year : PropTypes.number,
	day : PropTypes.number,
	month : PropTypes.number
};

DateSelect.defaultProps = {
	startYear : 2014
};

export default DateSelect;