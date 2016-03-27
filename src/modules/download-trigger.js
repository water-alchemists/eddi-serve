'use strict';
import { saveAs } from 'filesaverjs';
// import { jsPdf} from 'jspdf';
// const jspdf = require('jspdf');

export function triggerDownload(data, name){
	const blob = new Blob( [data], { type : 'text/csv', ending : 'charset=utf-8'} );
	saveAs(blob, name);
}

export function triggerPdf(data, name){
	console.log('pdf', data, name);
}