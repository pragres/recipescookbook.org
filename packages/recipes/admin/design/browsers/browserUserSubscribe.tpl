<div class="section-indicator">Subscribes</div>
<table class="browser">
	<tr>
		<th>#</th>
		<th>Email</th>
		<th></th>
	</tr>
	[$subscribes]
	<tr>
		<td>{$_order}</td>
		<td>{$email}</td>
		<td width="20"><button class="record-action" onclick="showDelete({$id});" title="Delete this subscribe"><img src= "{$WWW}images/delete.png"></button></td>
	</tr>
	[/$subscribes]
</table>
<button id = "btnAddRecord" class="add-record">Add</button>
<label class="primary-link pointer padding-five" style="position: fixed; bottom: 21px; right: 230px; z-index: 999"><a href="{$BACK_PATH}download/subscribelist" target="_blank">Subscribe list</a></label>