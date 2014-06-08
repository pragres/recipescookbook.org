// RAMIFIP PHP FRAMEWORK - Generated file - 2012-12-26 02:00:22 - Javascript Configuration file
ramifip.paths[ramifip.paths.length] = "download/SaveRecipe.php"; 
ramifip.paths[ramifip.paths.length] = "../files/recipes"; 
ramifip.paths[ramifip.paths.length] = "recipes/portal/sitemap.xml.php"; 
ramifip.paths[ramifip.paths.length] = "Recipes\'s Administration"; 
ramifip.paths[ramifip.paths.length] = "recipes/portal/images"; 
ramifip.paths[ramifip.paths.length] = "recipes/admin/view/graphs"; 
if (!app.events) app.events = {}; 
if (!app.events.ramifip) app.events.ramifip = {}; 
if (!app.events.ramifip.modules) app.events.ramifip.modules = {}; 
if (!app.events.ramifip.modules.rpCore) app.events.ramifip.modules.rpCore = {}; 
if (!app.events.ramifip.modules.rpCore.events) app.events.ramifip.modules.rpCore.events = {}; 

app.events.ramifip.modules.rpCore.events.core = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/core'; 
     return ramifip.loadObjectFromEvent(data);
};
app.events.ramifip.modules.rpCore.events.core_getServerProperties = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/core/getServerProperties'; 
     return ramifip.loadObjectFromEvent(data);
};
app.events.ramifip.modules.rpCore.events.core_setLang = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/core/setLang'; 
     return ramifip.loadObjectFromEvent(data);
};
app.events.ramifip.modules.rpCore.events.core_folderExists = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/core/folderExists'; 
     return ramifip.loadObjectFromEvent(data);
};
app.events.ramifip.modules.rpCore.events.core_fileExists = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/core/fileExists'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpCore.events.translator = function(data){
     data.EVENT = 'ramifip/modules/rpCore/events/translator'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpCore.events.usage = function(data, fcomplete){
     data.EVENT = 'ramifip/modules/rpCore/events/usage'; 
     ramifip.executeEvent(data, fcomplete);
};
if (!app.events.ramifip.modules.rpJSGUI) app.events.ramifip.modules.rpJSGUI = {}; 
if (!app.events.ramifip.modules.rpJSGUI.server) app.events.ramifip.modules.rpJSGUI.server = {}; 

app.events.ramifip.modules.rpJSGUI.server.deleteFile = function(data, fcomplete){
     data.EVENT = 'ramifip/modules/rpJSGUI/server/deleteFile'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.ramifip.modules.rpJSGUI.server.fileChooser = function(data, element, fcomplete){
     data.EVENT = 'ramifip/modules/rpJSGUI/server/fileChooser'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.ramifip.modules.rpJSGUI.server.newFolder = function(data, fcomplete){
     data.EVENT = 'ramifip/modules/rpJSGUI/server/newFolder'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.ramifip.modules.rpJSGUI.server.remoteexplorer = function(data, element, fcomplete){
     data.EVENT = 'ramifip/modules/rpJSGUI/server/remoteexplorer'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.ramifip.modules.rpJSGUI.server.uploadFile = function(data, fcomplete){
     data.EVENT = 'ramifip/modules/rpJSGUI/server/uploadFile'; 
     ramifip.executeEvent(data, fcomplete);
};
if (!app.events.ramifip.modules.rpORM) app.events.ramifip.modules.rpORM = {}; 
if (!app.events.ramifip.modules.rpORM.events) app.events.ramifip.modules.rpORM.events = {}; 

app.events.ramifip.modules.rpORM.events.addEntity = function(data){
     data.EVENT = 'ramifip/modules/rpORM/events/addEntity'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpORM.events.delEntity = function(data){
     data.EVENT = 'ramifip/modules/rpORM/events/delEntity'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpORM.events.getCollection = function(data){
     data.EVENT = 'ramifip/modules/rpORM/events/getCollection'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpORM.events.getEntity = function(data){
     data.EVENT = 'ramifip/modules/rpORM/events/getEntity'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.ramifip.modules.rpORM.events.setEntity = function(data){
     data.EVENT = 'ramifip/modules/rpORM/events/setEntity'; 
     return ramifip.loadObjectFromEvent(data);
};
if (!app.events.recipes) app.events.recipes = {}; 
if (!app.events.recipes.admin) app.events.recipes.admin = {}; 
if (!app.events.recipes.admin.events) app.events.recipes.admin.events = {}; 

app.events.recipes.admin.events.AdminPage = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/events/AdminPage'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.events.AuthPage = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/events/AuthPage'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.events.Statics = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/events/Statics'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.events.login = function(data){
     data.EVENT = 'recipes/admin/events/login'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.admin.events.logout = function(data, fcomplete){
     data.EVENT = 'recipes/admin/events/logout'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.admin.events.subscribelist = function(data, fcomplete){
     data.EVENT = 'recipes/admin/events/subscribelist'; 
     ramifip.executeEvent(data, fcomplete);
};
if (!app.events.recipes.admin.view) app.events.recipes.admin.view = {}; 
if (!app.events.recipes.admin.view.browsers) app.events.recipes.admin.view.browsers = {}; 

app.events.recipes.admin.view.browsers.browserDiets = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserDiets'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserFoodTypes = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserFoodTypes'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserHoraries = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserHoraries'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserHoraryByRecipe = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserHoraryByRecipe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserIngredientByRecipe = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserIngredientByRecipe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserIngredients = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserIngredients'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserNationalities = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserNationalities'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserOccasions = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserOccasions'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserPreparationTypes = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserPreparationTypes'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserRecipes = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserRecipes'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserSecretsOfCooking = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserSecretsOfCooking'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserUserComments = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserUserComments'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.browsers.browserUserSubscribe = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/browsers/browserUserSubscribe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};
if (!app.events.recipes.admin.view.forms) app.events.recipes.admin.view.forms = {}; 

app.events.recipes.admin.view.forms.formDiet = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formDiet'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formFoodType = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formFoodType'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formHorary = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formHorary'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formIngredient = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formIngredient'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formNationality = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formNationality'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formOccasion = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formOccasion'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formPreparationType = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formPreparationType'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formRecipe = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formRecipe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formSecretOfCooking = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formSecretOfCooking'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.admin.view.forms.formSubscribe = function(data, element, fcomplete){
     data.EVENT = 'recipes/admin/view/forms/formSubscribe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};
if (!app.events.recipes.common) app.events.recipes.common = {}; 
if (!app.events.recipes.common.model) app.events.recipes.common.model = {}; 

app.events.recipes.common.model.adddiet = function(data){
     data.EVENT = 'recipes/common/model/adddiet'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addfoodtype = function(data){
     data.EVENT = 'recipes/common/model/addfoodtype'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addhorary = function(data){
     data.EVENT = 'recipes/common/model/addhorary'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addhorary_recipe = function(data){
     data.EVENT = 'recipes/common/model/addhorary_recipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addingredient = function(data){
     data.EVENT = 'recipes/common/model/addingredient'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addingredient_recipe = function(data){
     data.EVENT = 'recipes/common/model/addingredient_recipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addnationality = function(data){
     data.EVENT = 'recipes/common/model/addnationality'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addoccasion = function(data){
     data.EVENT = 'recipes/common/model/addoccasion'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addpreparationtype = function(data){
     data.EVENT = 'recipes/common/model/addpreparationtype'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addrecipe = function(data){
     data.EVENT = 'recipes/common/model/addrecipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addsecretsofcooking = function(data){
     data.EVENT = 'recipes/common/model/addsecretsofcooking'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addsubscribe = function(data){
     data.EVENT = 'recipes/common/model/addsubscribe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.addusercomments = function(data){
     data.EVENT = 'recipes/common/model/addusercomments'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.deldiet = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/deldiet'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delfoodtype = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delfoodtype'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delhorary = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delhorary'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delhorary_recipe = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delhorary_recipe'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delingredient = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delingredient'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delingredient_recipe = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delingredient_recipe'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delnationality = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delnationality'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.deloccasion = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/deloccasion'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delpreparationtype = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delpreparationtype'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delrecipe = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delrecipe'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delsecretsofcooking = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delsecretsofcooking'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delsubscribe = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delsubscribe'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.delusercomments = function(data, fcomplete){
     data.EVENT = 'recipes/common/model/delusercomments'; 
     ramifip.executeEvent(data, fcomplete);
};

app.events.recipes.common.model.setdiet = function(data){
     data.EVENT = 'recipes/common/model/setdiet'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setfoodtype = function(data){
     data.EVENT = 'recipes/common/model/setfoodtype'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.sethorary = function(data){
     data.EVENT = 'recipes/common/model/sethorary'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.sethorary_recipe = function(data){
     data.EVENT = 'recipes/common/model/sethorary_recipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setingredient = function(data){
     data.EVENT = 'recipes/common/model/setingredient'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setingredient_recipe = function(data){
     data.EVENT = 'recipes/common/model/setingredient_recipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setnationality = function(data){
     data.EVENT = 'recipes/common/model/setnationality'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setoccasion = function(data){
     data.EVENT = 'recipes/common/model/setoccasion'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setpreparationtype = function(data){
     data.EVENT = 'recipes/common/model/setpreparationtype'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setrecipe = function(data){
     data.EVENT = 'recipes/common/model/setrecipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setsecretsofcooking = function(data){
     data.EVENT = 'recipes/common/model/setsecretsofcooking'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setsubscribe = function(data){
     data.EVENT = 'recipes/common/model/setsubscribe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.common.model.setusercomments = function(data){
     data.EVENT = 'recipes/common/model/setusercomments'; 
     return ramifip.loadObjectFromEvent(data);
};
if (!app.events.recipes.portal) app.events.recipes.portal = {}; 
if (!app.events.recipes.portal.events) app.events.recipes.portal.events = {}; 

app.events.recipes.portal.events.getIngredient = function(data){
     data.EVENT = 'recipes/portal/events/getIngredient'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.getListOfRecipesPictures = function(data){
     data.EVENT = 'recipes/portal/events/getListOfRecipesPictures'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.incPeopleLike = function(data){
     data.EVENT = 'recipes/portal/events/incPeopleLike'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.incPeopleUnlike = function(data){
     data.EVENT = 'recipes/portal/events/incPeopleUnlike'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.incViewAmount = function(data){
     data.EVENT = 'recipes/portal/events/incViewAmount'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.printRecipe = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/printRecipe'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.portal.events.shareRecipe = function(data){
     data.EVENT = 'recipes/portal/events/shareRecipe'; 
     return ramifip.loadObjectFromEvent(data);
};

app.events.recipes.portal.events.showLastComments = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/showLastComments'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.portal.events.showRandomSecret = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/showRandomSecret'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.portal.events.showRecipesCatalog = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/showRecipesCatalog'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.portal.events.showRecipesCatalogFilter = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/showRecipesCatalogFilter'; 
     return ramifip.loadHTML(data, element, fcomplete);
};

app.events.recipes.portal.events.showSearchResult = function(data, element, fcomplete){
     data.EVENT = 'recipes/portal/events/showSearchResult'; 
     return ramifip.loadHTML(data, element, fcomplete);
};
