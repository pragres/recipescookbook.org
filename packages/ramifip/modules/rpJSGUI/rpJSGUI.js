/**
 * Ramifip Javascript GUI
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

var RAMIFIP_GUI_HORIZONTAL = "RAMIFIP_GUI_HORIZONTAL";
var RAMIFIP_GUI_VERTICAL = "RAMIFIP_GUI_VERTICAL";
var RAMIFIP_GUI_TOP = "RAMIFIP_GUI_TOP";
var RAMIFIP_GUI_BOTTOM = "RAMIFIP_GUI_BOTTOM";

ramifip.gui = {
    config: {
        defaultShowEffect: null
    },
    showhide: function(id){
        if ($('#' + id).css('display') == 'block') 
            $('#' + id).css('display', 'none');
        else 
            $('#' + id).css('display', 'block');
    },
    center: function(selector, plusleft, plustop){
        ramifip.log.add("[GUI] Center " + selector);
        if (!isset(plusleft)) 
            plusleft = 0;
        if (!isset(plustop)) 
            plustop = 0;
        var w = $(selector).width();
        var h = $(selector).height();
        $(selector).css("left", ($(window).width() - w) / 2 + plusleft);
        $(selector).css("top", ($(window).height() - h) / 2 + plustop);
        
    }
};

// End of file
