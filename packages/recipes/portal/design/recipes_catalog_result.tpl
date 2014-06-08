<div id = "recipes-catalog-content">
	{= mitad: (# {$catalog} / 2 #) =}
	<table id="recipes-catalog">
	<tr>
		<td valign="top">
			[$catalog]
				{?( {$_order} < {$mitad} || {$mitad} <= 1)?}
					<strong>{$_key}</strong><br/>
					[$recipes]
						<a href="{$BACK_PATH}{$path}">{$name}</a><br/>
					[/$recipes]
				{/?}
			[/$catalog]
		</td>
		<td valign="top">
			[$catalog]
				{?( {$_order} > {$mitad} && {$mitad} > 1)?}
					<strong>{$_key}</strong><br/>
					[$recipes]
						<a href="{$BACK_PATH}{$path}">{$name}</a><br/>
					[/$recipes]
				{/?}
			[/$catalog]
		</td>
	</tr>
	</table>
</div>