Ext.define("LaPastaMadre.controller.Main",{
	extend: "Ext.app.Controller",
	config: {
		refs: {
			mainPanel:{
				selector: 'mainpanel',
				xtype: "mainpanel",
				autoCreate: true
			},
			aboutPanel: {
				selector: 'aboutpanel',
				xtype: "aboutpanel",
				autoCreate: true
			}, 
			homePanel : "homepanel",
			categoriesList : {
				selector: 'categorieslist',
				xtype: "categorieslist",
				autoCreate: true
			},
			categoriesPanel : {
				selector: 'categoriespanel',
				xtype: "categoriespanel",
				autoCreate: true
			},
			ricettaPanel: { 
				selector: 'ricettapanel',
				xtype: "ricettapanel",
				autoCreate: true
			},
			ricettaToolbar: { 
				selector: 'ricettapanel toolbar',
				xtype: "toolbar",
				autoCreate: true
			},
			categoryList: '#categorylist',
			categoryPanel : {
				selector: 'categoryPanel',
				xtype: "categorypanel",
				autoCreate: true
			},
			toolbarCategoryPanel : {
				selector: 'categorypanel #toolbar',
				xtype: "toolbar",
				autoCreate: true
			},
			faqPanel : "faqpanel",
			toolsPanel : "toolspanel",
			infoCommand: {
				selector: "#infocommand",
				autoCreate: true
			},
			backInfoCommand: {
				selector: "#backInfoCommand",
				autoCreate: true
			},
			backCategoryCommand: "#backCategoryCommand",
			backItemCategoryCommand: "#backItemCategoryCommand",
			backRicettaCommand: "#backRicettaCommand"
		},

		control: {
			mainPanel: {
				infoCommand: "onInfoCommand"
			},
			aboutPanel:{
				backInfoCommand: "onBackInfoCommand"
			},
			categoriesList:{
				itemsingletap: "onOpenCategoryCommand"
			},
			categoryList:{
				itemsingletap: "onOpenRicettaCommand"
			},
			infoCommand:{
				tap: "onInfoCommand",
				handler: "onInfoCommand"
			},
			backInfoCommand: {
				tap: "onBackInfoCommand",
				handler: "onBackInfoCommand"
			},
			backCategoryCommand: {
				tap: "onBackCategoryCommand",
				handler: "onBackCategoryCommand"
			},
			backRicettaCommand: {
				tap: "onBackRicettaCommand",
				handler: "onBackRicettaCommand"
			}
		}
	},
	
	onInfoCommand: function() {
		Ext.Viewport.animateActiveItem(this.getAboutPanel(), { type: "slide", direction: "left" });
	},	
	onBackInfoCommand: function() {
		Ext.Viewport.animateActiveItem(this.getMainPanel(), { type: "slide", direction: "right" });
	},
	onBackCategoryCommand: function() {
		Ext.Viewport.animateActiveItem(this.getMainPanel(), { type: "slide", direction: "right" });
	},
	onBackRicettaCommand: function(){
		Ext.Viewport.animateActiveItem(this.getCategoryPanel(), { type: "slide", direction: "right" });
	},
	onOpenCategoryCommand: function(index, target, record, e, eOpts) {
		var rec = record.getRecord();
		this.getCategoryPanel().setTitle("Categoria " + rec.data.name);
		this.getToolbarCategoryPanel().setTitle("Categoria " + rec.data.name);
		var store = Ext.StoreManager.lookup("ItemsCategory");
		store.getProxy().setExtraParam('id', rec.data.category_id);
		store.load();
		Ext.Viewport.animateActiveItem(this.getCategoryPanel(), { type: "slide", direction: "left" });
	},
	onOpenRicettaCommand: function(index, target, record, e, eOpts){
		var rec = record.getRecord();
		Ext.Logger.log("Selected: " + rec.data.titolo);
		this.getRicettaPanel().setTitle(rec.data.titolo);
		this.getRicettaToolbar().setTitle(rec.data.titolo);
		var store = Ext.StoreManager.lookup("Ricette");
		store.getProxy().setExtraParam('id', rec.data.ricetta_id);
		store.load({
            callback: function(records, operation, success) {
                this.getRicettaPanel().setRecord(records[0]);
                Ext.Viewport.animateActiveItem(this.getRicettaPanel(), { type: "slide", direction: "left" });
            },
            scope: this
        });		
	}	
});