/**
 * Application
 *
 * @author: Rafael Rodriguez
 * @created: 2012-10-27 01:28:45
 */



if (!isset(recipes)) var recipes = {};
recipes.portal = {
    recipe_selected: "",
    showRecipesCatalog: function(){
        $("#portal-title").html("<h1>Recipes Catalog</h1>");
        $("#portal-content").html('<div id = "recipes-catalog-filter"></div><div id = "recipes-catalog-content"></div>');
        app.events.recipes.portal.events.showRecipesCatalog({},"recipes-catalog-content");
        app.events.recipes.portal.events.showRecipesCatalogFilter({},"recipes-catalog-filter");
    },
    showRandomSecret: function(selector){
        if (!isset(selector))
            selector = "random-secret";
        app.events.recipes.portal.events.showRandomSecret({}, selector);
    },
    showShareRecipe: function(id){
        ramifip.gui.window({
            id: "share-recipe",
            title: "Share this recipe",
            body: '<div class = "padding-five">Please write in the field below the email of the receiver for this recipe: <input class = "edit" id = "edtEmail"></div>',
            modal: true,
            width: 500,
            height: 150,
            zindex: 9999,
            buttons: [
                {
                    caption: "Cancel",
                    click: function() {
                        ramifip.gui.hideWin("share-recipe");
                    }

                },
                {
                    caption: "Send",
                    click: function() {
                       var result = app.events.recipes.portal.events.shareRecipe({
                          email: $("#edtEmail").val(),
                          id: id
                       });
                       ramifip.gui.hideWin("share-recipe");
                    }
                }
            ]
        })
    }
};


recipes.portal.DefaultHeader = {
    slide_images: [],
    current_slide: 0,
    stop_slides: false,
    goSlides: function(){
        recipes.portal.DefaultHeader.showSlides();
    },
    stopSlides: function(){
        recipes.portal.DefaultHeader.stop_slides = true;
    },
    playSlides: function(){
        recipes.portal.DefaultHeader.stop_slides = false;
    },
    showSlides: function(){
        if (recipes.portal.DefaultHeader.stop_slides == false
		&& recipes.portal.DefaultHeader.slide_images.length > 0){
            if (recipes.portal.DefaultHeader.current_slide == recipes.portal.DefaultHeader.slide_images.length)
                recipes.portal.DefaultHeader.current_slide = 0;

		$("#slide-image-link").attr("href", url(recipes.portal.DefaultHeader.slide_images[recipes.portal.DefaultHeader.current_slide].path));
		$("#slide-image").attr("alt", recipes.portal.DefaultHeader.slide_images[recipes.portal.DefaultHeader.current_slide].name);
        $("#slide-image").attr("src",CLEAN_URL_BACK_PATH+"images/recipes/" + urlencode(str_replace('../files/recipes/','',recipes.portal.DefaultHeader.slide_images[recipes.portal.DefaultHeader.current_slide].picture)));
		$("#slide-title").html(recipes.portal.DefaultHeader.slide_images[recipes.portal.DefaultHeader.current_slide].name);
		
        // resizing
            var h = $("#slide-image").attr("height");
            var w = $("#slide-image").attr("width");
			
            if (h > w && h > 415){
                $("#slide-image").css("width", null);
                $("#slide-image").css("height", "100%"); 
            }
			
            if (h <= w && w > 687){
                $("#slide-image").css("height", null);
                $("#slide-image").css("width", "100%");
            }

            $("#slide-image").css("height", "415px");
            $("#slide-image").css("width", "687px");

            setTimeout("recipes.portal.DefaultHeader.goSlides()",10000);
            recipes.portal.DefaultHeader.current_slide++;
        }
    }
};

$(function(){
    recipes.portal.DefaultHeader.slide_images = app.events.recipes.portal.events.getListOfRecipesPictures({});
    recipes.portal.DefaultHeader.goSlides();
});

