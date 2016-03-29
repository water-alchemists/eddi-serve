'use strict';
import { saveAs } from 'filesaverjs';
// require('jspdf-autotable');
export function triggerDownload(data, name){
	const blob = new Blob( [data], { type : 'text/csv', ending : 'charset=utf-8'} );
	saveAs(blob, name);
}

export function triggerPdf(columns, rows, name){
	const doc = new jsPDF('p', 'pt');
	console.log('columns', columns);
	doc.autoTable(columns, rows, {
		beforePageContent: function(data) {
	        doc.text('EDDI', 40, 30);
	    }
	});
	doc.save(name);
}