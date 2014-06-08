
function preg_grep(pattern,input,flags){
    var p='',retObj={};

    var invert=(flags===1||flags==='PREG_GREP_INVERT');
    if(typeof pattern==='string'){
        pattern=eval(pattern);
    }
    if(invert){
        for(p in input){
            if(input[p].search(pattern)===-1){
                retObj[p]=input[p];
            }
        }
        }else{
    for(p in input){
        if(input[p].search(pattern)!==-1){
            retObj[p]=input[p];
        }
    }
    }
    return retObj;
}

function preg_quote(str,delimiter){
    return(str+'').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\'+(delimiter||'')+'-]','g'),'\\$&');
}