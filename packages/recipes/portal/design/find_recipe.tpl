{= title: Find a recipe =}
<div id="search-recipe">
<p>The easy way to find a recipe is inserting the name in the respective field and pressing "Search" button. In case you don't know what you are looking for, blank the title field and filter by the cotegories listed below.</p> 
<p>The controls to filter by ingredient allows you to make a very detailed search. This option may be useful for find recipes free from sugar, without salt or your prefered flavor pie.</p>
    <table>
        <tr>
            <td>Recipe title</td>
            <td><input id="edtTitle" class="edit" type="text"></td>
        </tr>
        <tr>
            <td>Diet type</td>
            <td>
            	<select id="cboDiet">
					<option value="null">Any</option>
					[$diet]
					<option value="{$id}">{$name}</option>
					[/$diet]
				</select>
			</td>
        </tr>
        <tr>
            <td>Preparation medium</td>
            <td>
            	<select id="cboPreparation">
					<option value="null">Any</option>
					[$preparation]
					<option value="{$id}">{$name}</option>
					[/$preparation]
				</select>
            </td>
        </tr>
        <tr>
            <td>Nationality</td>
            <td>
            	<select id="cboNationality">
					<option value="null">Any</option>
					[$nationality]
					<option value="{$id}">{$name}</option>
					[/$nationality]
				</select>
			</td>
        </tr>
        <tr>
            <td>Occasion</td>
            <td>
            	<select id="cboOccasion">
					<option value="null">Any</option>
					[$occasion]
					<option value="{$id}">{$name}</option>
					[/$occasion]
				</select>
			</td>
        </tr>
        <tr>
            <td>Cooking time</td>
            <td>
            	<select id="cboCookingTime">
					<option value="null">Any</option>
					[$cooking_time]
					<option value="{$value}">{$value}</option>
					[/$cooking_time]
				</select>
			</td>
        </tr>
        <tr>
            <td>Best time of the day</td>
            <td>
            	<select id="cboHorary">
					<option value="null">Any</option>
					[$horary]
					<option value="{$id}">{$name}</option>
					[/$horary]
				</select>
            </td>
        </tr>
    </table>
    <br>
    <label class="padding-five">Ingredients:</label><br>
    <div class ="block">
        <div id = "search-filter-ingredients" class ="padding-five"></div>
    </div>
    <div class ="block">
        <div id = "search-select-ingredients" class ="inline padding-five">
            <select id ="cboContain">
                <option value = "yes">Contains</option>
                <option value = "no">Not contains</option>
            </select>
        </div>
        <div id = "search-select-ingredients" class ="inline padding-five">
           <select id="cboIngredients">           		
				[$ingredients_list]
				<option value="{$id}">{$name}</option>
				[/$ingredients_list]
			</select>
		
        </div>
        <div id = "search-select-ingredients" class ="inline padding-five">
            <button id="addIngredient"> Add </button>
        </div>
    </div>
    <br>
    <div class="padding-five">
        <label id ="btnSearch">Search</label>
    </div>
</div>

<div id="search-result" class="block padding-five"></div>
