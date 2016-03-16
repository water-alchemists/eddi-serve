'use strict';
import moment from 'moment';
moment.locale('en');

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
	for(let i = 0; i < max; i++){
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
	default : 1000
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

