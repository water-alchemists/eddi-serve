'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../actions/menu';

import { mapDateToReadings, formatReadingsToCsv } from '../data';

import DateSelect from '../components/DateSelect';

const OPTIONS = {
	CSV : 'csv',
	PDF : 'pdf'
}

function mapStateToProps(state){
	return {
		eddi : state.eddis.selected
	};
}

function mapDispatchToProps(dispatch){
	return {
		updateMenuName: name => dispatch(menuNameChange(name)),
	};
}

function getDateObject(date){
	if(!(date instanceof Date)) return;
	return {
		day: date.getDate(),
		month : date.getMonth(),
		year : date.getFullYear()
	};
}

function isActive(compare, value){
	return compare === value ? 'active' : '';
}

class Report extends Component {
	constructor(props){
		super(props);
		// todays
		const today = new Date(),
			day = today.getDate(),
			month = today.getMonth(),
			year = today.getFullYear();

		this.state = {
			start : {
				day : null,
				month : null,
				year : null,
			}, 
			end : {
				month,
				day,
				year
			},
			type : OPTIONS.CSV
		};
	}
	componentWillMount(){
		const { updateMenuName, eddi={} } = this.props,
			{ id, readings, settings } = eddi;
		if( id ) updateMenuName(settings.name);
		if(readings) {
			const formattedReadings = mapDateToReadings(readings),
				start = getDateObject(formattedReadings[0].date);
			this.setState({
				start,
				readings : formattedReadings
			});
		}
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps,
			{ id, readings, settings } = eddi;

		if( id !== oldEddi.id ) {
			updateMenuName(settings.name);
			if(readings) {
				const formattedReadings = mapDateToReadings(readings),
					start = getDateObject(formattedReadings[0].date);
				this.setState({
					start,
					readings: formattedReadings
				});
			}
		}
	}

	clickOption(event, type){
		event.preventDefault();
		this.setState({ type });
	}

	onStartChange(value){
		const { start } = this.state,
			newStart = {
				...start,
				...value
			};
		this.setState({ start : newStart });
	}

	onEndChange(value){
		const { end } = this.state,
			newEnd = {
				...end,
				...value
			};
		this.setState({ end : newEnd });
	}

	submitHandler(event){
		event.preventDefault();
		const { start, end, readings, type } = this.state,
			focus = readings.filter(reading => {
				const { date } = reading,
					startDate = new Date(start.year, start.month, start.day),
					endDate = new Date(end.year, end.month, end.day);
				return date >= startDate && date <= endDate;
			});
		if(isActive(OPTIONS.CSV, type)) console.log(formatReadingsToCsv(focus));
	}

	render(){
		const { eddi } = this.props,
			{ start, end, type } = this.state;
		return (
			<div id="report" className='page'>
				<form onSubmit={event => this.submitHandler(event)}>
					<div>
						<div>
							<h3>Start Report</h3>
							<DateSelect onChange={value => this.onStartChange(value)}
								year={start.year}
								month={start.month}
								day={start.day}
							/>
						</div>
						<div>
							<h3>End Report</h3>
							<DateSelect onChange={value => this.onEndChange(value)}
								year={end.year}
								month={end.month}
								day={end.day}
							/>
						</div>
						<div>
							<div className={isActive(OPTIONS.CSV, type)}
								onClick={event => this.clickOption(event, OPTIONS.CSV)}
							>
								<p>CSV</p>
							</div>
							<div className={isActive(OPTIONS.PDF, type)}
								onClick={event => this.clickOption(event, OPTIONS.PDF)}
							>
								<p>PDF</p>
							</div>
						</div>
					</div>
					<button type='submit'>
						EXPORT
					</button>
				</form>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
