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

function updateEddiSuccess(){
	return {
		type : EDDI_UPDATE_SUCCESS
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
			.then(({ uid }) => EddiFire.getAllEddiByUser(uid))
			.then(eddis => console.log('these are all the eddis', eddis))
			.catch(err => dispatch(getAllEddiError(err)));
	}
}

