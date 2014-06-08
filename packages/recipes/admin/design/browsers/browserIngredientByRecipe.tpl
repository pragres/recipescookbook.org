<input type="hidden" value="{$id_recipe}" id="recipe-id">
<table class = "browser">
	<tr>
		<th>Ingredient</th>
		<th>Ammount</th>
	</tr>
	[$ingredientsby]
	<tr>
		<td>{$name}</td>
		<td>{$ammount}</td>
		<td><button class="record-action" onclick="deleteIngredientOf({$id_ingredient},{$id_recipe});">delete</button></td>
	</tr>
	[/$ingredientsby]
	<tr>
		<td>
		?$ingredients
			<select id="cboIngredient"> 
			[$ingredients]
				<option value="{$id}">{$name}</option>
			[/$ingredients]
			</select>
		$ingredients?
		</td>
		<td>
		<input id="edtAmmount" class="edit">
		</td>
		<td>
		<button class = "record-action" onclick = "insertIngredientTo({$id_recipe});">add</button>
		</td>
	</tr>	
</table>
