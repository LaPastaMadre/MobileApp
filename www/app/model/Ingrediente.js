Ext.define('LaPastaMadre.model.Ingrediente', {
    extend: 'Ext.data.Model',
    config: {	
	    fields: [
	        {name: "id_tipo_ingredienti", type: "int" },
	        {name: "ricetta_id", type: "int" },
	        {name: "nome_ingrediente", type: "string" },
	        {name: "quantita", type: "int" },
	        {name: "id_tipo_quantita", type: "int" },
	        {name: "unita", type: "string" },
	        {name: "note", type: "string" },
	        {name: "posizione", type: "int" },
	    ],
	    belongsTo: 'Ricetta',
	}
});