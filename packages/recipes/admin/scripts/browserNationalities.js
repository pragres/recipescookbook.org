$(function(){
	$("#btnAddRecord").click(function(){
		ramifip.gui.window({
	        modal: true,
	        id: "frmAdd",
	        title: "Add nationality",
	        height: 200,
	        width: 300,
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
	                        recipes.model.addnationality({
	                            name: $("#edtName").val(),
	                            description: $("#edtDescription").val()
	                        });
	                        ramifip.gui.hideWin("frmAdd");
	                        refresh();
	                    }
	                }
	            }
	        ]
	    });
		
	    app.events.recipes.admin.view.forms.formNationality({
	        action: 'add'
	    },"frmAdd-body");
		
		u('recipes/admin/scripts/formDefault', true);
	});
});

function showEditForm(id){
    ramifip.gui.window({
        modal: true,
        id: "frmEdit",
        title: "Edit nationality",
        height: 200,
        width: 300,
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
                        recipes.model.setnationality({
                            id: id,
                            name: $("#edtName").val(),
                            description: $("#edtDescription").val()
                        });
                        ramifip.gui.hideWin("frmEdit");
                        refresh();
                    }
                }
            }
        ]
    });
    app.events.recipes.admin.view.forms.formNationality({
        action: 'edit',
        id: id
    },"frmEdit-body");
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
                    recipes.model.delnationality({
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
    app.admin.browsers.showNationalities();
}