Ext.define("LaPastaMadre.view.RicettaPanel",{
	extend: "Ext.Panel",
	xtype: "ricettapanel",
	
	config: {
		id: "ricettapanel",
		title: "Ricetta Name",
		fullscreen: true,
		items: [			
			{
				xtype: "toolbar",
				docked: "top",
				title: "Ricetta Name",
				items: [
					{
						xtype: "button",
						ui: "back",
						id: "backRicettaCommand",
						text: "Back"
					}
				]
			},
			{
				xtype: 'carousel',
				cls: 'card',
			    styleHtmlContent: true,
			    height: '100%'
			},
            {
                xtype: "toolbar",
                docked: "bottom",
                title: "Autore: Fonte"
            }
		]
	},
	setRecord: function(record){
		this.callParent(arguments);
		var carouselUi = this.getItems().items[1];
		if(carouselUi.items.length>1)
        {
            carouselUi.removeAt(4);
            carouselUi.removeAt(3);
            carouselUi.removeAt(2);
            carouselUi.removeAt(1);
        }
                    
		
		var procedimento = record.data.procedimento;
		var store = Ext.StoreManager.lookup("Ingredienti");
        store.getProxy().setExtraParam('id', record.data.ricetta_id);
        store.load({
            callback: function(records, operation, success) {
                var ingredienti = "<ul>";
                records.forEach(function(rec)
                {
                    var liStyle = "";
                    var qty = ": " + rec.data.quantita;
                    var nome_ingr = rec.data.nome_ingrediente;
                    if(rec.data.id_tipo_ingredienti == 22)
                    {
                        liStyle="list-style-type: none;";
                        qty = "";
                        nome_ingr = "";
                    }
                    ingredienti += "<li style=\"" + liStyle + "\"><b>" + nome_ingr + "</b>" + qty + " " + rec.data.unita + " " + rec.data.note + "</li><br>";
                });
                ingredienti += "</ul>";
                carouselUi.add({
                    title: 'Ingredienti',
                    xtype   : 'panel',
                    html: "<h2>Ingredienti</h2>" + ingredienti,
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                        directionLock: true
                    }
                });
                carouselUi.add({
                    title: 'Procedimento',
                    xtype   : 'panel',
                    html: "<h2>Procedimento</h2>" + procedimento,
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                        directionLock: true
                    }
                });
                /*
                carouselUi.add({
                    title: 'Foto',
                    xtype   : 'panel',
                    html: "<h2>Foto</h2>",
                    flex: 2
                });*/
                if(record.data.link_youtube!="")
                    carouselUi.add({
                        title: 'Video',
                        xtype   : 'panel',
                        html: '<h2>Video</h2><br><div class="video youtube"><iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/' + record.data.link_youtube + '" frameborder="0"></iframe></div>',
                        flex: 2
                    });
                
                carouselUi.setActiveItem(0);
            },
            scope: this
        });
		//procedimento = procedimento.replace("<p>","");
		//procedimento = procedimento.replace("<\/p>\n<p>","<br>");
		
	}
});