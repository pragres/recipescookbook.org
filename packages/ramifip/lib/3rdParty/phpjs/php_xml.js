
function utf8_decode(str_data){
    var tmp_arr=[],i=0,ac=0,c1=0,c2=0,c3=0;
    str_data+='';
    while(i<str_data.length){
        c1=str_data.charCodeAt(i);
        if(c1<128){
            tmp_arr[ac++]=String.fromCharCode(c1);
            i++;
        }else if((c1>191)&&(c1<224)){
            c2=str_data.charCodeAt(i+1);
            tmp_arr[ac++]=String.fromCharCode(((c1&31)<<6)|(c2&63));
            i+=2;
        }else{
            c2=str_data.charCodeAt(i+1);
            c3=str_data.charCodeAt(i+2);
            tmp_arr[ac++]=String.fromCharCode(((c1&15)<<12)|((c2&63)<<6)|(c3&63));
            i+=3;
        }
    }
    return tmp_arr.join('');
}
function utf8_encode(argString){
    var string=(argString+'');
    var utftext="";
    var start,end;
    var stringl=0;
    start=end=0;
    stringl=string.length;
    for(var n=0;n<stringl;n++){
        var c1=string.charCodeAt(n);
        var enc=null;
        if(c1<128){
            end++;
        }else if(c1>127&&c1<2048){
            enc=String.fromCharCode((c1>>6)|192)+String.fromCharCode((c1&63)|128);
        }else{
            enc=String.fromCharCode((c1>>12)|224)+String.fromCharCode(((c1>>6)&63)|128)+String.fromCharCode((c1&63)|128);
        }
        if(enc!==null){
            if(end>start){
                utftext+=string.substring(start,end);
            }
            utftext+=enc;
            start=end=n+1;
        }
    }
    if(end>start){
    utftext+=string.substring(start,string.length);
}
return utftext;
}