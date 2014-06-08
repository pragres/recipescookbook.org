function addslashes(str){
    return(str+'').replace(/[\\"']/g,'\\$&').replace(/\u0000/g,'\\0');
}

function chop(str,charlist){
    return this.rtrim(str,charlist);
}

function chr(codePt){
    if(codePt>0xFFFF){
        codePt-=0x10000;
        return String.fromCharCode(0xD800+(codePt>>10),0xDC00+(codePt&0x3FF));
    }else{
        return String.fromCharCode(codePt);
    }
}
function chunk_split(body,chunklen,end){
    chunklen=parseInt(chunklen,10)||76;
    end=end||'\r\n';
    if(chunklen<1){
        return false;
    }
    return body.match(new RegExp(".{0,"+chunklen+"}","g")).join(end);
}

function count_chars(str,mode){
    var result={},resultArr=[],i;
    str=(''+str).split('').sort().join('').match(/(.)\1*/g);
    if((mode&1)==0){
        for(i=0;i!=256;i++){
            result[i]=0;
        }
        }
        if(mode===2||mode===4){
    for(i=0;i!=str.length;i+=1){
        delete result[str[i].charCodeAt(0)];
    }
    for(i in result){
        result[i]=(mode===4)?String.fromCharCode(i):0;
    }
    }else if(mode===3){
    for(i=0;i!=str.length;i+=1){
        result[i]=str[i].slice(0,1);
    }
    }else{
    for(i=0;i!=str.length;i+=1){
        result[str[i].charCodeAt(0)]=str[i].length;
    }
    }
    if(mode<3){
    return result;
}
for(i in result){
    resultArr.push(result[i]);
}
return resultArr.join('');
}

function explode(delimiter,string,limit){
    var emptyArray={
        0:''
    };

    if(arguments.length<2||typeof arguments[0]=='undefined'||typeof arguments[1]=='undefined'){
        return null;
    }
    if(delimiter===''||delimiter===false||delimiter===null){
        return false;
    }
    if(typeof delimiter=='function'||typeof delimiter=='object'||typeof string=='function'||typeof string=='object'){
        return emptyArray;
    }
    if(delimiter===true){
        delimiter='1';
    }
    if(!limit){
        return string.toString().split(delimiter.toString());
    }else{
        var splitted=string.toString().split(delimiter.toString());
        var partA=splitted.splice(0,limit-1);
        var partB=splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;
    }
}

function implode(glue,pieces){
    var i='',retVal='',tGlue='';
    if(arguments.length===1){
        pieces=glue;
        glue='';
    }
    if(typeof(pieces)==='object'){
        if(pieces instanceof Array){
            return pieces.join(glue);
        }else{
            for(i in pieces){
                retVal+=tGlue+pieces[i];
                tGlue=glue;
            }
            return retVal;
        }
    }else{
    return pieces;
}
}

function ltrim(str,charlist){
    charlist=!charlist?' \\s\u00A0':(charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1');
    var re=new RegExp('^['+charlist+']+','g');
    return(str+'').replace(re,'');
}

function number_format(number,decimals,dec_point,thousands_sep){
    var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math.abs(decimals),sep=(typeof thousands_sep==='undefined')?',':thousands_sep,dec=(typeof dec_point==='undefined')?'.':dec_point,s='',toFixedFix=function(n,prec){
        var k=Math.pow(10,prec);
        return''+Math.round(n*k)/k;
    };

    s=(prec?toFixedFix(n,prec):''+Math.round(n)).split('.');
    if(s[0].length>3){
        s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep);
    }
    if((s[1]||'').length<prec){
        s[1]=s[1]||'';
        s[1]+=new Array(prec-s[1].length+1).join('0');
    }
    return s.join(dec);
}

function ord(string){
    var str=string+'';
    var code=str.charCodeAt(0);
    if(0xD800<=code&&code<=0xDBFF){
        var hi=code;
        if(str.length===1){
            return code;
        }
        var low=str.charCodeAt(1);
        if(!low){}
        return((hi-0xD800)*0x400)+(low-0xDC00)+0x10000;
    }
    if(0xDC00<=code&&code<=0xDFFF){
        return code;
    }
    return code;
}


function parse_str(str,array){
    var glue1='=',glue2='&',array2=String(str).replace(/^&(.*)$/,'$1').replace(/^(.*)&$/,'$1').split(glue2),i,j,chr,tmp,key,value,bracket,keys,evalStr,that=this,fixStr=function(str){
        return that.urldecode(str).replace(/([\\"'])/g,'\\$1').replace(/\n/g,'\\n').replace(/\r/g,'\\r');
    };

    if(!array){
        array=this.window;
    }
    for(i=0;i<array2.length;i++){
        tmp=array2[i].split(glue1);
        if(tmp.length<2){
            tmp=[tmp,''];
        }
        key=fixStr(tmp[0]);
        value=fixStr(tmp[1]);
        while(key.charAt(0)===' '){
            key=key.substr(1);
        }
        if(key.indexOf('\0')!==-1){
            key=key.substr(0,key.indexOf('\0'));
        }
        if(key&&key.charAt(0)!=='['){
            keys=[];
            bracket=0;
            for(j=0;j<key.length;j++){
                if(key.charAt(j)==='['&&!bracket){
                    bracket=j+1;
                }else if(key.charAt(j)===']'){
                    if(bracket){
                        if(!keys.length){
                            keys.push(key.substr(0,bracket-1));
                        }
                        keys.push(key.substr(bracket,j-bracket));
                        bracket=0;
                        if(key.charAt(j+1)!=='['){
                            break;
                        }
                    }
                }
            }
        if(!keys.length){
        keys=[key];
    }
    for(j=0;j<keys[0].length;j++){
        chr=keys[0].charAt(j);
        if(chr===' '||chr==='.'||chr==='['){
            keys[0]=keys[0].substr(0,j)+'_'+keys[0].substr(j+1);
        }
        if(chr==='['){
            break;
        }
    }
    evalStr='array';
for(j=0;j<keys.length;j++){
    key=keys[j];
    if((key!==''&&key!==' ')||j===0){
        key="'"+key+"'";
    }else{
        key=eval(evalStr+'.push([]);')-1;
    }
    evalStr+='['+key+']';
    if(j!==keys.length-1&&eval('typeof '+evalStr)==='undefined'){
        eval(evalStr+' = [];');
    }
}
evalStr+=" = '"+value+"';\n";
eval(evalStr);
}
}
}


function crc32(str){
    str=this.utf8_encode(str);
    var table="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    var crc=0;
    var x=0;
    var y=0;
    crc=crc^(-1);
    for(var i=0,iTop=str.length;i<iTop;i++){
        y=(crc^str.charCodeAt(i))&0xFF;
        x="0x"+table.substr(y*9,8);
        crc=(crc>>>8)^x;
    }
    return crc^(-1);
}

function echo(){
    var arg='',argc=arguments.length,argv=arguments,i=0;
    var win=this.window;
    var d=win.document;
    var ns_xhtml='http://www.w3.org/1999/xhtml';
    var ns_xul='http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';
    var holder;
    var stringToDOM=function(str,parent,ns,container){
        var extraNSs='';
        if(ns===ns_xul){
            extraNSs=' xmlns:html="'+ns_xhtml+'"';
        }
        var stringContainer='<'+container+' xmlns="'+ns+'"'+extraNSs+'>'+str+'</'+container+'>';
        if(win.DOMImplementationLS&&win.DOMImplementationLS.createLSInput&&win.DOMImplementationLS.createLSParser){
            var lsInput=DOMImplementationLS.createLSInput();
            lsInput.stringData=stringContainer;
            var lsParser=DOMImplementationLS.createLSParser(1,null);
            return lsParser.parse(lsInput).firstChild;
        }else if(win.DOMParser){
            try{
                var fc=new DOMParser().parseFromString(stringContainer,'text/xml');
                if(!fc||!fc.documentElement||fc.documentElement.localName!=='parsererror'||fc.documentElement.namespaceURI!=='http://www.mozilla.org/newlayout/xml/parsererror.xml'){
                    return fc.documentElement.firstChild;
                }
            }catch(e){}
    }else if(win.ActiveXObject){
    var axo=new ActiveXObject('MSXML2.DOMDocument');
    axo.loadXML(str);
    return axo.documentElement;
}
if(d.createElementNS&&(d.documentElement.namespaceURI||d.documentElement.nodeName.toLowerCase()!=='html'||(d.contentType&&d.contentType!=='text/html'))){
    holder=d.createElementNS(ns,container);
}else{
    holder=d.createElement(container);
}
holder.innerHTML=str;
while(holder.firstChild){
    parent.appendChild(holder.firstChild);
}
return false;
};

var ieFix=function(node){
    if(node.nodeType===1){
        var newNode=d.createElement(node.nodeName);
        var i,len;
        if(node.attributes&&node.attributes.length>0){
            for(i=0,len=node.attributes.length;i<len;i++){
                newNode.setAttribute(node.attributes[i].nodeName,node.getAttribute(node.attributes[i].nodeName));
            }
            }
            if(node.childNodes&&node.childNodes.length>0){
        for(i=0,len=node.childNodes.length;i<len;i++){
            newNode.appendChild(ieFix(node.childNodes[i]));
        }
        }
        return newNode;
}else{
    return d.createTextNode(node.nodeValue);
}
};

for(i=0;i<argc;i++){
    arg=argv[i];
    if(this.php_js&&this.php_js.ini&&this.php_js.ini['phpjs.echo_embedded_vars']){
        arg=arg.replace(/(.?)\{\$(.*?)\}/g,function(s,m1,m2){
            if(m1!=='\\'){
                return m1+eval(m2);
            }else{
                return s;
            }
        });
}
if(d.appendChild){
    if(d.body){
        if(win.navigator.appName=='Microsoft Internet Explorer'){
            d.body.appendChild(stringToDOM(ieFix(arg)));
        }else{
            var unappendedLeft=stringToDOM(arg,d.body,ns_xhtml,'div').cloneNode(true);
            if(unappendedLeft){
                d.body.appendChild(unappendedLeft);
            }
        }
    }else{
    d.documentElement.appendChild(stringToDOM(arg,d.documentElement,ns_xul,'description'));
}
}else if(d.write){
    d.write(arg);
}
}
}

function get_html_translation_table(table,quote_style){
    var entities={},hash_map={},decimal=0,symbol='';
    var constMappingTable={},constMappingQuoteStyle={};

    var useTable={},useQuoteStyle={};

    constMappingTable[0]='HTML_SPECIALCHARS';
    constMappingTable[1]='HTML_ENTITIES';
    constMappingQuoteStyle[0]='ENT_NOQUOTES';
    constMappingQuoteStyle[2]='ENT_COMPAT';
    constMappingQuoteStyle[3]='ENT_QUOTES';
    useTable=!isNaN(table)?constMappingTable[table]:table?table.toUpperCase():'HTML_SPECIALCHARS';
    useQuoteStyle=!isNaN(quote_style)?constMappingQuoteStyle[quote_style]:quote_style?quote_style.toUpperCase():'ENT_COMPAT';
    if(useTable!=='HTML_SPECIALCHARS'&&useTable!=='HTML_ENTITIES'){
        throw new Error("Table: "+useTable+' not supported');
    }
    entities['38']='&amp;';
    if(useTable==='HTML_ENTITIES'){
        entities['160']='&nbsp;';
        entities['161']='&iexcl;';
        entities['162']='&cent;';
        entities['163']='&pound;';
        entities['164']='&curren;';
        entities['165']='&yen;';
        entities['166']='&brvbar;';
        entities['167']='&sect;';
        entities['168']='&uml;';
        entities['169']='&copy;';
        entities['170']='&ordf;';
        entities['171']='&laquo;';
        entities['172']='&not;';
        entities['173']='&shy;';
        entities['174']='&reg;';
        entities['175']='&macr;';
        entities['176']='&deg;';
        entities['177']='&plusmn;';
        entities['178']='&sup2;';
        entities['179']='&sup3;';
        entities['180']='&acute;';
        entities['181']='&micro;';
        entities['182']='&para;';
        entities['183']='&middot;';
        entities['184']='&cedil;';
        entities['185']='&sup1;';
        entities['186']='&ordm;';
        entities['187']='&raquo;';
        entities['188']='&frac14;';
        entities['189']='&frac12;';
        entities['190']='&frac34;';
        entities['191']='&iquest;';
        entities['192']='&Agrave;';
        entities['193']='&Aacute;';
        entities['194']='&Acirc;';
        entities['195']='&Atilde;';
        entities['196']='&Auml;';
        entities['197']='&Aring;';
        entities['198']='&AElig;';
        entities['199']='&Ccedil;';
        entities['200']='&Egrave;';
        entities['201']='&Eacute;';
        entities['202']='&Ecirc;';
        entities['203']='&Euml;';
        entities['204']='&Igrave;';
        entities['205']='&Iacute;';
        entities['206']='&Icirc;';
        entities['207']='&Iuml;';
        entities['208']='&ETH;';
        entities['209']='&Ntilde;';
        entities['210']='&Ograve;';
        entities['211']='&Oacute;';
        entities['212']='&Ocirc;';
        entities['213']='&Otilde;';
        entities['214']='&Ouml;';
        entities['215']='&times;';
        entities['216']='&Oslash;';
        entities['217']='&Ugrave;';
        entities['218']='&Uacute;';
        entities['219']='&Ucirc;';
        entities['220']='&Uuml;';
        entities['221']='&Yacute;';
        entities['222']='&THORN;';
        entities['223']='&szlig;';
        entities['224']='&agrave;';
        entities['225']='&aacute;';
        entities['226']='&acirc;';
        entities['227']='&atilde;';
        entities['228']='&auml;';
        entities['229']='&aring;';
        entities['230']='&aelig;';
        entities['231']='&ccedil;';
        entities['232']='&egrave;';
        entities['233']='&eacute;';
        entities['234']='&ecirc;';
        entities['235']='&euml;';
        entities['236']='&igrave;';
        entities['237']='&iacute;';
        entities['238']='&icirc;';
        entities['239']='&iuml;';
        entities['240']='&eth;';
        entities['241']='&ntilde;';
        entities['242']='&ograve;';
        entities['243']='&oacute;';
        entities['244']='&ocirc;';
        entities['245']='&otilde;';
        entities['246']='&ouml;';
        entities['247']='&divide;';
        entities['248']='&oslash;';
        entities['249']='&ugrave;';
        entities['250']='&uacute;';
        entities['251']='&ucirc;';
        entities['252']='&uuml;';
        entities['253']='&yacute;';
        entities['254']='&thorn;';
        entities['255']='&yuml;';
    }
    if(useQuoteStyle!=='ENT_NOQUOTES'){
        entities['34']='&quot;';
    }
    if(useQuoteStyle==='ENT_QUOTES'){
        entities['39']='&#39;';
    }
    entities['60']='&lt;';
    entities['62']='&gt;';
    for(decimal in entities){
        symbol=String.fromCharCode(decimal);
        hash_map[symbol]=entities[decimal];
    }
    return hash_map;
}

function html_entity_decode(string,quote_style){
    var hash_map={},symbol='',tmp_str='',entity='';
    tmp_str=string.toString();
    if(false===(hash_map=this.get_html_translation_table('HTML_ENTITIES',quote_style))){
        return false;
    }
    delete(hash_map['&']);
    hash_map['&']='&amp;';
    for(symbol in hash_map){
        entity=hash_map[symbol];
        tmp_str=tmp_str.split(entity).join(symbol);
    }
    tmp_str=tmp_str.split('&#039;').join("'");
    return tmp_str;
}
function htmlentities(string,quote_style){
    var hash_map={},symbol='',tmp_str='',entity='';
    tmp_str=string.toString();
    if(false===(hash_map=this.get_html_translation_table('HTML_ENTITIES',quote_style))){
        return false;
    }
    hash_map["'"]='&#039;';
    for(symbol in hash_map){
        entity=hash_map[symbol];
        tmp_str=tmp_str.split(symbol).join(entity);
    }
    return tmp_str;
}
function htmlspecialchars(string,quote_style,charset,double_encode){
    var optTemp=0,i=0,noquotes=false;
    if(typeof quote_style==='undefined'||quote_style===null){
        quote_style=2;
    }
    string=string.toString();
    if(double_encode!==false){
        string=string.replace(/&/g,'&amp;');
    }
    string=string.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var OPTS={
        'ENT_NOQUOTES':0,
        'ENT_HTML_QUOTE_SINGLE':1,
        'ENT_HTML_QUOTE_DOUBLE':2,
        'ENT_COMPAT':2,
        'ENT_QUOTES':3,
        'ENT_IGNORE':4
    };

    if(quote_style===0){
        noquotes=true;
    }
    if(typeof quote_style!=='number'){
        quote_style=[].concat(quote_style);
        for(i=0;i<quote_style.length;i++){
            if(OPTS[quote_style[i]]===0){
                noquotes=true;
            }else if(OPTS[quote_style[i]]){
                optTemp=optTemp|OPTS[quote_style[i]];
            }
        }
        quote_style=optTemp;
}
if(quote_style&OPTS.ENT_HTML_QUOTE_SINGLE){
    string=string.replace(/'/g,'&#039;');
}
if(!noquotes){
    string=string.replace(/"/g,'&quot;');
}
return string;
}
function htmlspecialchars_decode(string,quote_style){
    var optTemp=0,i=0,noquotes=false;
    if(typeof quote_style==='undefined'){
        quote_style=2;
    }
    string=string.toString().replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    var OPTS={
        'ENT_NOQUOTES':0,
        'ENT_HTML_QUOTE_SINGLE':1,
        'ENT_HTML_QUOTE_DOUBLE':2,
        'ENT_COMPAT':2,
        'ENT_QUOTES':3,
        'ENT_IGNORE':4
    };

    if(quote_style===0){
        noquotes=true;
    }
    if(typeof quote_style!=='number'){
        quote_style=[].concat(quote_style);
        for(i=0;i<quote_style.length;i++){
            if(OPTS[quote_style[i]]===0){
                noquotes=true;
            }else if(OPTS[quote_style[i]]){
                optTemp=optTemp|OPTS[quote_style[i]];
            }
        }
        quote_style=optTemp;
}
if(quote_style&OPTS.ENT_HTML_QUOTE_SINGLE){
    string=string.replace(/&#0*39;/g,"'");
}
if(!noquotes){
    string=string.replace(/&quot;/g,'"');
}
string=string.replace(/&amp;/g,'&');
return string;
}

function nl2br(str,is_xhtml){
    var breakTag=(is_xhtml||typeof is_xhtml==='undefined')?'<br />':'<br>';
    return(str+'').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,'$1'+breakTag+'$2');
}

function join(glue,pieces){
    return this.implode(glue,pieces);
}

function lcfirst(str){
    str+='';
    var f=str.charAt(0).toLowerCase();
    return f+str.substr(1);
}

function levenshtein(s1,s2){
    if(s1==s2){
        return 0;
    }
    var s1_len=s1.length;
    var s2_len=s2.length;
    if(s1_len===0){
        return s2_len;
    }
    if(s2_len===0){
        return s1_len;
    }
    var split=false;
    try{
        split=!('0')[0];
    }catch(e){
        split=true;
    }
    if(split){
        s1=s1.split('');
        s2=s2.split('');
    }
    var v0=new Array(s1_len+1);
    var v1=new Array(s1_len+1);
    var s1_idx=0,s2_idx=0,cost=0;
    for(s1_idx=0;s1_idx<s1_len+1;s1_idx++){
        v0[s1_idx]=s1_idx;
    }
    var char_s1='',char_s2='';
    for(s2_idx=1;s2_idx<=s2_len;s2_idx++){
        v1[0]=s2_idx;
        char_s2=s2[s2_idx-1];
        for(s1_idx=0;s1_idx<s1_len;s1_idx++){
            char_s1=s1[s1_idx];
            cost=(char_s1==char_s2)?0:1;
            var m_min=v0[s1_idx+1]+1;
            var b=v1[s1_idx]+1;
            var c=v0[s1_idx]+cost;
            if(b<m_min){
                m_min=b;
            }
            if(c<m_min){
                m_min=c;
            }
            v1[s1_idx+1]=m_min;
        }
        var v_tmp=v0;
        v0=v1;
        v1=v_tmp;
    }
    return v0[s1_len];
}

function printf(){
    var body,elmt,d=this.window.document;
    var ret='';
    var HTMLNS='http://www.w3.org/1999/xhtml';
    body=d.getElementsByTagNameNS?(d.getElementsByTagNameNS(HTMLNS,'body')[0]?d.getElementsByTagNameNS(HTMLNS,'body')[0]:d.documentElement.lastChild):d.getElementsByTagName('body')[0];
    if(!body){
        return false;
    }
    ret=this.sprintf.apply(this,arguments);
    elmt=d.createTextNode(ret);
    body.appendChild(elmt);
    return ret.length;
}

function quotemeta(str){
    return(str+'').replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g,'\\$1');
}

function rtrim(str,charlist){
    charlist=!charlist?' \\s\u00A0':(charlist+'').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'\\$1');
    var re=new RegExp('['+charlist+']+$','g');
    return(str+'').replace(re,'');
}


function sha1(str){
    var rotate_left=function(n,s){
        var t4=(n<<s)|(n>>>(32-s));
        return t4;
    };

    var cvt_hex=function(val){
        var str="";
        var i;
        var v;
        for(i=7;i>=0;i--){
            v=(val>>>(i*4))&0x0f;
            str+=v.toString(16);
        }
        return str;
    };

    var blockstart;
    var i,j;
    var W=new Array(80);
    var H0=0x67452301;
    var H1=0xEFCDAB89;
    var H2=0x98BADCFE;
    var H3=0x10325476;
    var H4=0xC3D2E1F0;
    var A,B,C,D,E;
    var temp;
    str=this.utf8_encode(str);
    var str_len=str.length;
    var word_array=[];
    for(i=0;i<str_len-3;i+=4){
        j=str.charCodeAt(i)<<24|str.charCodeAt(i+1)<<16|str.charCodeAt(i+2)<<8|str.charCodeAt(i+3);
        word_array.push(j);
    }
    switch(str_len%4){
        case 0:
            i=0x080000000;
            break;
        case 1:
            i=str.charCodeAt(str_len-1)<<24|0x0800000;
            break;
        case 2:
            i=str.charCodeAt(str_len-2)<<24|str.charCodeAt(str_len-1)<<16|0x08000;
            break;
        case 3:
            i=str.charCodeAt(str_len-3)<<24|str.charCodeAt(str_len-2)<<16|str.charCodeAt(str_len-1)<<8|0x80;
            break;
    }
    word_array.push(i);
    while((word_array.length%16)!=14){
        word_array.push(0);
    }
    word_array.push(str_len>>>29);
    word_array.push((str_len<<3)&0x0ffffffff);
    for(blockstart=0;blockstart<word_array.length;blockstart+=16){
        for(i=0;i<16;i++){
            W[i]=word_array[blockstart+i];
        }
        for(i=16;i<=79;i++){
            W[i]=rotate_left(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
        }
        A=H0;
        B=H1;
        C=H2;
        D=H3;
        E=H4;
        for(i=0;i<=19;i++){
            temp=(rotate_left(A,5)+((B&C)|(~B&D))+E+W[i]+0x5A827999)&0x0ffffffff;
            E=D;
            D=C;
            C=rotate_left(B,30);
            B=A;
            A=temp;
        }
        for(i=20;i<=39;i++){
            temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&0x0ffffffff;
            E=D;
            D=C;
            C=rotate_left(B,30);
            B=A;
            A=temp;
        }
        for(i=40;i<=59;i++){
            temp=(rotate_left(A,5)+((B&C)|(B&D)|(C&D))+E+W[i]+0x8F1BBCDC)&0x0ffffffff;
            E=D;
            D=C;
            C=rotate_left(B,30);
            B=A;
            A=temp;
        }
        for(i=60;i<=79;i++){
            temp=(rotate_left(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&0x0ffffffff;
            E=D;
            D=C;
            C=rotate_left(B,30);
            B=A;
            A=temp;
        }
        H0=(H0+A)&0x0ffffffff;
        H1=(H1+B)&0x0ffffffff;
        H2=(H2+C)&0x0ffffffff;
        H3=(H3+D)&0x0ffffffff;
        H4=(H4+E)&0x0ffffffff;
    }
    temp=cvt_hex(H0)+cvt_hex(H1)+cvt_hex(H2)+cvt_hex(H3)+cvt_hex(H4);
    return temp.toLowerCase();
}

function soundex(str){
    var upStr=(str+'').toUpperCase();
    var sdx=[upStr[0],0,0,0],m={
        BFPV:1,
        CGJKQSXZ:2,
        DT:3,
        L:4,
        MN:5,
        R:6
    },k=['BFPV','CGJKQSXZ','DT','L','MN','R'],i=1,j=0,s=0,key,code,l=upStr.length;
    for(;i<l;i++){
        j=k.length;
        while(s!=3&&j--){
            key=k[j];
            if(key.indexOf(upStr[i])!==-1){
                code=m[key];
                if(code!=sdx[s]){
                    sdx[++s]=code;
                }
            }
        }
    }
return sdx.join('');
}


function sprintf(){
    var regex=/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a=arguments,i=0,format=a[i++];
    var pad=function(str,len,chr,leftJustify){
        if(!chr){
            chr=' ';
        }
        var padding=(str.length>=len)?'':Array(1+len-str.length>>>0).join(chr);
        return leftJustify?str+padding:padding+str;
    };

    var justify=function(value,prefix,leftJustify,minWidth,zeroPad,customPadChar){
        var diff=minWidth-value.length;
        if(diff>0){
            if(leftJustify||!zeroPad){
                value=pad(value,minWidth,customPadChar,leftJustify);
            }else{
                value=value.slice(0,prefix.length)+pad('',diff,'0',true)+value.slice(prefix.length);
            }
        }
        return value;
};

var formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){
    var number=value>>>0;
    prefix=prefix&&number&&{
        '2':'0b',
        '8':'0',
        '16':'0x'
    }
    [base]||'';
    value=prefix+pad(number.toString(base),precision||0,'0',false);
    return justify(value,prefix,leftJustify,minWidth,zeroPad);
};

var formatString=function(value,leftJustify,minWidth,precision,zeroPad,customPadChar){
    if(precision!=null){
        value=value.slice(0,precision);
    }
    return justify(value,'',leftJustify,minWidth,zeroPad,customPadChar);
};

var doFormat=function(substring,valueIndex,flags,minWidth,_,precision,type){
    var number;
    var prefix;
    var method;
    var textTransform;
    var value;
    if(substring=='%%'){
        return'%';
    }
    var leftJustify=false,positivePrefix='',zeroPad=false,prefixBaseX=false,customPadChar=' ';
    var flagsl=flags.length;
    for(var j=0;flags&&j<flagsl;j++){
        switch(flags.charAt(j)){
            case' ':
                positivePrefix=' ';
                break;
            case'+':
                positivePrefix='+';
                break;
            case'-':
                leftJustify=true;
                break;
            case"'":
                customPadChar=flags.charAt(j+1);
                break;
            case'0':
                zeroPad=true;
                break;
            case'#':
                prefixBaseX=true;
                break;
        }
    }
    if(!minWidth){
    minWidth=0;
}else if(minWidth=='*'){
    minWidth=+a[i++];
}else if(minWidth.charAt(0)=='*'){
    minWidth=+a[minWidth.slice(1,-1)];
}else{
    minWidth=+minWidth;
}
if(minWidth<0){
    minWidth=-minWidth;
    leftJustify=true;
}
if(!isFinite(minWidth)){
    throw new Error('sprintf: (minimum-)width must be finite');
}
if(!precision){
    precision='fFeE'.indexOf(type)>-1?6:(type=='d')?0:undefined;
}else if(precision=='*'){
    precision=+a[i++];
}else if(precision.charAt(0)=='*'){
    precision=+a[precision.slice(1,-1)];
}else{
    precision=+precision;
}
value=valueIndex?a[valueIndex.slice(0,-1)]:a[i++];
switch(type){
    case's':
        return formatString(String(value),leftJustify,minWidth,precision,zeroPad,customPadChar);
    case'c':
        return formatString(String.fromCharCode(+value),leftJustify,minWidth,precision,zeroPad);
    case'b':
        return formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);
    case'o':
        return formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);
    case'x':
        return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);
    case'X':
        return formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad).toUpperCase();
    case'u':
        return formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);
    case'i':case'd':
        number=parseInt(+value,10);
        prefix=number<0?'-':positivePrefix;
        value=prefix+pad(String(Math.abs(number)),precision,'0',false);
        return justify(value,prefix,leftJustify,minWidth,zeroPad);
    case'e':case'E':case'f':case'F':case'g':case'G':
        number=+value;
        prefix=number<0?'-':positivePrefix;
        method=['toExponential','toFixed','toPrecision']['efg'.indexOf(type.toLowerCase())];
        textTransform=['toString','toUpperCase']['eEfFgG'.indexOf(type)%2];
        value=prefix+Math.abs(number)[method](precision);
        return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]();
    default:
        return substring;
}
};

return format.replace(regex,doFormat);
}

function str_getcsv(input,delimiter,enclosure,escape){
    var output=[];
    var backwards=function(str){
        return str.split('').reverse().join('');
    };

    var pq=function(str){
        return(str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,"\\$1");
    };

    delimiter=delimiter||',';
    enclosure=enclosure||'"';
    escape=escape||'\\';
    input=input.replace(new RegExp('^\\s*'+pq(enclosure)),'').replace(new RegExp(pq(enclosure)+'\\s*$'),'');
    input=backwards(input).split(new RegExp(pq(enclosure)+'\\s*'+pq(delimiter)+'\\s*'+pq(enclosure)+'(?!'+pq(escape)+')','g')).reverse();
    for(var i=0;i<input.length;i++){
        output.push(backwards(input[i]).replace(new RegExp(pq(escape)+pq(enclosure),'g'),enclosure));
    }
    return output;
}
function str_ireplace(search,replace,subject){
    var i,k='';
    var searchl=0;
    var reg;
    var escapeRegex=function(s){
        return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g,'\\$1');
    };

    search+='';
    searchl=search.length;
    if(!(replace instanceof Array)){
        replace=[replace];
        if(search instanceof Array){
            while(searchl>replace.length){
                replace[replace.length]=replace[0];
            }
        }
    }
if(!(search instanceof Array)){
    search=[search];
}while(search.length>replace.length){
    replace[replace.length]='';
}
if(subject instanceof Array){
    for(k in subject){
        if(subject.hasOwnProperty(k)){
            subject[k]=str_ireplace(search,replace,subject[k]);
        }
    }
    return subject;
}
searchl=search.length;
for(i=0;i<searchl;i++){
    reg=new RegExp(escapeRegex(search[i]),'gi');
    subject=subject.replace(reg,replace[i]);
}
return subject;
}
function str_pad(input,pad_length,pad_string,pad_type){
    var half='',pad_to_go;
    var str_pad_repeater=function(s,len){
        var collect='',i;
        while(collect.length<len){
            collect+=s;
        }
        collect=collect.substr(0,len);
        return collect;
    };

    input+='';
    pad_string=pad_string!==undefined?pad_string:' ';
    if(pad_type!='STR_PAD_LEFT'&&pad_type!='STR_PAD_RIGHT'&&pad_type!='STR_PAD_BOTH'){
        pad_type='STR_PAD_RIGHT';
    }
    if((pad_to_go=pad_length-input.length)>0){
        if(pad_type=='STR_PAD_LEFT'){
            input=str_pad_repeater(pad_string,pad_to_go)+input;
        }else if(pad_type=='STR_PAD_RIGHT'){
            input=input+str_pad_repeater(pad_string,pad_to_go);
        }else if(pad_type=='STR_PAD_BOTH'){
            half=str_pad_repeater(pad_string,Math.ceil(pad_to_go/2));
            input=half+input+half;
            input=input.substr(0,pad_length);
        }
    }
    return input;
}
function str_repeat(input,multiplier){
    return new Array(multiplier+1).join(input);
}
function str_replace(search,replace,subject,count){
    var i=0,j=0,temp='',repl='',sl=0,fl=0,f=[].concat(search),r=[].concat(replace),s=subject,ra=r instanceof Array,sa=s instanceof Array;
    s=[].concat(s);
    if(count){
        this.window[count]=0;
    }
    for(i=0,sl=s.length;i<sl;i++){
        if(s[i]===''){
            continue;
        }
        for(j=0,fl=f.length;j<fl;j++){
            temp=s[i]+'';
            repl=ra?(r[j]!==undefined?r[j]:''):r[0];
            s[i]=(temp).split(f[j]).join(repl);
            if(count&&s[i]!==temp){
                this.window[count]+=(temp.length-s[i].length)/f[j].length;
            }
        }
        }
    return sa?s:s[0];
}
function str_rot13(str){
    return(str+'').replace(/[a-z]/gi,function(s){
        return String.fromCharCode(s.charCodeAt(0)+(s.toLowerCase()<'n'?13:-13));
    });
}
function str_shuffle(str){
    if(str==undefined){
        throw'Wrong parameter count for str_shuffle()';
    }
    var getRandomInt=function(max){
        return Math.floor(Math.random()*(max+1));
    };

    var newStr='',rand=0;
    while(str.length){
        rand=getRandomInt(str.length-1);
        newStr+=str.charAt(rand);
        str=str.substring(0,rand)+str.substr(rand+1);
    }
    return newStr;
}
function str_split(string,split_length){
    if(string===undefined||!string.toString||split_length<1){
        return false;
    }
    return string.toString().match(new RegExp('.{1,'+(split_length||'1')+'}','g'));
}
function str_word_count(str,format,charlist){
    var len=str.length,cl=charlist&&charlist.length,chr='',tmpStr='',i=0,c='',wArr=[],wC=0,assoc={},aC=0,reg='',match=false;
    var _preg_quote=function(str){
        return(str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g,'\\$1');
    },_getWholeChar=function(str,i){
        var code=str.charCodeAt(i);
        if(code<0xD800||code>0xDFFF){
            return str.charAt(i);
        }
        if(0xD800<=code&&code<=0xDBFF){
            if(str.length<=(i+1)){
                throw'High surrogate without following low surrogate';
            }
            var next=str.charCodeAt(i+1);
            if(0xDC00>next||next>0xDFFF){
                throw'High surrogate without following low surrogate';
            }
            return str.charAt(i)+str.charAt(i+1);
        }
        if(i===0){
            throw'Low surrogate without preceding high surrogate';
        }
        var prev=str.charCodeAt(i-1);
        if(0xD800>prev||prev>0xDBFF){
            throw'Low surrogate without preceding high surrogate';
        }
        return false;
    };

    if(cl){
        reg='^('+_preg_quote(_getWholeChar(charlist,0));
        for(i=1;i<cl;i++){
            if((chr=_getWholeChar(charlist,i))===false){
                continue;
            }
            reg+='|'+_preg_quote(chr);
        }
        reg+=')$';
        reg=new RegExp(reg);
    }
    for(i=0;i<len;i++){
        if((c=_getWholeChar(str,i))===false){
            continue;
        }
        match=this.ctype_alpha(c)||(reg&&c.search(reg)!==-1)||((i!==0&&i!==len-1)&&c==='-')||(i!==0&&c==="'");
        if(match){
            if(tmpStr===''&&format===2){
                aC=i;
            }
            tmpStr=tmpStr+c;
        }
        if(i===len-1||!match&&tmpStr!==''){
            if(format!==2){
                wArr[wArr.length]=tmpStr;
            }else{
                assoc[aC]=tmpStr;
            }
            tmpStr='';
            wC++;
        }
    }
    if(!format){
    return wC;
}else if(format===1){
    return wArr;
}else if(format===2){
    return assoc;
}
throw'You have supplied an incorrect format';
}
function strcasecmp(f_string1,f_string2){
    var string1=(f_string1+'').toLowerCase();
    var string2=(f_string2+'').toLowerCase();
    if(string1>string2){
        return 1;
    }else if(string1==string2){
        return 0;
    }
    return -1;
}
function strchr(haystack,needle,bool){
    return this.strstr(haystack,needle,bool);
}
function strcmp(str1,str2){
    return((str1==str2)?0:((str1>str2)?1:-1));
}
function strcspn(str,mask,start,length){
    start=start?start:0;
    var count=(length&&((start+length)<str.length))?start+length:str.length;
        strct:for(var i=start,lgth=0;i<count;i++){
        for(var j=0;j<mask.length;j++){
            if(str.charAt(i).indexOf(mask[j])!==-1){
                continue strct;
            }
        }
        ++lgth;
    }
    return lgth;
}

function strip_tags(str,allowed_tags){
    var key='',allowed=false;
    var matches=[];
    var allowed_array=[];
    var allowed_tag='';
    var i=0;
    var k='';
    var html='';
    var replacer=function(search,replace,str){
        return str.split(search).join(replace);
    };

    if(allowed_tags){
        allowed_array=allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }
    str+='';
    matches=str.match(/(<\/?[\S][^>]*>)/gi);
    for(key in matches){
        if(isNaN(key)){
            continue;
        }
        html=matches[key].toString();
        allowed=false;
        for(k in allowed_array){
            allowed_tag=allowed_array[k];
            i=-1;
            if(i!=0){
                i=html.toLowerCase().indexOf('<'+allowed_tag+'>');
            }
            if(i!=0){
                i=html.toLowerCase().indexOf('<'+allowed_tag+' ');
            }
            if(i!=0){
                i=html.toLowerCase().indexOf('</'+allowed_tag);
            }
            if(i==0){
                allowed=true;
                break;
            }
        }
        if(!allowed){
        str=replacer(html,"",str);
    }
    }
    return str;
}
function stripos(f_haystack,f_needle,f_offset){
    var haystack=(f_haystack+'').toLowerCase();
    var needle=(f_needle+'').toLowerCase();
    var index=0;
    if((index=haystack.indexOf(needle,f_offset))!==-1){
        return index;
    }
    return false;
}
function stripslashes(str){
    return(str+'').replace(/\\(.?)/g,function(s,n1){
        switch(n1){
            case'\\':
                return'\\';
            case'0':
                return'\u0000';
            case'':
                return'';
            default:
                return n1;
        }
    });
}
function stristr(haystack,needle,bool){
    var pos=0;
    haystack+='';
    pos=haystack.toLowerCase().indexOf((needle+'').toLowerCase());
    if(pos==-1){
        return false;
    }else{
        if(bool){
            return haystack.substr(0,pos);
        }else{
            return haystack.slice(pos);
        }
    }
}
function strlen(string){
    var str=string+'';
    var i=0,chr='',lgth=0;
    if(!this.php_js||!this.php_js.ini||!this.php_js.ini['unicode.semantics']||this.php_js.ini['unicode.semantics'].local_value.toLowerCase()!=='on'){
        return string.length;
    }
    var getWholeChar=function(str,i){
        var code=str.charCodeAt(i);
        var next='',prev='';
        if(0xD800<=code&&code<=0xDBFF){
            if(str.length<=(i+1)){
                throw'High surrogate without following low surrogate';
            }
            next=str.charCodeAt(i+1);
            if(0xDC00>next||next>0xDFFF){
                throw'High surrogate without following low surrogate';
            }
            return str.charAt(i)+str.charAt(i+1);
        }else if(0xDC00<=code&&code<=0xDFFF){
            if(i===0){
                throw'Low surrogate without preceding high surrogate';
            }
            prev=str.charCodeAt(i-1);
            if(0xD800>prev||prev>0xDBFF){
                throw'Low surrogate without preceding high surrogate';
            }
            return false;
        }
        return str.charAt(i);
    };

    for(i=0,lgth=0;i<str.length;i++){
        if((chr=getWholeChar(str,i))===false){
            continue;
        }
        lgth++;
    }
    return lgth;
}
function strnatcasecmp(str1,str2){
    var a=(str1+'').toLowerCase();
    var b=(str2+'').toLowerCase();
    var isWhitespaceChar=function(a){
        return a.charCodeAt(0)<=32;
    };

    var isDigitChar=function(a){
        var charCode=a.charCodeAt(0);
        return(charCode>=48&&charCode<=57);
    };

    var compareRight=function(a,b){
        var bias=0;
        var ia=0;
        var ib=0;
        var ca;
        var cb;
        for(var cnt=0;true;ia++,ib++){
            ca=a.charAt(ia);
            cb=b.charAt(ib);
            if(!isDigitChar(ca)&&!isDigitChar(cb)){
                return bias;
            }else if(!isDigitChar(ca)){
                return -1;
            }else if(!isDigitChar(cb)){
                return +1;
            }else if(ca<cb){
                if(bias==='0'){
                    bias=-1;
                }
            }else if(ca>cb){
            if(bias==='0'){
                bias=+1;
            }
        }else if(ca==='0'&&cb==='0'){
            return bias;
        }
    }
};

var ia=0,ib=0;
var nza=0,nzb=0;
var ca,cb;
var result;
while(true){
    nza=nzb=0;
    ca=a.charAt(ia);
    cb=b.charAt(ib);
    while(isWhitespaceChar(ca)||ca==='0'){
        if(ca==='0'){
            nza++;
        }else{
            nza=0;
        }
        ca=a.charAt(++ia);
    }while(isWhitespaceChar(cb)||cb==='0'){
        if(cb==='0'){
            nzb++;
        }else{
            nzb=0;
        }
        cb=b.charAt(++ib);
    }
    if(isDigitChar(ca)&&isDigitChar(cb)){
        if((result=compareRight(a.substring(ia),b.substring(ib)))!=='0'){
            return result;
        }
    }
    if(ca==='0'&&cb==='0'){
    return nza-nzb;
}
if(ca<cb){
    return -1;
}else if(ca>cb){
    return +1;
}
++ia;
++ib;
}
}
function strnatcmp(f_string1,f_string2,f_version){
    var i=0;
    if(f_version==undefined){
        f_version=false;
    }
    var __strnatcmp_split=function(f_string){
        var result=[];
        var buffer='';
        var chr='';
        var i=0,f_stringl=0;
        var text=true;
        f_stringl=f_string.length;
        for(i=0;i<f_stringl;i++){
            chr=f_string.substring(i,i+1);
            if(chr.match(/\d/)){
                if(text){
                    if(buffer.length>0){
                        result[result.length]=buffer;
                        buffer='';
                    }
                    text=false;
                }
                buffer+=chr;
            }else if((text==false)&&(chr=='.')&&(i<(f_string.length-1))&&(f_string.substring(i+1,i+2).match(/\d/))){
                result[result.length]=buffer;
                buffer='';
            }else{
                if(text==false){
                    if(buffer.length>0){
                        result[result.length]=parseInt(buffer,10);
                        buffer='';
                    }
                    text=true;
                }
                buffer+=chr;
            }
        }
        if(buffer.length>0){
        if(text){
            result[result.length]=buffer;
        }else{
            result[result.length]=parseInt(buffer,10);
        }
    }
    return result;
};

var array1=__strnatcmp_split(f_string1+'');
var array2=__strnatcmp_split(f_string2+'');
var len=array1.length;
var text=true;
var result=-1;
var r=0;
if(len>array2.length){
    len=array2.length;
    result=1;
}
for(i=0;i<len;i++){
    if(isNaN(array1[i])){
        if(isNaN(array2[i])){
            text=true;
            if((r=this.strcmp(array1[i],array2[i]))!=0){
                return r;
            }
        }else if(text){
        return 1;
    }else{
        return -1;
    }
}else if(isNaN(array2[i])){
    if(text){
        return -1;
    }else{
        return 1;
    }
}else{
    if(text||f_version){
        if((r=(array1[i]-array2[i]))!=0){
            return r;
        }
    }else{
    if((r=this.strcmp(array1[i].toString(),array2[i].toString()))!=0){
        return r;
    }
}
text=false;
}
}
return result;
}
function strncasecmp(argStr1,argStr2,len){
    var diff,i=0;
    var str1=(argStr1+'').toLowerCase().substr(0,len);
    var str2=(argStr2+'').toLowerCase().substr(0,len);
    if(str1.length!==str2.length){
        if(str1.length<str2.length){
            len=str1.length;
            if(str2.substr(0,str1.length)==str1){
                return str1.length-str2.length;
            }
        }else{
        len=str2.length;
        if(str1.substr(0,str2.length)==str2){
            return str1.length-str2.length;
        }
    }
}else{
    len=str1.length;
}
for(diff=0,i=0;i<len;i++){
    diff=str1.charCodeAt(i)-str2.charCodeAt(i);
    if(diff!==0){
        return diff;
    }
}
return 0;
}
function strncmp(str1,str2,lgth){
    var s1=(str1+'').substr(0,lgth);
    var s2=(str2+'').substr(0,lgth);
    return((s1==s2)?0:((s1>s2)?1:-1));
}
function strpbrk(haystack,char_list){
    for(var i=0,len=haystack.length;i<len;++i){
        if(char_list.indexOf(haystack.charAt(i))>=0)return haystack.slice(i);
    }
    return false;
}
function strpos(haystack,needle,offset){
    var i=(haystack+'').indexOf(needle,(offset||0));
    return i===-1?false:i;
}
function strrchr(haystack,needle){
    var pos=0;
    if(typeof needle!=='string'){
        needle=String.fromCharCode(parseInt(needle,10));
    }
    needle=needle.charAt(0);
    pos=haystack.lastIndexOf(needle);
    if(pos===-1){
        return false;
    }
    return haystack.substr(pos);
}
function strrev(string){
    string=string+'';
    var grapheme_extend=/(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26])/g;
    string=string.replace(grapheme_extend,'$2$1');
    return string.split('').reverse().join('');
}
function strripos(haystack,needle,offset){
    haystack=(haystack+'').toLowerCase();
    needle=(needle+'').toLowerCase();
    var i=-1;
    if(offset){
        i=(haystack+'').slice(offset).lastIndexOf(needle);
        if(i!==-1){
            i+=offset;
        }
    }else{
    i=(haystack+'').lastIndexOf(needle);
}
return i>=0?i:false;
}
function strrpos(haystack,needle,offset){
    var i=-1;
    if(offset){
        i=(haystack+'').slice(offset).lastIndexOf(needle);
        if(i!==-1){
            i+=offset;
        }
    }else{
    i=(haystack+'').lastIndexOf(needle);
}
return i>=0?i:false;
}
function strspn(str1,str2,start,lgth){
    var found;
    var stri;
    var strj;
    var j=0;
    var i=0;
    start=start?(start<0?(str1.length+start):start):0;
    lgth=lgth?((lgth<0)?(str1.length+lgth-start):lgth):str1.length-start;
    str1=str1.substr(start,lgth);
    for(i=0;i<str1.length;i++){
        found=0;
        stri=str1.substring(i,i+1);
        for(j=0;j<=str2.length;j++){
            strj=str2.substring(j,j+1);
            if(stri==strj){
                found=1;
                break;
            }
        }
        if(found!=1){
        return i;
    }
    }
    return i;
}
function strstr(haystack,needle,bool){
    var pos=0;
    haystack+='';
    pos=haystack.indexOf(needle);
    if(pos==-1){
        return false;
    }else{
        if(bool){
            return haystack.substr(0,pos);
        }else{
            return haystack.slice(pos);
        }
    }
}
function strtok(str,tokens){
    this.php_js=this.php_js||{};

    if(tokens===undefined){
        tokens=str;
        str=this.php_js.strtokleftOver;
    }
    if(str.length===0){
        return false;
    }
    if(tokens.indexOf(str.charAt(0))!==-1){
        return this.strtok(str.substr(1),tokens);
    }
    for(var i=0;i<str.length;i++){
        if(tokens.indexOf(str.charAt(i))!==-1){
            break;
        }
    }
    this.php_js.strtokleftOver=str.substr(i+1);
return str.substring(0,i);
}
function strtolower(str){
    return(str+'').toLowerCase();
}


function strtoupper(str){
    return(str+'').toUpperCase();
}
function strtr(str,from,to){
    var fr='',i=0,j=0,lenStr=0,lenFrom=0,tmpStrictForIn=false,fromTypeStr='',toTypeStr='',istr='';
    var tmpFrom=[];
    var tmpTo=[];
    var ret='';
    var match=false;
    if(typeof from==='object'){
        tmpStrictForIn=this.ini_set('phpjs.strictForIn',false);
        from=this.krsort(from);
        this.ini_set('phpjs.strictForIn',tmpStrictForIn);
        for(fr in from){
            if(from.hasOwnProperty(fr)){
                tmpFrom.push(fr);
                tmpTo.push(from[fr]);
            }
        }
        from=tmpFrom;
    to=tmpTo;
}
lenStr=str.length;
lenFrom=from.length;
fromTypeStr=typeof from==='string';
toTypeStr=typeof to==='string';
for(i=0;i<lenStr;i++){
    match=false;
    if(fromTypeStr){
        istr=str.charAt(i);
        for(j=0;j<lenFrom;j++){
            if(istr==from.charAt(j)){
                match=true;
                break;
            }
        }
        }else{
    for(j=0;j<lenFrom;j++){
        if(str.substr(i,from[j].length)==from[j]){
            match=true;
            i=(i+from[j].length)-1;
            break;
        }
    }
    }
if(match){
    ret+=toTypeStr?to.charAt(j):to[j];
}else{
    ret+=str.charAt(i);
}
}
return ret;
}
function substr(str,start,len){
    var i=0,allBMP=true,es=0,el=0,se=0,ret='';
    str+='';
    var end=str.length;
    this.php_js=this.php_js||{};

    this.php_js.ini=this.php_js.ini||{};

    switch((this.php_js.ini['unicode.semantics']&&this.php_js.ini['unicode.semantics'].local_value.toLowerCase())){
        case'on':
            for(i=0;i<str.length;i++){
            if(/[\uD800-\uDBFF]/.test(str.charAt(i))&&/[\uDC00-\uDFFF]/.test(str.charAt(i+1))){
                allBMP=false;
                break;
            }
        }
        if(!allBMP){
            if(start<0){
                for(i=end-1,es=(start+=end);i>=es;i--){
                    if(/[\uDC00-\uDFFF]/.test(str.charAt(i))&&/[\uD800-\uDBFF]/.test(str.charAt(i-1))){
                        start--;
                        es--;
                    }
                }
                }else{
        var surrogatePairs=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        while((surrogatePairs.exec(str))!=null){
            var li=surrogatePairs.lastIndex;
            if(li-2<start){
                start++;
            }else{
                break;
            }
        }
    }
if(start>=end||start<0){
    return false;
}
if(len<0){
    for(i=end-1,el=(end+=len);i>=el;i--){
        if(/[\uDC00-\uDFFF]/.test(str.charAt(i))&&/[\uD800-\uDBFF]/.test(str.charAt(i-1))){
            end--;
            el--;
        }
    }
    if(start>end){
    return false;
}
return str.slice(start,end);
}else{
    se=start+len;
    for(i=start;i<se;i++){
        ret+=str.charAt(i);
        if(/[\uD800-\uDBFF]/.test(str.charAt(i))&&/[\uDC00-\uDFFF]/.test(str.charAt(i+1))){
            se++;
        }
    }
    return ret;
}
break;
}
case'off':default:
    if(start<0){
    start+=end;
}
end=typeof len==='undefined'?end:(len<0?len+end:len+start);
    return start>=str.length||start<0||start>end?!1:str.slice(start,end);
}
return undefined;
}
function substr_compare(main_str,str,offset,length,case_insensitivity){
    if(!offset&&offset!==0){
        throw'Missing offset for substr_compare()';
    }
    if(offset<0){
        offset=main_str.length+offset;
    }
    if(length&&length>(main_str.length-offset)){
        return false;
    }
    length=length||main_str.length-offset;
    main_str=main_str.substr(offset,length);
    str=str.substr(0,length);
    if(case_insensitivity){
        main_str=(main_str+'').toLowerCase();
        str=(str+'').toLowerCase();
        if(main_str==str){
            return 0;
        }
        return(main_str>str)?1:-1;
    }
    return((main_str==str)?0:((main_str>str)?1:-1));
}
function substr_count(haystack,needle,offset,length){
    var pos=0,cnt=0;
    haystack+='';
    needle+='';
    if(isNaN(offset)){
        offset=0;
    }
    if(isNaN(length)){
        length=0;
    }
    offset--;
    while((offset=haystack.indexOf(needle,offset+1))!=-1){
        if(length>0&&(offset+needle.length)>length){
            return false;
        }else{
            cnt++;
        }
    }
    return cnt;
}
function substr_replace(str,replace,start,length){
    if(start<0){
        start=start+str.length;
    }
    length=length!==undefined?length:str.length;
    if(length<0){
        length=length+str.length-start;
    }
    return str.slice(0,start)+replace.substr(0,length)+replace.slice(length)+str.slice(start+length);
}


function trim(str,charlist){
    var whitespace,l=0,i=0;
    str+='';
    if(!charlist){
        whitespace=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    }else{
        charlist+='';
        whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'$1');
    }
    l=str.length;
    for(i=0;i<l;i++){
        if(whitespace.indexOf(str.charAt(i))===-1){
            str=str.substring(i);
            break;
        }
    }
    l=str.length;
for(i=l-1;i>=0;i--){
    if(whitespace.indexOf(str.charAt(i))===-1){
        str=str.substring(0,i+1);
        break;
    }
}
return whitespace.indexOf(str.charAt(0))===-1?str:'';
}


function ucfirst(str){
    str+='';
    var f=str.charAt(0).toUpperCase();
    return f+str.substr(1);
}
function ucwords(str){
    return(str+'').replace(/^(.)|\s(.)/g,function($1){
        return $1.toUpperCase();
    });
}

function vprintf(format,args){
    var body,elmt;
    var ret='',d=this.window.document;
    var HTMLNS='http://www.w3.org/1999/xhtml';
    body=d.getElementsByTagNameNS?(d.getElementsByTagNameNS(HTMLNS,'body')[0]?d.getElementsByTagNameNS(HTMLNS,'body')[0]:d.documentElement.lastChild):d.getElementsByTagName('body')[0];
    if(!body){
        return false;
    }
    ret=this.sprintf.apply(this,[format].concat(args));
    elmt=d.createTextNode(ret);
    body.appendChild(elmt);
    return ret.length;
}

function vsprintf(format,args){
    return this.sprintf.apply(this,[format].concat(args));
}

function wordwrap(str,int_width,str_break,cut){
	var m=((arguments.length>=2)?arguments[1]:75);
	var b=((arguments.length>=3)?arguments[2]:"\n");
	var c=((arguments.length>=4)?arguments[3]:false);
	var i,j,l,s,r;str+='';
	if(m<1){
		return str;
	}
	for(i=-1,l=(r=str.split(/\r\n|\n|\r/)).length;++i<l;r[i]+=s){
		for(s=r[i],r[i]="";s.length>m;r[i]+=s.slice(0,j)+((s=s.slice(j)).length?b:"")){
			j=c==2||(j=s.slice(0,m+1).match(/\S*(\s)?$/))[1]?m:j.input.length-j[0].length||c==1&&m||j.input.length+(j=s.slice(m).match(/^\S*/)).input.length;
		}
	}
	return r.join("\n");
}