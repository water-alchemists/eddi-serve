'use strict';
import {
    FORM_CLEAR,
    FORM_UPDATE
} from '../constants';

export function formClear(){
    return {
        type : FORM_CLEAR
    };
}

export function formUpdate(update){
    return {
        type : FORM_UPDATE,
        update
    };
}