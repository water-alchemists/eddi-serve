'use strict';
import {
    FORM_UPDATE,
    FORM_CLEAR
} from '../constants';

const initialState = {
    submitted : false,
    success : undefined,
    message : undefined
};

export default function(state = initialState, action = {}){
    const { type, update } = action;
    switch(type){
    case FORM_UPDATE : 
        return {
            ...state,
            ...update
        };
    case FORM_CLEAR :
        return {
            ...initialState
        };
    default :
        return state;
    }
}