var domainService = "http://lapastamadre.96.lt";

Ext.application({
	name: "LaPastaMadre",
	icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },
	icon: "resources/images/app-icon.png",
    phoneIcon: "resources/images/app-iphone-icon.png",

    controllers: ["Main"],
    models: ["ItemCategory","Category", "Ingrediente", "Ricetta", "Faq"],
    stores: ["Categories","ItemsCategory", 
             "Ricette", "Ingredienti", "SearchItemsCategory",
             "LastInsertItemsCategory", "MostVoteItemsCategory", "Faqs"],
	views: ["Viewport", "MainPanel", "HomePanel", "CategoriesPanel", 
			"CategoryPanel", "FaqPanel", "ToolsPanel", "AboutPanel",
			"RicettaPanel"],
	launch : function() {
		Ext.create("LaPastaMadre.view.Viewport");
	}
});