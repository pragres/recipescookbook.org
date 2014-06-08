$(function(){
	$("#btnAddRecord").click(function(){
	    ramifip.gui.window({
	        modal: true,
	        id: "frmAdd",
	        title: "Add secret of cooking",
	        height: 420,
	        width: 400,
	        buttons: [
	            {
	                caption: "Cancel",
	                click: function(){
	                    ramifip.gui.hideWin("frmAdd");
	                }
	            },{
	                caption: "Ok",
	                click: function(){
	                    if (validate()){
	                        recipes.model.addsecretsofcooking({
	                            secret: $("#editor-edtSecret").html(),
								header: $("#edtHeader").val()
	                        });
	                        ramifip.gui.hideWin("frmAdd");
	                        refresh();
	                    }
	                }
	            }
	        ]
	    });
	
	    app.events.recipes.admin.view.forms.formSecretOfCooking({
	        action: 'add'
	    },"frmAdd-body");
		
	     nicEditors.allTextAreas();
		 
		 u('recipes/admin/scripts/formSecret', true);
	});
});

function showEditForm(id){
    ramifip.gui.window({
        modal: true,
        id: "frmEdit",
        title: "Edit secret of cooking",
        height: 420,
        width: 400,
        buttons: [
            {
                caption: "Cancel",
                click: function(){
                    ramifip.gui.hideWin("frmEdit");
                }
            },{
                caption: "Ok",
                click: function(){
                    if (validate()){
                        recipes.model.setsecretsofcooking({
                            id: id,
                            secret: $("#editor-edtSecret").html(),
							header: $("#edtHeader").val()
                        });
                        ramifip.gui.hideWin("frmEdit");
                        refresh();
                    }
                }
            }
        ]
    });
    app.events.recipes.admin.view.forms.formSecretOfCooking({
        action: 'edit',
        id: id
    },"frmEdit-body");
    
     nicEditors.allTextAreas();
	 
	 u('recipes/admin/scripts/formSecret', true);
}


function showDelete(id){
    ramifip.gui.window({
        modal: true,
        id: "deleteConfirm",
        title: "Delete record",
        body: 'Are you sure?',
        height: 100,
        width: 250,
        buttons: [
            {
                caption: "No",
                click: function(){
                    ramifip.gui.hideWin("deleteConfirm");
                }
            }, {
                caption: "Yes",
                click: function(){
                    recipes.model.delsecretsofcooking({
                        id: id
                    });
                    ramifip.gui.hideWin("deleteConfirm");
                    refresh();
                }
            }
        ]
    });
}

function refresh(){
    $("#admin-detail").html("");
    app.admin.browsers.showSecretsOfCooking();
}