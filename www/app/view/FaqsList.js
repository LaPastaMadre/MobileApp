Ext.define("LaPastaMadre.view.FaqsList",{
	extend: "Ext.dataview.List",
	xtype: "faqslist",
	
	config: {
		store: "Faqs",
		grouped: true,
		itemTpl: [
			'<div>',
				'<div>{question}</div>',
				//'<p>{name}</p>',
			'</div>'
		]
	},
});