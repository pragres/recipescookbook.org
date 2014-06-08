<html>
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Mirta Recipes Cookbook - List of recipes</title>
        <style>
            h1,h2{
                font-family: "Monotype Corsiva";
            }
            .page{
                border: 1px dashed black;
                padding: 20px;
                width: 600px;
            }
            body{
                font-family: sans-serif;
                font-size: 14px;
            }

            .box{
                border-top: 1px solid gray;
                border-left: 1px solid gray;
                border-right: 3px solid gray;
                border-bottom: 3px solid gray;
                margin-top: 10px;
                padding: 10px;
            }
            .recipe-image{
                border: 1px solid black;
                height: 160px;
            }

            th,td {border-bottom:1px solid gray; border-right: 1px solid gray; padding: 2px;}
        </style>
    </head>
    <body onload ="window.print();">
    <h1 align="center">Mirta Recipes Cookbook - List of recipes</h1>
    <hr>
    <table align="center">
	[$records]	
	{?( {$_order} % 18 == 0 || {$_order} == 1 )?}
		{?( {$_order} % 18 == 0 )?} <tr><td align="center" colspan="9" style="font-size: 11px;"><i>page #(# {$_order} / 18 :0#)</i></td></tr> {/?}
		<tr>
			<th rowspan="2">#</th>
			<th rowspan="2"><label>Recipe</label></th>
		    <th colspan="3"><label>History</label></th>
		    <th rowspan="2"><label>In<br/>catalog</label></th>
		    <th rowspan="2"><label>Back<br/>links</label></th>
		    <th rowspan="2"><label>Campaing</label></th>
		    <th rowspan="2"><label>To<br/>sell</label></th>
		</tr>
		<tr>
			<td>I</td>
			<td>W</td>
			<td>R</td>
		</tr>
	{/?}
	<tr>
		<td>{$_order}</td>
		<td width="400">
		<table>
		 <tr>
			<td style="border:none;" width ="50">
				?$picture
					<img style="border:2px solid black;" src="{$BACK_PATH}img.php?f=width-50/{&picture}"> 
				$picture?
			</td>
			<td style="border:none;"><a href="{$WWW}{$path}" target="_blank">{$name}</a><br/>
			<label style="font-size: 10px;">
			{$nationality_name} {$diet_name}, {$numberofguests} guests, {% recipes/portal/design/cookingtime %} {$preparationtype_name}
			?$prepareinfamily, Prepare in family $prepareinfamily? 
			?$secretoffamily, Is a secret $secretoffamily?, {$foodtype_name} for {$occasion_name}
			</label>
			</td>
		</tr></table>
		</td>
		<td align="center">{?( {%description} > 10 )?} x {/?}&nbsp;</td>
		<td align="center">?$history_written x $history_written?&nbsp;</td>
		<td align="center">?$history_revised x $history_revised?&nbsp;</td>
		<td align="center">?$in_catalog x $in_catalog?&nbsp;</td>
		<td align="center">?$backlinks x $backlinks?&nbsp;</td>
		<td align="center">?$campaing x $campaing?&nbsp;</td>
		<td align="center">?$to_sell x $to_sell?&nbsp;</td>	
	</tr>
[/$records]
<tr><td align="center" colspan="9" style="font-size: 11px;"><i>page #(# {$records} / 18 + 1:0#)</i></td></tr>
</table>
<hr>
<p align="center">{/div.now:Y-m-d/} | <a href ="http://recipescookbook.org">http://recipescookbook.org</a></p>
</body></html>