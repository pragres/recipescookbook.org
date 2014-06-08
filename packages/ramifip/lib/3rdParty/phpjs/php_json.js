function json_decode(str_json){
    var json=this.window.JSON;
    if(typeof json==='object'&&typeof json.parse==='function'){
        try{
            return json.parse(str_json);
        }catch(err){
            if(!(err instanceof SyntaxError)){
                throw new Error('Unexpected error type in json_decode()');
            }
            this.php_js=this.php_js||{};

            this.php_js.last_error_json=4;
            return null;
        }
    }
    var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var j;
var text=str_json;
cx.lastIndex=0;
if(cx.test(text)){
    text=text.replace(cx,function(a){
        return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
    });
}
if((/^[\],:{}\s]*$/).test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){
    j=eval('('+text+')');
    return j;
}
this.php_js=this.php_js||{};

this.php_js.last_error_json=4;
return null;
}
function json_encode(mixed_val){
    var retVal,json=this.window.JSON;
    try{
        if(typeof json==='object'&&typeof json.stringify==='function'){
            retVal=json.stringify(mixed_val);
            if(retVal===undefined){
                throw new SyntaxError('json_encode');
            }
            return retVal;
        }
        var value=mixed_val;
        var quote=function(string){
            var escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
            var meta={
                '\b':'\\b',
                '\t':'\\t',
                '\n':'\\n',
                '\f':'\\f',
                '\r':'\\r',
                '"':'\\"',
                '\\':'\\\\'
            };

            escapable.lastIndex=0;
            return escapable.test(string)?'"'+string.replace(escapable,function(a){
                var c=meta[a];
                return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
            })+'"':'"'+string+'"';
        };

        var str=function(key,holder){
            var gap='';
            var indent='    ';
            var i=0;
            var k='';
            var v='';
            var length=0;
            var mind=gap;
            var partial=[];
            var value=holder[key];
            if(value&&typeof value==='object'&&typeof value.toJSON==='function'){
                value=value.toJSON(key);
            }
            switch(typeof value){
                case'string':
                    return quote(value);
                case'number':
                    return isFinite(value)?String(value):'null';
                case'boolean':case'null':
                    return String(value);
                case'object':
                    if(!value){
                    return'null';
                }
                if((this.PHPJS_Resource&&value instanceof this.PHPJS_Resource)||(window.PHPJS_Resource&&value instanceof window.PHPJS_Resource)){
                    throw new SyntaxError('json_encode');
                }
                gap+=indent;
                partial=[];
                if(Object.prototype.toString.apply(value)==='[object Array]'){
                    length=value.length;
                    for(i=0;i<length;i+=1){
                        partial[i]=str(i,value)||'null';
                    }
                    v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';
                    gap=mind;
                    return v;
                }
                for(k in value){
                    if(Object.hasOwnProperty.call(value,k)){
                        v=str(k,value);
                        if(v){
                            partial.push(quote(k)+(gap?': ':':')+v);
                        }
                    }
                }
                v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';
            gap=mind;
            return v;
        case'undefined':case'function':default:
            throw new SyntaxError('json_encode');
    }
};

return str('',{
    '':value
});
}
catch(err){
    if(!(err instanceof SyntaxError)){
        throw new Error('Unexpected error type in json_encode()');
    }
    this.php_js=this.php_js||{};

    this.php_js.last_error_json=4;
    return null;
}
}