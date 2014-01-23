Ext.define("LaPastaMadre.view.CategoriesList",{
	extend: "Ext.dataview.List",
	xtype: "categorieslist",
	
	config: {
		store: "Categories",
		itemTpl: [
			'<div>',
				'<div>{name}</div>',
				//'<p>{name}</p>',
			'</div>'
		],
		onItemDisclosure: function(record,btn,index) {
			this.fireEvent("openCategoryCommand", record);
		}
	},
});