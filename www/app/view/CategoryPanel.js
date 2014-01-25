Ext.define("LaPastaMadre.view.CategoryPanel",{
	extend: "Ext.Panel",
	xtype: "categorypanel",
	
	requires: ["LaPastaMadre.view.CategoryList"],
		
	config: {
		title: "Ricette",
		iconCls: "ricette",
		id: "categoryPanel",
		layout: "fit",
		items: [
			{
				xtype: "toolbar",
				id: "toolbar",
				docked: "top",
				title: "Categoria XXX",
				items: [
					{
						xtype: "button",
						ui: "back",
						id: "backCategoryCommand",
						text: "Back",
					},
				]
			},
			{ 
				xtype: "categorylist",
			},
		 ]
	},
});