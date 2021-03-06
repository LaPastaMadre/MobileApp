
Ext.define("LaPastaMadre.store.ItemsCategory",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.ItemCategory"],
	config: {
		storeid: "ItemsCategory",
		model: "LaPastaMadre.model.ItemCategory",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getCategoryItems',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.ItemCategory'
			},
			extraParams:{
		        id: 0
		    },
		},
		sorters : [
            {
                property : 'titolo',
                direction: 'ASC'
            },
            {
                property : 'autore',
                direction: 'DESC'
            }
        ],
		grouper: {
		   sortProperty: 'titolo',
		   groupFn: function(record) {
		       return record.get('titolo')[0];
		       }
		  }
	},		
});