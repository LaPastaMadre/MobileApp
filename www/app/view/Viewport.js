Ext.define("LaPastaMadre.view.Viewport",{
	extend: "Ext.Panel",
    
    //requires: ["Ext.inmobi.Ad"],
    
	config: {
		fullscreen: true,
		layout: "fit",
		items: [
            // {
                    // docked: 'top',
                    // xtype: 'inmobiad',
                    // siteId: 'c98395290a97440c89b3d663b474b266',
                    // test: true
            // },
            {xtype: "mainpanel"}]
	}
});