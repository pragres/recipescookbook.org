<?php

/**
 * Application
 *
 * @author: Rafael Rodriguez
 * @created: 2012-10-27 01:28:45
 */

class app extends RecipesControl{

	static $access_denied = false;

	/**
	 * Show Find Recipe Page
	 */
	static function showFindRecipePage() {
		app::connectToDB();

		$ings = objectDB::getObjs(array("tbName" => "ingredient", "order" => "name"));

		$params = array();

		// Load list of ingredients
		$params['ingredients_list'] = array();
		foreach ($ings as $ing)	$params['ingredients_list'][] = array("id" => $ing->getId(), "name"=> $ing->name);

		// Load list of nationalities
		$params['nationality'] = array();
		$arr = objectDB::getObjs("nationality");
		foreach ($arr as $item) $params['nationality'][] = array("id"=>$item->getId(), "name" => $item->name);

		// Load list of diets
		$params['diet'] = array();
		$arr = objectDB::getObjs("diet");
		foreach ($arr as $item) $params['diet'][] = array("id" => $item->getId(), "name"=> $item->name);

		// Load list of preparation types
		$params['preparation'] = array();
		$arr = objectDB::getObjs("preparationtype");
		foreach ($arr as $item)	$params['preparation'][] = array("id" => $item->getId(), "name"=> $item->name);

		// Load list of occasion
		$params['occasion'] = array();
		$arr = objectDB::getObjs("occasion");
		foreach ($arr as $item)	$params['occasion'][] = array("id" => $item->getId(), "name"=> $item->name);

		// Load list of horaries
		$params['horary'] = array();
		$arr = objectDB::getObjs("horary");
		foreach ($arr as $item)	$params['horary'][] = array("id" => $item->getId(), "name"=> $item->name);

		// Load list of cooking time
		$params['cooking_time'] = array();
		$col = objectDB::query("SELECT cookingtime FROM recipe GROUP BY cookingtime;", true, false);
		foreach ($col as $item)	$params['cooking_time'][] = $item['cookingtime'];

		$params['header'] = "recipes/portal/design/header_default";
		$params['content'] = "recipes/portal/design/find_recipe";

		echo new rpPage("recipes/portal/design/page", $params);
	}

	/**
	 * Show Recipe page
	 */
	static function showRecipePage($id = null) {
		app::connectToDB();

		ramifip::useJS("recipes/portal/scripts/recipe_view");
		ramifip::useJS("recipes/portal/scripts/last_comments");

		if (intval($id)==0){
			$col = objectDB::getObjs(array("tbName" => "recipe", "where" => "name = '$id'"));
			if (isset($col[0])){
				$id = $col[0]->getId();
			}
			else $id = null;
		}

		if (is_null($id)) {
			$id = get("recipe");
			self::showHomePage();
		} else {
			$r = RecipesModel::getRecipe($id);
			app::$title = app::$title . ": How to make " . $r->name;
			ramifip::useJS("recipes/portal/scripts/recipe_header");

			$data = array();
			$r->id = $r->getId();
			$r->preparationmode = utf8_encode( html_entity_decode($r->preparationmode));
			$data['header'] = "recipes/portal/design/header_recipe";
			$data['content'] = "recipes/portal/design/recipe";

			if (substr($r->picture,0,17) == '../files/recipes/') $r->picture = substr($r->picture,17);
			if (!rpFileSystem::fileExists(FILES."recipes/".$r->picture)) $r->picture = false;

			$data['recipe'] = $r;
			$data['similars'] = RecipesModel::getSimilarRecipes($r);
			$data['id_recipe'] = $r->getId();
			$data['ingredients'] = $r->ingredients;
			$data['horaries'] = $r->horaries;

			echo new rpPage("recipes/portal/design/page",$data);
		}
	}

	/**
	 * Show the recipes catalog page
	 *
	 * @param bool $onlyresults
	 */
	static function showRecipesCatalog($onlyresults = false){

		ramifip::useJS("recipes/portal/scripts/recipes_catalog");

		$filter = post("filter", "");
		$data['catalog'] = RecipesModel::getCatalog($filter);
		$data['content'] = "recipes/portal/design/recipes_catalog";
		$data['header'] = "recipes/portal/design/header_default";

		echo new rpPage($onlyresults ?
		"recipes/portal/design/recipes_catalog_result" :
		"recipes/portal/design/page", $data);
	}

	/**
	 * Show the subscribe page
	 *
	 */
	static function showSubscribePage(){

		$email = post("edtSubscribeEmail");

		$error = false;
		$success = false;
		if ($email != null) {
			$email = trim($email);
			$email = str_replace("'", "", $email);
			$email = str_replace(" ", "", $email);
			$email = str_replace(";", "", $email);

			if ($email != "" && rpMail::checkAddress($email)==true) {
				app::connectToDB();

				$col = objectDB::getObjs(array(
                    "tbName" => "subscribe",
                    "where" => "email = '$email'"
				));

				if (count($col) == 0) {
					$s = new subscribe(array(
                        "email" => $email
					));
				}

				rpMail::sendHTML(array(
                    "from" => "mirta@pragres.com",
                    "to" => $email,
                    "subject" => "Thank you for subscribing to Mirta Recipes Cookbook",
                    "body" => "<h1>Mirta Recipes Cookbook</h1>You are now subscribed to Mirta Recipes Cookbook (http://recipescookbook.org). Thanks for your interest. If you do not want to continue receiving news and free recipes, please reply back to me stating your wish and I will remove your email from the list promptly.<br/><br/>Wishing you a nice day:<br/>Mirta Calvo"
                    ));

                    $success = true;
			} else $error = true;
		}

		if (!$success){
			echo new rpPage("recipes/portal/design/page", array(
				"header" => "recipes/portal/design/header_default",
				"content" => "recipes/portal/design/subscribe",
				"error" => $error,
				"email" => $email
			));
		} else header("Location: thank-you");
	}

	/**
	 * Show Whi am I page
	 *
	 */
	static function showWhoAmI(){
		echo new rpPage("recipes/portal/design/page",array(
			"content" => "recipes/portal/design/who-i-am"
			));
	}

	/**
	 * Show the Read a secret page
	 *
	 */
	static function showReadAScretPage(){
		ramifip::useJS("recipes/portal/scripts/read_secret");
		echo new rpPage("recipes/portal/design/page", array(
			"header" => "recipes/portal/design/header_default",
			"content" => "recipes/portal/design/read_secret"
			));
	}

	/**
	 * Show home page
	 *
	 */
	static function showHomePage(){
		/*
		 $r = RecipesModel::getRecords("recipe");
		 foreach($r as $k =>$v){
			$r[$k] = RecipesModel::getRecipe($v->getId());
			}
			echo div::jsonEncode($r);

			//var_dump($r);
			exit();
			*/

		echo new rpPage("recipes/portal/design/page", array(
			"header" => "recipes/portal/design/header_default",
			"content" => "recipes/portal/design/home",
			"popular_recipes" => RecipesModel::getPopularRecipes(),
			"more_searched" => RecipesModel::getMoreSearchedRecipes(),
			"last_inserted" => RecipesModel::getLastInsertedRecipes()
		));
	}

	/**
	 * Print the recipe
	 *
	 * @param integer $id
	 */
	static function printRecipe($id){
		$recipe = RecipesModel::getRecipe($id);
		if ($recipe != null) {
			$recipe->id = $id;
			if (!rpFileSystem::fileExists($recipe->picture)) $recipe->picture = false;
			e("recipes/portal/design/print_recipe", $recipe);
		}

	}

	/**
	 * Share a recipe sending Recipe PDF to email address
	 * @param <type> $id
	 * @param <type> $email
	 * @return <type>
	 */
	static function shareRecipe($id, $email) {

		u("recipes/common/RecipePDF");

		if ($id != null) {
			$err = error_reporting();
			error_reporting(~E_ALL);
			$file = new RecipePDF($id);
			$file->Output('../files/temp/MirtaRecipe_' . $id . '.pdf', 'F');
			error_reporting($err);
				
			rpMail::sendHTMLWithAttachment(array(
                        "file-type" => "application/pdf",
                        "file-name" => "Mirtarecipe_$id.pdf",
                        "file-path" => "../files/temp/MirtaRecipe_$id.pdf",
                        "subject" => $file->recipe->name . ", by Mirta's recipes",
                        "body" => "I shared this recipe with you.<br>Regards.",
                        "from" => app::getConfiguration()->share_recipe_email_from,
                        "to" => $email
			));

			return true;
		}
		return false;
	}
	
	static function showThankYouPage(){
		echo new rpPage("recipes/portal/design/page", array(
			"header" => "recipes/portal/design/header_default",
			"content" => "recipes/portal/design/thankyou"));
	}

	/**
	 * Run the application
	 *
	 */
	static function Run(){
		$host = $_SERVER['HTTP_HOST'];
		$uri = rpURL::getCleanURL();
		if ($uri == "")	$uri = get("q");
		$arr = explode("/", $uri);
		$recipe = get("recipe");
		$print = get("print");
		if ($arr[0]=="print") $print = $arr[1];

		if ($arr[0] == "recipe"){
			$prefix = "How-to-make-";
			$arr[1] = trim($arr[1]);
			if (intval($arr[1])>0){
				$recipe = RecipesModel::getRecipe(intval($arr[1]));
				if (!is_null($recipe)){
					header("HTTP/1.1 301 Moved Permanently");
					header("Location: http://recipescookbook.org/".self::recipePath($recipe));
				} else{
					header("HTTP/1.1 404 Not Found");
					header('Status: 404 Not Found');
					e("recipes/portal/design/page_not_found");
					exit();
				}
			} else{
				$lprefix = strlen($prefix);
				if (substr($arr[1],0,$lprefix)==$prefix) {
					$arr[1] = substr($arr[1],$lprefix);
				} else {
					// redirect
					header('HTTP/1.1 301 Moved Permanently');
					header("Location: http://recipescookbook.org/recipe/How-to-make-{$arr[1]}");
				}
				$recipe = isset($arr[1]) ? urldecode(str_replace("-"," ",$arr[1])) : null;
			}
		}

		if ($host == "mirtarecipes.pragres.com"){
			header("HTTP/1.1 301 Moved Permanently");
			header("Location: http://recipescookbook.org/$uri");
		}

		if ($recipe != null)
		self::showRecipePage($recipe);
		elseif ($print != null)
		self::printRecipe($print);
		else {
			if (count($arr) > 0) {
				switch ($arr[0]) {
					case "find-recipe":
						self::showFindRecipePage();
						break;
					case "recipes-catalog":
						self::showRecipesCatalog();
						break;
					case "who-am-i":
						self::showWhoAmI();
						break;
					case "read-a-secret":
						app::showReadAScretPage();
						break;
					case "my-book":
						self::showSubscribePage();
						break;
					case "thank-you":
						self::showThankYouPage();
						break;
					default:
						self::showHomePage();
				}
			}
		}

	}
}

// End of file