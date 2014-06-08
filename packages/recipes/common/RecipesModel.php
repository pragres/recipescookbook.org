<?php

/**
 * Mirta Recipes Common Model
 *
 * This class contain somes methods for manipulate the storage data
 *
 */

class RecipesModel {

	/**
	 * Send query to database server
	 * @param <type> $query
	 */
	static function sendQuery($query) {
		app::connectToDB();
		objectDB::query($query, true);
	}

	/**
	 * Get simple VO of recipe
	 * @param <type> $id
	 * @return <type>
	 */
	static function getSimpleRecipe($id) {
		app::connectToDB();
		return objectDB::getObjs("recipe", "id_recipe = $id;");
	}

	/**
	 * Increment view's ammount
	 * @param <type> $recipe_id
	 * @return <integer>
	 */
	static function incViewAmmount($recipe_id) {
		if ($recipe_id != null) {
			self::sendQuery("UPDATE recipe SET viewamount = viewamount + 1 where id_recipe = $recipe_id;");
			$r = self::getSimpleRecipe($recipe_id);
			return $r[0]->viewamount;
		}
		return 0;
	}

	/**
	 * Increment people like
	 * @param <type> $recipe_id
	 * @return <type>
	 */
	static function incPeopleLike($recipe_id) {
		if ($recipe_id != null) {
			self::sendQuery("UPDATE recipe SET peoplelike = peoplelike + 1 where id_recipe = $recipe_id;");
			$r = self::getSimpleRecipe($recipe_id);
			return $r[0]->peoplelike;
		}
		return 0;
	}

	/**
	 * Increment people unlike
	 * @param <type> $recipe_id
	 */
	static function incPeopleUnlike($recipe_id) {
		if ($recipe_id != null) {
			self::sendQuery("UPDATE recipe SET peopleunlike = peopleunlike + 1 where id_recipe = $recipe_id;");
			$r = self::getSimpleRecipe($recipe_id);
			return $r[0]->peopleunlike;
		}
		return 0;
	}

	/**
	 * Get a random secret
	 * @return object
	 */
	static function getRandomSecret() {
		app::connectToDB();

		$c = objectDB::getLengthOf("secretsofcooking");
		$r = rand(0, ($c - 1));
		$col = objectDB::getObjs(array(
                    "tbName" => "secretsofcooking",
                    "offset" => $r,
                    "limit" => 1
		));

		$s = $col[0];
		return $s->secret;
	}

	/**
	 * Return a recipes's catalog
	 * @param <type> $filter
	 */
	static function getCatalog($filter) {
		$where = "true";

		$filter = strtolower($filter);

		if ($filter != null) {
			$words = explode(" ", $filter);
			$i = 0;
			$where = "";
			foreach ($words as $word)
			$where .= ( $i++ > 0 ? " OR " : "") . " name LIKE '%$word%'";
		}

		app::connectToDB();

		$col = objectDB::getObjs(array(
                    'tbName' => 'recipe',
                    "order" => "name",
                    "where" => $where
		));

		$catalog = array();
		foreach($col as $item) {
			$item->path = self::recipePath($item);
			$l = strtoupper($item->name);
			$l = $l[0];
			if (!isset($catalog[$l])) $catalog[$l] = array("recipes" => array());
			$catalog[$l]["recipes"][] = $item;
		}
		return $catalog;
	}

	/**
	 * Return last comments
	 * @param <type> $recipe_id
	 * @param <type> $limit
	 * @return <type>
	 */
	static function getLastComments($recipe_id, $limit = null) {

		app::connectToDB();
		$params = array(
            "tbName" => "usercomments",
            "order" => "id_usercomments DESC",
            "where" => "recipe = $recipe_id"
		);

		if ($limit != null)
		$params["limit"] = $limit;

		$col = objectDB::getObjs($params);
		return $col;
	}

	/**
	 * Load all data of recipe
	 *
	 * @param integer $id
	 * @return object
	 */
	static function getRecipe($id) {

		app::connectToDB();
			
		// Load object...
		$col = objectDB::getObjs(array('tbName' => 'recipe', 'where' => "id_recipe = $id"));
		if (!isset($col[0])) return null;

		$r = $col[0];
		$r->id = $id;

		// Load taxonomies...
		$c = objectDB::getObjs(array("tbName" => "nationality", "where" => "id_nationality = {$r->nationality}"));
		$r->nationality_name = $c[0]->name;
		$r->nationality_title = $c[0]->description;

		$c = objectDB::getObjs(array("tbName" => "diet", "where" => "id_diet = {$r->diet}"));
		$r->diet_name = $c[0]->name;
		$r->diet_title = $c[0]->description;

		$c = objectDB::getObjs(array("tbName" => "occasion", "where" => "id_occasion = {$r->occasion}"));
		$r->occasion_name = $c[0]->name;
		$r->occasion_title = $c[0]->description;

		$c = objectDB::getObjs(array("tbName" => "preparationtype", "where" => "id_preparationtype = {$r->preparationtype}"));
		$r->preparationtype_name = $c[0]->name;
		$r->preparationtype_title = $c[0]->description;

		$c = objectDB::getObjs(array("tbName" => "foodtype", "where" => "id_foodtype = {$r->foodtype}"));
		$r->foodtype_name = $c[0]->name;
		$r->foodtype_title = $c[0]->description;

		// Load ingredients
		$ings = objectDB::getObjs(array("tbName" => "ingredient_recipe", "where" => "id_recipe = {$r->getId()}"));
		$r->ingredients = array();

		foreach ($ings as $ing) {
			$cc = objectDB::getObjs(array("tbName" => "ingredient", "where" => "id_ingredient = {$ing->id_ingredient}"));
			if (isset($cc[0])){
				$ingredient = $cc[0];
				$ingredient->ammount = $ing->ammount;
				$r->ingredients[] = $ingredient;
			}
		}

		$hs = objectDB::getObjs(array("tbName" => "horary_recipe", "where" => "id_recipe = {$r->getId()}"));
		$r->horaries = array();

		foreach ($hs as $ing) {
			$cc = objectDB::getObjs(array("tbName" => "horary", "where" => "id_horary = {$ing->id_horary}"));
			$r->horaries[] = $cc[0];
		}
		if (!file_exists($r->picture) && !file_exists(FILES.$r->picture)) $r->picture = "";
		$r->path = self::recipePath($r);
		return $r;
	}

	/**
	 * Load similar recipes
	 *
	 * @param object $recipe
	 * @return array
	 */
	static function getSimilarRecipes($recipe) {
			
		app::connectToDB();
			
		$recipes = objectDB::getObjs(array(
            "tbName" => "recipe",
            "order" => "peoplelike desc",
            "limit" => 20,
            "offset" => 0,
            "where" => "occasion = {$recipe->occasion} AND nationality = {$recipe->nationality} AND diet = {$recipe->diet} AND id_recipe <> {$recipe->getId()}"
		));

		$i=0;
		foreach($recipes as $item){
			$recipes[$i]->path = self::recipePath($item);
			$i++;
		}
		return $recipes;
	}

	/**
	 * Search
	 *
	 * @param string $phrase
	 * @param integer $diet
	 * @param integer $preparationtype
	 * @param integer $nationality
	 * @param integer $occasion
	 * @param integer $cookingtime
	 * @param integer $horary
	 * @param array $ingredients
	 * @return array
	 */
	static function search($phrase, $diet, $preparationtype, $nationality, $occasion, $cookingtime, $horary, $ingredients) {

		app::connectToDB();

		$where = "";
		if (trim($phrase) != "") {
			$words = explode(" ", $phrase);
			$i = 0;
			foreach ($words as $word) {
				if (trim($word) != "") {
					if ($i++ > 0)
					$where .=" AND ";
					$where .= " name LIKE '%$word%'";
				}
			}
		}

		if ($diet != null)
		$where .= ( $where != "" ? " AND " : "") . " diet = $diet ";
		if ($preparationtype != null)
		$where .= ( $where != "" ? " AND " : "") . " preparationtype = $preparationtype ";
		if ($nationality != null)
		$where .= ( $where != "" ? " AND " : "") . " nationality = $nationality ";
		if ($occasion != null)
		$where .= ( $where != "" ? " AND " : "") . " occasion = $occasion ";
		if ($cookingtime != null)
		$where .= ( $where != "" ? " AND " : "") . " cookingtime = $cookingtime ";
		if ($horary != null)
		$where .= ( $where != "" ? " AND " : "") . " EXISTS(SELECT * FROM horary_recipe WHERE horary_recipe.id_recipe = recipe.id_recipe AND horary_recipe.id_horary = $horary) ";

		if ($ingredients != null) {
			$ingredients = explode(",", $ingredients);
			foreach ($ingredients as $ing) {
				if (substr($ing, 0, 1) == "-") {
					$ing = str_replace("-", "", $ing);
					$where .= ( $where != "" ? " AND " : "") . " NOT EXISTS(SELECT * FROM ingredient_recipe WHERE ingredient_recipe.id_recipe = recipe.id_recipe AND ingredient_recipe.id_ingredient = $ing) ";
				} else
				$where .= ( $where != "" ? " AND " : "") . " EXISTS(SELECT * FROM ingredient_recipe WHERE ingredient_recipe.id_recipe = recipe.id_recipe AND ingredient_recipe.id_ingredient = $ing) ";
			}
		}

		if ($where == "")
		return objectDB::getObjs(array(
                "tbName" => "recipe",
                "order" => "viewamount desc"
                ));
                else
                return objectDB::getObjs(array(
                "tbName" => "recipe",
                "where" => $where,
                "order" => "viewamount desc"
                ));
	}

	/**
	 * Get an ingredient
	 *
	 * @param integer $id
	 * @return ingredient
	 */
	static function getIngredient($id) {

		app::connectToDB();

		$col = objectDB::getObjs(array(
                    "tbName" => "ingredient",
                    "where" => "id_ingredient = $id"
		));

		$ing = $col[0];
		return $ing;
	}

	/**
	 * Load the popular recipes
	 *
	 * @return collection
	 */
	static function getPopularRecipes(){

		app::connectToDB();

		// Loading popular recipes...
		$col = objectDB::getObjs(array(
                    "tbName" => "recipe",
                    "order" => "peoplelike desc",
                    "where" => "peoplelike > 0"));

		$i=0;
		foreach($col as $item){
			$col[$i]->path = self::recipePath($item);
			$i++;
		}

		return $col;
	}

	/**
	 * Load more searhed recipes
	 *
	 * @return collection
	 */
	static function getMoreSearchedRecipes(){

		app::connectToDB();

		$r = objectDB::query("select max(viewamount) as v from recipe;", true, true);
		$max = $r[0]->v;
		$r = objectDB::query("select min(viewamount) as v from recipe;", true, true);
		$min = $r[0]->v;
		$col = objectDB::query("SELECT * FROM recipe WHERE viewamount > 0", true, true);
		foreach($col as $key=>$item){
			$col[$key]->path = self::recipePath($item);
			if ($max-$min>0)
			$col[$key]->vap = ($col[$key]->viewamount-$min)*100/($max-$min);
			else
			$col[$key]->vap = 0;
		}
		return $col;

	}

	/**
	 * Load last inserted recipes
	 *
	 * @return collection
	 */
	static function getLastInsertedRecipes($limit = 10){
		app::connectToDB();
		$col = objectDB::getObjs(array(
			"tbName" => "recipe",
			"order" => "inserteddate",
			"limit" => $limit
		));
		return $col;
	}

	/**
	 * Recipe path (URL)
	 *
	 * @param recipe $item
	 * @return string
	 */
	static function recipePath($item){
		return "recipe/How-to-make-".str_replace(" ","-",$item->name);
	}

	/**
	 * Statistics
	 *
	 * @return array
	 */
	static function getStatistics(){
		app::connectToDB();
		return array(
			"diets" => objectDB::getLengthOf("diet"),
			"foodtypes" => objectDB::getLengthOf("foodtype"),
			"horaries" => objectDB::getLengthOf("horary"),
			"ingredients" => objectDB::getLengthOf("ingredient"),
			"nationalities" => objectDB::getLengthOf("nationality"),
			"occasions" => objectDB::getLengthOf("occasion"),
			"preparations" => objectDB::getLengthOf("preparationtype"),
			"recipes" => objectDB::getLengthOf("recipe"),
			"secrets" => objectDB::getLengthOf("secretsofcooking"),
			"comments" => objectDB::getLengthOf("usercomments"));
	}

	/**
	 * Return records of table with "id" field
	 *
	 * @param string $tbName
	 * @return array
	 */
	static function getRecords($tbName){
		app::connectToDB();

		$col = objectDB::getObjs(array('tbName' => $tbName));

		$i=0;
		foreach($col as $item) {
			$col[$i++]->id = $item->getId();
		}

		return $col;
	}

	/**
	 * Return a list of subscribes as text/string separated by comas
	 *
	 * @return string
	 */
	static function getSubsribeListAsTxt(){
		$objs = self::getRecords('subscribe');
		$txt = "";
		foreach($objs as $obj) $txt .= $obj->email.";";
		return $txt;
	}

	static function getRecipeToSend(){
		app::connectToDB();

		$col = objectDB::query("select id_recipe, send_date from recipe where CHAR_LENGTH(trim(description)) > 15 AND (picture is not null and trim(picture) <> '') order by send_date limit 1;");

		if (isset($col[0])) {
			$id = $col[0]->getId();
			objectDB::query("update recipe set send_date = now() where id_recipe = $id;");
			return $id;
		}

		return null;
	}


	static function getSecretToSend(){
		app::connectToDB();
		$col = objectDB::query("select * from secretsofcooking order by send_date limit 1;");
		if (isset($col[0])) {
			$id = $col[0]->getId();
			objectDB::query("update secretsofcooking set send_date = now() where id_secretsofcooking = $id;");
			return $col[0];
		}

		return null;
	}
}

// End of file
