Ext.define('LaPastaMadre.model.ItemCategory', {
    extend: 'Ext.data.Model',
    config: {
	    fields: [
	        {name: "ricetta_id", type: "int" },
	        {name: "titolo", type: "string" },
	        {name: "autore", type: "string" },
	    ]
	}
});