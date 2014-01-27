Ext.define('LaPastaMadre.model.Faq', {
    extend: 'Ext.data.Model',
    config: {	
	    fields: [
	        {name: "group_name", type: "string" },
	        {name: "question", type: "string" },
	        {name: "answer", type: "string" },
	    ],
	}
});