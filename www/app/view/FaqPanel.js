Ext.define("LaPastaMadre.view.FaqPanel",{
	extend: "Ext.Panel",
	xtype: "faqpanel",
	
	requires: ["LaPastaMadre.view.FaqsList"],
	
	config: {
		title: "FAQ",
		iconCls: "faq",
		layout: "fit",
		items: [
		  { xtype: "faqslist"},
        ]
	},
});