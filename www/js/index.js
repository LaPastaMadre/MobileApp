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
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $("#exitBtn").on("click", function() {
        	navigator.app.exitApp();
        });
        
        $( document ).on( "pageinit", "#homeView", function() {
        	$("div[data-role='page']").each(function(){
	    		this.setAttribute("style","background-color: #EAE8F5");
	    	});
	    });
	    $("#ricetteBtn").on("click", function() {
	    	app.loadcategories();	        
		});
    },
    
    loadcategories: function(){
    	var strItemID = "#autocomplete";
    	var $ul = $( strItemID),
	            html = "";
	        $ul.html( "" );
            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            //$ul.listview( "refresh" );
            $.ajax({
                url: domainUrl + "/serviceapp.php?method=getCategories",
                dataType: "jsonp",
                jsonpCallback: 'cbData',
                crossDomain: true,
                /*data: {
                    //q: $input.val()
                }*/
            })
            .then( function ( response ) {
                $.each( response, function ( i, val ) {
                    html += "<li><a href='javascript:app.loadcategory("+ val.category_id +")'>" + val.name + "</a></li>";
                });
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
                $("#ricetteView #backBtn").hide();
            });
    },
    
    loadcategory: function(id){
    	var strItemID = "#autocomplete";
    	var $ul = $( strItemID),
	            html = "";
	        $ul.html( "" );
	        //$ul.html( "<li><a href='javascript:app.loadcategories();'>back</a></li>");
	        $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
            //$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
            //$ul.listview( "refresh" );
            $.ajax({
                url: domainUrl + "/serviceapp.php?method=getCategoryItems&id=" + id,
                dataType: "jsonp",
                jsonpCallback: 'cbData',
                crossDomain: true,
                /*data: {
                    //q: $input.val()
                }*/
            })
            .then( function ( response ) {
            	//html += "<li><a href='javascript:app.loadcategories();'>back</a></li>";
                $.each( response, function ( i, val ) {
                    html += "<li><a href='javascript:app.loadbody("+ val.ricetta_id +")'>" + val.titolo + "</a></li>";
                });
                $ul.html( html );
                $ul.listview( "refresh" );
                $ul.trigger( "updatelayout");
                $("#ricetteView #backBtn").show();
            }, function(){});
    },
    
    loadbody: function(id){
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
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
    }
};
