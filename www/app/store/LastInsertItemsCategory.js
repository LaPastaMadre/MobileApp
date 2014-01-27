
Ext.define("LaPastaMadre.store.LastInsertItemsCategory",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.ItemCategory"],
	config: {
		storeid: "LastInsertItemsCategory",
		model: "LaPastaMadre.model.ItemCategory",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getLastInsertCategoryItems',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.ItemCategory'
			},
			extraParams:{
		        id: 0,
		        numItems: 10
		    },
		},
		grouper: {
		   groupFn: function(record) {
		       return record.get('titolo')[0];
		       }
		  }
	},		
});