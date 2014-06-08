<!--{ Mirta Recipes Cooking Time Component }-->

{?( {$cookingtime} <= 59 )?}
   <time datetime="PT{$cookingtime}M" itemprop="totalTime">{$cookingtime} min</time>
@else@
	{= h: (# intval({$cookingtime}/60) #) =}
	{= mm: (# {$cookingtime} - ({$h} * 60) #) =}
    
    {?( {$mm} < 10 )?}
        <time datetime="PT{$h}H" itemprop="totalTime">{$h}:0{$mm} h</time>
    @else@
        <time datetime="PT{$h}H{$mm}M" itemprop="totalTime">{$h}:{$mm} h</time>
    {/?}
{/?}