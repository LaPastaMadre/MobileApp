Ext.define('LaPastaMadre.model.Category', {
    extend: 'Ext.data.Model',
    config: {
    	idProperty: "category_id",
	    fields: [
	        {name: "category_id", type: "string" },
	        {name: "name", type: "string" },
	    ],
	    hasMany: 'ItemCategory',	    
	}
});