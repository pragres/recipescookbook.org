function ip2long(IP){
    var i=0;
    IP=IP.match(/^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i);
    if(!IP){
        return false;
    }
    IP[0]=0;
    for(i=1;i<5;i+=1){
        IP[0]+=!!((IP[i]||'').length);
        IP[i]=parseInt(IP[i])||0;
    }
    IP.push(256,256,256,256);
    IP[4+IP[0]]*=Math.pow(256,4-IP[0]);
    if(IP[1]>=IP[5]||IP[2]>=IP[6]||IP[3]>=IP[7]||IP[4]>=IP[8]){
        return false;
    }
    return IP[1]*(IP[0]===1||16777216)+IP[2]*(IP[0]<=2||65536)+IP[3]*(IP[0]<=3||256)+IP[4]*1;
}

function long2ip(proper_address){
    var output=false;
    if(!isNaN(proper_address)&&(proper_address>=0||proper_address<=4294967295)){
        output=Math.floor(proper_address/Math.pow(256,3))+'.'+Math.floor((proper_address%Math.pow(256,3))/Math.pow(256,2))+'.'+Math.floor(((proper_address%Math.pow(256,3))%Math.pow(256,2))/Math.pow(256,1))+'.'+Math.floor((((proper_address%Math.pow(256,3))%Math.pow(256,2))%Math.pow(256,1))/Math.pow(256,0));
    }
    return output;
}

function setcookie(name,value,expires,path,domain,secure){
    return this.setrawcookie(name,encodeURIComponent(value),expires,path,domain,secure);
}

function setrawcookie(name,value,expires,path,domain,secure){
    if(typeof expires==='string'&&(/^\d+$/).test(expires)){
        expires=parseInt(expires,10);
    }
    if(expires instanceof Date){
        expires=expires.toGMTString();
    }else if(typeof(expires)==='number'){
        expires=(new Date(expires*1e3)).toGMTString();
    }
    var r=[name+'='+value],s={},i='';
    s={
        expires:expires,
        path:path,
        domain:domain
    };

    for(i in s){
        if(s.hasOwnProperty(i)){
            s[i]&&r.push(i+'='+s[i]);
        }
    }
    return secure&&r.push('secure'),this.window.document.cookie=r.join(";"),true;
}