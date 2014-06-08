if (!isset(ramifip.gui)) ramifip.gui = {};

ramifip.gui.remoteExplorer = {
    element: "",
    path: "",
    show: function(element, path){
        this.element = element;
        this.path = path;
        if (!isset(path)) path = "files";
        app.events.ramifip.modules.rpJSGUI.server.remoteexplorer({
            path: path
        }, element);
    },
    deleteFile: function (path){
        ramifip.executeEvent({
            event: "ramifip/modules/rpJSGUI/server/deleteFile",
            path: path
        }, function (res, status){
            if ( status == "success" || status == "notmodified" ){
                ramifip.hideAjaxStatus();
                ramifip.gui.remoteExplorer.refresh();
            }
                
        });
    },
    refresh: function() {
        this.show(this.element, this.path);
    }

};