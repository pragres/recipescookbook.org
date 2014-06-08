if (!isset(ramifip.gui)) ramifip.gui = {};

ramifip.gui.fileChooser = {
    path: "",
    fileselected: "",
    component: "",
    execute_after_finish: function(){},
    show: function (params){
        this.component = params.component;

        if(!isset(params.choose_folder))
            params.choose_folder = true;

        if (!isset(params.path)) params.path = "../files";
        if (!isset(params.root)) params.root = "../files";
        
        this.path  = params.path;
        this.root = params.root;

        this.fileselected = params.fileselected;
        
        if (isset(params.execute_after_finish))
            this.execute_after_finish = params.execute_after_finish;
        
        ramifip.gui.window({
            id: "filechooser",
            title: "Choose a file",
            width: 600,
            height: 500,
            buttons: [
            {
                caption: "Cancel",
                click: function(){
                    ramifip.gui.hideWin("filechooser");
                }
            },
            {
                caption: "Ok",
                click: function(){
                    ramifip.gui.fileChooser.selectFileAndClose();
                }
            },            
            {
                caption: "Choose folder",
                width: 160,
                visible: params.choose_folder == true,
                click: function(){
                    $('#' + ramifip.gui.fileChooser.component).val(ramifip.gui.fileChooser.path);
                    ramifip.gui.fileChooser.execute_after_finish();
                    ramifip.gui.hideWin("filechooser");
                }
            },{
                caption: "Upload file",
                width: 160,
                click: function(){
                    ramifip.gui.window({
                        id: "browserUpload",
                        title: "Upload file",
                        height: 440,
                        width: 550,
                        modal: true,
                        onClose: function(){
                            app.events.ramifip.modules.rpJSGUI.server.fileChooser({
                                id: "fch",
                                path: "../files",
                                idcomponent: "filechooser-body"
                            },"filechooser-body");
                        },
                        buttons: [
                        {
                            caption: "Ok",
                            click: function(){
                                ramifip.gui.hideWin("browserUpload");
                                app.events.ramifip.modules.rpJSGUI.server.fileChooser({
                                    id: "fch",
                                    path: "../files",
                                    idcomponent: "filechooser-body"
                                },"filechooser-body");
                            }
                        },{
                            caption: "Select this file",
                            width: 150,
                            click: function(){
                                var frame = document.getElementById("frameFile");
                                var f = frame.contentDocument.getElementById("edtLastUploadFile").value;
                                if (trim(f) != ""){
                                    ramifip.gui.fileChooser.fileselected = f;
                                    $('#' + ramifip.gui.fileChooser.component).val(f);
                                    ramifip.gui.fileChooser.execute_after_finish();
                                    ramifip.gui.hideWin("filechooser");
                                    ramifip.gui.hideWin("browserUpload");
                                } else {
                                    ramifip.gui.showNotification("Please, select a file.", 5000);
                                }
                            }
                        }
                        ],
                        body: '<iframe class ="no-borders" id = "frameFile" src ="index.php?e=ramifip/modules/rpJSGUI/server/uploadFile&folder=' +ramifip.gui.fileChooser.path + '")" style="border:0px;width:500px;height:300px;"></iframe>'
                    });
                }
            }
            ],
            modal: true,
            zindex: 9999
        });
        
        app.events.ramifip.modules.rpJSGUI.server.fileChooser({
            id: "fch",
            path: params.path,
            root: params.root,
            component: "filechooser-body"
        },"filechooser-body");
    },
    selectFileAndClose: function(){
        $('#' + ramifip.gui.fileChooser.component).val(ramifip.gui.fileChooser.fileselected);
        ramifip.gui.fileChooser.execute_after_finish();
        ramifip.gui.hideWin("filechooser");
    },
    showImage: function(params){
        if (!isset(params.width))
            params.width = 600;
        if (!isset(params.height))
            params.height = 500;
        var w = (params.width - 60);
        ramifip.gui.window({
            id: "image-viewer",
            title: params.path,
            height: params.height,
            width: params.width,
            body: "<div style=\"margin: auto; width: "+w+"px;\">" + img(params.path+"&w="+w, "width = \""+ w +"\"") + "</div>",
            modal: true
        });

    }
};