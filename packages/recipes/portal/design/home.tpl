{= title: Mirta Recipes Cookbook =}
<div class="block">
	<div id="portal-welcome-msg">
		<div id="portal-welcome-msg-content">
			<b>Mirta recipes cookbook</b> is a collection of culinary secrets acquired through a lifetime of cooking for multiple generations. The meals you will find here are <i>convenient</i>, <i>easy to prepare</i> and <i>delightful</i>. You have high probabilities to find here the recipe you are looking for; press de <b>lens</b> at you right to start
		</div>
		<img id = "welcomemsg-border-topright" src="images/welcomemsg-border-topright.png">
		<img id = "welcomemsg-border-bottomright" src="images/welcomemsg-border-bottomright.png"> 
		<a href = "{$BACK_PATH}find-recipe">
			<img class ="pointer" id ="portal-welcomemsg-lens" src="images/lens_1.png" style="border: 0px;">
		</a>
	</div>
</div>
<br/>
<div class="block">
	<h2>Popular recipes</h2>
	{= mitad: (# {$popular_recipes}/2 #)=}
	<table>
		<tr>
			<td valign="top">
				<ul class="block portal-popular-recipes">
				[$popular_recipes]
					{?( {$_order} <= {$mitad} )?}
					<li><a href="{$BACK_PATH}{$path}">{$name}</a></li> 
					{/?}
				[/$popular_recipes]
				</ul>
			</td>
			<td width="50"></td>
			<td valign="top">
				<ul class="block portal-popular-recipes">
				[$popular_recipes]
					{?( {$_order} > {$mitad} )?}
					<li><a href="{$BACK_PATH}{$path}">{$name}</a></li>
					{/?}
				[/$popular_recipes]
				</ul>
			</td>
		</tr>
	</table>
</div>
<!--{ 
<div class="block" style="width: 550px;">
	<h2>The most searched</h2>
	[$more_searched]
		{= fs: (# {$vap} < 33 ? 14: ( {$vap}>=33 && {$vap}<=66 ? 16 : 18 ) #) =}
		<label><a href="{$path}" style="font-size:{$fs}px;">{^name}</a></label>
		!$_is_last <img alt="" src="images/square.png"> $_is_last!
		{?( {$_order} > 30 )?} @break@ {/?}
	[/$more_searched]
</div>
}-->
<br/>
<div class="block" style="width: 550px; text-align: justify;">
	<h2>The history behind this cookbook</h2>
	<p style="font-family: sans-serif;margin-top: 0px;">
		<b>Mirta recipes cookbook</b> is a collection of <b>recipes</b> that have been in our family for generations; some of them passed from mother to daughter and from father to son, others (the majority) compiled by my <b>Grandma</b> through her entire life and right now we want to share it with you. 
	</p>
	<p style="font-family: sans-serif;">
		What makes great this collection is the fact this is not just a cookbook; it is actually a family legacy; it is the work of a lifetime on the internet. In the way all great things start, this <b>cookbook</b> was not intentionally made to be published. It started as a compilation (created by my <b>Grandma</b>) of our family <b>cooking secrets</b> and the recipes the family enjoys more. After years of working in paper (became to have a huge book, impossible to fit in any cabinet), we (her family) could appreciated the value of her intense work and join together to share it via the internet, hoping her labour can assist with ideas and inspiration to other families all over the world.
	</p>
	<p style="font-family: sans-serif;">
		 In this <b>cookbook</b> you may find a diverse set of <b>recipes</b> made from a wide selection of <b>ingredients</b>. As you may note, it is thoroughly organized, but is not based on an specific theme, region, <b>cooking style</b> or culture. The only filter applied was if our family like it or not; and since our family is huge and their roots are coming from very different origins, probably yours will like this <b>recipes</b> as well.
	</p>
	<p style="font-family: sans-serif;">
		 You may find here <b>recipes</b> for all occasions, tastes and <b>cooking skills</b>. From a single <b>pie</b> or <b>rice</b> to a complicated <b>cake</b> or <b>honey chicken</b>, and many more that will make your mouth water. We will appreciate if you comment and rate the recipes you like (or dislike). You can also <a title="Download my eBook" href="{$WWW}{$BACK_PATH}my-book">download my eBook</a> or subcribe to our newsletter to be updated about new coming <b>recipes</b>. We do not have time (nor intentions) to spam.
	</p>
	<p style="font-family: sans-serif;">
		Last, but not least; this is not just a static release but a project in continuous development. As of now, we have a very decent amount of <b>recipes</b> to browse through and since my <b>Grandma</b> loves to cook, this number is increasing each week. This <b>cookbook</b> is a family legacy we are glad to share with you, and a place where scrumptious <b>recipes</b> will come to your palate. I hope you enjoy this <b>recipes compilation</b> as well as we do every day.
	</p>
	<p style="font-family: sans-serif;">Sincerely,</p>
	<i>Our family</i>.
 </div>
<!--{ 
<div class ="block">
	<h2>Last inserted recipes</h2>
	{= mitad: (# {$last_inserted}/2 #) =}
	<table>
		<tr>
			<td valign="top">
				<ul class="block portal-popular-recipes">
				(( leftlastinserted ))
				</ul>
			</td>
			<td width="50"></td>
			<td valign="top">
				<ul class="block portal-popular-recipes">
				(( rightlastinserted ))
			</ul>
			</td>
		</tr>
	</table>
	[$last_inserted]
		{?( {$_order} > {$mitad} )?}
				{{rightlastinserted
				<li><a href="{$BACK_PATH}{$path}">{$name}</a></li>
				rightlastinserted}}
			@else@
				{{leftlastinserted
				<li><a href="{$BACK_PATH}{$path}">{$name}</a></li>
				leftlastinserted}}
		{/?}
	[/$last_inserted]
</div>
}-->