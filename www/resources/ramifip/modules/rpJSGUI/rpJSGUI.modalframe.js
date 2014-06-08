/**
 * Ramifip JS GUI Modal Frame
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

ramifip.gui.showModalFrame = function(params){
    ramifip.log.add("[GUI] Showing modal frame " + id);
    if (!isset(params)) 
        params = {};
    if (!isset(params.id)) 
        params.id = "modal-frame";
    
    if (!isset(params.width)) 
        params.width = 60;
    
    if (!isset(params.height)) 
        params.height = 60;
    
    if (!isset(params.background)) 
        params.background = "#eeeeee";
    
    if (!isset(params.zindex)) 
        params.zindex = "9999";
    
    if (!isset(params.padding)) 
        params.padding = "10px";
    
    if (!isset(params.border)) 
        params.border = "5px solid white";
    
    params.top = (100 - params.height) / 2;
    params.left = (100 - params.width) / 2;
    
    ramifip.gui.showOverlay();
    
    $("body").append("<div id =\"" + params.id + "\"></div>");
    
    $("#" + params.id).css("position", "fixed");
    $("#" + params.id).css("top", params.top + "%");
    $("#" + params.id).css("left", params.left + "%");
    $("#" + params.id).css("height", params.height + "%");
    $("#" + params.id).css("width", params.width + "%");
    $("#" + params.id).css("overflow", "auto");
    $("#" + params.id).css("background", params.background);
    $("#" + params.id).css("z-index", params.zindex);
    $("#" + params.id).css("padding", params.padding);
    $("#" + params.id).css("border", params.border);
    $("#" + params.id).show();
};

// End of file