<?php 

/**
 * Event for call database function
 * 
 * {$funcname}
 * 
 * @updated {/div.now:Y-m-d/}
 */

#event-type: return-object 

#{\n}$f = new {$schema}Functions();
$params = array();

#{\n}$r = $f->{$funcname}({strip}?$params [$params] {?( '{$name}' == '' )?} post('param{$_order}') @else@ post('{$name}') {/?} !$_is_last,$_is_last![/$params] $params?{/strip});

$s = new Services_JSON();
echo $s->encode($r);

// End of file