Ext.define("LaPastaMadre.view.CategoriesPanel",{
	extend: "Ext.Panel",
	xtype: "categoriespanel",
	
	requires: ["LaPastaMadre.view.CategoriesList"],
		
	config: {
		title: "Ricette",
		iconCls: "ricette",
		layout: "fit",
		items:[
			{ xtype: "categorieslist"},
		],
	},
});