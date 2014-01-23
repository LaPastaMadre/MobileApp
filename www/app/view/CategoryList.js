Ext.define("LaPastaMadre.view.CategoryList",{
	extend: "Ext.dataview.List",
	xtype: "categorylist",
	
	config: {
		store: "ItemsCategory",
		itemTpl: [
			'<div>',
				'<div>{titolo}</div>',
				'<p>{autore}</p>',
			'</div>'
		],
		onItemDisclosure: function(record,btn,index) {
			this.fireEvent("openItemCategoryCommand", record);
		}
	},
});