<!--{ Default header of pages  }-->
{= hheader: 395 =}
<div class = "block" id = "portal-header-content">
    <div id = "mirta">
        <img src="images/mirta.png">
        
    </div>
    <div id = "slides-images">
        <a id = "slide-image-link" href = "">
        	<img id="slide-image">
        </a>
        <label id="slide-title" style="z-index:9999; position: absolute;margin-top:380px; margin-left: -635px; width:300px; color:black; font-style:italic; font-weight: bold;font-size: 20px;"></label>
    </div>
    <div id ="slides-control">
    	<div id ="slides-control-stop" onclick="recipes.portal.DefaultHeader.stopSlides();"></div>
    	<div id ="slides-control-play" onclick="recipes.portal.DefaultHeader.playSlides();"></div>
    </div>
</div>