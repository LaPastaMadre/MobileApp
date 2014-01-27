Ext.define("LaPastaMadre.view.CategoryList",{
	extend: "Ext.dataview.List",
	xtype: "categorylist",
	
	config: {
		itemTpl: [
			'<div>',
				'<div><b>{titolo}</b></div>',
				'<p style="font-size: small;"><i>{autore}</i></p>',
			'</div>'
		],
		grouped: true,
		indexBar: true,		
	},
});