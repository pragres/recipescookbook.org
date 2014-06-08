{= title: My Book =}
{= hideebook: true =}
<div id="hideSuscritionGadget" style="display:none;">TRUE</div> <!--do not erase, to hide the suscrition gadget for this page-->

<h2>Download my eBook</h2>
<img style="text-align: center;" src="{$WWW}{$BACK_PATH}resources/recipes/portal/images/book-image-big.png">
<p style="font-family: sans-serif; text-align: justify;">Please insert your email below to download my book. I hate span as much as you; your email will never be shared,
rented or sold. You will be enrolled in my opt-out email list with recipes, secrets of the kitchen and much more interesting information. You can
cancel your subscription anytime.</p>

?$error
	<p class = "message-error">Please write your email address</p>
$error?

?$success
	<p class = "message">Your email address <i>{$email}</i> was registered in the system. You are now subscribed to this page.</p>
$success?

<div class="block padding-five">
    <form name="frmSubscribe" action="{$WWW}{$BACK_PATH}my-book" method="post">
        <div class="block padding-five">Email address: <input type ="text" class="edit" name ="edtSubscribeEmail" id = "edtSubscribeEmail"/></div>
        <div class="block padding-five"><input class = "button" type="submit" value="Download eBook now!" id ="btnSubscribe" disabled/></div>
    </form>
</div>
<script>
	
	$(function(){
	
		$("#edtSubscribeEmail").keydown(function(e){
		 	var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (e==13) return false;
			return keyCode;
		});
		
		$("#edtSubscribeEmail").keyup(function(){
			var e = $("#edtSubscribeEmail").val();
			if (e.replace(/^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/g, '') != '' || trim(e)==''){
				$("#btnSubscribe").attr("disabled", true);
				$("#edtSubscribeEmail").css("border-color","red");
			} else { 
				$("#btnSubscribe").attr("disabled", false);
				$("#edtSubscribeEmail").css("border-color","black");
			}
		});
	});
</script>