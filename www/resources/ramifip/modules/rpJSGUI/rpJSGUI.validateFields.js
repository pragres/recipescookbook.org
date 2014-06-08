/**
 * Ramifip JS GUI Validate Fields
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

ramifip.gui.validateFields = function(fields, params){
    if (!isset(params)) {
        params = {
            win_error_title: "Incorrect data",
            win_error_body: "Verify your entry data and required fields",
            win_error_height: 150,
            win_error_width: 200,
            win_zindex: 9999
        };
    }
    
    var v = true;
    for (var i = 0; i < fields.length; i++) {
        if (!isset(fields[i].check)) {
            fields[i].check = function(id){
                if ($("#" + id).val() == '' || $("#" + id).val() == null) 
                    return false;
                return true;
            };
        }
        $("#" + fields[i].id).removeClass("field-invalid");
        if (fields[i].check(fields[i].id) == false) {
            $("#" + fields[i].id).addClass("field-invalid");
            v = false;
        }
    }
    
    if (v == false) {
        ramifip.gui.window({
            id: "systemMessage",
            title: params.win_error_title,
            body: params.win_error_body,
            modal: true,
            height: params.win_error_height,
            width: params.win_error_width,
            zindex: params.win_zindex,
            buttons: [{
                caption: "Ok",
                click: function(){
                    ramifip.gui.hideWin("systemMessage");
                }
            }]
        });
    }
    
    return v;
};

// End of file