<?php

class app extends RecipesControl {

	/**
	 * Secret monday
	 *
	 */
	static function secret_monday(){
		$emails = RecipesModel::getRecords("subscribe");
		$r = RecipesModel::getSecretToSend();
		if (trim("{$r->header}" == "")) $r->header = substr(div::htmlToText($r->secret),0, 50)."...";
		if (!is_null($r)){
			$body = new div("recipes/cron/tpls/secret", $r);
			foreach($emails as $email){
			
				// TODO: Temporal
			//	if ($email->email != 'rrodriguezramirez@gmail.com' 
		//		&& $email->email != 'salvi.pascual@gmail.com'
		//		&& $email->email != 'marta.magaly@gmail.com') continue;
			
			
				echo "[INFO] Sending secret to {$email->email}\n";
				rpMail::sendHTML(array(
                        "subject" => $r->header . ", by Mirta's recipes",
                        "body" => "$body",
                        "from" => "Mirta Recipes Cookbook <".app::getConfiguration()->share_recipe_email_from.">",
                        "to" => $email->email
				));
			}
		}
	}

	/**
	 * Send recipe to subscribes
	 *
	 */
	static function send_recipe(){
		$emails = RecipesModel::getRecords("subscribe");

		$r = RecipesModel::getRecipeToSend();

		if (!is_null($r)){
			$id = $r;
			$recipe = RecipesModel::getRecipe($id);
			if (substr($recipe->picture,0,9)=="../files/") $recipe->picture = substr($recipe->picture,9);
			$body = new div("recipes/cron/tpls/recipe", $recipe);
			foreach($emails as $email){
				
				// TODO: Temporal
//				if ($email->email != 'rrodriguezramirez@gmail.com' 
//				&& $email->email != 'salvi.pascual@gmail.com'
//				&& $email->email != 'marta.magaly@gmail.com') continue;
				
				echo "[INFO] Sending recipe $id to {$email->email}\n";
				rpMail::sendHTML(array(
                        "subject" => $recipe->name . ", by Mirta's recipes",
                        "body" => "$body",
                        "from" => "Mirta Recipes Cookbook <".app::getConfiguration()->share_recipe_email_from.">",
                        "to" => $email->email
				));
			}
		}
	}

	static function Run($params){
		if (!isset($params[0])) $params[0] = "robot";
		if (isset($_SERVER['argv'][2])) $_SERVER['argv'][1] = $_SERVER['argv'][2];
		eval("self::".$params[0]."();");
	}
}