Ext.define("LaPastaMadre.view.FaqPanel",{
	extend: "Ext.Panel",
	xtype: "faqpanel",
	
	config: {
		title: "FAQ",
		iconCls: "faq",
		iconMask: true,
		items: [ {html: "Questa è la pagina delle FAQ" } ]
	},
});