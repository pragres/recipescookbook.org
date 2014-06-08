
function parse_url(str,component){
    var o={
        strictMode:false,
        key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
        q:{
            name:"queryKey",
            parser:/(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser:{
            strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };

var m=o.parser[o.strictMode?"strict":"loose"].exec(str),uri={},i=14;
while(i--){
    uri[o.key[i]]=m[i]||"";
}
switch(component){
    case'PHP_URL_SCHEME':
        return uri.protocol;
    case'PHP_URL_HOST':
        return uri.host;
    case'PHP_URL_PORT':
        return uri.port;
    case'PHP_URL_USER':
        return uri.user;
    case'PHP_URL_PASS':
        return uri.password;
    case'PHP_URL_PATH':
        return uri.path;
    case'PHP_URL_QUERY':
        return uri.query;
    case'PHP_URL_FRAGMENT':
        return uri.anchor;
    default:
        var retArr={};

        if(uri.protocol!==''){
        retArr.scheme=uri.protocol;
    }
    if(uri.host!==''){
        retArr.host=uri.host;
    }
    if(uri.port!==''){
        retArr.port=uri.port;
    }
    if(uri.user!==''){
        retArr.user=uri.user;
    }
    if(uri.password!==''){
        retArr.pass=uri.password;
    }
    if(uri.path!==''){
        retArr.path=uri.path;
    }
    if(uri.query!==''){
        retArr.query=uri.query;
    }
    if(uri.anchor!==''){
        retArr.fragment=uri.anchor;
    }
    return retArr;
}
}

function get_headers(url,format){
    var req=this.window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
    if(!req){
        throw new Error('XMLHttpRequest not supported');
    }
    var tmp,headers,pair,i,j=0;
    req.open('HEAD',url,false);
    req.send(null);
    if(req.readyState<3){
        return false;
    }
    tmp=req.getAllResponseHeaders();
    tmp=tmp.split('\n');
    tmp=this.array_filter(tmp,function(value){
        return value.substring(1)!=='';
    });
    headers=format?{}:[];
    for(i in tmp){
        if(format){
            pair=tmp[i].split(':');
            headers[pair.splice(0,1)]=pair.join(':').substring(1);
        }else{
            headers[j++]=tmp[i];
        }
    }
    return headers;
}

function http_build_query(formdata,numeric_prefix,arg_separator){
    var value,key,tmp=[];
    var _http_build_query_helper=function(key,val,arg_separator){
        var k,tmp=[];
        if(val===true){
            val="1";
        }else if(val===false){
            val="0";
        }
        if(val!==null&&typeof(val)==="object"){
            for(k in val){
                if(val[k]!==null){
                    tmp.push(_http_build_query_helper(key+"["+k+"]",val[k],arg_separator));
                }
            }
            return tmp.join(arg_separator);
    }else if(typeof(val)!=="function"){
        return this.urlencode(key)+"="+this.urlencode(val);
    }else{
        throw new Error('There was an error processing for http_build_query().');
    }
};

if(!arg_separator){
    arg_separator="&";
}
for(key in formdata){
    value=formdata[key];
    if(numeric_prefix&&!isNaN(key)){
        key=String(numeric_prefix)+key;
    }
    tmp.push(_http_build_query_helper(key,value,arg_separator));
}
return tmp.join(arg_separator);
}

function rawurldecode(str){
    return decodeURIComponent(str);
}
function rawurlencode(str){
    str=(str+'').toString();
    return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A');
}

function urldecode(str){
    return decodeURIComponent(str.replace(/\+/g,'%20'));
}
function urlencode(str){
    str=(str+'').toString();
    return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');
}