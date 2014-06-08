function abs(mixed_number){
    return Math.abs(mixed_number)||0;
}
function acos(arg){
    return Math.acos(arg);
}
function acosh(arg){
    return Math.log(arg+Math.sqrt(arg*arg-1));
}

function asin(arg){
    return Math.asin(arg);
}
function asinh(arg){
    return Math.log(arg+Math.sqrt(arg*arg+1));
}

function atan(arg){
    return Math.atan(arg);
}
function atan2(y,x){
    return Math.atan2(y,x);
}
function atanh(arg){
    return 0.5*Math.log((1+arg)/(1-arg));
}

function cos(arg){
    return Math.cos(arg);
}
function cosh(arg){
    return(Math.exp(arg)+Math.exp(-arg))/2;
}


function base_convert(number,frombase,tobase){
    return parseInt(number+'',frombase|0).toString(tobase|0);
}
function bin2hex(s){
    var i,f=0,a=[];
    s+='';
    f=s.length;
    for(i=0;i<f;i++){
        a[i]=s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,"0$1");
    }
    return a.join('');
}
function bindec(binary_string){
    binary_string=(binary_string+'').replace(/[^01]/gi,'');
    return parseInt(binary_string,2);
}
function ceil(value){
    return Math.ceil(value);
}

function decbin(number){
    if(number<0){
        number=0xFFFFFFFF+number+1;
    }
    return parseInt(number,10).toString(2);
}
function dechex(number){
    if(number<0){
        number=0xFFFFFFFF+number+1;
    }
    return parseInt(number,10).toString(16);
}
function decoct(number){
    if(number<0){
        number=0xFFFFFFFF+number+1;
    }
    return parseInt(number,10).toString(8);
}
function exp(arg){
    return Math.exp(arg);
}

function expm1(x){
    var ret=0,n=50;
    var factorial=function factorial(n){
        if((n===0)||(n===1)){
            return 1;
        }else{
            var result=(n*factorial(n-1));
            return result;
        }
    };

for(var i=1;i<n;i++){
    ret+=Math.pow(x,i)/factorial(i);
}
return ret;
}
function floatval(mixed_var){
    return(parseFloat(mixed_var)||0);
}
function floor(value){
    return Math.floor(value);
}
function fmod(x,y){
    var tmp,tmp2,p=0,pY=0,l=0.0,l2=0.0;
    tmp=x.toExponential().match(/^.\.?(.*)e(.+)$/);
    p=parseInt(tmp[2],10)-(tmp[1]+'').length;
    tmp=y.toExponential().match(/^.\.?(.*)e(.+)$/);
    pY=parseInt(tmp[2],10)-(tmp[1]+'').length;
    if(pY>p){
        p=pY;
    }
    tmp2=(x%y);
    if(p<-100||p>20){
        l=Math.round(Math.log(tmp2)/Math.log(10));
        l2=Math.pow(10,l);
        return(tmp2/l2).toFixed(l-p)*l2;
    }else{
        return parseFloat(tmp2.toFixed(-p));
    }
}

function log(arg,base){
    if(base===undefined){
        return Math.log(arg);
    }else{
        return Math.log(arg)/Math.log(base);
    }
}
function log10(arg){
    return Math.log(arg)/Math.LN10;
}
function log1p(x){
    var ret=0,n=50;
    if(x<=-1){
        return'-INF';
    }
    if(x<0||x>1){
        return Math.log(1+x);
    }
    for(var i=1;i<n;i++){
        if((i%2)===0){
            ret-=Math.pow(x,i)/i;
        }else{
            ret+=Math.pow(x,i)/i;
        }
    }
    return ret;
}

function octdec(oct_string){
    oct_string=(oct_string+'').replace(/[^0-7]/gi,'');
    return parseInt(oct_string,8);
}

function pi(){
    return Math.PI;
}
function pow(base,exp){
    return Math.pow(base,exp);
}

function deg2rad(angle){
    return(angle/180)*Math.PI;
}

function getrandmax(){
    return 2147483647;
}

function hexdec(hex_string){
    hex_string=(hex_string+'').replace(/[^a-f0-9]/gi,'');
    return parseInt(hex_string,16);
}

function hypot(x,y){
    return Math.sqrt(x*x+y*y)||0;
}

function lcg_value(){
    return Math.random();
}

function mt_getrandmax(){
    return 2147483647;
}
function mt_rand(min,max){
    var argc=arguments.length;
    if(argc===0){
        min=0;
        max=2147483647;
    }else if(argc===1){
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random()*(max-min+1))+min;
}

function rad2deg(angle){
    return(angle/Math.PI)*180;
}
function rand(min,max){
    var argc=arguments.length;
    if(argc===0){
        min=0;
        max=2147483647;
    }else if(argc===1){
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random()*(max-min+1))+min;
}


function round(val,precision,mode){
    var retVal=0,v='',integer='',decimal='',decp=0,negative=false;
    var _round_half_oe=function(dtR,dtLa,even){
        if(even===true){
            if(dtLa===50){
                if((dtR%2)===1){
                    if(dtLa>=5){
                        dtR++;
                    }else{
                        dtR--;
                    }
                }
            }else if(dtLa>=5){
        dtR++;
    }
}
else{
    if(dtLa===5){
        if((dtR%2)===0){
            if(dtLa>=5){
                dtR++;
            }else{
                dtR--;
            }
        }
    }else if(dtLa>=5){
    dtR++;
}
}
return dtR;
};

var _round_half_ud=function(dtR,dtLa,up){
    if(up===true){
        if(dtLa>=5){
            dtR++;
        }
    }else{
    if(dtLa>5){
        dtR++;
    }
}
return dtR;
};

var _round_half=function(val,decplaces,mode){
    var v=val.toString(),vlen=0,vlenDif=0;
    var decp=v.indexOf('.');
    var digitToRound=0,digitToLookAt=0;
    var integer='',decimal='';
    var round=null,bool=false;
    switch(mode){
        case'up':
            bool=true;
        case'down':
            round=_round_half_ud;
            break;
        case'even':
            bool=true;
        case'odd':
            round=_round_half_oe;
            break;
    }
    if(decplaces<0){
        vlen=v.length;
        decplaces=vlen+decplaces;
        digitToLookAt=Number(v.charAt(decplaces));
        digitToRound=Number(v.charAt(decplaces-1));
        digitToRound=round(digitToRound,digitToLookAt,bool);
        v=v.slice(0,decplaces-1);
        vlenDif=vlen-v.length-1;
        if(digitToRound===10){
            v=String(Number(v)+1)+'0';
        }else{
            v+=digitToRound;
        }
        v=Number(v)*(Math.pow(10,vlenDif));
    }else if(decplaces>0){
        integer=v.slice(0,decp);
        decimal=v.slice(decp+1);
        digitToLookAt=Number(decimal.charAt(decplaces));
        digitToRound=Number(decimal.charAt(decplaces-1));
        digitToRound=round(digitToRound,digitToLookAt,bool);
        decimal=decimal.slice(0,decplaces-1);
        if(digitToRound===10){
            v=Number(integer+'.'+decimal)+(1*(Math.pow(10,(0-decimal.length))));
        }else{
            v=Number(integer+'.'+decimal+digitToRound);
        }
    }else{
    integer=v.slice(0,decp);
    decimal=v.slice(decp+1);
    digitToLookAt=Number(decimal.charAt(decplaces));
    digitToRound=Number(integer.charAt(integer.length-1));
    digitToRound=round(digitToRound,digitToLookAt,bool);
    decimal='0';
    integer=integer.slice(0,integer.length-1);
    if(digitToRound===10){
        v=Number((Number(integer)+1)+decimal);
    }else{
        v=Number(integer+digitToRound);
    }
}
return v;
};

if(typeof precision==='undefined'){
    precision=0;
}
if(typeof mode==='undefined'){
    mode='PHP_ROUND_HALF_UP';
}
negative=val<0;
v=Math.abs(val).toString();
decp=v.indexOf('.');
if(decp===-1&&precision>=0){
    return val;
}else{
    if(decp===-1){
        integer=v;
        decimal='0';
    }else{
        integer=v.slice(0,decp);
        if(precision>=0){
            decimal=v.substr(decp+1,precision+1);
        }else{
            decimal='0';
        }
    }
    if(precision>0&&precision>=decimal.length){
    return val;
}else if(precision<0&&Math.abs(precision)>=integer.length){
    return 0;
}
if(decimal==='0'){
    return Number(integer);
}
val=Number(integer+'.'+decimal);
}
switch(mode){
    case 0:case'PHP_ROUND_HALF_UP':
        retVal=_round_half(val,precision,'up');
        break;
    case 1:case'PHP_ROUND_HALF_DOWN':
        retVal=_round_half(val,precision,'down');
        break;
    case 2:case'PHP_ROUND_HALF_EVEN':
        retVal=_round_half(val,precision,'even');
        break;
    case 3:case'PHP_ROUND_HALF_ODD':
        retVal=_round_half(val,precision,'odd');
        break;
}
return negative?0-retVal:retVal;
}

function sin(arg){
    return Math.sin(arg);
}
function sinh(arg){
    return(Math.exp(arg)-Math.exp(-arg))/2;
}

function sqrt(arg){
    return Math.sqrt(arg);
}


function tan(arg){
    return Math.tan(arg);
}
function tanh(arg){
    return(Math.exp(arg)-Math.exp(-arg))/(Math.exp(arg)+Math.exp(-arg));
}