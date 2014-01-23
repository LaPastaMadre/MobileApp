Ext.define("LaPastaMadre.controller.Main",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			mainPanel:{
				selector: 'mainpanel',
				xtype: "mainpanel",
				autoCreate: true,
			},
			aboutPanel: {
				selector: 'aboutpanel',
				xtype: "aboutpanel",
				autoCreate: true,
			}, 
			homePanel : "homepanel",
			categoriesList : {
				selector: 'categorieslist',
				xtype: "categorieslist",
				autoCreate: true,
			},
			categoriesPanel : {
				selector: 'categoriespanel',
				xtype: "categoriespanel",
				autoCreate: true,
			},
			categoryPanel : {
				selector: 'categorypanel',
				xtype: "categorypanel",
				autoCreate: true,
			},
			faqPanel : "faqpanel",
			toolsPanel : "toolspanel",
		},

		control: {
			mainPanel: {
				infoCommand: "onInfoCommand"
			},
			aboutPanel:{
				backInfoCommand: "onBackInfoCommand"
			},
			categoriesList:{
				openCategoryCommand: "onOpenCategoryCommand"
			}
		}
	},

	onInfoCommand: function() {
		Ext.Viewport.animateActiveItem(this.getAboutPanel(), { type: "slide", direction: "left" });
	},	
	onBackInfoCommand: function() {
		Ext.Viewport.animateActiveItem(this.getMainPanel(), { type: "slide", direction: "right" });
	},
	onOpenCategoryCommand: function(record) {
		var store = Ext.StoreManager.lookup("ItemsCategory");
		store.getProxy().setExtraParam('id', record.data.category_id);
		store.load();
		Ext.Viewport.animateActiveItem(this.getCategoryPanel(), { type: "slide", direction: "left" });
	},	
});