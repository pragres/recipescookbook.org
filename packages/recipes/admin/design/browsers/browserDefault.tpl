{% recipes/admin/design/browsers/header %}
<table class="browser">
	<tr><th>#</th><th>Name</th><th>Description</th><th></th><th></th></tr>
	[$records]
	<tr>
		<td>{$_order}</td><td>{$name}</td><td>{$description}</td>
		<td width ="20"><button class="record-action" onclick = "showEditForm({$id});" title="Edit this record"><img src= "{$WWW}images/edit.png"></button></td>
		<td width ="20"><button class="record-action" onclick = "showDelete({$id});" title="Delete this record"><img src= "{$WWW}images/delete.png"></button></td>
	</tr>
	[/$records]
</table>
<button id="btnAddRecord" class="add-record">Add</button>