'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { menuNameChange } from '../../actions/menu';

import { mapDateToReadings, formatReadingsToCsv, formatReadingsToPdf, averageReadingsByHour } from '../../data';
import { triggerDownload, triggerPdf } from '../../modules/download-trigger';

import DateSelect from '../../components/DateSelect';

import style from './Report.less';

const OPTIONS = {
	CSV : 'csv',
	PDF : 'pdf'
}

function mapStateToProps(state){
	return {
		eddi : state.selected
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
	return compare === value;
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
		else updateMenuName('Report');
		if(readings) {
			const newState = {},
				formattedReadings = Array.isArray(readings) ? readings : mapDateToReadings(readings);
			if(formattedReadings.length) newState.start = getDateObject(formattedReadings[0].date);
			newState.readings = formattedReadings;
			this.setState(newState);
		}
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps,
			{ id, readings, settings } = eddi;

		if( id !== oldEddi.id ) {
			if(id) updateMenuName(settings.name);
			else updateMenuName('Report');

			if(readings) {
				const newState = {},
					formattedReadings = Array.isArray(readings) ? readings : mapDateToReadings(readings);
				if(formattedReadings.length) newState.start = getDateObject(formattedReadings[0].date);
				newState.readings = formattedReadings;
				this.setState(newState);
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
			{ eddi } = this.props,
			focus = readings.filter(reading => {
				const { date } = reading,
					startDate = new Date(start.year, start.month, start.day),
					endDate = new Date(end.year, end.month, end.day);
				return date >= startDate && date <= endDate;
			});

		let data = averageReadingsByHour(focus),
			filename = `${ eddi.id }-${start.month}${start.day}${start.year}-${end.month}${end.day}${end.year}`;

		if(isActive(OPTIONS.CSV, type)) {
			let delimited = formatReadingsToCsv(data);
			filename = `${ filename }.csv`;
			triggerDownload(delimited, filename);
		}
		else {
			let columns = [
				{
					dataKey : 'date',
					title : 'Date'
				},
				{
					dataKey : 'ppmIn',
					title : 'Salinity In'
				},
				{
					dataKey : 'ppmOut',
					title : 'Salinity Out'
				},
				{
					dataKey : 'ppmRec',
					title : 'Salinity Recycled'
				},
				{
					dataKey : 'qDump',
					title : 'Dump Flow'
				},
				{
					dataKey : 'qOut',
					title : 'Water Flow'
				}
			],
			rows = formatReadingsToPdf(data), 
			options = {
				start : {
					...start,
					month : start.month + 1
				}, 
				end : {
					...end,
					month : end.month + 1
				}, 
				name : eddi.id
			};
			filename = `${ filename }.pdf`;
			triggerPdf(columns, rows, filename, options);
		}
		console.log('readings', readings, averageReadingsByHour(readings));
	}

	render(){
		const { eddi } = this.props,
			{ start, end, type } = this.state,
			csvClass = classNames([
				'selection',
				{ active : isActive(OPTIONS.CSV, type)}
			]),
			csvSpriteClass = classNames([
				'sprite',
				'csv',
				{ faded : !isActive(OPTIONS.CSV, type)}
			]),
			pdfClass = classNames([
				'selection',
				{ active : isActive(OPTIONS.PDF, type)}
			]),
			pdfSpriteClass = classNames([
				'sprite',
				'pdf',
				{ faded : !isActive(OPTIONS.PDF, type)}
			]);
		return (
			<div id="report" className='page'>
				<form onSubmit={event => this.submitHandler(event)}>
					<div>
						<div className='section'>
							<h3>Start Report</h3>
							<DateSelect onChange={value => this.onStartChange(value)}
								year={start.year}
								month={start.month}
								day={start.day}
							/>
						</div>
						<div className='section'>
							<h3>End Report</h3>
							<DateSelect onChange={value => this.onEndChange(value)}
								year={end.year}
								month={end.month}
								day={end.day}
							/>
						</div>
						<div className='document-section'>
							<div className={csvClass}
								onClick={event => this.clickOption(event, OPTIONS.CSV)}
							>
								<div className={csvSpriteClass}></div>
								<p>CSV</p>
							</div>
							<div className={pdfClass}
								onClick={event => this.clickOption(event, OPTIONS.PDF)}
							>
								<div className={pdfSpriteClass}></div>
								<p>PDF</p>
							</div>
						</div>
						<div className='document-section'>
							<button type='submit'className='export'>
								EXPORT
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
