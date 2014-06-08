function validate(){
    return ramifip.gui.validateFields([
        {
            id: "edtName"
        }
    ]);
}

$(function(){
	ramifip.gui.showTabs("recipeTabs",[
		{id: "tab-recipe-data", caption: "Recipe"},
		{id: "tab-recipe-description", caption: "Description"},
		{id: "tab-recipe-preparation", caption: "Preparation mode"}
	]);
	
	$("#tab-recipe-data").html($("#recipeTabTemp1").html());
	$("#tab-recipe-description").html($("#recipeTabTemp3").html());
	$("#tab-recipe-preparation").html($("#recipeTabTemp2").html());
	
	$("#recipeTabTemp1").html("");
	$("#recipeTabTemp2").html("");
	$("#recipeTabTemp3").html("");
    app.rejquery();
});

function uploadPicture(){
    ramifip.gui.window({
        id: "browserUpload",
        title: "Upload file",
        height: 440,
        width: 550,
        modal: true,
        buttons: [
            {
                caption: "Ok",
                width: 150,
                click: function(){
                    var frame = document.getElementById("frameFile");
                    var f = frame.contentDocument.getElementById("edtLastUploadFile").value;
                    if (trim(f) != ""){
                        ramifip.gui.fileChooser.fileselected = f;
                        $('#edtPicture').val(f);
                        $("#recipe-picture-edit").attr("src",  "img.php?f=width-200/" + f);
                        ramifip.gui.hideWin("browserUpload");
                    } else {
                        ramifip.gui.showNotification("Please, select a file.", 5000);
                    }
                }
            }
        ],
        body: '<iframe class ="no-borders" id = "frameFile" src ="index.php?e=ramifip/modules/rpJSGUI/server/uploadFile&folder=../files/recipes")" style="border:0px;width:500px;height:300px;"></iframe>'
    });
}

function updatePicture(path){
    ramifip.gui.fileChooser.show({
        component: "edtPicture",
        choose_folder: false,
        path: "../files/recipes",
        root: "../files/recipes",
        execute_after_finish: function(){
            $("#recipe-picture-edit").attr("src",  "img.php?f=width-200/" + $("#edtPicture").val());
        }
    });
}