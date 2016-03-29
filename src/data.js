'use strict';
import moment from 'moment';

import { SALINITY_THRESHOLD } from './constants';
moment.locale('en');

function getDaysBetween(end, beginning){
	const days = [];
	for(let x = beginning; x < end; x++){
		days.push(x + 1);
	}
	return days;
}

function createHours(num){
	const hourOptions = [];
	for(let i = 0; i < num; i++){
		hourOptions.push(i + 1);
	}
	return hourOptions;
}

function createMinutes(increment){
	const minutesOptions = [];
	let minuteString;
	for(let i = 0; i < 60; i += increment){
		minuteString = moment(i, 'm').format('mm');
		minutesOptions.push(minuteString);
	}
	return minutesOptions;
}

export function createDays(month, year){
	//month is supposed to be zero-based
	if(typeof month === 'string') month = moment.month(month);
	const max = new Date(year, month, 0).getDate(),
		days = [];
	for(let i = 0; i <= max; i++){
		days.push(i + 1);
	}
	return days;
}

export function createMonths(){
	return moment.months();
}

export function createYears(start){
	const years = [],
		current = new Date().getFullYear();
	for(let i = start; i <= current; i++){
		years.push(i);
	}

	return years;
}

export function convertMilitaryToNormal(hour){
	const time = moment({ hour });
	return time.format('h a').split(' ');
}

export function convertNormalToMilitary(hour, a){
	const time = moment(`${hour} ${a}`, 'h a')
	return parseInt(time.format('H'));
}


export function convertMinutesToString(minute){
	const time = moment({ minute });
	return time.format('mm');
}

export function convertStringToMinutes(minString){
	return parseInt(minString);
}

export const hourOptions = createHours(12);
export const minutesOptions = createMinutes(5);
export const aOptions = ['am', 'pm'];

export const salinityOptions = {
	min: 500,
	default : SALINITY_THRESHOLD
};

//readings
export function mapDateToReadings(readings){
	return Object.keys(readings)
		.map(utc => {
			return {
				...readings[utc],
				date : new Date(utc * 1000)
			}
		})
		.sort((a,b) => a.date > b.date);
}

export function formatReadingsToCsv(readings){
	const mapping = [
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
	];
	const first = mapping.map(map => map.title)
				.reduce((row, header) => `${row},${header}`);

	return readings
		.map(reading => {
			return mapping.reduce((row, map, i) => {
				let value = reading[map.dataKey]
				if(!i) return moment(value).format('MM-DD-YYYY HH:mm');
				return`${row},${value}`;
			},'');
		})
		.reduce((body, row) => `${body}\n${row}`, first);
}

export function formatReadingsToPdf(readings){
	return readings.
		map(reading => {
			return Object.keys(reading)
				.reduce((accum, key) => {
					let value = reading[key],
						formattedValue;
					if(value instanceof Date) formattedValue = moment(value).format('MM-DD-YYYY HH:mm');
					else if(typeof value === 'number') formattedValue = commaSeparateNumber(value);
					else formattedValue = value;

					accum[key] = formattedValue;
					return accum;
				}, {});
		});
}

export function formatToTodayHistory(readings, yProp){
	const current = new Date(),
		todayData = readings.filter(reading => moment(reading.date).isSame(current, 'day')), 
		hours = createHours(24);

	function getAverageOfHour(data, hour){
		const hourData = data.filter(entry => entry.date.getHours() === hour - 1);
		let average;
		if(hourData.length) average = hourData.reduce((sum, entry) => sum + entry[yProp], 0) / hourData.length;
		return average;
	}
	return hours.map(hour => {
		return {
			x : moment({ hour: hour - 1 }).toDate(),
			y : getAverageOfHour(todayData, hour)
		};
	});
}

// TODO: returning wrong array

export function formatToWeekHistory(readings, yProp){
	const current = new Date(),
		beginning = new Date(current - 7 * 1000 * 60 * 60 * 24),
		weekData = readings.filter(reading => moment(reading.date).isBetween(beginning, current, 'day')),
		daysBetween = getDaysBetween(current.getDate(), beginning.getDate());

	function getAverageOfDay(data, day){
		const dayData = data.filter(entry => entry.date.getDate() === day);
		let average;
		if(dayData.length) average = dayData.reduce((sum, entry) => sum + entry[yProp], 0) / dayData.length;
		return average;
	}

	return daysBetween.map(day => {
		return {
			x : moment({ day, year : current.getFullYear(), month : current.getMonth() }).toDate(),
			y : getAverageOfDay(weekData, day)
		};
	});
}


// TODO: fix syntax. returning wrong array
export function formatToMonthHistory(readings, yProp){
	const current = new Date(),
		monthData = readings.filter(reading => moment(reading.date).isSame(current, 'month')),
		days = createDays(current.getMonth(), current.getFullYear());

	function getAverageOfDay(data, day){
		const dayData = data.filter(entry => entry.date.getDate() === day);
		let average;
		if(dayData.length) average = dayData.reduce((sum, entry) => sum + entry[yProp], 0) / dayData.length;
		return average;
	}

	return days.map(day => {
		return {
			x : moment({ day, year : current.getFullYear(), month : current.getMonth() }).toDate(), 
			y : getAverageOfDay(monthData, day)
		};
	});
}

export function commaSeparateNumber(val){
	let stringified;
	if(typeof val === 'string') stringified = val;
	else stringified = val.toString();

	if(/(\d+)(\d{3})/.test(stringified)){
		stringified = stringified.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}

	return stringified;
}

export function averageReadingsByHour(readings){
	const format = 'M D YYYY H',
		hoursList = readings.reduce((dates, reading) => { // groups all the readings by hour
			const hour = moment(reading.date).format(format);
			if(dates[hour]) dates[hour].push(reading);
			else dates[hour] = [reading];
			return dates;
		}, {}), 
		averageByHour = Object.keys(hoursList).map(hour => { // averages each group
			const readingsSet = hoursList[hour],
				summary = readingsSet.reduce((accum, reading, i) => {
					//add each key of the reading to the accumulator
					Object.keys(reading).forEach(key => {
						let initialValue = accum[key] || 0;
						accum[key] = initialValue + reading[key];
						if(i === readingsSet.length - 1) accum[key] = Math.floor(accum[key] / readingsSet.length);
					});
					return accum;
				}, {});
			//set date to the hour
			summary.date = moment(hour, format).toDate();
			return summary;
		});

	return averageByHour;
}

