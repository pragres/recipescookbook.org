<!--{ Mirta Recipes Administration - Recipes browser }-->

{% recipes/admin/design/browsers/header %}

<!--{ paging data }-->

<input type="hidden" value="{$order}" id = "order">
<input type="hidden" value="{$page}" id = "page">

<!--{ browser }-->
<table class="browser">
	<tr>
		<th>#</th>
		<th><label class="sorter pointer" field="name"                       ?$orderby_name style="color:blue;" $orderby_name?>Recipe</label></th>
	    <th><label class="sorter pointer" field="nationality"                ?$orderby_nationality style="color:blue;" $orderby_nationality?>Nationality</label></th>
	    <th><label class="sorter pointer" field="diet"                       ?$orderby_diet style="color:blue;" $orderby_diet?>Diet</label></th>
	    <th><label class="sorter pointer" field="preparationtype"            ?$orderby_preparationtype style="color:blue;" $orderby_preparationtype?>Preparation type</label></th>
	    <th><label class="sorter pointer" field="foodtype"                   ?$orderby_foodtype style="color:blue;" $orderby_foodtype?>Food type</label></th>
	    <th><label class="sorter pointer" field="occasion"                   ?$orderby_occasion style="color:blue;" $orderby_occasion?>Occasion</label></th>
	    <th><label class="sorter pointer" field="preparationmode"            ?$orderby_preparationmode style="color:blue;" $orderby_preparationmode?>History included</label></th>
	    <th width="50"><label class="sorter pointer" field="history_written" ?$orderby_history_written style="color:blue;" $orderby_history_written?>History written</label></th>
	    <th width="50"><label class="sorter pointer" field="history_revised" ?$orderby_history_revised style="color:blue;" $orderby_history_revised?>History revised</label></th>
	    <th width="50"><label class="sorter pointer" field="in_catalog"      ?$orderby_in_catalog style="color:blue;" $orderby_in_catalog?>In catalog</label></th>
	    <th width="50"><label class="sorter pointer" field="backlinks"       ?$orderby_backlinks style="color:blue;" $orderby_backlinks?>Back links</label></th>
	    <th width="50"><label class="sorter pointer" field="campaing"        ?$orderby_campaing style="color:blue;" $orderby_campaing?>Campaing</label></th>
	    <th width="50"><label class="sorter pointer" field="to_sell"         ?$orderby_to_sell style="color:blue;" $orderby_to_sell?>To sell</label></th>
	    <th>Horaries</th>
	    <th>Ingredients</th>
	    <th></th>
	    <th></th>
	</tr>
	[$records]
	<tr>
		<td>(# {$offset} + {$_order} #)</td>
		<td>
		<table><tr>
			<td style="border:none;" width ="50">
				?$picture
					<img style="border:2px solid black;" src="{$BACK_PATH}img.php?f=width-50/{&picture}"> 
				@else@ 
					<img style="border:2px solid black;" src="{$WWW}images/width-50/no-picture.png">
				$picture?
			</td>
			<td style="border:none;"><a href="{$WWW}{$path}" target="_blank">{$name}</a><br/>
			{$numberofguests} guests, {% recipes/portal/design/cookingtime %}
			?$prepareinfamily, Prepare in family $prepareinfamily? 
			?$secretoffamily, Is a secret $secretoffamily?</td>
		</tr></table>
		</td>
		<td>{$nationality_name}</td>
		<td>?$diet_name {$diet_name} $diet_name?</td>
		<td>{$preparationtype_name}</td>
		<td>{$foodtype_name}</td>
		<td>{$occasion_name}</td>
		<td align="center" style="font-weight:bold;">{?( {%description} > 10 )?} <img src="{$WWW}images/accept.png"> @else@ <img src="{$WWW}images/cancel.png">{/?}</td>
		<td align="center"><input type="checkbox" class="chkHistoryWritten" idrecipe="{$id}" ?$history_written checked $history_written?></td>
		<td align="center"><input type="checkbox" class="chkHistoryRevised" idrecipe="{$id}" ?$history_revised checked $history_revised?></td>
		<td align="center"><input type="checkbox" class="chkInCatalog" idrecipe="{$id}" ?$in_catalog checked $in_catalog?></td>
		<td align="center"><input type="checkbox" class="chkBackLinks" idrecipe="{$id}" ?$backlinks checked $backlinks?></td>
		<td align="center"><input type="checkbox" class="chkCampaing" idrecipe="{$id}" ?$campaing checked $campaing?></td>
		<td align="center"><input type="checkbox" class="chkToSell" idrecipe="{$id}" ?$to_sell checked $to_sell?></td>
		<td align="center"><button class="record-action" onclick="showHoraries({$id})" !$horaries style="color:red;" $horaries! title ="Edit horaries of this recipe">{$horaries}</button></td> 
		<td align="center"><button class="record-action" onclick="showIngredients({$id})" !$ingredients style="color:red;" $ingredients! title ="Edit ingredients of this recipe">{$ingredients}</button></td>		
		<td align="center"><button class="record-action" onclick = "showEditForm({$id});" title="Edit this recipe"><img src= "{$WWW}images/edit.png"></button></td>
		<td align="center"><button class="record-action" onclick = "showDelete({$id});" title="Delete this recipe"><img src= "{$WWW}images/delete.png"></button></td>
	</tr>
[/$records]
</table>

<!--{ controls }-->
<!--{ 
<div id = "paging">
<label style="background: none repeat scroll 0 0 #EEEEEE; border-left: 3px solid gray; border-right: 3px solid gray; border-top: 4px solid gray; margin-left: -5px;  padding: 5px;">
	Show from <b>(# {$offset} + 1 #)</b> to (# {$offset} + 1 + {$limit} #), <b>{$limit}</b> of <b>{$total}</b> recipes
</label><br/>
[:1,{$pages}:]
<button class="page" {?( {$page} == {$value} )?} style="padding: 3px; border: 1px solid gray;" {/?}>{$value}</button>
[/]
</div>
}-->
<button id = "btnAddRecord" class="add-record">Add</button>
<label class="primary-link pointer padding-five" style="position: fixed; bottom: 21px; right: 230px; z-index: 999"><a href="{$BACK_PATH}download/recipes" target="_blank">Recipes's list</a></label>