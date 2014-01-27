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
			mostVoteList: '#mostvotelist',
			lastInsertList: '#lastinsertlist',
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
			faqsList: "faqslist",
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
			backRicettaCommand: "#backRicettaCommand",
			searchField: "#searchField",
			searchList: "#searchlist",
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
			mostVoteList:{
                itemsingletap: "onOpenRicettaCommand"
            },
            lastInsertList:{
                itemsingletap: "onOpenRicettaCommand"
            },
            faqsList:{
                itemsingletap: "onfaqListCommand"
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
			},
			searchField: {
			    clearicontap: "onSearchClearIconTap",
			    keyup: "onSearchKeyUp",
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
		var stdStore = Ext.StoreManager.lookup("ItemsCategory");
		stdStore.getProxy().setExtraParam('id', rec.data.category_id);
		stdStore.load();
		var lastInsertStore = Ext.StoreManager.lookup("LastInsertItemsCategory");
        lastInsertStore.getProxy().setExtraParam('id', rec.data.category_id);
        lastInsertStore.load();
        var mostVoteStore = Ext.StoreManager.lookup("MostVoteItemsCategory");
        mostVoteStore.getProxy().setExtraParam('id', rec.data.category_id);
        mostVoteStore.load();
        var searchStore = Ext.StoreManager.lookup("SearchItemsCategory");
        searchStore.getProxy().setExtraParam('id', rec.data.category_id);
        searchStore.getProxy().setExtraParam('filter', "a");
        searchStore.load();
		Ext.Viewport.animateActiveItem(this.getCategoryPanel(), { type: "slide", direction: "left" });
	},
	onOpenRicettaCommand: function(index, target, record, e, eOpts){
		var rec = record.getRecord();
		//Ext.Logger.log("Selected: " + rec.data.titolo);
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
	},
	onfaqListCommand: function(index, target, record, e, eOpts){
	    var rec = record.getRecord();
	    Ext.Msg.show({
	        title: rec.data.question, 
	        message: rec.data.answer,
	        scrollable: {
                direction: 'vertical',
                directionLock: true
            },
            width: "350px",
            height: "450px",
            //multiLine: true,
	    });
	},
	onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        this.getStore().clearFilter();
    },
    
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue();       
        var searchStore = Ext.StoreManager.lookup("SearchItemsCategory");
        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        searchStore.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            searchStore.getProxy().setExtraParam('filter', value);
            searchStore.load({
                callback: function(records, operation, success) {
                    this.getSearchList().refresh();
                },
                scope: this
            });
            //the user could have entered spaces, so we must split them so we can loop through them all
        }
    },	
});