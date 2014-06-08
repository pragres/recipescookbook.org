function class_exists(cls){
    var i='';
    cls=this.window[cls];
    if(typeof cls!=='function'){
        return false;
    }
    for(i in cls.prototype){
        return true;
    }
    for(i in cls){
        if(i!=='prototype'){
            return true;
        }
    }
    if(cls.toSource&&cls.toSource().match(/this\./)){
    return true;
}
return false;
}

function get_class(obj){
    if(obj instanceof Object&&!(obj instanceof Array)&&!(obj instanceof Function)&&obj.constructor&&obj!=this.window){
        var arr=obj.constructor.toString().match(/function\s*(\w+)/);
        if(arr&&arr.length==2){
            return arr[1];
        }
    }
    return false;
}

function method_exists(obj,method){
    if(typeof obj==='string'){
        return this.window[obj]&&typeof this.window[obj][method]==='function';
    }
    return typeof obj[method]==='function';
}

function property_exists(cls,prop){
    cls=(typeof cls==='string')?this.window[cls]:cls;
    if(typeof cls==='function'&&cls.toSource&&cls.toSource().match(new RegExp('this\\.'+prop+'\\s'))){
        return true;
    }
    return(cls[prop]!==undefined&&typeof cls[prop]!=='function')||(cls.prototype!==undefined&&cls.prototype[prop]!==undefined&&typeof cls.prototype[prop]!=='function')||(cls.constructor&&cls.constructor[prop]!==undefined&&typeof cls.constructor[prop]!=='function');
}