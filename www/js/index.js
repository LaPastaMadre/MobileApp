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
        homePage.initialize();
        faqPage.initialize();
        ricettePage.initialize();
        bodyRicettePage.initialize();
        toolsPage.initialize();
        aboutPage.initialize();
    },
    
    
};

var homePage = {
	idRef: '#homeView',
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		
		$(this.idRef + " #exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(homePage.idRef +" #menupanel").panel( "open");
        });
        
	    $(this.idRef).on("swiperight",function(){
			$(homePage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){		
		$('#sizeWindow').html("Heigth: " + $(window).height() + " Width: "+ $(window).width());
	},
};

var ricettePage = {
	idRef: '#ricetteView',
	$titoloCategoriaRicette: null,
	bLoadCategories: true,
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		
		$(this.idRef + " #exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(ricettePage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(ricettePage.idRef +" #menupanel").panel( "open");
		});
		
        ricettePage.$titoloCategoriaRicette = $('#titoloCategoriaRicette');
        var ricettalistID = "#ricetteList";		
		$( ricettalistID).hide();    	
		$('form.ui-filterable').hide();
	},
	
	_pageshowEvent: function(event, ui){
		if(ricettePage.bLoadCategories){
			ricettePage.loadcategories();			
		}
		  //alert( 'This page was just hidden: '+ ui.prevPage);
	},
	
	loadcategories: function(){
    	
		$("#ricetteView #backBtn").hide();
		var categoryListID = "#categoryList";
		$( categoryListID).show();
		var ricettalistID = "#ricetteList";		
		$( ricettalistID).hide();    	
		$('form.ui-filterable').hide();
    	var $ul = $( categoryListID), html = "";
    	ricettePage.$titoloCategoriaRicette.text('Categorie Ricette');
    	if($ul.html().trim()=="")
    	{
    		$.mobile.loading( 'show', {
				text: 'Caricamento categorie...',
				textVisible: true,
				//theme: 'z',
				html: ""
			});	        
	        $ul.html( "" );
	        //$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
	        //$ul.listview( "refresh" );
	        $.ajax({
	            url: domainUrl + "/serviceapp.php?method=getCategories",
	            dataType: "jsonp",
	            jsonpCallback: 'callbackGetCategories',
	            crossDomain: true,
	            /*data: {
	                //q: $input.val()
	            }*/
	        })
	        .then( function ( response ) {
	            $.each( response, function ( i, val ) {
	                html += "<li><a href='javascript:ricettePage.loadcategory("+ val.category_id +", \""+ val.name + "\")'>" + val.name + "</a></li>";
	            });
	            $ul.html( html );
	            $.mobile.loading( 'hide' );
	            $ul.listview( "refresh" );
	            $ul.trigger( "updatelayout");
	            $("#ricetteView #backBtn").hide();
	            ricettePage.bLoadCategories = false;
	        });
        }
    },
        
    loadcategory: function(id, name){
    	$.mobile.loading( 'show', {
			text: 'Caricamento categoria ' + name + '...',
			textVisible: true,
			//theme: 'z',
			html: ""
		});
		var categoryListID = "#categoryList";
		$( categoryListID).hide();
    	var ricettalistID = "#ricetteList";
    	$( ricettalistID).show();
		$('form.ui-filterable').show();
    	var $ul = $( ricettalistID),
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
                    html += "<li><a href='javascript:bodyRicettePage.loadbody("+ val.ricetta_id+ ")'>" + val.titolo + "</a></li>";
                });
                $ul.html( html );
                $.mobile.loading( 'hide' );
                ricettePage.$titoloCategoriaRicette.text('Ricette '+ name);
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
                $("#ricetteView #backBtn").show();
            }, function(){});
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
		$(this.idRef + " #exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $(this.idRef + " #backBtn").on("click", function() {        	
        	ricettePage.loadcategory(bodyRicettePage.id_categoria, bodyRicettePage.name_categoria);
        	$.mobile.changePage("#ricetteView");
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
		$(this.idRef + " #exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(toolsPage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(toolsPage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		  //alert( 'This page was just hidden: '+ ui.prevPage);
	},
};

var faqPage = {
	idRef: '#faqView',
	initialize: function()
	{
		$( this.idRef ).on( 'pageshow', this._pageshowEvent);
		$(this.idRef + " #exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $(this.idRef + " #menuBtn").on("click", function() {
        	$(faqPage.idRef +" #menupanel").panel( "open");
        });
        
        $(this.idRef).on("swiperight",function(){
			$(faqPage.idRef +" #menupanel").panel( "open");
		});
	},
	
	_pageshowEvent: function(event, ui){
		  //alert( 'This page was just hidden: '+ ui.prevPage);
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
