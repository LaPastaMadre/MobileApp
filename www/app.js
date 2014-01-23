var domainService = "http://lapastamadre.96.lt";

Ext.application({
	name: "LaPastaMadre",
	icon: "resources/images/app-icon.png",
    phoneIcon: "resources/images/app-iphone-icon.png",

    controllers: ["Main"],
    models: ["ItemCategory","Category", "Ingrediente", "Ricetta"],
    stores: ["Categories","ItemsCategory"],
	views: ["Viewport", "MainPanel", "HomePanel", "CategoriesPanel", 
	"CategoryPanel", 
	"FaqPanel", "ToolsPanel", "AboutPanel"],
	launch : function() {
		Ext.create("LaPastaMadre.view.Viewport");
	}
});