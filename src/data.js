'use strict';
import moment from 'moment';

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