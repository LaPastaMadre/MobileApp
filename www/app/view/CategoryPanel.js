Ext.define("LaPastaMadre.view.CategoryPanel",{
	extend: "Ext.Panel",
	xtype: "categorypanel",
	
	requires: ["LaPastaMadre.view.CategoryList",'LaPastaMadre.view.CategorySearchList'],
		
	config: {
		title: "Ricette",
		iconCls: "ricette",
		id: "categoryPanel",
		layout: "fit",
		items: [
			{
				xtype: "toolbar",
				id: "toolbar",
				docked: "top",
				title: "Categoria XXX",
				items: [
					{
						xtype: "button",
						ui: "back",
						id: "backCategoryCommand",
						text: "Back",
					},
				]
			},
			{
			    xtype: "tabpanel",
			    tabBar: {
			        scrollable: {
                        direction: 'horizontal',
                        directionLock: true
                    },
			        layout:{
			            pack: "center",
			        }
			    },
			    layout: { type: 'card', animation: { type: 'flip', direction: 'left'} },
			    items: [				    
				    {
                        title: "Più Votate",
                        xtype: "categorylist",
                        id: "mostvotelist",
                        store: "MostVoteItemsCategory",
                        grouped: false,
                        indexBar: false, 
                    },
                    {
                        title: "Ultime Inserite",
                        xtype: "categorylist",
                        id: "lastinsertlist",
                        store: "LastInsertItemsCategory",
                        grouped: false,
                        indexBar: false, 
                    },
                    {
                        title: "Tutte",
                        xtype: "categorylist",
                        id: "categorylist",
                        store: "ItemsCategory",
                    },
                    {
                        title: "Cerca",
                        id: "categorysearchlist",
                        xtype: "categorysearchlist",
                    },
				]
			},
		 ]
	},
	
	
});