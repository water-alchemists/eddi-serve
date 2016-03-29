'use strict';
import { saveAs } from 'filesaverjs';
import { TRIM_COLOR } from '../constants';
// require('jspdf-autotable');
export function triggerDownload(data, name){
	const blob = new Blob( [data], { type : 'text/csv', ending : 'charset=utf-8'} );
	saveAs(blob, name);
}

export function triggerPdf(columns, rows, filename, options){
	const doc = new jsPDF('l', 'pt');
	doc.setFontSize(20);
	doc.text('EDDI - electrodialysis desalination system', 40, 30);
	doc.setFontSize(14);
	if(options.name) {
		doc.text(`ID : ${options.name}`, 40, 60);
	}
	if(options.start && options.end) {
		const start = options.start,
			end = options.end;
		doc.text(`Date Range : ${start.month}/${start.day}/${start.year} to ${end.month}/${end.day}/${end.year}`, 40, 90);
	}
	doc.autoTable(columns, rows, {
		startY : 110
	});
	doc.save(filename);
}