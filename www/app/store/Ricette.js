
Ext.define("LaPastaMadre.store.Ricette",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.Ricetta"],
	config: {
		storeid: "Ricette",
		model: "LaPastaMadre.model.Ricetta",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getBody',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.Ricetta'
			},
			extraParams:{
		        id: 0
		    },
		}
	}
});