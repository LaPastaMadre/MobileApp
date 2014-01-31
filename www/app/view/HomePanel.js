Ext.define("LaPastaMadre.view.HomePanel",{
	extend: "Ext.Panel",
	xtype: "homepanel",

	config: {
		title: "Home",
		iconCls: "home",
		items: [ {
            xtype: 'image',
			cls: 'homeBackGround',
            src: 'resources/images/sfondo.png',
            centered: true,
            //width: "500px",
            //height: "650px"
        }, ]
	}
});