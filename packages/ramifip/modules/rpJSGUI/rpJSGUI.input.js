/**
 * Ramifip JS GUI Inputs
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

ramifip.gui.InputInteger = function(p){
    if (isset(p)) {
        var html = "<input type = \"text\" ";
        if (isset(p.id)) 
            html = html + " id = \"" + p.id + "\"";
        if (isset(p.xclass)) 
            html = html + " class = \"rp-input-integer " + p.xclass + "\">";
        if (isset(p.render)) 
            $(p.render).append(html);
        else 
            $("body").append(html);
    }
    
    $(".rp-input-integer").keydown(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if ((keyCode < 48 || keyCode > 60) && keyCode != 8 && keyCode != 39 && keyCode != 37 && keyCode != 46 && keyCode != 9) {
            return false;
        }
        return true;
    });
};

ramifip.gui.InputFloat = function(p){
    if (isset(p)) {
        var html = "<input type = \"text\" ";
        if (isset(p.id)) 
            html = html + " id = \"" + p.id + "\"";
        if (isset(p.xclass)) 
            html = html + " class = \"rp-input-float " + p.xclass + "\">";
        if (isset(p.render)) 
            $(p.render).append(html);
        else 
            $("body").append(html);
    }
    $(".rp-input-float").keydown(function(e){
        var value = e.originalTarget.value;
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        
        if ((keyCode < 48 || keyCode > 60) && keyCode != 8 && keyCode != 190 && keyCode != 39 && keyCode != 37 && keyCode != 46 && keyCode != 9) 
            return false;
        
        if (strpos(value, '.') != false && keyCode == 190) 
            return false;
        
        return true;
    });
};

ramifip.gui.InputPhone = function(p){
    if (isset(p)) {
        var html = "<input type = \"text\" ";
        if (isset(p.id)) 
            html = html + " id = \"" + p.id + "\"";
        if (isset(p.xclass)) 
            html = html + " class = \"rp-input-phone " + p.xclass + "\">";
        if (isset(p.render)) 
            $(p.render).append(html);
        else 
            $("body").append(html);
    }
    $(".rp-input-phone").keydown(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if ((keyCode < 48 || keyCode > 60) && keyCode != 8 && keyCode != 41 && keyCode != 40 && keyCode != 45 && keyCode != 32) {
            return false;
        }
        return true;
    });
};

ramifip.gui.InputPersonName = function(p){
    if (isset(p)) {
        var html = "<input type = \"text\" ";
        if (isset(p.id)) 
            html = html + " id = \"" + p.id + "\"";
        if (isset(p.xclass)) 
            html = html + " class = \"rp-input-person-name " + p.xclass + "\">";
        if (isset(p.render)) 
            $(p.render).append(html);
        else 
            $("body").append(html);
    }
    $(".rp-input-person-name").keydown(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        var value = String.fromCharCode(keyCode);
        if (keyCode == 8 || keyCode == 39 || keyCode == 37 || keyCode == 46 || keyCode == 9) 
            return true;
        return strpos('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ������������', value) === false ? false : true;
    });
};

// End of file