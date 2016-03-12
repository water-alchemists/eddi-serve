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
	for(let i = 0; i < 60; i++){
		minutesOptions.push(i * increment);
	}
	return minutesOptions;
}

function convertMiltaryToNormal(){

}

function convertNormalToMilitary(hour, period){
	if(hour <= 12) return hour;
	
}

export const hourOptions = createHours(12);
export const minutesOptions = createMinutes(15);

export const salinityOptions = {
	min: 500,
	default : 1000
};