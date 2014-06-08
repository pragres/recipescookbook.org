{strip}
<!--{ Core's resources }-->
[[ramifip
	[$core_css]
	{\t}{\t}<link type="text/css" href="{$css_router}{$value}" rel="stylesheet"></link>
	[/$core_css]
	[$core_js]
	{\t}{\t}<script type="text/javascript" src="{$js_router}{$value}"></script>
	[/$core_js]
ramifip]]

<!--{ App's resources }-->
[$app_css]
	{\t}{\t}<link type="text/css" href="{$css_router}{$path}" ?$less rel="stylesheet/less" @else@ rel="stylesheet" $less?></link>
[/$app_css]
[$app_js]
	{\t}{\t}<script type="text/javascript" src="{$js_router}{$value}"></script>
[/$app_js]

<script type = "text/javascript"> 
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
{/strip}