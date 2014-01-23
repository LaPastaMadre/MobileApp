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
						text: "Back", 
						handler: this.onBackTap,
						scope: this
					},
				]
			}
		 ]
	},
	onBackTap: function(){
		this.fireEvent("backInfoCommand",this);
	}	
});