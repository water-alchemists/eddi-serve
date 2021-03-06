'use strict';

//paths
export const PATHS = {
	HOME : '/',
	LIST : '/list',
	SETTINGS : '/settings',
	REPORT : '/report',
	DASHBOARD : '/dashboard',
	TROUBLESHOOT : '/troubleshoot',
	PROFILE : '/profile',
	WEATHER : '/weather'
};

export const QUERY = {
	SALINITY_IN : 'in',
	SALINITY_OUT : 'out',
	SALINITY_REC : 'rec',
	FLOW : 'flow',
	POWER : 'power'
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
export const EDDI_STATE_SUCCESS = 'EDDI_STATE_SUCCESS';
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

//Forms Related
export const FORM_UPDATE = 'FORM_UPDATE';
export const FORM_CLEAR = 'FORM_CLEAR';

// Style Related
export const BACKGROUND_COLOR = "rgba(13,14,31,1)";
export const GRAPH_INDICTATOR = "rgba(255,255,255,1)";
export const TRIM_COLOR = "rgba(0,109,96,1)";

//Thresholds
export const FLOW_THRESHOLD = 5;
export const SALINITY_THRESHOLD = 1000;

// Weather
export const WEATHER_SUCCESS = 'WEATHER_SUCCESS';
export const WEATHER_ERROR = 'WEATHER_ERROR';
export const WEATHER_CLEAR = 'WEATHER_CLEAR';

//Graphs
export const HISTORICAL = {
	TODAY: 'today',
	MONTH : 'month',
	WEEK : 'week'
}


