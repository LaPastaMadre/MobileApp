
Ext.define("LaPastaMadre.store.SearchItemsCategory",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.ItemCategory"],
	config: {
		storeid: "SearchItemsCategory",
		model: "LaPastaMadre.model.ItemCategory",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getFilteredByTitoloCategoryItems',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.ItemCategory'
			},
			extraParams:{
		        id: 0,
		        numItems: 10,
		        filter: ''
		    },
		},
		grouper: {
		   groupFn: function(record) {
		       return record.get('titolo')[0];
		       }
		  }
	},		
});