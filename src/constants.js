'use strict';
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
export const EDDI_GETONE_SUCCESS = 'EDDI_GETONE_SUCCESS';
export const EDDI_GETONE_ERROR = 'EDDI_GETONE_ERROR';
export const EDDI_SELECT = 'EDDI_SELECT';

//paths
export const PATHS = {
	HOME : '/react',
	LOGIN : '/react/login',
	SIGNUP : '/react/signup',
	SETTINGS : '/react/settings',
	REPORT : '/react/report',
	DASHBOARD : '/react/dashboard',
	TROUBLESHOOT : '/react/troubleshoot',
};