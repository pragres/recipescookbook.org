/**
 * Ramifip JS GUI CheckBoxList
  * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Sftware Foundation.
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

ramifip.gui.checkBoxList = function(p){

    if (typeof p.render == "undefined") {
        if (typeof p.cmp == "undefined") 
            return false;
        p.render = p.cmp;
    }
    else 
        if (typeof p.cmp == "undefined") 
            p.cmp = p.render;
    
    if (typeof p.showCheckAll == "undefined") 
        p.showCheckAll = false;
    
    if (typeof p.captionCheckAll == "undefined") 
        p.captionCheckAll = "Check all";
    
    if (typeof p.positionCheckAll == "undefined") 
        p.positionCheckAll = RAMIFIP_GUI_TOP;
    
    if (typeof p.onCheckOne == "undefined") 
        p.onCheckOne = function(index){
        };
    if (typeof p.onCheckAll == "undefined") 
        p.onCheckAll = function(){
        };
    if (typeof p.orientation == "undefined") 
        p.orientation = RAMIFIP_GUI_VERTICAL;
    
    for (var i in p.list) {
        if (typeof p.list[i].caption == "undefined") {
            var c = p.list[i];
            p.list[i] = {
                caption: c,
                checked: false
            };
        }
        else {
            if (typeof p.list[i].checked == "undefined") 
                p.list[i].checked = false;
        }
        
        if (typeof p.list[i].onClick == "undefined") 
            p.list[i].onClick = function(checked){
            };
    }
    
    eval("window." + p.cmp + " = {list: p.list, check: function(idx){this.list[idx].checked = !this.list[idx].checked; this.list[idx].onClick(this.list[idx].checked);}, checkAll: function(checked){for(var i in this.list) this.list[i].checked = checked; $(\"#" + p.render + " input.checkbox-listitem\").each(function(){this.checked = checked});}, onCheckOne: p.onCheckOne, onCheckAll: p.onCheckAll};");
    
    var html = '';
    
    for (var i in p.list) {
        var caption = p.list[i].caption;
        var checked = p.list[i].checked;
        html = html + "<input class = \"checkbox-listitem\" type = \"checkbox\" " + (checked == true ? "checked" : "") + " onclick = \"" + p.cmp + ".check(" + i + ");" + p.cmp + ".onCheckOne(" + i + ");\">" + caption;
        if (p.orientation == RAMIFIP_GUI_VERTICAL) 
            html = html + "<br>";
    }
    if (p.showCheckAll == true) {
        var tmp = "<div class =\"checkbox-list-checkall\"><input type = \"checkbox\" onclick = \"" + p.cmp + ".checkAll(this.checked); " + p.cmp + ".onCheckAll();\">" + p.captionCheckAll + "</div>";
        if (p.positionCheckAll == RAMIFIP_GUI_TOP) {
            html = tmp + html;
            if (p.orientation == RAMIFIP_GUI_VERTICAL) 
                html = html + "<br>";
        }
        else {
            if (p.orientation == RAMIFIP_GUI_VERTICAL) 
                html = html + "<br>";
            html = html + tmp;
        }
    }
    
    $("#" + p.render).append(html);
};

// End of file