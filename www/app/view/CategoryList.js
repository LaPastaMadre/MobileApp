Ext.define("LaPastaMadre.view.CategoryList",{
	extend: "Ext.dataview.List",
	xtype: "categorylist",
	
	config: {
		id: "categorylist",
		store: "ItemsCategory",
		itemTpl: [
			'<div>',
				'<div>{titolo}</div>',
				'<p>{autore}</p>',
			'</div>'
		],
		grouped: true,
		indexBar: true,
		
	},
});