'use strict';
import moment from 'moment';

function createTimeOptions(increment){
	const timeObjects = [];
	for(let h = 0; h < 24; h++){
		for(let m = 0; m < 60; m += increment){
			timeObjects.push({ h, m });
		}
	}

	return timeObjects.map(timeObj => moment(timeObj));
}

export const timeOptions = createTimeOptions(15);

export const salinityOptions = {
	min: 500,
	default : 1000
};