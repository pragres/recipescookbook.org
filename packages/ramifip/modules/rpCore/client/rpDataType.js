/**
 * Ramifip Datatypes Library for Javascript
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

var rpDataType = {
    isEmpty : function(v, allowBlank){
        return v === null || v === undefined || ((this.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
    },
    isArray : function(v){
        return toString.apply(v) === '[object Array]';
    },
    isDate : function(v){
        return toString.apply(v) === '[object Date]';
    },
    isObject : function(v){
        return !!v && Object.prototype.toString.call(v) === '[object Object]';
    },
    isPrimitive : function(v){
        return this.isString(v) || this.isNumber(v) || this.isBoolean(v);
    },
    isFunction : function(v){
        return toString.apply(v) === '[object Function]';
    },
    isNumber : function(v){
        return typeof v === 'number' && isFinite(v);
    },
    isString : function(v){
        return typeof v === 'string';
    },
    isBoolean : function(v){
        return typeof v === 'boolean';
    },
    isElement : function(v) {
        return v ? !!v.tagName : false;
    },
    /**
     * Convert collection to array
     */
    collectionToArray: function (collection, fields){
        var arr = [];
        var j = 0;
        for (var o in collection){
            var row = [];
            var i = 0;
            for (var f in fields){
                eval("row[i] = collection[o]." + fields[f] + ";");
                i++;
            }
            arr[j] = row;
            j++;
        }
        return arr;
    }
}

// End of file