<?php

/**
 * Create PDF of recipe
 *
 */

u("org/fpdf/fpdf");
u("recipes/common/PDF");

class RecipePDF extends PDF {

	var $recipe = null;

	/**
	 * Constructor
	 *
	 * @param integer $id
	 */
	public function RecipePDF($id = "ALL") {

		parent::PDF();

		app::connectToDB();

		if ($id=="ALL"){
			$recipes = objectDB::getObjs(array(
                    "tbName" => "recipe"
			));
		} else {
			$recipes = objectDB::getObjs(array(
                    "tbName" => "recipe",
                    "where" => "id_recipe = $id"
			));
		}
		 
		foreach($recipes as $key=>$recipe){
			$this->recipe = $recipe;
			$this->AddPage();
			$this->SetFont('Arial', 'B', 16);
			$this->Text(10, 10, "Mirta's Recipes Cookbook");
			$this->SetFont('Arial', 'I', 12);
			$this->Text(70, 20, "The work of a livetime on the web");
			$this->SetFont('Arial', 'I', 10);
			$this->Text(150, 5, "http://recipescookbook.org");

			$this->SetFont('Helvetica', 'B', 18);
			$this->Text(70, 30, $recipe->name);

			$c = objectDB::getObjs(array(
                    "tbName" => "nationality",
                    "where" => "id_nationality = {$recipe->nationality}"
			));

			$nationality = $c[0]->name;
			$c = objectDB::getObjs(array(
                    "tbName" => "diet",
                    "where" => "id_diet = {$recipe->diet}"
			));

			$diet = $c[0]->name;
			$c = objectDB::getObjs(array(
                    "tbName" => "occasion",
                    "where" => "id_occasion = {$recipe->occasion}"
			));
			$occasion = $c[0]->name;

			$c = objectDB::getObjs(array(
                    "tbName" => "preparationtype",
                    "where" => "id_preparationtype = {$recipe->preparationtype}"
			));
			$preparationtype = $c[0]->name;

			$ings = objectDB::getObjs(array(
                    "tbName" => "ingredient_recipe",
                    "where" => "id_recipe = {$recipe->getId()}"
			));

			$ingredients = array();
			foreach ($ings as $ing) {
				$cc = objectDB::getObjs(array(
                        "tbName" => "ingredient",
                        "where" => "id_ingredient = {$ing->id_ingredient}"
				));
				$ingredients[] = "{$cc[0]->name} ({$ing->ammount})";
			}

			if (rpFileSystem::fileExists($recipe->picture) == true && trim($recipe->picture)!='') $this->Image(PACKAGES.$recipe->picture, 10, 15, 55,55);

			$this->SetXY(70, 40);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Diet: ");
			$this->SetFont("Arial", "", 10);
			$this->Write(10, $diet);

			$this->SetXY(70, 50);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Nationality: ");
			$this->SetFont("Arial", "", 10);
			$this->Write(10, $nationality);

			$this->SetXY(140, 40);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Occasion: ");
			$this->SetFont("Arial", "", 10);
			$this->Write(10, $occasion);

			$this->SetXY(140, 50);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Preparation time: ");
			$this->SetFont("Arial", "", 10);
			$this->Write(10, tpl("{strip}{txt}{% recipes/portal/design/cookingtime %}{/txt}{/strip}",array("cookingtime" => $recipe->cookingtime)));

			$this->SetXY(70, 60);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Preparation type: ");
			$this->SetFont("Arial", "", 10);
			$this->Write(10, $preparationtype);

			$this->SetXY(10, 70);
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Ingredients: ");

			$this->SetXY(10, 80);
			$html = "";
			foreach ($ingredients as $ingredient) $html .= $ingredient . ", ";
			$this->SetFont("Arial", "", 10);
			$this->WriteHTML(10, $html);
			$this->Ln();
			$this->SetFont("Arial", "B", 10);
			$this->Write(10, "Preparation mode: ");
			$this->Ln();
			$this->SetFont("Arial", "", 10);

			$mode = $recipe->preparationmode;
			$mode = "{txt}".$mode."{/txt}";
			$mode = str_replace("<style","<!--{", $mode);
			$mode = str_replace("<!--[if","<!--{", $mode);
			$mode = str_replace("<![endif]-->","}-->", $mode);
			$mode = str_replace("</style>","}-->", $mode);
			$mode = tpl($mode);
			$mode = "$mode";
			$this->WriteHTML(10, nl2br(str_replace("\n","\n\n",$mode)));

			$this->SetTitle($recipe->name);
			$this->SetAuthor("mirta@pragres.com");
		}
	}
}

// End of file