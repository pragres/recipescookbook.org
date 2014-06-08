<html>
	<title>{$name}</title>
	<body>
		<table width="800" style="margin:auto; font-family:Arial; text-align:justify;">
			<tr>
				<td align="center">
					<h1 style="font-family:Impact; margin-bottom:0px;">{$name}</h1>
					<p>Brought by <a href="http://recipescookbook.org/">Mirta Recipes Cookbook</a></p>
				</td>
			</tr>
			<!--image-->
			<tr>
				<td>
					<a href="http://recipescookbook.org/{$path}" title="{$name}">
						<img src="http://recipescookbook.org/images/{$picture}" style="border:5px solid black;" width="795" alt="{$name}"/>
					</a>
				</td>
			</tr>
			<tr>
				<td style="padding:20px;">
					<!--ingredients and details-->
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="400" valign="top">
								<!--ingredients-->
								<h2 style="font-family:Impact; margin-bottom:0px;">Ingredients</h2>
								<ul>
									[$ingredients]
									<li>{$name} ({$ammount})</li>
									[/$ingredients]
								</ul>
							</td>
							<td width="400" valign="top">
								<!--details-->
								<h2 style="font-family:Impact; margin-bottom:0px;">Details</h2>
								<table border="0" style="margin-top:10px;">
									<tr>
										<td width="100">Diet:</td>	
										<td width="100" bgcolor="#66FF99" align="center">{$diet_name}</td>
										<td width="10"></td>
										<td width="100">Preparation:</td>
										<td width="100" bgcolor="#CCCC99" align="center">{$preparationtype_name}</td>
									</tr>
									<tr>
										<td width="100">Nationality:</td>	
										<td>
										<table>
										<tr><td width="100" bgcolor="#CC99FF" align="center">{$nationality_name}</td></tr>
										</table>
										</td>
										<td width="10"></td>
										<td width="100">Best time:</td>
										<td>
										<table>
										[$horaries]
										<tr><td width="100" bgcolor="#FFFF99" align="center">{$name}</td></tr>
										[/$horaries]
										</table>
										</td>
									</tr>
									<tr>
										<td width="100">Time:</td>	
										<td width="100" align="center">
			                        	{% recipes/portal/design/cookingtime %}
			                        	</td>
										<td width="10"></td>
										<td width="100">Servings:</td>
										<td width="100" align="center">{$numberofguests} people</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>

					<!--preparation mode-->
					<h2 style="font-family:Impact; margin-bottom:0px;">Preparation Mode</h2>
					<p>{$preparationmode}</p>

					<!--recipe history-->
					<h2 style="font-family:Impact; margin-bottom:0px;">About this recipe</h2>
					<p>
						{$description:~300}...
						<a href="http://recipescookbook.org/{$path}" title="read more">read more</a>
					</p>
					<!--footer-->
					<hr/>
					<center>
					If you like my recipes, please
					<img src="http://recipescookbook.org/launch/fblogo.png" alt="FB"/>
					<a href="https://www.facebook.com/mirtarecipes">Like me in FaceBook</a> or 
					<img src="http://recipescookbook.org/launch/glogo.png" alt="G+"/>
					<a href="https://plus.google.com/109657323256720394607/posts">Follow me in Google+</a>
					<br/><br/>
					<small><p style="font-size:small;">You received this email because you subscribed to Mirta Recipes Cookbook. To unregister, reply with the subject: STOP</p></small>
					</center>
				</td>
			</tr>
		</table>
	</body>
</html>