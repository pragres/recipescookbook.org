function base64_decode(data){
    var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,dec="",tmp_arr=[];
    if(!data){
        return data;
    }
    data+='';
    do{
        h1=b64.indexOf(data.charAt(i++));
        h2=b64.indexOf(data.charAt(i++));
        h3=b64.indexOf(data.charAt(i++));
        h4=b64.indexOf(data.charAt(i++));
        bits=h1<<18|h2<<12|h3<<6|h4;
        o1=bits>>16&0xff;
        o2=bits>>8&0xff;
        o3=bits&0xff;
        if(h3==64){
            tmp_arr[ac++]=String.fromCharCode(o1);
        }else if(h4==64){
            tmp_arr[ac++]=String.fromCharCode(o1,o2);
        }else{
            tmp_arr[ac++]=String.fromCharCode(o1,o2,o3);
        }
    }while(i<data.length);
dec=tmp_arr.join('');
dec=this.utf8_decode(dec);
return dec;
}
function base64_encode(data){
    var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1,o2,o3,h1,h2,h3,h4,bits,i=0,ac=0,enc="",tmp_arr=[];
    if(!data){
        return data;
    }
    data=this.utf8_encode(data+'');
    do{
        o1=data.charCodeAt(i++);
        o2=data.charCodeAt(i++);
        o3=data.charCodeAt(i++);
        bits=o1<<16|o2<<8|o3;
        h1=bits>>18&0x3f;
        h2=bits>>12&0x3f;
        h3=bits>>6&0x3f;
        h4=bits&0x3f;
        tmp_arr[ac++]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);
    }while(i<data.length);
    enc=tmp_arr.join('');
    switch(data.length%3){
        case 1:
            enc=enc.slice(0,-2)+'==';
            break;
        case 2:
            enc=enc.slice(0,-1)+'=';
            break;
    }
    return enc;
}