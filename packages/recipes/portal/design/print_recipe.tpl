<html>
    <head>
        <title>Mirta Recipes Cookbook: {$name}</title>
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
            table{
                width: 100%;
            }
        </style>
    </head>
    <body onload ="window.print();">
        <div class="page">
            <table width="100%">
                <tr>
                    <td valign="top" align="center">
                        <h2>Mirta's recipes</h2>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <h1>{$name}</h1>
                    </td>
                </tr>
                <tr>
                    <td valign="top" colspan="2">
                        <table><tr><td valign="top">
                        ?$picture
						<img src="{$BACK_PATH}img.php?&f={&picture}" class="recipe-image">
						$picture?
                        </td><td valign="top">
                        <table>
                        <tr><td align = "right">Nationality: <br></td><td><b>{$nationality_name}</b></td></tr>
                        <tr><td align = "right">Occasion: <br></td><td><b>{$occasion_name}</b></td></tr>
                        <tr><td align = "right">Preparation time: <br></td><td><b>{% recipes/portal/design/cookingtime %}</b></td></tr>
                        <tr><td align = "right">Preparation type: <br></td><td><b>{$preparationtype_name}</b></td></tr>
                        <tr><td align = "right">Diet: <br></td><td><b>{$diet_name}</b></td></tr>
                        </table>
                        </td></tr></table>
                    </td>
                </tr>
            </table>
            <table width="100%">
                <tr>
                    <td valign="top" align="center">
                    ?$ingredients
                    <br>Ingredients ({$ingredients}):<br><br>
                    [$ingredients]
                        <b>{$name} ({$ammount})</b><br/>
                    [/$ingredients]
                    $ingredients?
                    </td>

                </tr>
                <tr>
                    <td valign="top">
                        <br>
                        <b>Preparation mode:</b>
                        <div class = "box">
                        	{$preparationmode}
                        </div>
                    </td>
                <tr>
                    <td align="center">
                        <br>
                        <a href ="http://recipescookbook.org">http://recipescookbook.org</a>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>