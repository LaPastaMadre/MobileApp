
Ext.define("LaPastaMadre.store.Ingredienti",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.Ingrediente"],
	config: {
		storeid: "Ricette",
		model: "LaPastaMadre.model.Ingrediente",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getIngredientiRicetta',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.Ingrediente'
			},
			extraParams:{
		        id: 0
		    },
		}
	}
});