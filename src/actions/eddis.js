import EddiFireStarter from '../modules/eddi-firebase';

import { browserHistory } from 'react-router';

import { 
	PATHS,
	EDDI_GETALL_SUCCESS,
	EDDI_GETALL_ERROR,
	EDDI_UPDATE_SUCCESS,
	EDDI_UPDATE_ERROR,
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

function selectEddi(selected){
	return {
		type : EDDI_SELECT,
		selected
	};
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

export function setEddiStartThunk(eddiId, hour, minutes){
	return dispatch => {
		if((!typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
	}
}

export function setEddiEndThunk(eddiId, hour, minutes){
	return dispatch => {
		if(!(typeof hour === 'number' || typeof minutes === 'number')) throw new Error(`Hour and minutes must be numbers.`);
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

