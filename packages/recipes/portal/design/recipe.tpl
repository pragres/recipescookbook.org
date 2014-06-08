{= title: How to make {$recipe.name} =}
{{metas
		<meta property="og:title" content="How to make {$recipe.name}"/> 
		<meta property="og:type" content="food"/>
		<meta property="og:url" content="http://recipescookbook.org/{$recipe.path}"/>
		<meta property="fb:admins" content="1510070098"/>
		<meta property="og:image" content="http://recipescookbook.org/images/recipes/{&recipe.picture}"/>
		<meta property="og:site_name" content="Mirta Recipes Cookbook"/> 
		<meta property="og:description" content="This is a collection of culinary secrets acquired by my Grandma through a lifetime of cooking for multiple generations."/> 
metas}}

<input type="hidden" id ="recipe-id" value="{$recipe.id}">
<input type="hidden" id="recipe-name" value="{$recipe.name}">

<!-- starting Google's rich snipper -->
<div itemscope itemtype="http://data-vocabulary.org/Recipe" >
<span itemprop="name" content="{$recipe.name}"></span>
<span itemprop="author" content="Mirta Calvo"></span>
?$recipe.picture
	<span itemprop="photo" rel="image_src" content="http://recipescookbook.org/images/recipes/{&recipe.picture}"></span>
$recipe.picture?

{{likeboxs
<tr><td width="235">
<!-- Adding Google +1 Button -->
<div class="g-plusone" data-annotation="inline" data-width="180"></div>
</td></tr><tr><td>
<!-- Adding Facebook like Button -->
<div class="fb-like" data-send="false" data-width="200"  data-show-faces="false"></div>
</td></tr>
likeboxs}}

{?( {%recipe.description} > 6 )?}
	<div style="float:right;width:235px;height: 65px;padding-left:15px;">
		<table>
		(( likeboxs ))
		</table>
	</div>
	<span style="text-align: justify;" itemprop="summary">{$recipe.description}</span>
	<br/>
{/?}
<h2>Details</h2>
<div class="portal-recipe-details" >
    <table width="100%"><tr><td valign="top">
                <table>
                    <tr>
                        <td>Diet:</td>
                        <td>
                        	<div class="portal-recipe-diet portal-recipe-detail" title ="{$recipe.diet_title}">
                        		<recipeType>{$recipe.diet_name}</recipeType>
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Nationality:</td>
                        <td>
                        	<div class="portal-recipe-nationality portal-recipe-detail" title ="{$recipe.nationality_title}">
                        		{$recipe.nationality_name}
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Occasion:</td>
                        <td>
                        	<div class="portal-recipe-occasion portal-recipe-detail" title ="{$recipe.occasion_title}">
                        		{$recipe.occasion_name}
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Preparation time:</td>
                        <td>
                        	<div class="portal-recipe-preparationtime portal-recipe-detail">
                        	[[recipe
                        	{% recipes/portal/design/cookingtime %}
                        	recipe]]
                        	</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Secret of family:</td>
                        <td>
                        	<div class="portal-recipe-preparationtime portal-recipe-detail">
                        	?$recipe.secretoffamily
                        		Yes
                        	@else@
                        		No
                        	$recipe.secretoffamily?
                        	</div>
                        </td>
                    </tr>
                </table>
            </td><td valign="top">
                <table>
                    <tr>
                        <td>Preparation type:</td>
                        <td>
                        	<div class="portal-recipe-preparationtype portal-recipe-detail" title="{$recipe.preparationtype_title}">
                        	{$recipe.preparationtype_name}
                        	</div>
                        	</td>
                    </tr>
                    <tr>
                    ?$horaries
                        <td>Best time:</td>
                        <td>
                        <div class="portal-recipe-horaries portal-recipe-detail">
                        	[$horaries]
                        	<li class="best-time-listitem" title="{$description}">{$name}</li>
                        	[/$horaries]
                        </div>
                        </td>
                    $horaries?
                    </tr>
                    <tr>
                        <td>Inserted:</td>
                        <td><time datetime="{$recipe.inserteddate}" itemprop="published">{/recipe.inserteddate:M, d Y/}</time></td>
                    </tr>
                    <tr>
                        <td>Servings:</td>
                        <td>Up to <span itemprop="yield">{$recipe.numberofguests}</span> people</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>

<table width="99%">
    <tr>
        <td valign="top" width="60%">
            <div class = "portal-recipe-ingredients table-cell">
                <h2>Ingredients</h2>
                <span itemprop="ingredient" itemscope itemtype="http://data-vocabulary.org/RecipeIngredient">
                    <ul class="portal-recipe-ingredients">
    				[$ingredients]
    					<li><span itemprop="name">{$name}</spam> ?$ammount(<span itemprop="amount">{$ammount}</span>)$ammount?</li>
    				[/$ingredients]
    				</ul>
                </span>
            </div>
        </td>
        <td valign="top">
            <div class = "portal-recipe-rating table-cell">
                <h2 style="margin-bottom:10px;">Rate and share</h2>
				<table>
					<tr>
						<td valign="bottom">I like this one!:</td>
						<td><img class="pointer" alt="" onclick="recipes.portal.RecipeView.incPeopleLike();" src="../img.php?&f=recipes/portal/images/icons-01.png"></td>
						<td align="left"><label id="labPeopleLike">{$recipe.peoplelike}</label></td>
					</tr>
					<tr>
						<td valign="top">Not that good: </td>
						<td><img class="pointer" alt="" onclick="recipes.portal.RecipeView.incPeopleUnlike();" src="../img.php?&f=recipes/portal/images/icons-02.png"></td>
						<td align="left"><label id="labPeopleUnlike">{$recipe.peopleunlike}</label></td>
					</tr>
                    {=totalrate:(# {$recipe.peoplelike} + {$recipe.peopleunlike} #)=}
                    {?({$totalrate} > 0)?}
                    <tr>
						<td colspan="3" align="center" style="padding:10px 0px 20px 0px;">
                            {=percentrate:(# ({$recipe.peoplelike} * 100) / {$totalrate} #)=}
                                <div itemprop="review" itemscope itemtype="http://data-vocabulary.org/Review-aggregate" style="font-size: small;">
                                    Rated 
                                    {?({$percentrate} <= 100 && {$percentrate} > 80)?}<span itemprop="rating">5</span>{/?}
                                    {?({$percentrate} <=  80 && {$percentrate} > 60)?}<span itemprop="rating">4</span>{/?}
                                    {?({$percentrate} <=  60 && {$percentrate} > 40)?}<span itemprop="rating">3</span>{/?}
                                    {?({$percentrate} <=  40 && {$percentrate} > 20)?}<span itemprop="rating">2</span>{/?}
                                    {?({$percentrate} <=  20)?}<span itemprop="rating">1</span>{/?}
                                    stars (<span itemprop="count">{$totalrate}</span> reviews)
                                </div>
						</td>
					</tr>
                    {/?}
                    <tr><td colspan="2" algin="left">
                    <table cellspacing="0" cellpadding="0">
                   	(( likeboxs )) 
                    </table>
                    </td></tr>
                </table>
            </div>
        </td>
    </tr>
</table>

<h2>Preparation mode</h2>
<div style="text-align: justify;margin-bottom: 20px;" itemprop="instructions">
    {$recipe.preparationmode}
</div>


<div class="block">
	?$similars
		<div class="portal-similar-recipes">
			<h2>Similar recipes</h2>
			[$similars]
			<div style="white-space: nowrap;float: left;display: inline;">
				<a href="{$BACK_PATH}{$path}">
				{$name}
				</a>
			</div>
			{?( {$_order} % 3 === 0 )?}
				<br/>
			@else@
				!$_is_last
				<div style="white-space: nowrap;float: left;display: inline;">
					&nbsp;<img alt="" src="{$BACK_PATH}images/square.png">&nbsp;	
				</div>
				$_is_last!
			{/?}
			[/$similars]
		</div>
	$similars?
</div>


</div> <!-- DO NOT ERASE! Ending of Google's rich snipper (starts in header.recipe.tpl) -->

<br/><br/>
<!--{ 
<div class="block">
	<h2>Last 5 comments</h2>
	<div id ="last-comments"></div>
</div>


<div class="float-left">
    <h2> Leave a comment</h2>
    <div id = "leave-comments">
        <table>
            <tr><td valign="top">Name to show: </td><td><input id = "edtNameToShow"></td></tr>
            <tr><td valign="top">Comment: </td><td><textarea cols="10" rows="30"  id = "edtComment"></textarea></td></tr>
        </table>
        <button id = "btnAddComment">Add comment</button>
    </div>
</div>

}-->
<!--{ 
<div id="disqus">
{% recipes/portal/design/disqus %}
</div>
}-->
<h2>Comments</h2>
<div class="facebook-comments-box"><div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:comments href="http://recipescookbook.org/{$recipe.path}"  num_posts="10"  width="570" colorscheme="light" ></fb:comments></div>  

<!-- Script to render the Google +1 button -->
<script type="text/javascript">
  (function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/plusone.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script><br/>
