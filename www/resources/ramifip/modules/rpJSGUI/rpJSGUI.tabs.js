/**
 * Ramifip JS GUI Tabs
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

ramifip.gui.showTabs = function(e, tabs, selected){

    var t = null;
    
    if (!isset(selected)) 
        selected = 1;
    selected -= 1;
    ramifip.log.add("[GUI] Show tabs " + e);
    var html = "<table class =\"tabs\" id = \"" + e + "-tabs\"><tr>";
    for (var i = 0; i < tabs.length; i++) {
        t = tabs[i];
        if (!isset(t.id)) 
            t.id = e + "-tab" + i;
        if (!isset(t.onSelect)) 
            t.onSelect = "";
        html = html + "<td><label id = \"" + e + "-tab-selector-" + i + "\" class =\"rp-tab-button\" onclick = \"$('." + e + "-tab').hide(); $('#" + t.id + "').show(); $('.rp-tab-button').removeClass('rp-tab-button-active'); $('#' + this.id).addClass('rp-tab-button-active'); " + t.onSelect + "\">" + t.caption + "</label></td>";
    }
    html = html + "</tr></table>";
    
    for (i = 0; i < tabs.length; i++) {
        t = tabs[i];
        if (!isset(t.html)) 
            t.html = "";
        if (!isset(t.id)) 
            t.id = e + "-tab" + i;
        html = html + "<div class =\"hidden rp-tab " + e + "-tab\" id = \"" + t.id + "\">" + t.html + "</div>";
    }
    
    $("#" + e).html(html);
    
    // Select default
    i = selected;
    
    t = tabs[i];
    if (!isset(t.id)) 
        t.id = e + "-tab" + i;
    if (!isset(t.onSelect)) 
        t.onSelect = "";
    $('.' + e + '-tab').hide();
    $('#' + t.id).show();
    $('.rp-tab-button').removeClass('rp-tab-button-active');
    $('#' + e + "-tab-selector-" + i).addClass('rp-tab-button-active');
    eval(t.onSelect);
    
};

// End of file