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

function getEddisSuccess(list){
	return {
		type : EDDI_GETALL_SUCCESS, 
		list
	};
}