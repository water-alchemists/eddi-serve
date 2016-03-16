'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { menuNameChange } from '../actions/menu';

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

class Report extends Component {
	constructor(props){
		super(props);
		const today = new Date(),
			day = today.getDate(),
			month = today.getMonth(),
			year = today.getFullYear();

		this.state = {
			start : {
				month : null,
				day : null,
				year : null
			}, 
			end : {
				month,
				day,
				year
			}
		};
	}
	componentWillMount(){
		const { updateMenuName, eddi={} } = this.props;
		if( eddi.id ) updateMenuName(eddi.settings.name);
	}

	componentWillReceiveProps(newProps){
		const { updateMenuName, eddi:oldEddi={} } = this.props,
			{ eddi } = newProps;

		if( eddi.id !== oldEddi.id ) updateMenuName(eddi.settings.name);
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
		const { start, end } = this.props;
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
				<button>EXPORT</button>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Report);
