/**
 * 
 * Copyright (c) 2012 Sencha Inc
 * Contact:  http://www.sencha.com/contact
 * License: http://market.sencha.com/licenses/77 
 * 
 **
 * 
 * This components allows you to show inMobi advertisements by using a easy-to-use API.
 *
 * Each advertisement is a Sencha Touch component and will automatically be sized depending on the {@link #slot}
 * configuration.
 *
 * More information about thier JavaScript API can be found here:
 *
 * http://developer.inmobi.com/wiki/index.php?title=Integrating_Using_JavaScript_Ad_Code
 *
 * ## Usage
 *
 * To use this component you must include the inMobi JavaScript API:
 *
 *     <script src="http://cf.cdn.inmobi.com/ad/inmobi.js"></script>
 *
 * Then you can freely include the component using the `inmobiad` xtype:
 * 
 *     Ext.Viewport.add({
 *         docked: 'left',
 *         xtype: 'inmobiad',
 *         siteId: '4028cba631d63df10131e1d3191d00cb', // testing API key
 *         // slot: 9, // If you do not include a slot type, it will be automatically selected.
 *         test: true
 *     });
 */
Ext.define('Ext.inmobi.Ad', {
    extend: 'Ext.Component',
    xtype : 'inmobiad',

    config: {
        /**
         * This is the unique ID of your site. You can find this in the **My Sites/Apps** menu under the **Publisher** tab at
         * http://www.inmobi.com
         * @cfg {String} siteId
         * @required
         */
        siteId: null,

        /**
         * The slot size for this advertisement.
         * 
         * Available sizes here: http://developer.inmobi.com/wiki/index.php?title=Integrating_Using_JavaScript_Ad_Code#Slot_Sizes
         *
         * Defaults to `auto` which will automatically select a slot depending on the {@link #docked} config of this component.
         * @cfg {Number} slot
         */
        slot: 'auto',

        /**
         * True if you are currently testing the component.
         * @cfg {Boolean} test
         */
        test: null,

        /**
         * False to not auto refresh this advert. A number (in seconds) if you want to refresh.
         * @cfg {Number} autoRefresh
         */
        autoRefresh: null,

        /**
         * @hide
         */
        interstitial: false,

        /**
         * @hide
         */
        params: null
    },

    /**
     * The mapping between a slot type and its size.
     * @private
     */
    slotDefinition: {
        1: {  width: 120,  height: 20  },
        2: {  width: 168,  height: 28  },
        3: {  width: 216,  height: 36  },
        4: {  width: 300,  height: 50  },
        9: {  width: 320,  height: 48  },
        10: { width: 300,  height: 250 },
        11: { width: 728,  height: 90  },
        12: { width: 468,  height: 60  },
        13: { width: 120,  height: 600 },
        14: { width: 320,  height: 480 },
        15: { width: 320,  height: 50  },
        16: { width: 1024, height: 768 },
        17: { width: 1280, height: 800 }
    },

    applySlot: function(newSlot) {
        var slot = newSlot,
            docked;

        if (newSlot == 'auto') {
            docked = this.getDocked();

            if (docked == 'left' || docked == 'right') {
                slot = 13;
            } else {
                slot = 9;
            }
        }

        if (!this.slotDefinition[slot]) {
            Ext.Logger.error('Invalid `slot` specified.');
            return null;
        }

        return slot;
    },

    initialize: function() {
        this.on({
            scope: this,
            painted: 'showAd'
        });

        this.callParent();
    },

    showAd: function() {
        var slot = this.getSlot(),
            slotDefinition = this.slotDefinition[slot],
            siteid = this.getSiteId(),
            autoRefresh = this.getAutoRefresh(),
            adConfig = {
                manual: true,
                siteid: siteid,
                slot: slot,
                test: this.getTest()
            };

        if (!siteid) {
            Ext.Logger.error('No `siteid` specified.');
        }

        if (autoRefresh) {
            adConfig.autoRefresh = autoRefresh;
        }

        this.setHeight(slotDefinition.height);
        this.setWidth(slotDefinition.width);

        try {
            _inmobi.getNewAd(this.element.dom, adConfig);
        } catch(e) {
            Ext.Logger.error('Showing the inMobi advert failed. Are you sure you included the inMobie HTML5 SDK JavaScript file?');
        };
    }
});
