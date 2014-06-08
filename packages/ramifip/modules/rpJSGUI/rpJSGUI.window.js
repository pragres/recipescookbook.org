/**
 * Ramifip JS GUI Windows
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

ramifip.gui.max_zindex = 0;
ramifip.gui.wins = [];
ramifip.gui.window = function(params){
    var id = "windowx";
    
    ramifip.log.add("[GUI] Showing window  " + params.id);
    
    if (isset(params.id)) 
        id = params.id;
    
	if ($('body').find("#"+id).length>0)
		return false;
	
    if (!isset(params.zindex)) 
        params.zindex = ramifip.gui.max_zindex + 3;
    
    if (ramifip.gui.max_zindex < params.zindex) 
        ramifip.gui.max_zindex = params.zindex;
    
    if (isset(params.modal)) 
        if (params.modal == true) 
            this.showOverlay(params.id + "-overlay", params.zindex - 2);
    
    if (!isset(params.height)) 
        params.height = 400;
    
    if (!isset(params.width)) 
        params.width = 400;
    
    if (!isset(params.body)) 
        params.body = "";
    
    if (!isset(params.title)) 
        params.title = "";
    
    if (!isset(params.position)) 
        params.position = "center";
    
    if (!isset(params.closeButton)) 
        params.closeButton = true;
    
    if (!isset(params.showEffect)) {
        if (ramifip.gui.config.defaultShowEffect != null) 
            params.showEffect = ramifip.gui.config.defaultShowEffect;
    }
    
    ramifip.gui.wins[ramifip.gui.wins.length] = params;
    
    var btnClose = '<div id = "' + id + '-close-button" class = "rp-window-close-button"> x </div>';
    
    $("body").append("<div id ='" + id + "-shadow' class = 'hidden' ></div>");
    $("#" + id + "-shadow").css("position", "fixed");
    $("#" + id + "-shadow").css("z-index", params.zindex - 1);
    $("#" + id + "-shadow").css("background", "black");
    $("#" + id + "-shadow").css("opacity", "0.5");
    
    if (params.closeButton == false) 
        btnClose = '';
    
    var html = '<div id ="' + id + '" class = "rp-window hidden"><div id = "' + id + '-title" class = "rp-window-title">' + params.title + '</div>' + btnClose + '<div id = "' + id + '-body" class = "rp-window-body">' + params.body + '</div></div>';
    
    $('body').append(html);
	$("#" + id).css("position", "fixed");
    $("#" + id).css("height", params.height + 'px');
    $("#" + id).css("width", params.width + 'px');
    $("#" + id).css("z-index", params.zindex);
    
    $("#" + id + "-shadow").css("height", params.height + 'px');
    $("#" + id + "-shadow").css("width", params.width + 'px');
    
    $("#" + id + "-title").css("height", "20px");
    var w = params.width - 14 - 27;
    $("#" + id + "-title").css("width", w + "px");
    
    var h = params.height - 43;
    $("#" + id + "-body").css("height", h + "px");
    w = params.width - 14;
    $("#" + id + "-body").css("width", w + "px");
    
    if (!isset(params.draggable)) 
        params.draggable = true;
    
    if (isset(params.draggable)) {
        if (params.draggable == true) {
            $("#" + id).draggable({
                handle: "#" + id + "-title",
                containment: id + '-overlay',
                scroll: false,
                drag: function(){
                    if ($('body').find("#" + id + "-shadow").length > 0) {
                        var top = intval(str_replace("px", "", $("#" + id).css("top"))) + 5;
                        var left = intval(str_replace("px", "", $("#" + id).css("left"))) + 5;
                        $("#" + id + "-shadow").css("top", top + "px");
                        $("#" + id + "-shadow").css("left", left + "px");
                    }
                }
            });
            $("#" + id + "-title").css("cursor", "move");
        }
    }
    
    if (params.closeButton == true) {
        $("#" + id + "-close-button").click(function(){
            ramifip.gui.hideWin(params.id);
        });
    }
    
    if (isset(params.buttons)) {
        // adding the button bar
        html = '<div class = "rp-button-bar" id = "' + id + '-button-bar' + '"></div>';
        $("#" + id).append(html);
        
        for (var i = 0; i < params.buttons.length; i++) {
        
            // building the button
            var b = params.buttons[i];
            
            if (isset(b.visible)) 
                if (b.visible == false) 
                    continue;
            
            html = '<div class = "rp-button-envolver" id = "' + id + '-button-envolver-' + i + '"><label class = "rp-button" id = "' + id + '-button-' + i + '">' + b.caption + '</label></div>';
            
            // redefine window's body height
            h = params.height - 73;
            $("#" + id + "-body").css("height", h + "px");
            $("#" + id + "-body").css("overflow", "auto");
            
            // adding the button
            $("#" + id + '-button-bar').append(html);
            $("#" + id + '-button-' + i).click(b.click);
            
            if (isset(b.width)) 
                $("#" + id + '-button-envolver-' + i).css("width", b.width + "px");
        }
    }
    
    // window's position
    switch (params.position) {
        case "center":
            this.center('#' + id);
            this.center('#' + id + "-shadow", 5, 5);
            break;
        case "top-left":
            $("#" + id).css("top", "5px");
            $("#" + id).css("left", "5px");
            $("#" + id + "-shadow").css("top", "10px");
            $("#" + id + "-shadow").css("left", "10px");
            
            break;
        case "top-right":
            $("#" + id).css("top", "5px");
            $("#" + id).css("right", "5px");
            $("#" + id + "-shadow").css("top", "10px");
            $("#" + id + "-shadow").css("right", "10px");
            break;
        case "bottom-left":
            $("#" + id).css("bottom", "5px");
            $("#" + id).css("left", "5px");
            $("#" + id + "-shadow").css("bottom", "10px");
            $("#" + id + "-shadow").css("left", "10px");
            break;
        case "bottom-right":
            $("#" + id).css("bottom", "5px");
            $("#" + id).css("right", "5px");
            $("#" + id + "-shadow").css("bottom", "10px");
            $("#" + id + "-shadow").css("right", "10px");
            break;
    }
    
    if (!isset(params.showEffect)) {
        $("#" + id).show();
        $("#" + id + "-shadow").show();
    }
    else 
        $("#" + id).show(params.showEffect, {}, 500, function(){
            $("#" + id + "-shadow").show();
        });
    
    
};

ramifip.gui.getWinIndex = function(id){
    for (var i = 0; i < ramifip.gui.wins.length; i++) 
        if (ramifip.gui.wins[i].id == id) 
            return i;
    return -1;
};

ramifip.gui.hideWin = function(id, effect){
    ramifip.log.add("[GUI] Hide window  " + id);
    var idx = ramifip.gui.getWinIndex(id);
    
    if (!isset(effect)) {
        if (isset(ramifip.gui.wins[idx].showEffect)) 
            effect = ramifip.gui.wins[idx].showEffect;
    }
    
    if (isset(effect)) {
        $("#" + id + "-shadow").remove();
        $("#" + id).hide(effect, {}, 100, function(){
            $("#" + id).remove();
            $("#" + id + "-overlay").remove();
        });
    }
    else {
        $("#" + id).remove();
        $("#" + id + "-overlay").remove();
        $("#" + id + "-shadow").remove();
    }
    
    if (ramifip.gui.wins[idx].modal == true) 
        if (ramifip.gui.wins[idx].zindex == ramifip.gui.max_zindex) 
            ramifip.gui.max_zindex -= 3;
    
    if (isset(ramifip.gui.wins[idx].onClose)) 
        ramifip.gui.wins[idx].onClose();
    
    ramifip.gui.wins = ramifip.removeFromArray(ramifip.gui.wins, idx);
};

// End of file