Ext.define("LaPastaMadre.view.CategoryPanel",{
	extend: "Ext.Panel",
	xtype: "categorypanel",
	
	requires: ["LaPastaMadre.view.CategoryList"],
		
	config: {
		title: "Ricette",
		iconCls: "ricette",
		layout: "fit",
		items: [ 
			//{html: "La Pasta Madre" },
			{
				xtype: "toolbar",
				docked: "top",
				title: "Categoria XXX",
				items: [
					{
						xtype: "button",
						ui: "back",
						text: "Back", 
						handler: this.onBackTap,
						scope: this
					},
				]
			},
			{ xtype: "categorylist"},
		 ]
	},
});