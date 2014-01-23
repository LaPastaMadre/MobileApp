Ext.define("LaPastaMadre.view.MainPanel", {
	extend: "Ext.tab.Panel",
	xtype: "mainpanel",

	config: {
		tabBarPosition: "bottom",
		items: [
			{
				xtype: "toolbar",
				docked: "top",
				title: "La Pasta Madre",
				items: [
					{ xtype: "spacer" },
					{
						xtype: "button",
						text: "Info",
						handler: this.onInfoTap,
						scope: this
					}
				]
			},			
			{xtype: "homepanel"},
			{xtype: "faqpanel"},
			{xtype: "categoriespanel"},			
			{xtype: "toolspanel"},
		]
	},
	
	onInfoTap: function() {
		this.fireEvent("infoCommand",this);
	}
});