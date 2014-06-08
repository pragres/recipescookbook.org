function checkdate(m,d,y){
    return m>0&&m<13&&y>0&&y<32768&&d>0&&d<=(new Date(y,m,0)).getDate();
}
function date(format,timestamp){
    var that=this,jsdate,f,formatChr=/\\?([a-z])/gi,formatChrCb,_pad=function(n,c){
        if((n=n+"").length<c){
            return new Array((++c)-n.length).join("0")+n;
        }else{
            return n;
        }
    },txt_words=["Sun","Mon","Tues","Wednes","Thurs","Fri","Satur","January","February","March","April","May","June","July","August","September","October","November","December"],txt_ordin={
    1:"st",
    2:"nd",
    3:"rd",
    21:"st",
    22:"nd",
    23:"rd",
    31:"st"
};

formatChrCb=function(t,s){
    return f[t]?f[t]():s;
};

f={
    d:function(){
        return _pad(f.j(),2);
    },
    D:function(){
        return f.l().slice(0,3);
    },
    j:function(){
        return jsdate.getDate();
    },
    l:function(){
        return txt_words[f.w()]+'day';
    },
    N:function(){
        return f.w()||7;
    },
    S:function(){
        return txt_ordin[f.j()]||'th';
    },
    w:function(){
        return jsdate.getDay();
    },
    z:function(){
        var a=new Date(f.Y(),f.n()-1,f.j()),b=new Date(f.Y(),0,1);
        return Math.round((a-b)/864e5)+1;
    },
    W:function(){
        var a=new Date(f.Y(),f.n()-1,f.j()-f.N()+3),b=new Date(a.getFullYear(),0,4);
        return 1+Math.round((a-b)/864e5/7);
    },
    F:function(){
        return txt_words[6+f.n()];
    },
    m:function(){
        return _pad(f.n(),2);
    },
    M:function(){
        return f.F().slice(0,3);
    },
    n:function(){
        return jsdate.getMonth()+1;
    },
    t:function(){
        return(new Date(f.Y(),f.n(),0)).getDate();
    },
    L:function(){
        var y=f.Y(),a=y&3,b=y%4e2,c=y%1e2;
        return 0+(!a&&(c||!b));
    },
    o:function(){
        var n=f.n(),W=f.W(),Y=f.Y();
        return Y+(n===12&&W<9?-1:n===1&&W>9);
    },
    Y:function(){
        return jsdate.getFullYear();
    },
    y:function(){
        return(f.Y()+"").slice(-2);
    },
    a:function(){
        return jsdate.getHours()>11?"pm":"am";
    },
    A:function(){
        return f.a().toUpperCase();
    },
    B:function(){
        var H=jsdate.getUTCHours()*36e2,i=jsdate.getUTCMinutes()*60,s=jsdate.getUTCSeconds();
        return _pad(Math.floor((H+i+s+36e2)/86.4)%1e3,3);
    },
    g:function(){
        return f.G()%12||12;
    },
    G:function(){
        return jsdate.getHours();
    },
    h:function(){
        return _pad(f.g(),2);
    },
    H:function(){
        return _pad(f.G(),2);
    },
    i:function(){
        return _pad(jsdate.getMinutes(),2);
    },
    s:function(){
        return _pad(jsdate.getSeconds(),2);
    },
    u:function(){
        return _pad(jsdate.getMilliseconds()*1000,6);
    },
    e:function(){
        return'UTC';
    },
    I:function(){
        var a=new Date(f.Y(),0),c=Date.UTC(f.Y(),0),b=new Date(f.Y(),6),d=Date.UTC(f.Y(),6);
        return 0+((a-c)!==(b-d));
    },
    O:function(){
        var a=jsdate.getTimezoneOffset();
        return(a>0?"-":"+")+_pad(Math.abs(a/60*100),4);
    },
    P:function(){
        var O=f.O();
        return(O.substr(0,3)+":"+O.substr(3,2));
    },
    T:function(){
        return'UTC';
    },
    Z:function(){
        return-jsdate.getTimezoneOffset()*60;
    },
    c:function(){
        return'Y-m-d\\Th:i:sP'.replace(formatChr,formatChrCb);
    },
    r:function(){
        return'D, d M Y H:i:s O'.replace(formatChr,formatChrCb);
    },
    U:function(){
        return jsdate.getTime()/1000|0;
    }
};

this.date=function(format,timestamp){
    that=this;
    jsdate=((typeof timestamp==='undefined')?new Date():(timestamp instanceof Date)?new Date(timestamp):new Date(timestamp*1000));
    return format.replace(formatChr,formatChrCb);
};

return this.date(format,timestamp);
}

function getdate(timestamp){
    var _w=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var _m=['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d=((typeof(timestamp)=='undefined')?new Date():(typeof(timestamp)=='object')?new Date(timestamp):new Date(timestamp*1000));
    var w=d.getDay();
    var m=d.getMonth();
    var y=d.getFullYear();
    var r={};

    r.seconds=d.getSeconds();
    r.minutes=d.getMinutes();
    r.hours=d.getHours();
    r.mday=d.getDate();
    r.wday=w;
    r.mon=m+1;
    r.year=y;
    r.yday=Math.floor((d-(new Date(y,0,1)))/86400000);
    r.weekday=_w[w];
    r.month=_m[m];
    r['0']=parseInt(d.getTime()/1000,10);
    return r;
}

function microtime(get_as_float){
    var now=new Date().getTime()/1000;
    var s=parseInt(now,10);
    return(get_as_float)?now:(Math.round((now-s)*1000)/1000)+' '+s;
}

function mktime(){
    var d=new Date(),r=arguments,i=0,e=['Hours','Minutes','Seconds','Month','Date','FullYear'];
    for(i=0;i<e.length;i++){
        if(typeof r[i]==='undefined'){
            r[i]=d['get'+e[i]]();
            r[i]+=(i===3);
        }else{
            r[i]=parseInt(r[i],10);
            if(isNaN(r[i])){
                return false;
            }
        }
    }
    r[5]+=(r[5]>=0?(r[5]<=69?2e3:(r[5]<=100?1900:0)):0);
d.setFullYear(r[5],r[3]-1,r[4]);
d.setHours(r[0],r[1],r[2]);
return(d.getTime()/1e3>>0)-(d.getTime()<0);
}

function strtotime(str,now){
    var i,match,s,strTmp='',parse='';
    strTmp=str;
    strTmp=strTmp.replace(/\s{2,}|^\s|\s$/g,' ');
    strTmp=strTmp.replace(/[\t\r\n]/g,'');
    if(strTmp=='now'){
        return(new Date()).getTime()/1000;
    }else if(!isNaN(parse=Date.parse(strTmp))){
        return(parse/1000);
    }else if(now){
        now=new Date(now*1000);
    }else{
        now=new Date();
    }
    strTmp=strTmp.toLowerCase();
    var __is={
        day:{
            'sun':0,
            'mon':1,
            'tue':2,
            'wed':3,
            'thu':4,
            'fri':5,
            'sat':6
        },
        mon:{
            'jan':0,
            'feb':1,
            'mar':2,
            'apr':3,
            'may':4,
            'jun':5,
            'jul':6,
            'aug':7,
            'sep':8,
            'oct':9,
            'nov':10,
            'dec':11
        }
    };

var process=function(m){
    var ago=(m[2]&&m[2]=='ago');
    var num=(num=m[0]=='last'?-1:1)*(ago?-1:1);
    switch(m[0]){
        case'last':case'next':
            switch(m[1].substring(0,3)){
            case'yea':
                now.setFullYear(now.getFullYear()+num);
                break;
            case'mon':
                now.setMonth(now.getMonth()+num);
                break;
            case'wee':
                now.setDate(now.getDate()+(num*7));
                break;
            case'day':
                now.setDate(now.getDate()+num);
                break;
            case'hou':
                now.setHours(now.getHours()+num);
                break;
            case'min':
                now.setMinutes(now.getMinutes()+num);
                break;
            case'sec':
                now.setSeconds(now.getSeconds()+num);
                break;
            default:
                var day;
                if(typeof(day=__is.day[m[1].substring(0,3)])!='undefined'){
                var diff=day-now.getDay();
                if(diff==0){
                    diff=7*num;
                }else if(diff>0){
                    if(m[0]=='last'){
                        diff-=7;
                    }
                }else{
                if(m[0]=='next'){
                    diff+=7;
                }
            }
            now.setDate(now.getDate()+diff);
        }
        }
        break;
default:
    if(/\d+/.test(m[0])){
    num*=parseInt(m[0],10);
    switch(m[1].substring(0,3)){
        case'yea':
            now.setFullYear(now.getFullYear()+num);
            break;
        case'mon':
            now.setMonth(now.getMonth()+num);
            break;
        case'wee':
            now.setDate(now.getDate()+(num*7));
            break;
        case'day':
            now.setDate(now.getDate()+num);
            break;
        case'hou':
            now.setHours(now.getHours()+num);
            break;
        case'min':
            now.setMinutes(now.getMinutes()+num);
            break;
        case'sec':
            now.setSeconds(now.getSeconds()+num);
            break;
    }
}else{
    return false;
}
break;
}
return true;
};

match=strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
if(match!=null){
    if(!match[2]){
        match[2]='00:00:00';
    }else if(!match[3]){
        match[2]+=':00';
    }
    s=match[1].split(/-/g);
    for(i in __is.mon){
        if(__is.mon[i]==s[1]-1){
            s[1]=i;
        }
    }
    s[0]=parseInt(s[0],10);
s[0]=(s[0]>=0&&s[0]<=69)?'20'+(s[0]<10?'0'+s[0]:s[0]+''):(s[0]>=70&&s[0]<=99)?'19'+s[0]:s[0]+'';
return parseInt(this.strtotime(s[2]+' '+s[1]+' '+s[0]+' '+match[2])+(match[4]?match[4]/1000:''),10);
}
var regex='([+-]?\\d+\\s'+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)'+'|(last|next)\\s'+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+'|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday'+'|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))'+'(\\sago)?';
match=strTmp.match(new RegExp(regex,'gi'));
if(match==null){
    return false;
}
for(i=0;i<match.length;i++){
    if(!process(match[i].split(' '))){
        return false;
    }
}
return(now.getTime()/1000);
}

function time(){
    return Math.floor(new Date().getTime()/1000);
}