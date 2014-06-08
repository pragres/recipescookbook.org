{= hheader: 255 =}
<!-- making the zoom effect for for the main image -->

<style type="text/css">
	#screen {
		background: none repeat scroll 0 0 #FFFFFF;
	    height: 275px;
	    margin-left: -10px;
	    margin-top: -10px;
	    overflow: hidden;
	    position: absolute;
	    width: 580px;
	    border-right: 4px solid black;
	}
</style>
<script type="text/javascript">
function animateRecipeImage(){
		$(".panel").jqFloat({
			width:80,
			height:80,
			speed:2800
		});
		setTimeout('animateRecipeImage();', 3000);
}
$(document).ready(function() {
	animateRecipeImage();
});
</script>

<!--{  Header of Recipe Page }-->
<div class="block" id="portal-recipe-header-content">
     			?$recipe.picture   
   			<div id="screen">
				<img id="recipe-image" width="650" class="panel" alt="{$recipe.name}" style="position: absolute;" src="{$BACK_PATH}images/recipes/{$recipe.picture}">
			</div>        
			<!--  <img id="recipe-image" class="magnify" alt="{$recipe.name}" style="margin-left: -10px; margin-top: -10px; position: absolute; width: 570px;" src="{$BACK_PATH}images/recipes/{$recipe.picture}/crop-top-570x275"> -->
              @else@
              	<label class="panel"></label>
				<img id="recipe-image" alt="{$recipe.name}" style="opacity: 0.9; margin-top: 70px; position: absolute;height:160px;margin-left: 10px; margin-right:10px;" src="{$BACK_PATH}images/no-picture.png">                	
              $recipe.picture?
    <table width="100%">
        <tr>
            <td valign="top" align ="right">
            <br/><br/>
                <table width = "100%" style = "height: 160px;  margin-top: 20px;">
                	<tr>
                		<td>
	                		<div id = "portal-recipe-controls" class ="block">
			                    <img alt="" src="{$BACK_PATH}images/icons-03.png"> <a href = "{$BACK_PATH}print/{$recipe.id}" target = "_blank">Print</a>
			                    <img alt="" src="{$BACK_PATH}images/icons-04.png"> <a href = "{$BACK_PATH}download/{$recipe.id}" target = "new">Save</a>
			                    <img alt="" src="{$BACK_PATH}images/icons-05.png"> <label id = "portal-recipe-share-link" class = "link pointer cursor">Share</label>
			                </div>
                		</td>
                    <tr>
                        <td id = "random-secret" valign = "center" align = "right">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>