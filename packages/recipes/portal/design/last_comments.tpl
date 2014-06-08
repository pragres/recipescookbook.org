!$limit
<div>
    <h2>All user's comments for this recipe</h2>
    <a class = "underline pointer" href = "{$BACK_PATH}{$recipe.path}">Return to recipe's details</a>
</div>
@else@
	?$comments
		<div>(<label class ="link pointer" onclick = "recipes.portal.RecipeView.viewAllComments();">view all</label>)</div>
	$comments?
$limit!
<input type="hidden" value="{$comments}">
?$comments
	<table>
	[$comments]
		<tr><td><label class="portal-comment-id">{$id}</label><td>By: <b>{$username}</b><br>{$usercomment}</td></tr>
	[/$comments]
	</table>
@else@
	There are no comments for this recipe yet. Do you want to be the first giving your opinion?
$comments?