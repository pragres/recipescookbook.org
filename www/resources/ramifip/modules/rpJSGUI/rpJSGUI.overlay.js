/**
 * Ramifip JS GUI Overlay
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

ramifip.gui.showOverlay = function(id, zindex){
    ramifip.log.add("[GUI] Showing overlay " + id);
    if (!isset(zindex)) 
        zindex = ramifip.gui.max_zindex + 1;
    if (!isset(id)) 
        id = "overlay";
    $("body").append("<div id = \"" + id + "\"></div>");
    $("#" + id).css("position", "fixed");
    $("#" + id).css("top", "0");
    $("#" + id).css("left", "0");
    $("#" + id).css("width", "100%");
    $("#" + id).css("height", "100%");
    $("#" + id).css("background", "#000");
    $("#" + id).css("z-index", zindex);
    $("#" + id).css("opacity", ".30");
    $("#" + id).css("-moz-opacity", "0.30");
    $("#" + id).css("filter", "alpha(opacity=75)");
    $("#" + id).show();
};

ramifip.gui.hideOverlay = function(id){
    if (!isset(id)) 
        id = "overlay";
    $("#" + id).hide();
    $("#" + id).remove();
};

// End of file