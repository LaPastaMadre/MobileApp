Ext.define('LaPastaMadre.model.Ricetta', {
    extend: 'Ext.data.Model',
    config: {
	    fields: [
	        {name: "id_categoria", type: "int" },
	        {name: "ricetta_id", type: "int" },
	        {name: "categoria_name", type: "string" },
	        {name: "titolo", type: "string" },
	        {name: "procedimento", type: "string" },
	        {name: "autore", type: "string" },
	        {name: "link_fonte", type: "string" },
	    ],
	    belongsTo: 'Category',
	    hasMany: 'Ingrediente'
	}
});