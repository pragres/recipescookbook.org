{% recipes/admin/design/browsers/header %}

{= section-title: "User's comments" =}

<table class="browser">
	<tr>
		<th>#</th>
		<th>Recipe</th>
		<th>Comment</th>
		<th>User</th>
		<th></th>
	</tr>
	[$comments]
	<tr>
		<td>{$_order}</td>
		<td>{$recipe}</td>
		<td>{$usercomment}</td>
		<td>{$username}</td>
		<td width="20"><button class="record-action" onclick="showDelete({$id});" title="Delete this comment"><img src= "{$WWW}images/delete.png"></button></td>
	</tr>
	[/$comments]
</table>
