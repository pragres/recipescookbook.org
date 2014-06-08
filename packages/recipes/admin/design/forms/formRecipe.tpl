<div id = "recipeTabTemp1" class ="hidden">
	<table width = "100%">
		<tr>
			<td valign="top" width="33%">
				<div title="Click to update picture" onclick = "updatePicture('{$picture}');" class = "recipe-picture-edit">
					<img src="img.php?f=width-200/{$picture}" id="recipe-picture-edit" width="200">
				</div>
				<div style="padding: 5px;">
					<img src="images/remoteexplorer/icons/zoom_in.png" onclick="app.FileChooser.showImage({path: $('#edtPicture').val()});" class="pointer" title="Zoom +">
					&nbsp;&nbsp;
					<button onclick="uploadPicture();" title="Upload and update picture">Upload picture</button>
				</div>
				<input type="hidden" id="edtPicture" value="{$picture}">
			</td>
			<td  valign="top" width="66%">
				<table>
					<tr>
						<td valign="top" width="50%">
							Name:<br/>
							<input class="edit" id="edtName" ?$name value="{$name}" $name?>
							<br/>
							Number of guests:<br/>
							<input class ="edit integer" id="edtNumberOfGuests" ?$numberofguests value="{$numberofguests}" $numberofguests?>
							<br/>
							Cooking time:<br/>
							<input class="edit float" id="edtCookingTime" ?$cookingtime value="{$cookingtime}" $cookingtime?>
							<input type="checkbox" id="chkPrepareInFamily" ?$prepareinfamily _checked $prepareinfamily?> Prepare in family<br/>
							Occasion:<br/>
							<select id = "cboOccasion">
								[$occasions]
									{?( "{$id}" == "{$occasion}" )?}
									<option value="{$id}" selected>{$name}</option>
									@else@
									<option value="{$id}">{$name}</option>
									{/?}
								[/$occasions]
							</select>
						</td>
						<td valign="top">
							<input type="checkbox" id="chkSecretOfFamily" ?$secretoffamily _checked $secretoffamily?> Secret of family
							<br/>
							Nationality:<br/>
							<select id = "cboNationality">
								[$nationalities]
									{?( "{$id}" == "{$nationality}" )?}
									<option value="{$id}" selected>{$name}</option>
									@else@
									<option value="{$id}">{$name}</option>
									{/?}
								[/$nationalities]
							</select>
							<br/>
							Diet:<br/>
							<select id = "cboDiet">
								[$diets]
									{?( "{$id}" == "{$diet}" )?}
									<option value="{$id}" selected>{$name}</option>
									@else@
									<option value="{$id}">{$name}</option>
									{/?}
								[/$diets]
							</select>
							<br/>
							Preparation type:<br/>
							<select id = "cboPreparationType">
								[$preparationtypes]
									{?( "{$id}" == "{$preparationtype}" )?}
									<option value="{$id}" selected>{$name}</option>
									@else@
									<option value="{$id}">{$name}</option>
									{/?}
								[/$preparationtypes]
							</select>
							<br/>
							Food type:<br/>
							<select id = "cboFoodType">
								[$foodtypes]
									{?( "{$id}" == "{$foodtype}" )?}
									<option value="{$id}" selected>{$name}</option>
									@else@
									<option value="{$id}">{$name}</option>
									{/?}
								[/$foodtypes]
							</select>				
						</td>
					</tr>
				</table>

				Keywords: <input id="edtKeywords" class = "edit" ?$keywords value="{$keywords}" $keywords?>
			</td>
		</tr>
	</table>
</div>
<div id = "recipeTabTemp2" class = "hidden">
	<textarea id="edtPreparationMode" style = "width: 600px; height: 180px;">
	?$preparationmode
		{$preparationmode}
	$preparationmode?
	</textarea>
</div>
<div id = "recipeTabTemp3" class = "hidden">
	<textarea id="edtDescription" style = "width: 600px; height: 180px;">
	?$description
		{$description}
	$description?
	</textarea>
</div>
<div id = "recipeTabs"></div>