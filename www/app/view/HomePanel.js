Ext.define("LaPastaMadre.view.HomePanel",{
	extend: "Ext.Panel",
	xtype: "homepanel",

	config: {
		title: "Home",
		iconCls: "home",
		items: [ {
            xtype: 'image',
            src: 'resources/images/sfondo.png',
            width: 500,
            height: 650,
            centered: true
        }, ]
	}
});