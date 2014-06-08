$(function(){
	$("#btnAddRecord").click(function(){
	    ramifip.gui.window({
	        modal: true,
	        id: "frmAdd",
	        title: "Add email",
	        height: 160,
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
	                        recipes.model.addsubscribe({
	                            email: $("#edtEmail").val()
	                        });
	                        ramifip.gui.hideWin("frmAdd");
	                        refresh();
	                    }
	                }
	            }
	        ]
	    });
	
	    app.events.recipes.admin.view.forms.formSubscribe({
	        action: 'add'
	    },"frmAdd-body");
		
		u('recipes/admin/scripts/formSubscribe', true);
	});
});

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
                    recipes.model.delsubscribe({
                        table: "subscribe",
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
    app.admin.browsers.showUserSubscribe();
}
