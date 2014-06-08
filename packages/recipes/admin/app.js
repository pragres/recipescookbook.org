if (!isset(recipes)) var recipes = {};
recipes.model = {};

app.rejquery = function(){
   
    $(".integer").keydown(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if ((keyCode < 48 || keyCode >60) && keyCode != 8 &&
            keyCode != 39 && keyCode !=  37 && keyCode !=  46 && keyCode != 9){
            return false;
        }
        return true;
    });

    $(".float").keydown(function(e){
        var value = e.target.value;
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;

        if ((keyCode < 48 || keyCode >60) && keyCode != 8 && keyCode != 190 &&
            keyCode != 39 && keyCode !=  37 && keyCode !=  46 && keyCode !=  9)
            return false;

        if (strpos(value, '.') != false && keyCode == 190) return false;

        return true;
    });

    $(".phone").keypress(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if ((keyCode < 48 || keyCode >60) && keyCode != 8 && keyCode != 41 && keyCode != 40 && keyCode != 45 && keyCode != 32){
            return false;
        }
        return true;
    });

    $(".person-name").keydown(function(e){
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        var value = String.fromCharCode(keyCode);
        if (keyCode == 8 || keyCode == 39 || keyCode == 37 || keyCode == 46 || keyCode == 9)
            return true;
        return strpos('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\' ', value) === false?false:true;
    });
};

app.admin = {
    browsers: {
        showDiets: function(){
            app.events.recipes.admin.view.browsers.browserDiets({},"admin-section");
            u('recipes/admin/scripts/browserDiets', true);
			app.admin.resize();
        },
        showFoodTypes: function(){
            app.events.recipes.admin.view.browsers.browserFoodTypes({},"admin-section");
			u('recipes/admin/scripts/browserFoodTypes', true);
            app.admin.resize();
        },
        showHoraries: function(){
            app.events.recipes.admin.view.browsers.browserHoraries({},"admin-section");
            u('recipes/admin/scripts/browserHoraries', true);
			app.admin.resize();
        },
        showIngredients: function(){
            app.events.recipes.admin.view.browsers.browserIngredients({},"admin-section");
			u('recipes/admin/scripts/browserIngredients', true);
            app.admin.resize();
        },
        showNationalities: function(){
            app.events.recipes.admin.view.browsers.browserNationalities({},"admin-section");
			u('recipes/admin/scripts/browserNationalities', true);
            app.admin.resize();
        },
        showOccasions: function(){
            app.events.recipes.admin.view.browsers.browserOccasions({},"admin-section");
			u('recipes/admin/scripts/browserOccasions', true);
            app.admin.resize();
        },
        showPreparationTypes: function(){
            app.events.recipes.admin.view.browsers.browserPreparationTypes({},"admin-section");
			u('recipes/admin/scripts/browserPreparationTypes', true);
            app.admin.resize();
        },
        showRecipes: function(order, page){
			if (!isset(order) || order == null) order = 'name';
			if (!isset(page) || page == null) page = 1; 
            app.events.recipes.admin.view.browsers.browserRecipes({order: order, page: page},"admin-section");
			u('recipes/admin/scripts/browserRecipes', true);
            app.admin.resize();
        },
        showSecretsOfCooking: function(){
            app.events.recipes.admin.view.browsers.browserSecretsOfCooking({},"admin-section");
			u('recipes/admin/scripts/browserSecretsOfCooking', true);
            app.admin.resize();
        },
        showUserComments: function(){
            app.events.recipes.admin.view.browsers.browserUserComments({},"admin-section");
			u('recipes/admin/scripts/browserUserComments', true);
            app.admin.resize();
        },
        showUserSubscribe: function(){
            app.events.recipes.admin.view.browsers.browserUserSubscribe({},"admin-section");
			u('recipes/admin/scripts/browserUserSubscribe', true);
            app.admin.resize();
        }
    },
    showStatistics: function(){
        app.events.recipes.admin.events.Statics({},"admin-section");
        app.admin.resize();
    },
    resize: function(){
        var w = $(window).height()-50-70;
        $("#admin-section").css("height",w + "px");
    },
    login: function(){
        var r = app.events.recipes.admin.events.login({
            edtUser: $("#edtUser").val(),
            edtPassword: $("#edtPassword").val(),
            btnLogin: "Login"
        });
        if (r.ok == true){
            $("body").html("<div id =\"page\"></div>");
            app.events.recipes.admin.events.AdminPage({},"page");
        } else {
            $("#edtUser").val("");
            $("#edtPassword").val("");
            ramifip.gui.window({
                id: "access-denied",
                body: "Access denied",
                modal: true,
                title: "Authentication",
                height: 150
            });
        }
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

    },
    logout: function(){
        app.events.recipes.admin.events.logout({});
        $("body").html("<div id =\"page\"></div>");
        app.events.recipes.admin.events.AuthPage({},"page");
    }
};

$(function(){
	
	$(".menu-item").click(function(){
		var m = "app.admin.browsers.show" + $(this).attr('option') + "();";
		eval(m);
	});
			
	$("#btnStatics").click(function(){
		app.admin.showStatistics();
	});
	
	$("#btnLogout").click(function(){
		app.admin.logout();	
	});
	
	 $(window).resize(function(){
           app.admin.resize();
     });
});


app.Run = function(){
    switch(PATH){
        case "admin":
			recipes.model = app.events.recipes.common.model;
			app.admin.resize();
            break;
    };
};
