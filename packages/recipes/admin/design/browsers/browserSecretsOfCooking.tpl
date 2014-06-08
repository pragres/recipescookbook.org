{% recipes/admin/design/browsers/header %}
<table class="browser">
<tr><th>#</th><th>Header</th><th>Secret</th><th></th><th></th></tr>
[$records]
<tr>
<td>{$_order}</td>
<td>{$header}</td>
<td>{$secret}</td>
<td width="20"><button class="record-action" onclick = "showEditForm({$id});" title="Edit this secret"><img src= "{$WWW}images/edit.png"></button></td>
<td width="20"><button class="record-action" onclick = "showDelete({$id});" title="Delete this secret"><img src= "{$WWW}images/delete.png"></button></td>
</tr>
[/$records]
</table>
<button id = "btnAddRecord" class="add-record">Add</button>