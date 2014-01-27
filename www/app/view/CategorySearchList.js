Ext.define("LaPastaMadre.view.CategorySearchList",{
	extend: "Ext.Panel",
	xtype: "categorysearchlist",
	
	requires: ["Ext.dataview.List",'Ext.field.Search'],
	
	config: {
	    layout:  'vbox',
		items: [
            {
                xtype: 'toolbar',
                docked: 'top',

                items: [
                    { xtype: 'spacer' },
                    {
                        id: "searchField",
                        xtype: 'searchfield',
                        placeHolder: 'Search...',
                    },
                    { xtype: 'spacer' },
                ]
            },
            {
                xtype: "list",
                flex: 1,    //  add a flex property
                id: "searchlist",
                store: "SearchItemsCategory",
                itemTpl: [
                    '<div>',
                        '<div><b>{titolo}</b></div>',
                        '<p style="font-size: small;"><i>{autore}</i></p>',
                    '</div>'
                ],
                emptyText: '<div style="margin-top: 20px; text-align: center">Nessun elemento trovato</div>',
            }
		]
	},
});