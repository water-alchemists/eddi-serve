'use strict';
import EddiFireStarter from '../modules/eddi-firebase';

import { browserHistory } from 'react-router';

import {
	PATHS,
	EDDI_GETALL_SUCCESS,
	EDDI_GETALL_ERROR,
	EDDI_UPDATE_SUCCESS,
	EDDI_UPDATE_ERROR,
	EDDI_UPDATESTART_SUCCESS,
	EDDI_UPDATEEND_SUCCESS,
	EDDI_UPDATESNOOZE_SUCCESS,
	EDDI_READINGS_SUCCESS,
	EDDI_GETONE_SUCCESS,
	EDDI_GETONE_ERROR,
	EDDI_SELECT
} from '../constants';

const EddiFire = EddiFireStarter();

function getAllEddiSuccess(list){
	return {
		type : EDDI_GETALL_SUCCESS,
		list
	};
}

function getAllEddiError(error){
	return {
		type : EDDI_GETALL_ERROR,
		error
	};
}

function assignEddiError(error){
	return {
		type : EDDI_GETALL_ERROR,
		error
	};
}

export function updateEddiSuccess(id, settings = {}){
	return {
		type : EDDI_UPDATE_SUCCESS,
		id,
		settings
	};
}

function updateEddiError(error){
	return {
		type : EDDI_UPDATE_ERROR,
		error
	};
}

function updateEddiStartSuccess(id, timing = {}){
	return {
		type : EDDI_UPDATESTART_SUCCESS,
		id,
		timing
	}
}

function updateEddiEndSuccess(id, timing = {}){
	return {
		type : EDDI_UPDATEEND_SUCCESS,
		id,
		timing
	}
}

function updateEddiSnoozeSuccess(id, snooze={}){
	return {
		type : EDDI_UPDATESNOOZE_SUCCESS,
		id,
		snooze
	}
}

function getOneEddiSuccess(selected){
	return {
		type : EDDI_GETONE_SUCCESS,
		selected
	};
}

function getOneEddiError(error){
	return {
		type : EDDI_GETONE_ERROR,
		error
	}
}

export function selectEddi(selected){
	return {
		type : EDDI_SELECT,
		selected
	};
}

export function selectEddiById(eddiId){
	return dispatch => {
		return EddiFire.findByEddi(eddiId)
			.then( eddi => dispatch(selectEddi(eddi)) )
			.catch( err => dispatch(getOneEddiError(err)) )
	}
}

export function getAllEddiByUserThunk(){
	return dispatch => {
		return EddiFire.isAuthenticated()
			.then(user => EddiFire.getAllEddiByUser(user.uid))
			.then( eddis => dispatch(getAllEddiSuccess(eddis)))
			.catch(err => dispatch(getAllEddiError(err)));
	}
}

export function assignEddiThunk(eddiId, info = {}){
	return dispatch => {
		return EddiFire.isAuthenticated()
			.then(user => {
				const userId = user.uid;
				return EddiFire.assignEddiToUser(userId, eddiId)
					.then(() => EddiFire.updateEddiSettings(eddiId, info))
					.then(() => EddiFire.getAllEddiByUser(userId));
			})
			.then(eddis => dispatch(getAllEddiSuccess(eddis)))
			.catch(err => dispatch(assignEddiError(err)))
	}
}

export function setEddiStartThunk(eddiId, hour, minute){
	const start = {};
	if(hour) start.hour = hour;
	if(minute) start.minute = minute;

	return dispatch => {
		if((!typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
		return EddiFire.setStartTime(eddiId, start)
			.then(update => dispatch(updateEddiStartSuccess(update.id, update.timing)))
			.catch(error => dispatch(updateEddiError(error)));
	}
}

export function setEddiEndThunk(eddiId, hour, minute){
	const end = {};
	if(hour) end.hour = hour;
	if(minute) end.minute = minute;

	return dispatch => {
		if(!(typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
		return EddiFire.setEndTime(eddiId, end)
			.then(update => dispatch(updateEddiEndSuccess(update.id, update.timing)))
			.catch(error => dispatch(updateEddiError(error)));
		}
}

export function setEddiSalinityThunk(eddiId, salinity){
	return dispatch => {
		return EddiFire.setSalinity(eddiId, salinity)
			.then(update => dispatch(updateEddiSuccess(update.id, update.settings)))
			.catch(error => dispatch(updateEddiError(error)));

	}
}

export function setEddiStateThunk(eddiId, state){
	return dispatch => {
		return EddiFire.setEddiState(eddiId, state)
			.then(update => dispatch(updateEddiSuccess(update.id, update.settings)))
			.catch(error => dispatch(updateEddiError(error)));
	}
}

export function setEddiSnoozeThunk(eddiId, minute){
	return dispatch => {
		return EddiFire.setEddiSnooze(eddiId, minute)
			.then(update => dispatch(updateEddiSnoozeSuccess(updated.id, updated.snooze)))
			.catch(error => dispatch(updateEddiError(error)));
	}
}

export function getEddiState(id, state){
	return {
		type : EDDI_UPDATEMACHINE_SUCCESS,
		id,
		state
	};
}

export function getEddiReadings(id, readings){
	return {
		type : EDDI_READINGS_SUCCESS,
		id,
		readings
	};
}
