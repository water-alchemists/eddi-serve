'use strict';
import { MENU_NAME_CHANGE } from '../constants';

export function menuNameChange(newName){
	return {
		type : MENU_NAME_CHANGE,
		name: newName
	};
}
