Ext.define("LaPastaMadre.view.AboutPanel",{
	extend: "Ext.Panel",
	xtype: "aboutpanel",
	
	config: {
		title: "About",
		iconCls: "favorites",
		items: [ 
			{html: "La Pasta Madre" },
			{
				xtype: "toolbar",
				docked: "top",
				title: "Informazioni...",
				items: [
					{
						xtype: "button",
						ui: "back",
						id: "backInfoCommand",
						text: "Back",
					},
				]
			}
		 ]
	},
});