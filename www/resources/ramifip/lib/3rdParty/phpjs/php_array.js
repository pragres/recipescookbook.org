function compact(){
    var matrix={},that=this;
    var process=function(value){
        var i=0,l=value.length,key_value='';
        for(i=0;i<l;i++){
            key_value=value[i];
            if(key_value instanceof Array){
                process(key_value);
            }else{
                if(typeof that.window[key_value]!=='undefined'){
                    matrix[key_value]=that.window[key_value];
                }
            }
        }
        return true;
};

process(arguments);
return matrix;
}
function array_change_key_case(array){
    var case_fn,tmp_ar={},argc=arguments.length,argv=arguments,key;
    if(array instanceof Array){
        return array;
    }
    if(array instanceof Object){
        if(argc===1||argv[1]==='CASE_LOWER'||argv[1]===0){
            case_fn="toLowerCase";
        }else{
            case_fn="toUpperCase";
        }
        for(key in array){
            tmp_ar[key[case_fn]()]=array[key];
        }
        return tmp_ar;
    }
    return false;
}
function array_chunk(input,size){
    for(var x,i=0,c=-1,l=input.length,n=[];i<l;i++){
        (x=i%size)?n[c][x]=input[i]:n[++c]=[input[i]];
    }
    return n;
}
function array_combine(keys,values){
    var new_array={},keycount=keys&&keys.length,i=0;
    if(typeof keys!=='object'||typeof values!=='object'||typeof keycount!=='number'||typeof values.length!=='number'||!keycount){
        return false;
    }
    if(keycount!=values.length){
        return false;
    }
    for(i=0;i<keycount;i++){
        new_array[keys[i]]=values[i];
    }
    return new_array;
}
function array_count_values(array){
    var tmp_arr={},key='',t='';
    var __getType=function(obj){
        var t=typeof obj;
        t=t.toLowerCase();
        if(t==="object"){
            t="array";
        }
        return t;
    };

    var __countValue=function(value){
        switch(typeof(value)){
            case"number":
                if(Math.floor(value)!==value){
                return;
            }
            case"string":
                if(value in this&&this.hasOwnProperty(value)){
                ++this[value];
            }else{
                this[value]=1;
            }
            }
        };

t=__getType(array);
if(t==='array'){
    for(key in array){
        if(array.hasOwnProperty(key)){
            __countValue.call(tmp_arr,array[key]);
        }
    }
    }
    return tmp_arr;
}
function array_diff(){
    var arr1=arguments[0],retArr={};

    var k1='',i=1,k='',arr={};

        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_diff_assoc(){
    var arr1=arguments[0],retArr={};

    var k1='',i=1,k='',arr={};

        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]&&k===k1){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_diff_key(){
    var arr1=arguments[0],retArr={};

    var k1='',i=1,k='',arr={};

        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(k===k1){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_diff_uassoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var arr={},i=1,k1='',k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]&&cb(k,k1)===0){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_diff_ukey(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var arr={},i=1,k1='',k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(k,k1)===0){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_fill(start_index,num,mixed_val){
    var key,tmp_arr={};

    if(!isNaN(start_index)&&!isNaN(num)){
        for(key=0;key<num;key++){
            tmp_arr[(key+start_index)]=mixed_val;
        }
        }
        return tmp_arr;
}
function array_fill_keys(keys,value){
    var retObj={},key='';
    for(key in keys){
        retObj[keys[key]]=value;
    }
    return retObj;
}
function array_filter(arr,func){
    var retObj={},k;
    for(k in arr){
        if(func(arr[k])){
            retObj[k]=arr[k];
        }
    }
    return retObj;
}
function array_flip(trans){
    var key,tmp_ar={};

    for(key in trans){
        tmp_ar[trans[key]]=key;
    }
    return tmp_ar;
}
function array_intersect(){
    var arr1=arguments[0],retArr={};

    var k1='',arr={},i=0,k='';
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]){
                    if(i===arguments.length-1){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_intersect_assoc(){
    var arr1=arguments[0],retArr={};

    var k1='',arr={},i=0,k='';
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]&&k===k1){
                    if(i===arguments.length-1){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_intersect_key(){
    var arr1=arguments[0],retArr={};

    var k1='',arr={},i=0,k='';
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length;i++){
            arr=arguments[i];
            for(k in arr){
                if(k===k1){
                    if(i===arguments.length-1){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_intersect_uassoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var k1='',i=1,arr={},k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(arr[k]===arr1[k1]&&cb(k,k1)===0){
                    if(i===arguments.length-2){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_intersect_ukey(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var k1='',i=1,arr={},k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(k,k1)===0){
                    if(i===arguments.length-2){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_key_exists(key,search){
    if(!search||(search.constructor!==Array&&search.constructor!==Object)){
        return false;
    }
    return key in search;
}
function array_keys(input,search_value,argStrict){
    var tmp_arr={},strict=!!argStrict,include=true,cnt=0;
    var key='';
    for(key in input){
        include=true;
        if(search_value!=undefined){
            if(strict&&input[key]!==search_value){
                include=false;
            }else if(input[key]!=search_value){
                include=false;
            }
        }
        if(include){
        tmp_arr[cnt]=key;
        cnt++;
    }
    }
    return tmp_arr;
}
function array_map(callback){
    var argc=arguments.length,argv=arguments;
    var j=argv[1].length,i=0,k=1,m=0;
    var tmp=[],tmp_ar=[];
    while(i<j){
        while(k<argc){
            tmp[m++]=argv[k++][i];
        }
        m=0;
        k=1;
        if(callback){
            if(typeof callback==='string'){
                callback=this.window[callback];
            }
            tmp_ar[i++]=callback.apply(null,tmp);
        }else{
            tmp_ar[i++]=tmp;
        }
        tmp=[];
    }
    return tmp_ar;
}
function array_merge(){
    var args=Array.prototype.slice.call(arguments),retObj={},k,j=0,i=0,retArr=true;
    for(i=0;i<args.length;i++){
        if(!(args[i]instanceof Array)){
            retArr=false;
            break;
        }
    }
    if(retArr){
    retArr=[];
    for(i=0;i<args.length;i++){
        retArr=retArr.concat(args[i]);
    }
    return retArr;
}
var ct=0;
for(i=0,ct=0;i<args.length;i++){
    if(args[i]instanceof Array){
        for(j=0;j<args[i].length;j++){
            retObj[ct++]=args[i][j];
        }
        }else{
    for(k in args[i]){
        if(args[i].hasOwnProperty(k)){
            if(parseInt(k,10)+''===k){
                retObj[ct++]=args[i][k];
            }else{
                retObj[k]=args[i][k];
            }
        }
    }
    }
}
return retObj;
}
function array_merge_recursive(arr1,arr2){
    var idx='';
    if((arr1&&(arr1 instanceof Array))&&(arr2&&(arr2 instanceof Array))){
        for(idx in arr2){
            arr1.push(arr2[idx]);
        }
        }else if((arr1&&(arr1 instanceof Object))&&(arr2&&(arr2 instanceof Object))){
    for(idx in arr2){
        if(idx in arr1){
            if(typeof arr1[idx]=='object'&&typeof arr2=='object'){
                arr1[idx]=this.array_merge(arr1[idx],arr2[idx]);
            }else{
                arr1[idx]=arr2[idx];
            }
        }else{
        arr1[idx]=arr2[idx];
    }
    }
    }
return arr1;
}
function array_pad(input,pad_size,pad_value){
    var pad=[],newArray=[],newLength,i=0;
    if(input instanceof Array&&!isNaN(pad_size)){
        newLength=((pad_size<0)?(pad_size*-1):pad_size);
        if(newLength>input.length){
            for(i=0;i<(newLength-input.length);i++){
                newArray[i]=pad_value;
            }
            pad=((pad_size<0)?newArray.concat(input):input.concat(newArray));
        }else{
            pad=input;
        }
    }
    return pad;
}
function array_pop(inputArr){
    var key='',lastKey='';
    if(inputArr.hasOwnProperty('length')){
        if(!inputArr.length){
            return null;
        }
        return inputArr.pop();
    }else{
        for(key in inputArr){
            if(inputArr.hasOwnProperty(key)){
                lastKey=key;
            }
        }
        if(lastKey){
        var tmp=inputArr[lastKey];
        delete(inputArr[lastKey]);
        return tmp;
    }else{
        return null;
    }
}
}
function array_product(input){
    var Index=0,product=1;
    if(input instanceof Array){
        while(Index<input.length){
            product*=(!isNaN(input[Index])?input[Index]:0);
            Index++;
        }
    }else{
    product=null;
}
return product;
}
function array_push(inputArr){
    var i=0,pr='',argv=arguments,argc=argv.length,allDigits=/^\d$/,size=0,highestIdx=0,len=0;
    if(inputArr.hasOwnProperty('length')){
        for(i=1;i<argc;i++){
            inputArr[inputArr.length]=argv[i];
        }
        return inputArr.length;
    }
    for(pr in inputArr){
        if(inputArr.hasOwnProperty(pr)){
            ++len;
            if(pr.search(allDigits)!==-1){
                size=parseInt(pr,10);
                highestIdx=size>highestIdx?size:highestIdx;
            }
        }
    }
    for(i=1;i<argc;i++){
    inputArr[++highestIdx]=argv[i];
}
return len+i-1;
}
function array_rand(input,num_req){
    var indexes=[];
    var ticks=num_req||1;
    var checkDuplicate=function(input,value){
        var exist=false,index=0;
        while(index<input.length){
            if(input[index]===value){
                exist=true;
                break;
            }
            index++;
        }
        return exist;
    };

    if(input instanceof Array&&ticks<=input.length){
        while(true){
            var rand=Math.floor((Math.random()*input.length));
            if(indexes.length===ticks){
                break;
            }
            if(!checkDuplicate(indexes,rand)){
                indexes.push(rand);
            }
        }
    }else{
    indexes=null;
}
return((ticks==1)?indexes.join():indexes);
}
function array_reduce(a_input,callback){
    var lon=a_input.length;
    var res=0,i=0;
    var tmp=[];
    for(i=0;i<lon;i+=2){
        tmp[0]=a_input[i];
        if(a_input[(i+1)]){
            tmp[1]=a_input[(i+1)];
        }
        else{
            tmp[1]=0;
        }
        res+=callback.apply(null,tmp);
        tmp=[];
    }
    return res;
}
function array_reverse(array,preserve_keys){
    var arr_len=array.length,newkey=0,tmp_arr={},key='';
    preserve_keys=!!preserve_keys;
    for(key in array){
        newkey=arr_len-key-1;
        tmp_arr[preserve_keys?key:newkey]=array[key];
    }
    return tmp_arr;
}
function array_search(needle,haystack,argStrict){
    var strict=!!argStrict;
    var key='';
    for(key in haystack){
        if((strict&&haystack[key]===needle)||(!strict&&haystack[key]==needle)){
            return key;
        }
    }
    return false;
}
function array_shift(inputArr){
    var props=false,shift=undefined,pr='',allDigits=/^\d$/,int_ct=-1,_checkToUpIndices=function(arr,ct,key){
        if(arr[ct]!==undefined){
            var tmp=ct;
            ct+=1;
            if(ct===key){
                ct+=1;
            }
            ct=_checkToUpIndices(arr,ct,key);
            arr[ct]=arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };

    if(inputArr.length===0){
        return null;
    }
    if(inputArr.length>0){
        return inputArr.shift();
    }
    return null;
}
function array_slice(arr,offst,lgth,preserve_keys){
    var key='';
    if(!(arr instanceof Array)||(preserve_keys&&offst!==0)){
        var lgt=0,newAssoc={};

        for(key in arr){
            lgt+=1;
            newAssoc[key]=arr[key];
        }
        arr=newAssoc;
        offst=(offst<0)?lgt+offst:offst;
        lgth=lgth===undefined?lgt:(lgth<0)?lgt+lgth-offst:lgth;
        var assoc={};

        var start=false,it=-1,arrlgth=0,no_pk_idx=0;
        for(key in arr){
            ++it;
            if(arrlgth>=lgth){
                break;
            }
            if(it==offst){
                start=true;
            }
            if(!start){
                continue;
            }
            ++arrlgth;
            if(this.is_int(key)&&!preserve_keys){
                assoc[no_pk_idx++]=arr[key];
            }else{
                assoc[key]=arr[key];
            }
        }
        return assoc;
}
if(lgth===undefined){
    return arr.slice(offst);
}else if(lgth>=0){
    return arr.slice(offst,offst+lgth);
}else{
    return arr.slice(offst,lgth);
}
}
function array_splice(arr,offst,lgth,replacement){
    var _checkToUpIndices=function(arr,ct,key){
        if(arr[ct]!==undefined){
            var tmp=ct;
            ct+=1;
            if(ct===key){
                ct+=1;
            }
            ct=_checkToUpIndices(arr,ct,key);
            arr[ct]=arr[tmp];
            delete arr[tmp];
        }
        return ct;
    };

    if(replacement&&typeof replacement!=='object'){
        replacement=[replacement];
    }
    if(lgth===undefined){
        lgth=offst>=0?arr.length-offst:-offst;
    }else if(lgth<0){
        lgth=(offst>=0?arr.length-offst:-offst)+lgth;
    }
    if(!(arr instanceof Array)){
        var lgt=0,ct=-1,rmvd=[],rmvdObj={},repl_ct=-1,int_ct=-1;
        var returnArr=true,rmvd_ct=0,rmvd_lgth=0,key='';
        for(key in arr){
            lgt+=1;
        }
        offst=(offst>=0)?offst:lgt+offst;
        for(key in arr){
            ct+=1;
            if(ct<offst){
                if(this.is_int(key)){
                    int_ct+=1;
                    if(parseInt(key,10)===int_ct){
                        continue;
                    }
                    _checkToUpIndices(arr,int_ct,key);
                    arr[int_ct]=arr[key];
                    delete arr[key];
                }
                continue;
            }
            if(returnArr&&this.is_int(key)){
                rmvd.push(arr[key]);
                rmvdObj[rmvd_ct++]=arr[key];
            }else{
                rmvdObj[key]=arr[key];
                returnArr=false;
            }
            rmvd_lgth+=1;
            if(replacement&&replacement[++repl_ct]){
                arr[key]=replacement[repl_ct];
            }else{
                delete arr[key];
            }
        }
        return returnArr?rmvd:rmvdObj;
}
if(replacement){
    replacement.unshift(offst,lgth);
    return Array.prototype.splice.apply(arr,replacement);
}
return arr.splice(offst,lgth);
}
function array_sum(array){
    var key,sum=0;
    if(typeof array!=='object'){
        return null;
    }
    for(key in array){
        sum+=(array[key]*1);
    }
    return sum;
}
function array_udiff(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var arr='',i=1,k1='',k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(arr[k],arr1[k1])===0){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_udiff_assoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var arr={},i=1,k1='',k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(arr[k],arr1[k1])===0&&k===k1){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_udiff_uassoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1],cb0=arguments[arguments.length-2];
    var k1='',i=1,k='',arr={};

    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
    cb0=(typeof cb0==='string')?this.window[cb0]:(cb0 instanceof Array)?this.window[cb0[0]][cb0[1]]:cb0;
        arr1keys:for(k1 in arr1){
        for(i=1;i<arguments.length-2;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb0(arr[k],arr1[k1])===0&&cb(k,k1)===0){
                    continue arr1keys;
                }
            }
            retArr[k1]=arr1[k1];
        }
    }
    return retArr;
}
function array_uintersect(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var k1='',i=1,arr={},k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(arr[k],arr1[k1])===0){
                    if(i===arguments.length-2){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_uintersect_assoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1];
    var k1='',i=1,arr={},k='';
    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length-1;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb(arr[k],arr1[k1])===0&&k===k1){
                    if(i===arguments.length-2){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_uintersect_uassoc(){
    var arr1=arguments[0],retArr={},cb=arguments[arguments.length-1],cb0=arguments[arguments.length-2];
    var k1='',i=1,k='',arr={};

    cb=(typeof cb==='string')?this.window[cb]:(cb instanceof Array)?this.window[cb[0]][cb[1]]:cb;
    cb0=(typeof cb0==='string')?this.window[cb0]:(cb0 instanceof Array)?this.window[cb0[0]][cb0[1]]:cb0;
        arr1keys:for(k1 in arr1){
        arrs:for(i=1;i<arguments.length-2;i++){
            arr=arguments[i];
            for(k in arr){
                if(cb0(arr[k],arr1[k1])===0&&cb(k,k1)===0){
                    if(i===arguments.length-3){
                        retArr[k1]=arr1[k1];
                    }
                    continue arrs;
                }
            }
            continue arr1keys;
        }
    }
    return retArr;
}
function array_unique(inputArr){
    var key='',tmp_arr2={},val='';
    var __array_search=function(needle,haystack){
        var fkey='';
        for(fkey in haystack){
            if(haystack.hasOwnProperty(fkey)){
                if((haystack[fkey]+'')===(needle+'')){
                    return fkey;
                }
            }
        }
        return false;
};

for(key in inputArr){
    if(inputArr.hasOwnProperty(key)){
        val=inputArr[key];
        if(false===__array_search(val,tmp_arr2)){
            tmp_arr2[key]=val;
        }
    }
}
return tmp_arr2;
}
function array_unshift(array){
    var i=arguments.length;
    while(--i!==0){
        arguments[0].unshift(arguments[i]);
    }
    return arguments[0].length;
}
function array_values(input){
    var tmp_arr=[],cnt=0;
    var key='';
    for(key in input){
        tmp_arr[cnt]=input[key];
        cnt++;
    }
    return tmp_arr;
}
function array_walk(array,funcname,userdata){
    var key;
    if(typeof array!=='object'||array===null){
        return false;
    }
    for(key in array){
        if(typeof(userdata)!=='undefined'){
            eval(funcname+'( array [key] , key , userdata  )');
        }else{
            eval(funcname+'(  userdata ) ');
        }
    }
    return true;
}
function array_walk_recursive(array,funcname,userdata){
    var key;
    if(typeof array!='object'){
        return false;
    }
    for(key in array){
        if(typeof array[key]=='object'){
            return this.array_walk_recursive(array[key],funcname,userdata);
        }
        if(typeof(userdata)!='undefined'){
            eval(funcname+'( array [key] , key , userdata  )');
        }else{
            eval(funcname+'(  userdata ) ');
        }
    }
    return true;
}

function arsort(inputArr,sort_flags){
    var valArr=[],keyArr=[],k,i,ret,sorter,that=this,strictForIn=false,populateArr={};

    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(b,a);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return(a-b);
        };

        break;
        case'SORT_REGULAR':default:
            sorter=function(a,b){
            if(a>b){
                return 1;
            }
            if(a<b){
                return -1;
            }
            return 0;
        };

        break;
    }
    var bubbleSort=function(keyArr,inputArr){
        var i,j,tempValue,tempKeyVal;
        for(i=inputArr.length-2;i>=0;i--){
            for(j=0;j<=i;j++){
                ret=sorter(inputArr[j+1],inputArr[j]);
                if(ret>0){
                    tempValue=inputArr[j];
                    inputArr[j]=inputArr[j+1];
                    inputArr[j+1]=tempValue;
                    tempKeyVal=keyArr[j];
                    keyArr[j]=keyArr[j+1];
                    keyArr[j+1]=tempKeyVal;
                }
            }
            }
        };

this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(k in inputArr){
    if(inputArr.hasOwnProperty(k)){
        valArr.push(inputArr[k]);
        keyArr.push(k);
        if(strictForIn){
            delete inputArr[k];
        }
    }
}
try{
    bubbleSort(keyArr,valArr);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[keyArr[i]]=valArr[i];
}
return strictForIn||populateArr;
}


function asort(inputArr,sort_flags){
    var valArr=[],keyArr=[],k,i,ret,sorter,that=this,strictForIn=false,populateArr={};

    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(a,b);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return(a-b);
        };

        break;
        case'SORT_REGULAR':default:
            sorter=function(a,b){
            if(a>b){
                return 1;
            }
            if(a<b){
                return -1;
            }
            return 0;
        };

        break;
    }
    var bubbleSort=function(keyArr,inputArr){
        var i,j,tempValue,tempKeyVal;
        for(i=inputArr.length-2;i>=0;i--){
            for(j=0;j<=i;j++){
                ret=sorter(inputArr[j+1],inputArr[j]);
                if(ret<0){
                    tempValue=inputArr[j];
                    inputArr[j]=inputArr[j+1];
                    inputArr[j+1]=tempValue;
                    tempKeyVal=keyArr[j];
                    keyArr[j]=keyArr[j+1];
                    keyArr[j+1]=tempKeyVal;
                }
            }
            }
        };

this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(k in inputArr){
    if(inputArr.hasOwnProperty(k)){
        valArr.push(inputArr[k]);
        keyArr.push(k);
        if(strictForIn){
            delete inputArr[k];
        }
    }
}
try{
    bubbleSort(keyArr,valArr);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[keyArr[i]]=valArr[i];
}
return strictForIn||populateArr;
}

function count(mixed_var,mode){
    var key,cnt=0;
    if(mixed_var===null){
        return 0;
    }else if(mixed_var.constructor!==Array&&mixed_var.constructor!==Object){
        return 1;
    }
    if(mode==='COUNT_RECURSIVE'){
        mode=1;
    }
    if(mode!=1){
        mode=0;
    }
    for(key in mixed_var){
        if(mixed_var.hasOwnProperty(key)){
            cnt++;
            if(mode==1&&mixed_var[key]&&(mixed_var[key].constructor===Array||mixed_var[key].constructor===Object)){
                cnt+=this.count(mixed_var[key],1);
            }
        }
    }
    return cnt;
}

function end(arr){
    this.php_js=this.php_js||{};

    this.php_js.pointers=this.php_js.pointers||[];
    var indexOf=function(value){
        for(var i=0,length=this.length;i<length;i++){
            if(this[i]===value){
                return i;
            }
        }
        return -1;
};

var pointers=this.php_js.pointers;
if(!pointers.indexOf){
    pointers.indexOf=indexOf;
}
if(pointers.indexOf(arr)===-1){
    pointers.push(arr,0);
}
var arrpos=pointers.indexOf(arr);
if(!(arr instanceof Array)){
    var ct=0;
    for(var k in arr){
        ct++;
        var val=arr[k];
    }
    if(ct===0){
        return false;
    }
    pointers[arrpos+1]=ct-1;
    return val;
}
if(arr.length===0){
    return false;
}
pointers[arrpos+1]=arr.length-1;
return arr[pointers[arrpos+1]];
}

function krsort(inputArr,sort_flags){
    var tmp_arr={},keys=[],sorter,i,k,that=this,strictForIn=false,populateArr={};

    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(b,a);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return(b-a);
        };

        break;
        case'SORT_REGULAR':default:
            sorter=function(a,b){
            if(a<b){
                return 1;
            }
            if(a>b){
                return -1;
            }
            return 0;
        };

        break;
    }
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            keys.push(k);
        }
    }
    keys.sort(sorter);
this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(i=0;i<keys.length;i++){
    k=keys[i];
    tmp_arr[k]=inputArr[k];
    if(strictForIn){
        delete inputArr[k];
    }
}
for(i in tmp_arr){
    if(tmp_arr.hasOwnProperty(i)){
        populateArr[i]=tmp_arr[i];
    }
}
return strictForIn||populateArr;
}
function ksort(inputArr,sort_flags){
    var tmp_arr={},keys=[],sorter,i,k,that=this,strictForIn=false,populateArr={};

    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(a,b);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return((a+0)-(b+0));
        };

        break;
        default:
            sorter=function(a,b){
            if(a>b){
                return 1;
            }
            if(a<b){
                return -1;
            }
            return 0;
        };

        break;
    }
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            keys.push(k);
        }
    }
    keys.sort(sorter);
this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(i=0;i<keys.length;i++){
    k=keys[i];
    tmp_arr[k]=inputArr[k];
    if(strictForIn){
        delete inputArr[k];
    }
}
for(i in tmp_arr){
    if(tmp_arr.hasOwnProperty(i)){
        populateArr[i]=tmp_arr[i];
    }
}
return strictForIn||populateArr;
}


function max(){
    var ar,retVal,i=0,n=0;
    var argv=arguments,argc=argv.length;
    var _obj2Array=function(obj){
        if(obj instanceof Array){
            return obj;
        }else{
            var ar=[];
            for(var i in obj){
                ar.push(obj[i]);
            }
            return ar;
        }
    };

var _compare=function(current,next){
    var i=0,n=0,tmp=0;
    var nl=0,cl=0;
    if(current===next){
        return 0;
    }else if(typeof current=='object'){
        if(typeof next=='object'){
            current=_obj2Array(current);
            next=_obj2Array(next);
            cl=current.length;
            nl=next.length;
            if(nl>cl){
                return 1;
            }else if(nl<cl){
                return -1;
            }else{
                for(i=0,n=cl;i<n;++i){
                    tmp=_compare(current[i],next[i]);
                    if(tmp==1){
                        return 1;
                    }else if(tmp==-1){
                        return -1;
                    }
                }
                return 0;
        }
    }else{
    return -1;
}
}else if(typeof next=='object'){
    return 1;
}else if(isNaN(next)&&!isNaN(current)){
    if(current==0){
        return 0;
    }else{
        return(current<0?1:-1);
    }
}
else if(isNaN(current)&&!isNaN(next)){
    if(next==0){
        return 0;
    }else{
        return(next>0?1:-1);
    }
}else{
    if(next==current){
        return 0;
    }else{
        return(next>current?1:-1);
    }
}
};

if(argc===0){
    throw new Error('At least one value should be passed to max()');
}else if(argc===1){
    if(typeof argv[0]==='object'){
        ar=_obj2Array(argv[0]);
    }else{
        throw new Error('Wrong parameter count for max()');
    }
    if(ar.length===0){
        throw new Error('Array must contain at least one element for max()');
    }
}else{
    ar=argv;
}
retVal=ar[0];
for(i=1,n=ar.length;i<n;++i){
    if(_compare(retVal,ar[i])==1){
        retVal=ar[i];
    }
}
return retVal;
}


function min(){
    var ar,retVal,i=0,n=0;
    var argv=arguments,argc=argv.length;
    var _obj2Array=function(obj){
        if(obj instanceof Array){
            return obj;
        }else{
            var ar=[];
            for(var i in obj){
                ar.push(obj[i]);
            }
            return ar;
        }
    };

var _compare=function(current,next){
    var i=0,n=0,tmp=0;
    var nl=0,cl=0;
    if(current===next){
        return 0;
    }else if(typeof current=='object'){
        if(typeof next=='object'){
            current=_obj2Array(current);
            next=_obj2Array(next);
            cl=current.length;
            nl=next.length;
            if(nl>cl){
                return 1;
            }else if(nl<cl){
                return -1;
            }else{
                for(i=0,n=cl;i<n;++i){
                    tmp=_compare(current[i],next[i]);
                    if(tmp==1){
                        return 1;
                    }else if(tmp==-1){
                        return -1;
                    }
                }
                return 0;
        }
    }else{
    return -1;
}
}else if(typeof next=='object'){
    return 1;
}else if(isNaN(next)&&!isNaN(current)){
    if(current==0){
        return 0;
    }else{
        return(current<0?1:-1);
    }
}else if(isNaN(current)&&!isNaN(next)){
    if(next==0){
        return 0;
    }else{
        return(next>0?1:-1);
    }
}else{
    if(next==current){
        return 0;
    }else{
        return(next>current?1:-1);
    }
}
};

if(argc===0){
    throw new Error('At least one value should be passed to min()');
}
else if(argc===1){
    if(typeof argv[0]==='object'){
        ar=_obj2Array(argv[0]);
    }
    else{
        throw new Error('Wrong parameter count for min()');
    }
    if(ar.length===0){
        throw new Error('Array must contain at least one element for min()');
    }
}else{
    ar=argv;
}
retVal=ar[0];
for(i=1,n=ar.length;i<n;++i){
    if(_compare(retVal,ar[i])==-1){
        retVal=ar[i];
    }
}
return retVal;
}

function natcasesort(inputArr){
    var valArr=[],keyArr=[],k,i,ret,that=this,strictForIn=false,populateArr={};

    var bubbleSort=function(keyArr,inputArr){
        var i,j,tempValue,tempKeyVal;
        for(i=inputArr.length-2;i>=0;i--){
            for(j=0;j<=i;j++){
                ret=that.strnatcasecmp(inputArr[j+1],inputArr[j]);
                if(ret<0){
                    tempValue=inputArr[j];
                    inputArr[j]=inputArr[j+1];
                    inputArr[j+1]=tempValue;
                    tempKeyVal=keyArr[j];
                    keyArr[j]=keyArr[j+1];
                    keyArr[j+1]=tempKeyVal;
                }
            }
            }
        };

this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(k in inputArr){
    if(inputArr.hasOwnProperty(k)){
        valArr.push(inputArr[k]);
        keyArr.push(k);
        if(strictForIn){
            delete inputArr[k];
        }
    }
}
try{
    bubbleSort(keyArr,valArr);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[keyArr[i]]=valArr[i];
}
return strictForIn||populateArr;
}
function natsort(inputArr){
    var valArr=[],keyArr=[],k,i,ret,that=this,strictForIn=false,populateArr={};

    var bubbleSort=function(keyArr,inputArr){
        var i,j,tempValue,tempKeyVal;
        for(i=inputArr.length-2;i>=0;i--){
            for(j=0;j<=i;j++){
                ret=that.strnatcmp(inputArr[j+1],inputArr[j]);
                if(ret<0){
                    tempValue=inputArr[j];
                    inputArr[j]=inputArr[j+1];
                    inputArr[j+1]=tempValue;
                    tempKeyVal=keyArr[j];
                    keyArr[j]=keyArr[j+1];
                    keyArr[j+1]=tempKeyVal;
                }
            }
        }
    };

this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(k in inputArr){
    if(inputArr.hasOwnProperty(k)){
        valArr.push(inputArr[k]);
        keyArr.push(k);
        if(strictForIn){
            delete inputArr[k];
        }
    }
}
try{
    bubbleSort(keyArr,valArr);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[keyArr[i]]=valArr[i];
}
return strictForIn||populateArr;
}

function in_array(needle,haystack,argStrict){
    var key='',strict=!!argStrict;
    if(strict){
        for(key in haystack){
            if(haystack[key]===needle){
                return true;
            }
        }
        }else{
    for(key in haystack){
        if(haystack[key]==needle){
            return true;
        }
    }
    }
    return false;
}

function range(low,high,step){
    var matrix=[];
    var inival,endval,plus;
    var walker=step||1;
    var chars=false;
    if(!isNaN(low)&&!isNaN(high)){
        inival=low;
        endval=high;
    }else if(isNaN(low)&&isNaN(high)){
        chars=true;
        inival=low.charCodeAt(0);
        endval=high.charCodeAt(0);
    }else{
        inival=(isNaN(low)?0:low);
        endval=(isNaN(high)?0:high);
    }
    plus=((inival>endval)?false:true);
    if(plus){
        while(inival<=endval){
            matrix.push(((chars)?String.fromCharCode(inival):inival));
            inival+=walker;
        }
    }
    else{
    while(inival>=endval){
        matrix.push(((chars)?String.fromCharCode(inival):inival));
        inival-=walker;
    }
}
return matrix;
}


function reset(arr){
    this.php_js=this.php_js||{};

    this.php_js.pointers=this.php_js.pointers||[];
    var indexOf=function(value){
        for(var i=0,length=this.length;i<length;i++){
            if(this[i]===value){
                return i;
            }
        }
        return -1;
};

var pointers=this.php_js.pointers;
if(!pointers.indexOf){
    pointers.indexOf=indexOf;
}
if(pointers.indexOf(arr)===-1){
    pointers.push(arr,0);
}
var arrpos=pointers.indexOf(arr);
if(!(arr instanceof Array)){
    for(var k in arr){
        if(pointers.indexOf(arr)===-1){
            pointers.push(arr,0);
        }else{
            pointers[arrpos+1]=0;
        }
        return arr[k];
    }
    return false;
}
if(arr.length===0){
    return false;
}
pointers[arrpos+1]=0;
return arr[pointers[arrpos+1]];
}


function rsort(inputArr,sort_flags){
    var valArr=[],k='',i=0,sorter=false,that=this,strictForIn=false,populateArr=[];
    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(b,a);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return(b-a);
        };

        break;
        case'SORT_REGULAR':default:
            sorter=function(a,b){
            if(a<b){
                return 1;
            }
            if(a>b){
                return -1;
            }
            return 0;
        };

        break;
    }
    this.php_js=this.php_js||{};

    this.php_js.ini=this.php_js.ini||{};

    strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
    populateArr=strictForIn?inputArr:populateArr;
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            valArr.push(inputArr[k]);
            if(strictForIn){
                delete inputArr[k];
            }
        }
    }
    valArr.sort(sorter);
for(i=0;i<valArr.length;i++){
    populateArr[i]=valArr[i];
}
return strictForIn||populateArr;
}

function shuffle(inputArr){
    var valArr=[],k='',i=0,strictForIn=false,populateArr=[];
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            valArr.push(inputArr[k]);
            if(strictForIn){
                delete inputArr[k];
            }
        }
    }
    valArr.sort(function(){
    return 0.5-Math.random();
});
this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(i=0;i<valArr.length;i++){
    populateArr[i]=valArr[i];
}
return strictForIn||populateArr;
}

function sizeof(mixed_var,mode){
    return this.count(mixed_var,mode);
}

function sort(inputArr,sort_flags){
    var valArr=[],keyArr=[],k='',i=0,sorter=false,that=this,strictForIn=false,populateArr=[];
    switch(sort_flags){
        case'SORT_STRING':
            sorter=function(a,b){
            return that.strnatcmp(a,b);
        };

        break;
        case'SORT_LOCALE_STRING':
            var loc=this.i18n_loc_get_default();
            sorter=this.php_js.i18nLocales[loc].sorting;
            break;
        case'SORT_NUMERIC':
            sorter=function(a,b){
            return(a-b);
        };

        break;
        case'SORT_REGULAR':default:
            sorter=function(a,b){
            if(a>b){
                return 1;
            }
            if(a<b){
                return -1;
            }
            return 0;
        };

        break;
    }
    this.php_js=this.php_js||{};

    this.php_js.ini=this.php_js.ini||{};

    strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
    populateArr=strictForIn?inputArr:populateArr;
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            valArr.push(inputArr[k]);
            if(strictForIn){
                delete inputArr[k];
            }
        }
    }
    valArr.sort(sorter);
for(i=0;i<valArr.length;i++){
    populateArr[i]=valArr[i];
}
return strictForIn||populateArr;
}

function uasort(inputArr,sorter){
    var valArr=[],keyArr=[],tempKeyVal,tempValue,ret,k='',i=0,strictForIn=false,populateArr={};

    if(typeof sorter==='string'){
        sorter=this[sorter];
    }else if(sorter instanceof Array){
        sorter=this[sorter[0]][sorter[1]];
    }
    var sorterNew=function(keyArr,valArr){
        for(var i=valArr.length-2;i>=0;i--){
            for(var j=0;j<=i;j++){
                ret=sorter(valArr[j+1],valArr[j]);
                if(ret<0){
                    tempValue=valArr[j];
                    valArr[j]=valArr[j+1];
                    valArr[j+1]=tempValue;
                    tempKeyVal=keyArr[j];
                    keyArr[j]=keyArr[j+1];
                    keyArr[j+1]=tempKeyVal;
                }
            }
            }
        };

this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(k in inputArr){
    if(inputArr.hasOwnProperty(k)){
        valArr.push(inputArr[k]);
        keyArr.push(k);
        if(strictForIn){
            delete inputArr[k];
        }
    }
}
try{
    sorterNew(keyArr,valArr);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[keyArr[i]]=valArr[i];
}
return strictForIn||populateArr;
}


function uksort(inputArr,sorter){
    var tmp_arr={},keys=[],i=0,k='',strictForIn=false,populateArr={};

    if(typeof sorter==='string'){
        sorter=this.window[sorter];
    }
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            keys.push(k);
        }
    }
    try{
    if(sorter){
        keys.sort(sorter);
    }else{
        keys.sort();
    }
}catch(e){
    return false;
}
this.php_js=this.php_js||{};

this.php_js.ini=this.php_js.ini||{};

strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
populateArr=strictForIn?inputArr:populateArr;
for(i=0;i<keys.length;i++){
    k=keys[i];
    tmp_arr[k]=inputArr[k];
    if(strictForIn){
        delete inputArr[k];
    }
}
for(i in tmp_arr){
    if(tmp_arr.hasOwnProperty(i)){
        populateArr[i]=tmp_arr[i];
    }
}
return strictForIn||populateArr;
}


function usort(inputArr,sorter){
    var valArr=[],k='',i=0,strictForIn=false,populateArr={};

    if(typeof sorter==='string'){
        sorter=this[sorter];
    }else if(sorter instanceof Array){
        sorter=this[sorter[0]][sorter[1]];
    }
    this.php_js=this.php_js||{};

    this.php_js.ini=this.php_js.ini||{};

    strictForIn=this.php_js.ini['phpjs.strictForIn']&&this.php_js.ini['phpjs.strictForIn'].local_value&&this.php_js.ini['phpjs.strictForIn'].local_value!=='off';
    populateArr=strictForIn?inputArr:populateArr;
    for(k in inputArr){
        if(inputArr.hasOwnProperty(k)){
            valArr.push(inputArr[k]);
            if(strictForIn){
                delete inputArr[k];
            }
        }
    }
    try{
    valArr.sort(sorter);
}catch(e){
    return false;
}
for(i=0;i<valArr.length;i++){
    populateArr[i]=valArr[i];
}
return strictForIn||populateArr;
}