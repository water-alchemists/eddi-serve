'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../actions/menu';

import { mapDateToReadings } from '../data';

import DateSelect from '../components/DateSelect';

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
			}
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

	clickHandler(event){
		event.preventDefault();
		const { start, end, readings } = this.props;
		
	}

	render(){
		const { eddi } = this.props,
			{ start, end } = this.state;
		return (
			<div id="report" className='page'>
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
				</div>
				<button type='button' onClick={event => this.clickHandler(event)}>
					EXPORT
				</button>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
