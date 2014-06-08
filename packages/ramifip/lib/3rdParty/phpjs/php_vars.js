
function is_bool(mixed_var){
    return(typeof mixed_var==='boolean');
}
function is_double(mixed_var){
    return this.is_float(mixed_var);
}
function is_finite(val){
    var warningType='';
    if(val===Infinity||val===-Infinity){
        return false;
    }
    if(typeof val=='object'){
        warningType=(val instanceof Array?'array':'object');
    }else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){
        warningType='string';
    }
    if(warningType){
        throw new Error('Warning: is_finite() expects parameter 1 to be double, '+warningType+' given');
    }
    return true;
}
function is_float(mixed_var){
    if(typeof mixed_var!=='number'){
        return false;
    }
    return!!(mixed_var%1);
}
function is_infinite(val){
    var warningType='';
    if(val===Infinity||val===-Infinity){
        return true;
    }
    if(typeof val=='object'){
        warningType=(val instanceof Array?'array':'object');
    }else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){
        warningType='string';
    }
    if(warningType){
        throw new Error('Warning: is_infinite() expects parameter 1 to be double, '+warningType+' given');
    }
    return false;
}
function is_int(mixed_var){
    if(typeof mixed_var!=='number'){
        return false;
    }
    return!(mixed_var%1);
}
function is_integer(mixed_var){
    return this.is_int(mixed_var);
}
function is_long(mixed_var){
    return this.is_float(mixed_var);
}
function is_nan(val){
    var warningType='';
    if(typeof val=='number'&&isNaN(val)){
        return true;
    }
    if(typeof val=='object'){
        warningType=(val instanceof Array?'array':'object');
    }else if(typeof val=='string'&&!val.match(/^[\+\-]?\d/)){
        warningType='string';
    }
    if(warningType){
        throw new Error('Warning: is_nan() expects parameter 1 to be double, '+warningType+' given');
    }
    return false;
}
function is_null(mixed_var){
    return(mixed_var===null);
}
function is_numeric(mixed_var){
    return(typeof(mixed_var)==='number'||typeof(mixed_var)==='string')&&mixed_var!==''&&!isNaN(mixed_var);
}
function is_real(mixed_var){
    return this.is_float(mixed_var);
}
function is_scalar(mixed_var){
    return(/boolean|number|string/).test(typeof mixed_var);
}
function is_string(mixed_var){
    return(typeof(mixed_var)=='string');
}

function intval(mixed_var,base){
    var tmp;
    var type=typeof(mixed_var);
    if(type==='boolean'){
        return(mixed_var)?1:0;
    }else if(type==='string'){
        tmp=parseInt(mixed_var,base||10);
        return(isNaN(tmp)||!isFinite(tmp))?0:tmp;
    }else if(type==='number'&&isFinite(mixed_var)){
        return Math.floor(mixed_var);
    }else{
        return 0;
    }
}

function doubleval(mixed_var){
    return this.floatval(mixed_var);
}

function get_defined_vars(){
    var i='',arr=[],already={};

    for(i in this.window){
        try{
            if(typeof this.window[i]==='object'){
                for(var j in this.window[i]){
                    if(this.window[j]&&!already[j]){
                        already[j]=1;
                        arr.push(j);
                    }
                }
                }else if(!already[i]){
        already[i]=1;
        arr.push(i);
    }
    }catch(e){
        if(!already[i]){
            already[i]=1;
            arr.push(i);
        }
    }
}
return arr;
}

function print_r(array,return_val){
    var output="",pad_char=" ",pad_val=4,d=this.window.document;
    var getFuncName=function(fn){
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if(!name){
            return'(Anonymous)';
        }
        return name[1];
    };

    var repeat_char=function(len,pad_char){
        var str="";
        for(var i=0;i<len;i++){
            str+=pad_char;
        }
        return str;
    };

    var formatArray=function(obj,cur_depth,pad_val,pad_char){
        if(cur_depth>0){
            cur_depth++;
        }
        var base_pad=repeat_char(pad_val*cur_depth,pad_char);
        var thick_pad=repeat_char(pad_val*(cur_depth+1),pad_char);
        var str="";
        if(typeof obj==='object'&&obj!==null&&obj.constructor&&getFuncName(obj.constructor)!=='PHPJS_Resource'){
            str+="Array\n"+base_pad+"(\n";
            for(var key in obj){
                if(obj[key]instanceof Array){
                    str+=thick_pad+"["+key+"] => "+formatArray(obj[key],cur_depth+1,pad_val,pad_char);
                }else{
                    str+=thick_pad+"["+key+"] => "+obj[key]+"\n";
                }
            }
            str+=base_pad+")\n";
    }else if(obj===null||obj===undefined){
        str='';
    }
    else{
        str=obj.toString();
    }
    return str;
};

output=formatArray(array,0,pad_val,pad_char);
if(return_val!==true){
    if(d.body){
        this.echo(output);
    }else{
        try{
            d=XULDocument;
            this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+output+'</pre>');
        }catch(e){
            this.echo(output);
        }
    }
    return true;
}else{
    return output;
}
}


function serialize(mixed_value){
    var _getType=function(inp){
        var type=typeof inp,match;
        var key;
        if(type=='object'&&!inp){
            return'null';
        }
        if(type=="object"){
            if(!inp.constructor){
                return'object';
            }
            var cons=inp.constructor.toString();
            match=cons.match(/(\w+)\(/);
            if(match){
                cons=match[1].toLowerCase();
            }
            var types=["boolean","number","string","array"];
            for(key in types){
                if(cons==types[key]){
                    type=types[key];
                    break;
                }
            }
            }
            return type;
};

var type=_getType(mixed_value);
var val,ktype='';
switch(type){
    case"function":
        val="";
        break;
    case"boolean":
        val="b:"+(mixed_value?"1":"0");
        break;
    case"number":
        val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value;
        break;
    case"string":
        mixed_value=this.utf8_encode(mixed_value);
        val="s:"+encodeURIComponent(mixed_value).replace(/%../g,'x').length+":\""+mixed_value+"\"";
        break;
    case"array":case"object":
        val="a";
        var count=0;
        var vals="";
        var okey;
        var key;
        for(key in mixed_value){
        ktype=_getType(mixed_value[key]);
        if(ktype=="function"){
            continue;
        }
        okey=(key.match(/^[0-9]+$/)?parseInt(key,10):key);
        vals+=this.serialize(okey)+this.serialize(mixed_value[key]);
        count++;
    }
    val+=":"+count+":{"+vals+"}";
    break;
    case"undefined":default:
        val="N";
        break;
}
if(type!="object"&&type!="array"){
    val+=";";
}
return val;
}


function settype(vr,type){
    var is_array=function(arr){
        return typeof arr==='object'&&typeof arr.length==='number'&&!(arr.propertyIsEnumerable('length'))&&typeof arr.splice==='function';
    };

    var v,mtch,i,obj;
    v=this[vr]?this[vr]:vr;
    try{
        switch(type){
            case'boolean':
                if(is_array(v)&&v.length===0){
                this[vr]=false;
            }else if(v==='0'){
                this[vr]=false;
            }else if(typeof v==='object'&&!is_array(v)){
                var lgth=false;
                for(i in v){
                    lgth=true;
                }
                this[vr]=lgth;
            }else{
                this[vr]=!!v;
            }
            break;
            case'integer':
                if(typeof v==='number'){
                this[vr]=parseInt(v,10);
            }else if(typeof v==='string'){
                mtch=v.match(/^([+\-]?)(\d+)/);
                if(!mtch){
                    this[vr]=0;
                }else{
                    this[vr]=parseInt(v,10);
                }
            }else if(v===true){
                this[vr]=1;
            }else if(v===false||v===null){
                this[vr]=0;
            }else if(is_array(v)&&v.length===0){
                this[vr]=0;
            }else if(typeof v==='object'){
                this[vr]=1;
            }
            break;
        case'float':
            if(typeof v==='string'){
            mtch=v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
            if(!mtch){
                this[vr]=0;
            }else{
                this[vr]=parseFloat(v,10);
            }
        }else if(v===true){
            this[vr]=1;
        }else if(v===false||v===null){
            this[vr]=0;
        }else if(is_array(v)&&v.length===0){
            this[vr]=0;
        }else if(typeof v==='object'){
            this[vr]=1;
        }
        break;
    case'string':
        if(v===null||v===false){
        this[vr]='';
    }else if(is_array(v)){
        this[vr]='Array';
    }else if(typeof v==='object'){
        this[vr]='Object';
    }else if(v===true){
        this[vr]='1';
    }else{
        this[vr]+='';
    }
    break;
    case'array':
        if(v===null){
        this[vr]=[];
    }else if(typeof v!=='object'){
        this[vr]=[v];
    }
    break;
    case'object':
        if(v===null){
        this[vr]={};

    }else if(is_array(v)){
        for(i=0,obj={};
            i<v.length;i++){
            obj[i]=v;
        }
        this[vr]=obj;
    }else if(typeof v!=='object'){
        this[vr]={
            scalar:v
        };

}
break;
case'null':
    delete this[vr];
    break;
}
return true;
}catch(e){
    return false;
}
}


function unserialize(data){
    var that=this;
    var utf8Overhead=function(chr){
        var code=chr.charCodeAt(0);
        if(code<0x0080){
            return 0;
        }
        if(code<0x0800){
            return 1;
        }
        return 2;
    };

    var error=function(type,msg,filename,line){
        throw new that.window[type](msg,filename,line);
    };

    var read_until=function(data,offset,stopchr){
        var buf=[];
        var chr=data.slice(offset,offset+1);
        var i=2;
        while(chr!=stopchr){
            if((i+offset)>data.length){
                error('Error','Invalid');
            }
            buf.push(chr);
            chr=data.slice(offset+(i-1),offset+i);
            i+=1;
        }
        return[buf.length,buf.join('')];
    };

    var read_chrs=function(data,offset,length){
        var buf;
        buf=[];
        for(var i=0;i<length;i++){
            var chr=data.slice(offset+(i-1),offset+i);
            buf.push(chr);
            length-=utf8Overhead(chr);
        }
        return[buf.length,buf.join('')];
    };

    var _unserialize=function(data,offset){
        var readdata;
        var readData;
        var chrs=0;
        var ccount;
        var stringlength;
        var keyandchrs;
        var keys;
        if(!offset){
            offset=0;
        }
        var dtype=(data.slice(offset,offset+1)).toLowerCase();
        var dataoffset=offset+2;
        var typeconvert=function(x){
            return x;
        };

        switch(dtype){
            case'i':
                typeconvert=function(x){
                return parseInt(x,10);
            };

            readData=read_until(data,dataoffset,';');
                chrs=readData[0];
                readdata=readData[1];
                dataoffset+=chrs+1;
                break;
            case'b':
                typeconvert=function(x){
                return parseInt(x,10)!==0;
            };

            readData=read_until(data,dataoffset,';');
                chrs=readData[0];
                readdata=readData[1];
                dataoffset+=chrs+1;
                break;
            case'd':
                typeconvert=function(x){
                return parseFloat(x);
            };

            readData=read_until(data,dataoffset,';');
                chrs=readData[0];
                readdata=readData[1];
                dataoffset+=chrs+1;
                break;
            case'n':
                readdata=null;
                break;
            case's':
                ccount=read_until(data,dataoffset,':');
                chrs=ccount[0];
                stringlength=ccount[1];
                dataoffset+=chrs+2;
                readData=read_chrs(data,dataoffset+1,parseInt(stringlength,10));
                chrs=readData[0];
                readdata=readData[1];
                dataoffset+=chrs+2;
                if(chrs!=parseInt(stringlength,10)&&chrs!=readdata.length){
                error('SyntaxError','String length mismatch');
            }
            readdata=that.utf8_decode(readdata);
                break;
            case'a':
                readdata={};

                keyandchrs=read_until(data,dataoffset,':');
                chrs=keyandchrs[0];
                keys=keyandchrs[1];
                dataoffset+=chrs+2;
                for(var i=0;i<parseInt(keys,10);i++){
                var kprops=_unserialize(data,dataoffset);
                var kchrs=kprops[1];
                var key=kprops[2];
                dataoffset+=kchrs;
                var vprops=_unserialize(data,dataoffset);
                var vchrs=vprops[1];
                var value=vprops[2];
                dataoffset+=vchrs;
                readdata[key]=value;
            }
            dataoffset+=1;
            break;
            default:
                error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
                break;
        }
        return[dtype,dataoffset-offset,typeconvert(readdata)];
    };

    return _unserialize((data+''),0)[2];
}


function var_dump(){
    var output='',pad_char=' ',pad_val=4,lgth=0,i=0,d=this.window.document;
    var _getFuncName=function(fn){
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if(!name){
            return'(Anonymous)';
        }
        return name[1];
    };

    var _repeat_char=function(len,pad_char){
        var str='';
        for(var i=0;i<len;i++){
            str+=pad_char;
        }
        return str;
    };

    var _getInnerVal=function(val,thick_pad){
        var ret='';
        if(val===null){
            ret='NULL';
        }else if(typeof val==='boolean'){
            ret='bool('+val+')';
        }else if(typeof val==='string'){
            ret='string('+val.length+') "'+val+'"';
        }else if(typeof val==='number'){
            if(parseFloat(val)==parseInt(val,10)){
                ret='int('+val+')';
            }else{
                ret='float('+val+')';
            }
        }else if(typeof val==='undefined'){
        ret='undefined';
    }else if(typeof val==='function'){
        var funcLines=val.toString().split('\n');
        ret='';
        for(var i=0,fll=funcLines.length;i<fll;i++){
            ret+=(i!==0?'\n'+thick_pad:'')+funcLines[i];
        }
        }else if(val instanceof Date){
    ret='Date('+val+')';
}else if(val instanceof RegExp){
    ret='RegExp('+val+')';
}else if(val.nodeName){
    switch(val.nodeType){
        case 1:
            if(typeof val.namespaceURI==='undefined'||val.namespaceURI==='http://www.w3.org/1999/xhtml'){
            ret='HTMLElement("'+val.nodeName+'")';
        }else{
            ret='XML Element("'+val.nodeName+'")';
        }
        break;
        case 2:
            ret='ATTRIBUTE_NODE('+val.nodeName+')';
            break;
        case 3:
            ret='TEXT_NODE('+val.nodeValue+')';
            break;
        case 4:
            ret='CDATA_SECTION_NODE('+val.nodeValue+')';
            break;
        case 5:
            ret='ENTITY_REFERENCE_NODE';
            break;
        case 6:
            ret='ENTITY_NODE';
            break;
        case 7:
            ret='PROCESSING_INSTRUCTION_NODE('+val.nodeName+':'+val.nodeValue+')';
            break;
        case 8:
            ret='COMMENT_NODE('+val.nodeValue+')';
            break;
        case 9:
            ret='DOCUMENT_NODE';
            break;
        case 10:
            ret='DOCUMENT_TYPE_NODE';
            break;
        case 11:
            ret='DOCUMENT_FRAGMENT_NODE';
            break;
        case 12:
            ret='NOTATION_NODE';
            break;
    }
}
return ret;
};

var _formatArray=function(obj,cur_depth,pad_val,pad_char){
    var someProp='';
    if(cur_depth>0){
        cur_depth++;
    }
    var base_pad=_repeat_char(pad_val*(cur_depth-1),pad_char);
    var thick_pad=_repeat_char(pad_val*(cur_depth+1),pad_char);
    var str='';
    var val='';
    if(typeof obj==='object'&&obj!==null){
        if(obj.constructor&&_getFuncName(obj.constructor)==='PHPJS_Resource'){
            return obj.var_dump();
        }
        lgth=0;
        for(someProp in obj){
            lgth++;
        }
        str+='array('+lgth+') {\n';
        for(var key in obj){
            var objVal=obj[key];
            if(typeof objVal==='object'&&objVal!==null&&!(objVal instanceof Date)&&!(objVal instanceof RegExp)&&!objVal.nodeName){
                str+=thick_pad+'['+key+'] =>\n'+thick_pad+_formatArray(objVal,cur_depth+1,pad_val,pad_char);
            }else{
                val=_getInnerVal(objVal,thick_pad);
                str+=thick_pad+'['+key+'] =>\n'+thick_pad+val+'\n';
            }
        }
        str+=base_pad+'}\n';
}else{
    str=_getInnerVal(obj,thick_pad);
}
return str;
};

output=_formatArray(arguments[0],0,pad_val,pad_char);
for(i=1;i<arguments.length;i++){
    output+='\n'+_formatArray(arguments[i],0,pad_val,pad_char);
}
if(d.body){
    this.echo(output);
}else{
    try{
        d=XULDocument;
        this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">'+output+'</pre>');
    }catch(e){
        this.echo(output);
    }
}
}

function var_export(mixed_expression,bool_return){
    var retstr='',iret='',cnt=0,x=[],i=0,funcParts=[],idtLevel=arguments[2]||2,innerIndent='',outerIndent='';
    var getFuncName=function(fn){
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if(!name){
            return'(Anonymous)';
        }
        return name[1];
    };

    var _makeIndent=function(idtLevel){
        return(new Array(idtLevel+1)).join(' ');
    };

    var __getType=function(inp){
        var i=0;
        var match,type=typeof inp;
        if(type==='object'&&inp.constructor&&getFuncName(inp.constructor)==='PHPJS_Resource'){
            return'resource';
        }
        if(type==='function'){
            return'function';
        }
        if(type==='object'&&!inp){
            return'null';
        }
        if(type==="object"){
            if(!inp.constructor){
                return'object';
            }
            var cons=inp.constructor.toString();
            match=cons.match(/(\w+)\(/);
            if(match){
                cons=match[1].toLowerCase();
            }
            var types=["boolean","number","string","array"];
            for(i=0;i<types.length;i++){
                if(cons===types[i]){
                    type=types[i];
                    break;
                }
            }
            }
        return type;
};

var type=__getType(mixed_expression);
if(type===null){
    retstr="NULL";
}else if(type==='array'||type==='object'){
    outerIndent=_makeIndent(idtLevel-2);
    innerIndent=_makeIndent(idtLevel);
    for(i in mixed_expression){
        var value=this.var_export(mixed_expression[i],true,idtLevel+2);
        value=typeof value==='string'?value.replace(/</g,'&lt;').replace(/>/g,'&gt;'):value;
        x[cnt++]=innerIndent+i+' => '+(__getType(mixed_expression[i])==='array'?'\n':'')+value;
    }
    iret=x.join(',\n');
    retstr=outerIndent+"array (\n"+iret+'\n'+outerIndent+')';
}else if(type==='function'){
    funcParts=mixed_expression.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/);
    retstr="create_function ('"+funcParts[1]+"', '"+funcParts[2].replace(new RegExp("'",'g'),"\\'")+"')";
}else if(type==='resource'){
    retstr='NULL';
}else{
    retstr=(typeof(mixed_expression)!=='string')?mixed_expression:"'"+mixed_expression.replace(/(["'])/g,"\\$1").replace(/\0/g,"\\0")+"'";
}
if(bool_return!==true){
    this.echo(retstr);
    return null;
}else{
    return retstr;
}
}