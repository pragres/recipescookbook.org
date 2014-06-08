/**
 * Ramifip AJAX
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 * 
 * @version 1.0
 * @link http://ramifip.com
 */

/**
 * Show the AJAX request status
 */
ramifip.showAjaxStatus = function(){
        if (ramifip.config.show_ajax_status == true)
            $('body').append('<div id = "rp-ajax-status"> Loading... </div>');
};

/**
 * Hide the AJAX request status
 */
ramifip.hideAjaxStatus = function(){
        if (ramifip.config.show_ajax_status == true)
            $("#rp-ajax-status").remove();
};
	
    
/**
 * Load HTML from event
 * 
 * @param {Object} pdata
 * @param {Object} element
 * @param {Object} fcomplete
 */
ramifip.loadHTML = function(pdata, element, fcomplete){
    ramifip.showAjaxStatus();
	
	if (substr(element,0,1) != "#"){
		if ($(document).find(element).length == 0){
			if ($(document).find("#" + element).length == 0){
				element = null;
			} else
			 element = "#" + element;
		}	
	}
	
    if (fcomplete == null)
        fcomplete = function(res, status){
            if ( status == "success" || status == "notmodified" ){
				if (element != null) {
					$(element).html(res.responseText);
					$(element).show();
				}				
                ramifip.log.add("Done loading and show in #" + element);
                ramifip.hideAjaxStatus();
            }
        };
		
    // Sending CLEAN_URL_BACK_PATH to server for return trusted urls in the HTML

    pdata.CLEAN_URL_BACK_PATH = CLEAN_URL_BACK_PATH;
	
    jQuery.ajax({
        url: CLEAN_URL_BACK_PATH + "index.php",
        type: "POST",
        dataType: "html",
        data: pdata,
        async: false,
        complete: fcomplete
    });
};

/**
 * Load XML from event
 * @param {Object} purl
 * @param {Object} pdata
 */
ramifip.loadXML = function(purl, pdata){
    ramifip.showAjaxStatus();
    ramifip.log.add("Loading XML ..." + print_r(pdata, true));
    var receptor = {};
    receptor.result = {};
    receptor.recept = function(res, status){
        if ( status == "success" || status == "notmodified" ){
            receptor.result = res;
            ramifip.log.add("Done loading XML " + res.responseText);
            ramifip.hideAjaxStatus();
        }
    };

    // Sending CLEAN_URL_BACK_PATH to server for return trusted urls in the HTML
    
    pdata.CLEAN_URL_BACK_PATH = CLEAN_URL_BACK_PATH;

    jQuery.ajax({
        url: purl,
        type: "POST",
        async: false,
        dataType: "xml",
        data: pdata,
        complete: receptor.recept
    });

    return receptor.result;
};

/**
 * Load object from URL
 * 
 * @param {Object} purl
 * @param {Object} pdata
 */
ramifip.loadObject = function(purl, pdata){
    ramifip.showAjaxStatus();
    ramifip.log.add("Loading Object ..." + print_r(pdata, true));
    var receptor = {};
    receptor.result = {};
    receptor.recept = function(res, status){
        if ( status == "success" || status == "notmodified" ){
            if (trim(res.responseText) != '')
                eval("receptor.result = " + res.responseText + ";");
            else
                receptor.result = {};
            ramifip.log.add("Done loading object " + res.responseText);
            ramifip.hideAjaxStatus();
        }
    };

    // Sending CLEAN_URL_BACK_PATH to server for return trusted urls in the HTML

    pdata.CLEAN_URL_BACK_PATH = CLEAN_URL_BACK_PATH;
	
	// Request
    jQuery.ajax({
        url: purl,
        type: "POST",
        async: false,
        dataType: "html",
        data: pdata,
        complete: receptor.recept
    });

    return receptor.result;
};

/**
 * Load object from event
 * 
 * @param {Object} pdata
 */
ramifip.loadObjectFromEvent = function(pdata){
    ramifip.log.add("Load object from event:");
    return this.loadObject(CLEAN_URL_BACK_PATH + "index.php", pdata);
};

/**
 * Execute server event
 * 
 * @param {Object} pdata
 * @param {Object} fcomplete
 */
ramifip.executeEvent = function(pdata, fcomplete){
    if (!isset(pdata.EVENT)) return false;

    ramifip.showAjaxStatus();
    ramifip.log.add("Executing event ..." + print_r(pdata, true));
   
    // Default fcomplete
    if (fcomplete == null) fcomplete = function(res, status){
        if ( status == "success" || status == "notmodified" ){
            ramifip.log.add("Done execute! ");
            ramifip.hideAjaxStatus();
        }
    };

    // Sending CLEAN_URL_BACK_PATH to server for return trusted urls in the HTML
    pdata.CLEAN_URL_BACK_PATH = CLEAN_URL_BACK_PATH;
    
	// Request...
    jQuery.ajax({
        url: CLEAN_URL_BACK_PATH + "index.php",
        type: "POST",
        dataType: "html",
        data: pdata,
        async: false,
        complete: fcomplete
    });
	
    return true;
};

// End of file