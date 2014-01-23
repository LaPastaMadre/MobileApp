
Ext.define("LaPastaMadre.store.Categories",{
	extend: "Ext.data.Store",
	requires: ["LaPastaMadre.model.Category"],
	config: {
		storeid: "Categories",
		model: "LaPastaMadre.model.Category",
		proxy: {
			type: 'jsonp',
	        url : domainService + '/serviceapp.php?method=getCategories',
	        callbackKey: 'callback',
	        enablePagingParams: false,
	        reader: {
			    type : 'json',
			    model: 'LaPastaMadre.model.Category'
			}
		},
		/*grouper: {
		   groupFn: function(record) {
		       return record.get('name')[0];
		       }
		   },	*/
		autoLoad: true,
	},
	
	
   /*data: [
		{ category_id: 1, name: 'Pane'},
		{ category_id: 2, name: 'Pizza'},
		{ category_id: 3, name: 'Focaccia'},
		{ category_id: 4, name: 'Dolci'},
	],*/
	
		
});