'use strict';

//paths
export const PATHS = {
	HOME : '/',
	LIST : '/list',
	SETTINGS : '/settings',
	REPORT : '/report',
	DASHBOARD : '/dashboard',
	TROUBLESHOOT : '/troubleshoot',
};

export const QUERY = {
	SALINITY_IN : 'in',
	SALINITY_OUT : 'out',
	FLOW : 'flow',
	POWER : 'power',
};

//User Related
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_GETPROFILE_SUCCESS = 'USER_GETPROFILE_SUCCESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';
export const USER_CREATE_ERROR = 'USER_CREATE_ERROR';

//Eddi Related
export const EDDI_GETALL_SUCCESS = 'EDDI_GETALL_SUCCESS';
export const EDDI_GETALL_ERROR = 'EDDI_GETALL_ERROR';
export const EDDI_UPDATE_SUCCESS = 'EDDI_UPDATE_SUCCESS';
export const EDDI_UPDATE_ERROR = 'EDDI_UPDATE_ERROR';
export const EDDI_UPDATESTART_SUCCESS = 'EDDI_UPDATESTART_SUCCESS';
export const EDDI_UPDATEEND_SUCCESS = 'EDDI_UPDATEEND_SUCCESS';
export const EDDI_UPDATESNOOZE_SUCCESS = 'EDDI_UPDATESNOOZE_SUCCESS';
export const EDDI_READINGS_SUCCESS = 'EDDI_READINGS_SUCCESS';
export const EDDI_GETONE_SUCCESS = 'EDDI_GETONE_SUCCESS';
export const EDDI_GETONE_ERROR = 'EDDI_GETONE_ERROR';
export const EDDI_SELECT = 'EDDI_SELECT';

// App Related
export const APP_START_SUCCESS = 'APP_START_SUCCESS';
export const APP_START_ERROR = 'APP_START_ERROR';

// Menu Related
export const MENU_NAME_CHANGE = 'MENU_NAME_CHANGE';

//Modal Related
export const MODAL_ON = 'MODAL_ON';
export const MODAL_OFF = 'MODAL_OFF';

// Style Related
export const BACKGROUND_COLOR = "rgba(13,14,31,1)";

//Thresholds
export const FLOW_THRESHOLD = 5;
export const SALINITY_THRESHOLD = 1000;

//Graphs
export const HISTORICAL = {
	TODAY: 'today',
	MONTH : 'month',
	WEEK : 'week'
}
