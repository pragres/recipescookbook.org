<table class = "browser">
	[$horariesby]
	<tr>
		<td>{$name}</td>
		<td><button class="record-action" onclick="deleteHoraryOf({$id_horary},{$id_recipe});">delete</button></td>
	</tr>
	[/$horariesby]
</table>
?$horaries
	<select id="cboHorary"> 
	[$horaries]
		<option value="{$id}">{$name}</option>
	[/$horaries]
	</select>
	<button class = "record-action" onclick = "insertHoraryTo({$id_recipe});">add</button>
$horaries?
                