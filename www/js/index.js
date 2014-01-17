/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var domainUrl = "http://lapastamadre.96.lt";
var app = {
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		$(document).bind("mobileinit", function(){
			$.event.special.swipe.horizontalDistanceThreshold = '40'; // default 30px
			//$.event.special.swipe.verticalDistanceThreshold = '100'; // default 75px
		});
        homePage.initialize();
        faqPage.initialize();
        categorieRicettePage.initialize();
        ricettePage.initialize();
        bodyRicettePage.initialize();
        toolsPage.initialize();
        aboutPage.initialize();
    },
    
    applicationExit: function(){
    	navigator.app.exitApp();
    },
};

var homePage = {
	idRef: '#homeView',
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
				
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(homePage.idRef +" #menupanel").panel( "open");
        });
        
	    $(this.idRef).on("swiperight",function(){
			$(homePage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		var myPageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
	},
};

var categorieRicettePage = {
	idRef: '#categoriesView',
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(categorieRicettePage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(categorieRicettePage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		var myPageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
		
		ricettePage.loadcategories();
		  //alert( 'This page was just hidden: '+ ui.prevPage);
	},
	
	loadcategories: function(){
        ricettePage.nomeCate = null;	    
        ricettePage.idCate = null;
    },
    
    loadcategory: function(id, name){
        ricettePage.nomeCate = name;	    
        ricettePage.idCate = id;
        $.mobile.changePage("#categoryRicetteView");
    },
};

var ricettePage = {	
	idRef: '#categoryRicetteView',
	$titoloCategoriaRicette: null,
	$arrayContent: null,
	$arrayNavBar: null,
	topNumItems: 10,
	nomeCate: null,
	idCate: null,
	indexContent: 0,
	pageScroll: null,
	initialize: function()
	{		
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(ricettePage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(ricettePage.idRef +" #menupanel").panel( "open");
		});
		
		$( this.idRef + " #find" ).on( "filterablebeforefilter", function ( e, data ) {
			var id =ricettePage.idCate;
    		var name =ricettePage.nomeCate;
    	
	        var $input = $( data.input ),
	            value = $input.val(),
	            html = "";
	    
	    	var $ul = $('#find');
		    $ul.html("");        
	        if(value!="")
	        {	            
		        $.mobile.loading( 'show', {
					text: 'Caricamento più votati categoria ' + name + '...',
					textVisible: true,
					//theme: 'z',
					html: ""
				});
		        
		        $.ajax({
		            url: domainUrl + "/serviceapp.php?method=getFilteredByTitoloCategoryItems&id=" + id + "&filter=" + value + "&numItems="+ ricettePage.topNumItems,
		            dataType: "jsonp",
		            jsonpCallback: 'getFilteredByTitoloCategoryItems',
		            crossDomain: true,
		        })
		        .then( function ( response ) {
		        	var html="";
		        	//html += "<li><a href='javascript:app.loadcategories();'>back</a></li>";
		            $.each( response, function ( i, val ) {
		            	var tmpTitolo = val.titolo;
		            	if(val.autore!="")
		            		tmpTitolo += " di " + val.autore;
		                html += "<li><a href='javascript:bodyRicettePage.loadbody("+ val.ricetta_id+ ")'><div>" + val.titolo + "</div><div class='ricettaAutore'>"+ val.autore +"</div></a></li>";
		            });
		            $ul.html( html );            
		            //ricettePage.$titoloCategoriaRicette.text('Ricette '+ name);
		            $ul.listview( "refresh" );
		            $ul.trigger( "updatelayout");
		            $.mobile.loading( 'hide' );
		            $ul.show();
		            ricettePage.pageScroll.refresh();
		            //$("#categoriesView #backBtn").show();
		        }, function(){});
	        }
	    });
	    
		ricettePage.$arrayContent = $(this.idRef +' ul[data-role="listview"]');
		ricettePage.$arrayNavBar = $(this.idRef +' div[data-role="navbar"] a');
		ricettePage.$arrayNavBar.on("click", function(){			
			var index = jQuery.inArray( this ,ricettePage.$arrayNavBar);
			ricettePage.goToContent(index);
		});
		
        ricettePage.$titoloCategoriaRicette = $('#titoloCategoriaRicette');            	
		$('form.ui-filterable').hide();
	},
	
	_pageshowEvent: function(event, ui){
		ricettePage.pageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
		ricettePage.goToContent(ricettePage.indexContent);
		  //alert( 'This page was just hidden: '+ ui.prevPage);
	},
	
	goToContent:function(newIndex)
	{
		ricettePage.indexContent= newIndex;
	    ricettePage.switchContent();
	},
	
	switchContent: function(){
		var name =ricettePage.nomeCate;
		ricettePage.$titoloCategoriaRicette.text('Ricette '+ name);
		
		$('form.ui-filterable').hide();
		ricettePage.$arrayContent.hide();
		ricettePage.$arrayNavBar.removeClass('ui-btn-active');
		ricettePage.$arrayNavBar.removeClass('ui-state-persist');

		switch(ricettePage.indexContent)
		{
			case 0:
				ricettePage.loadMostVoteCategory();
				break;
			case 1:
				ricettePage.loadLastInsertCategory();
				break;
			case 2:
				ricettePage.loadcategory();
				break;
			case 3:
				ricettePage.loadSearchCategory();
				break;
		}
		
		$(ricettePage.$arrayNavBar[ricettePage.indexContent]).addClass('ui-btn-active');
		$(ricettePage.$arrayNavBar[ricettePage.indexContent]).addClass('ui-state-persist');
	},
	        
    loadcategory: function(){
    	var id =ricettePage.idCate;
    	var name =ricettePage.nomeCate;
    	
    	$.mobile.loading( 'show', {
			text: 'Caricamento categoria ' + name + '...',
			textVisible: true,
			//theme: 'z',
			html: ""
		});
		
    	var $ul = $( '#allRicette'),
	            html = "";
	        $ul.html( "" );
	        $ul.attr('data-filter', 'true');
	        
	        //data-filter="true" data-filter-placeholder="Cerca ricetta.." data-filter-theme="a"
	        //$ul.html( "<li><a href='javascript:app.loadcategories();'>back</a></li>");
	        $ul.show();
	        $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
            //$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            //$ul.listview( "refresh" );
            $.ajax({
                url: domainUrl + "/serviceapp.php?method=getCategoryItems&id=" + id,
                dataType: "jsonp",
                jsonpCallback: 'callbackGetCategoryItems',
                crossDomain: true,
                /*data: {
                    //q: $input.val()
                }*/
            })
            .then( function ( response ) {
            	//html += "<li><a href='javascript:app.loadcategories();'>back</a></li>";
                $.each( response, function ( i, val ) {
                	var tmpTitolo = val.titolo;
                	if(val.autore!="")
                		tmpTitolo += " di " + val.autore;
                    html += "<li><a href='javascript:bodyRicettePage.loadbody("+ val.ricetta_id+ ")'><div>" + val.titolo + "</div><div class='ricettaAutore'>"+ val.autore +"</div></a></li>";
                });
                $ul.html( html );
                $.mobile.loading( 'hide' );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
                ricettePage.pageScroll.refresh();
            }, function(){});
    },
    
    loadMostVoteCategory: function(){    			
    	var id =ricettePage.idCate;
    	var name =ricettePage.nomeCate;
    	    	
    	$.mobile.loading( 'show', {
			text: 'Caricamento più votati categoria ' + name + '...',
			textVisible: true,
			//theme: 'z',
			html: ""
		});

    	var $ul = $('#mostVote');
    	$ul.html("");        
        
        $.ajax({
            url: domainUrl + "/serviceapp.php?method=getMostVoteCategoryItems&id=" + id + "&numItems="+ ricettePage.topNumItems,
            dataType: "jsonp",
            jsonpCallback: 'getMostVoteCategoryItems',
            crossDomain: true,
        })
        .then( function ( response ) {
        	var html="";
        	//html += "<li><a href='javascript:app.loadcategories();'>back</a></li>";
            $.each( response, function ( i, val ) {
            	var tmpTitolo = val.titolo;
            	if(val.autore!="")
            		tmpTitolo += " di " + val.autore;
                html += "<li><a href='javascript:bodyRicettePage.loadbody("+ val.ricetta_id+ ")'><div>" + val.titolo + "</div><div class='ricettaAutore'>"+ val.autore +"</div></a></li>";
            });
            $ul.html( html );            
            //ricettePage.$titoloCategoriaRicette.text('Ricette '+ name);
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
            $.mobile.loading( 'hide' );
            $ul.show();
            ricettePage.pageScroll.refresh();
        }, function(){});
	},
	
	loadLastInsertCategory: function(){
		var id =ricettePage.idCate;
    	var name =ricettePage.nomeCate;
				
    	$.mobile.loading( 'show', {
			text: 'Caricamento più votati categoria ' + name + '...',
			textVisible: true,
			//theme: 'z',
			html: ""
		});
		    	 
    	var $ul = $('#lastInsert');
    	$ul.html("");
        $.ajax({
            url: domainUrl + "/serviceapp.php?method=getLastInsertCategoryItems&id=" + id + "&numItems="+ ricettePage.topNumItems,
            dataType: "jsonp",
            jsonpCallback: 'getMostVoteCategoryItems',
            crossDomain: true,
        })
        .then( function ( response ) {
        	var html="";
        	//html += "<li><a href='javascript:app.loadcategories();'>back</a></li>";
            $.each( response, function ( i, val ) {
            	var tmpTitolo = val.titolo;
            	if(val.autore!="")
            		tmpTitolo += " di " + val.autore;
                html += "<li><a href='javascript:bodyRicettePage.loadbody("+ val.ricetta_id+ ")'><div>" + val.titolo + "</div><div class='ricettaAutore'>"+ val.autore +"</div></a></li>";
            });
            $ul.html( html );
            //ricettePage.$titoloCategoriaRicette.text('Ricette '+ name);
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
            $.mobile.loading( 'hide' );
            $ul.show();
            ricettePage.pageScroll.refresh();
        }, function(){});
	},
	
	loadSearchCategory: function(){
		var id =ricettePage.idCate;
    	var name =ricettePage.nomeCate;
				
    	$('form.ui-filterable').show();
    	  
    	var $ul = $('#find');
    	$ul.html("");
    	$ul.show();
	},
};

var bodyRicettePage = {
	idRef: '#bodyRicetteView',
	id_categoria: null,
	name_categoria: null,
	indexContent: 0,
	$arrayContent: null,
	$arrayNavBar: null,
	initialize: function()
	{		
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #backBtn").on("click", function() {        	
        	//ricettePage.loadcategory(bodyRicettePage.id_categoria, bodyRicettePage.name_categoria);
        	$.mobile.changePage("#categoryRicetteView");
        });
        
        $( this.idRef ).on( "swipeleft", function(){
        	if(bodyRicettePage.indexContent < bodyRicettePage.$arrayContent.length - 1)
        	{
        		bodyRicettePage.indexContent++;
        		bodyRicettePage.switchContent();
        	}
        } );
        
        $( this.idRef ).on( "swiperight", function(){
        	if(bodyRicettePage.indexContent>0)
        	{
	        	bodyRicettePage.indexContent--;
	        	bodyRicettePage.switchContent();
        	}
        } );
                
		this.$arrayContent = $(bodyRicettePage.idRef + ' div[data-role="content"]');
		this.$arrayNavBar = $(bodyRicettePage.idRef + ' div[data-role="navbar"] a');
		this.$arrayNavBar.on("click", function(){			
			var index = jQuery.inArray( this ,bodyRicettePage.$arrayNavBar);
			bodyRicettePage.goToContent(index);
		});
	},
	
	_pageshowEvent: function(event, ui){
		var myPageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
		bodyRicettePage.indexContent = 0;
		bodyRicettePage.switchContent();
	},
	
	goToContent:function(newIndex)
	{
		bodyRicettePage.indexContent= newIndex;
	    bodyRicettePage.switchContent();
	},
	
	switchContent: function(){
		bodyRicettePage.$arrayContent.hide();
		bodyRicettePage.$arrayNavBar.removeClass('ui-btn-active');
		bodyRicettePage.$arrayNavBar.removeClass('ui-state-persist');
		$(bodyRicettePage.$arrayContent[bodyRicettePage.indexContent]).show();
		$(bodyRicettePage.$arrayNavBar[bodyRicettePage.indexContent]).addClass('ui-btn-active');
		$(bodyRicettePage.$arrayNavBar[bodyRicettePage.indexContent]).addClass('ui-state-persist');
	},
	
	loadbody: function(id){
		bodyRicettePage.id_categoria = null;
		bodyRicettePage.name_categoria = null;
    	$.mobile.loading( 'show', {
			text: 'Caricamento ricetta...',
			textVisible: true,
			//theme: 'z',
			html: ""
		});
    	$.ajax({
                url: domainUrl + "/serviceapp.php?method=getBody&id=" + id,
                dataType: "jsonp",
                jsonpCallback: 'cbData',
                crossDomain: true,
                /*data: {
                    //q: $input.val()
                }*/
            })
            .then( function ( response ) {            	
            	var ricetta = response[0];
            	bodyRicettePage.id_categoria = ricetta.id_categoria;
            	bodyRicettePage.name_categoria = ricetta.categoria_name;
            	$('#titoloRicetta').html(ricetta.titolo);
            	var htmlingredienti = "";
            	$.each( ricetta.ingredienti, function ( i, val ) {
            		var liStyle = "";
            		var qty = ": " + val.quantita;
            		var nome_ingr = val.nome_ingrediente;
            		if(val.id_tipo_ingredienti == 22)
            		{
            			liStyle="list-style-type: none;";
            			qty = "";
            			nome_ingr = "";
            		}
                    htmlingredienti += "<li style=\"" + liStyle + "\"><b>" + nome_ingr + "</b>" + qty + " " + val.unita + " " + val.note + "</li><br>";
                });
            	htmlingredienti += "</ul>";
            	$('#ingredienti').html(htmlingredienti);
            	$('#procedimento').html(ricetta.procedimento);
            	if(ricetta.autore!=null && ricetta.autore!="")
            		$('#autore').html("<b>Autore: </b>" + ricetta.autore);
            	else
            		$('#autore').hide();
            		
            	if(ricetta.link_fonte!=null && ricetta.link_fonte!="")
            		$('#fonte').html("<a href=\"" + ricetta.link_fonte + "\"><b>Fonte</b></a>");
            	else
            		$('#fonte').hide();
            	
            	var options = {};
				$("#Gallery a", $(bodyRicettePage.idRef)[0]).photoSwipe(options, bodyRicettePage.idRef);
            	$.mobile.loading( 'hide' );
            	$.mobile.changePage("#bodyRicetteView");            	
            }, function(){
            	alert('Ricetta non trovata');
            	navigator.notification.alert(
		            'Ricetta non trovata',  // message
		            function(){},         // callback
		            'Errore',            // title
		            'Done'                  // buttonName
		        );
            });
    	
    },
};


var toolsPage = {
	idRef: '#toolsView',
	initialize: function()
	{		
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(toolsPage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(toolsPage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		  var myPageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
	},
};

var faqPage = {
	idRef: '#faqView',
	initialize: function()
	{		
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		$(this.idRef + " #exitBtn").on("click", app.applicationExit);
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(faqPage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(faqPage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		  var myPageScroll = new IScroll('.iscroll-content', { eventPassthrough: true, scrollX: true, scrollY: false });
	},
};

var aboutPage = {
	idRef: '#aboutView',
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
	},
	
	_pageshowEvent: function(event, ui){
		  //alert( 'This page was just hidden: '+ ui.prevPage);
	},
};
