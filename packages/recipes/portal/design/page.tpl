<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" itemscope itemtype="http://schema.org/LocalBusiness" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml>
	<head profile="http://www.w3.org/2005/10/profile">
		<link rel="icon" type="image/ico" href="{$WWW}{$BACK_PATH}images/favicon.ico"></link>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta name="description" content="This is a collection of culinary secrets acquired by my Grandma through a lifetime of cooking for multiple generations." />
		<meta name="keywords" content="recipes,mirta,cookbook,recipes cookbook,meals,cook,recipe,chicken,pork,food" />
		<meta name="author" description="Pragres Corporation">
		<meta http-equiv="content-language" content="en"/>
		<meta itemprop="description" content="Mirta Recipes Cookbook is a collection of culinary secrets acquired by my Grandma through a lifetime of cooking for multiple generations. We are inviting you to enter.">
		<!--facebook metas-->
(( metas ))

		<title>{$title} - Mirta Recipes cookbook</title>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/ramifip/ramifip.css" rel="stylesheet"></link>	
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" type = "text/javascript"></script>
		<script type = "text/javascript" src="{$BACK_PATH}libs/jqfloat.js"></script>
		<script>
		function urlencode(str){
		    str=(str+'').toString();
		    return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');
		}
		
		function print_r(array,return_val){
		    var output="",pad_char=" ",pad_val=4,d=this.window.document;
		    var getFuncName=function(fn){
		        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
		        if(!name){
		            return'(Anonymous)';
		        }
		        return name[1];
		    };
		
		    var repeat_char=function(len,pad_char){
		        var str="";
		        for(var i=0;i<len;i++){
		            str+=pad_char;
		        }
		        return str;
		    };
		
		    var formatArray=function(obj,cur_depth,pad_val,pad_char){
		        if(cur_depth>0){
		            cur_depth++;
		        }
		        var base_pad=repeat_char(pad_val*cur_depth,pad_char);
		        var thick_pad=repeat_char(pad_val*(cur_depth+1),pad_char);
		        var str="";
		        if(typeof obj==='object'&&obj!==null&&obj.constructor&&getFuncName(obj.constructor)!=='PHPJS_Resource'){
		            str+="Array\n"+base_pad+"(\n";
		            for(var key in obj){
		                if(obj[key]instanceof Array){
		                    str+=thick_pad+"["+key+"] => "+formatArray(obj[key],cur_depth+1,pad_val,pad_char);
		                }else{
		                    str+=thick_pad+"["+key+"] => "+obj[key]+"\n";
		                }
		            }
		            str+=base_pad+")\n";
		    }else if(obj===null||obj===undefined){
		        str='';
		    }
		    else{
		        str=obj.toString();
		    }
		    return str;
			};
			
			output=formatArray(array,0,pad_val,pad_char);
			if(return_val!==true){
			    if(d.body){
			        this.echo(output);
			    }else{
			        try{
			            d=XULDocument;
			            this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+output+'</pre>');
			        }catch(e){
			            this.echo(output);
			        }
			    }
			    return true;
			}else{
			    return output;
			}
		}
		</script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/lib/3rdParty/phpjs/php_string.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/lib/3rdParty/phpjs/php_date.js"></script>
		<script type = "text/javascript" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/rpApplication.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/rpJSON.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/rpDataType.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/rpString.js"></script>
		<script type = "text/javascript" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/rpCollection.js"></script>
		<script type = "text/javascript" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpCore/client/ramifip.min.js"></script>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpAjax/rpAjax.css" rel="stylesheet"></link>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.css" rel="stylesheet"></link>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/recipes/portal/recipes.portal.css" rel="stylesheet"></link>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/recipes/recipes.css" rel="stylesheet"></link>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/com/jquery/themes/base/jquery.ui.all.css" rel="stylesheet"></link>
		<link type="text/css" href="{$WWW}{$BACK_PATH}resources/com/jquery/themes/smoothness/ui.all.css" rel="stylesheet"></link>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/app.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/config.min.js"></script>
		<!--{  <script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/lib/3rdParty/lesscss/less.min.js"></script> }-->
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpAjax/rpAjax.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.window.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.overlay.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.modalframe.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.notification.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/ramifip/modules/rpJSGUI/rpJSGUI.input.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/common/recipes.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/com/jquery/jquery-ui.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/recipe_view.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/last_comments.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/recipe_header.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/find_recipe.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/last_comments.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/read_secret.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/recipe_view.min.js"></script>
		<script type = "text/javascript" defer="defer" src="{$WWW}{$BACK_PATH}resources/recipes/portal/scripts/recipes_catalog.min.js"></script>		
		
		<script type = "text/javascript" defer="defer"> 
			var PATH = '{$PATH}'; 
			var FILES = '{$FILES}'; 
			var WWW = '{$WWW}'; 
			var PACKAGES = '{$PACKAGES}'; 
			var $_GET = {json:div.get};
			var $_POST = {json:div.post};
			var $_SESSION = {json:div.session};
			var PHP_SELF = '{$div.script_name}';
			var CLEAN_URL = '{$CLEAN_URL}';
			var CLEAN_URL_BACK_PATH = '{$CLEAN_URL_BACK_PATH}';
			var CLEAN_URL_PARTS = {json:CLEAN_URL_PARTS};
			var USE_CLEAN_URL = {$USE_CLEAN_URL};
			ramifip.use_clean_url = USE_CLEAN_URL;
		</script>

        <script type = "text/javascript" defer="defer">
			<!--Google Analytics Tracker-->
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-28737978-1']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();

			<!--facebook script-->
			(function(d, s, id) {
	  			var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
	  			js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		</script>
	</head>
	<body>
		<div id="fb-root"></div>
		<br/>
		<div class = "block" id = "portal">
		    <div class = "block" id = "portal-header" style="height:{$hheader}px;">
				<img src="{$WWW}{$BACK_PATH}images/corner.png" id = "portal-topright">
		        <div class = "block" id = "portal-title"></div>
		        <h1 id = "portal-title-h1">{$title}</h1>
		        {% header %}
		    </div>
		    <div id="portal-primary-link">
		        <label class ="pointer"><a href = "{$BACK_PATH}home">Home</a></label>
		        <label class ="pointer"><a href = "{$BACK_PATH}find-recipe">Find a recipe</a></label>
		        <label class ="pointer"><a href = "{$BACK_PATH}recipes-catalog">Recipes catalog</a></label>
		        <label class ="pointer"><a href = "{$BACK_PATH}my-book">My Book</a></label>
		        <label class ="pointer"><a href = "{$BACK_PATH}read-a-secret">Read a secret</a></label>
		        <label class ="pointer"><a href = "{$BACK_PATH}who-am-i">Who am I?</a></label>
		    </div>
		    <div id="portal-primary-link-shadow">
		        <div id ="portal-primary-link-corner-tl"></div>
		        <div id ="portal-primary-link-corner-tr"></div>
		    </div>
		    <div id="portal-center">
		        <table>
		        	<tr>
		        		<td valign="top">
		                    <div id = "portal-content">
		                        {% content %}
		                    </div>
		                </td>
		                <td valign="top" width="270">
		                	!$hideebook
		                	{% ebook %}
		                	$hideebook!
		                    <div id = "portal-ads" >
								{% recipes/portal/design/portal-ads %}
							</div>
							
						</td>
					</tr>
				</table>
			</div>
			<div id = "portal-footer">
		        <div id = "portal-footer-content">
		            <a href="https://plus.google.com/109657323256720394607?rel=author">Mirta Calvo</a> &copy; {/div.now:Y/} - Made by <a href="http://pragres.com" rel="nofollow">Pragres</a> - <a href="https://plus.google.com/b/118136686913723067201/118136686913723067201" rel="publisher">Pragres in Google+</a> - Powered by <a href="http://ramifip.com/" rel="nofollow">Ramifip</a> + <a href="http://divengine.com/" rel="nofollow">Div</a> + <a href="http://http://objectdb.salvipascual.com/" rel="nofollow">ObjectDB</a> 
		        </div>
		    </div>
		</div>
		<div id = "portal-shadow"></div>
		<!--BEGIN mouseflow script-->
		<script type="text/javascript">
			var _mfq = _mfq || [];
			(function () {
			var mf = document.createElement("script"); mf.type = "text/javascript"; mf.async = true;
			mf.src = "//cdn.mouseflow.com/projects/bc84c650-2585-4d8b-ae59-7ea7b6c429f6.js";
			document.getElementsByTagName("head")[0].appendChild(mf);
		  })();
		</script>
		<!--END mouseflow script-->
	</body>
</html>