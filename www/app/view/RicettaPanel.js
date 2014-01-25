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
			    height: '100%',
			    width:  '95%'
			}
		]
	},
	setRecord: function(record){
		this.callParent(arguments);
		var carouselUi = this.getItems().items[1];
		var procedimento = record.data.procedimento;
		//procedimento = procedimento.replace("<p>","");
		//procedimento = procedimento.replace("<\/p>\n<p>","<br>");
		if(carouselUi.items.length>1)
        {
            carouselUi.removeAt(4);
            carouselUi.removeAt(3);
            carouselUi.removeAt(2);
            carouselUi.removeAt(1);
            
        }
		carouselUi.add({
            title: 'Ingredienti',
            xtype   : 'panel',
            html: "<h2>Ingredienti</h2>" + procedimento,
            flex: 1
        });
		carouselUi.add({
		    title: 'Procedimento',
		    xtype   : 'panel',
		    html: "<h2>Procedimento</h2>" + procedimento,
		    flex: 1
		});
		carouselUi.add({
		    title: 'Foto',
		    xtype   : 'panel',
            html: "<h2>Foto</h2>",
            flex: 2
        });
        carouselUi.add({
            title: 'Video',
            xtype   : 'panel',
            html: "<h2>Video</h2>",
            flex: 2
        });
        
        carouselUi.setActiveItem(0);
	}
});