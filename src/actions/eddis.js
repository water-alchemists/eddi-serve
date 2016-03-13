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

function updateEddiSuccess(id, settings = {}){
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

function updateEddiStartTime(id, timing = {}){
	return {
		type : EDDI_UPDATESTART_SUCCESS,
		id,
		timing
	}
}

function updateEddiEndTime(id, timing = {}){
	return {
		type : EDDI_UPDATEEND_SUCCESS,
		id,
		timing
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
			.then(eddis => dispatch(getAllEddiSuccess(eddis)))
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

export function setEddiStartThunk(eddiId, start = {}){
	return dispatch => {
		if((!typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
		return EddiFire.setStartTime(eddi, start)
			.then(update => dispatch(updateEddiStartSuccess(update.id, update.timing)))
			.catch(error => dispatch(updateEddiError(error)));
	}
}

export function setEddiEndThunk(eddiId, end = {}){
	return dispatch => {
		if(!(typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
		return EddiFire.setEndTime(eddiId, end)
			.then(update => dispatch(updateEddiEndSuccess(update.id, update.timing)))
			.catch(error => dispatch(updateEddiError(error)));
		}
}

export function setEddiSalinityThunk(eddiId, salinity){
	return dispatch => {
		if(!(typeof salinity === 'number')) throw new Error(`Salinity must be a number.`);
		return EddiFire.setSalinity(eddiId, salinity)
			.then(update => dispatch(updateEddiSuccess(update.id, update.settings)))
			.catch(error => dispatch(updateEddiError(error)));

	}
}
