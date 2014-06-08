/**
 * Ramifip JS GUI Fieldset Collapsible
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

ramifip.gui.toggleFieldsetCollapsible = function(id){
    var content = $("#" + id + "> div");
    if ($('#' + id).is('.rp-collapsed')) {
        content.show();
        $("#" + id).removeClass("rp-collapsed");
    }
    else {
        content.hide();
        $("#" + id).addClass("rp-collapsed");
    }
};

ramifip.gui.FieldsetCollapsible = function(p){
	p = cop(p, {
        id: "fstCollapsible-" + date("Ymdhis"),
        legend: "",
        content: "",
        collapsed: false,
        xclass: "",
        render: "body"
    });
    
    var html = "<fieldset id = \"" + p.id + "\" class = \"rp-collapsible " + p.xclass + "\">";
    
    html = html + "<legend style = \"cursor: pointer;\" onclick = \"ramifip.gui.toggleFieldsetCollapsible('" + p.id + "');\">" + p.legend + "</legend>";
    html = html + "<div>" + p.content + "</div>";
    html = html + "</fieldset>";
    
    $(p.render).append(html);
    
    if (p.collapsed == true) 
        this.toggleFieldsetCollapsible(p.id);
};

ramifip.gui.FieldsetCollapsibleV2 = function(p){
    p = cop(p, {
        collapsed: false
    });
    
    $("#" + p.id).addClass("rp-collapsible");
    $("#" + p.id + "> legend").attr("onclick", "ramifip.gui.toggleFieldsetCollapsible('" + p.id + "');");
    
    if (p.collapsed == true) 
        this.toggleFieldsetCollapsible(p.id);
};

// End of file