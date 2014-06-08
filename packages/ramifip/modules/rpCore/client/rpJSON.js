/**
 * Ramifip JSON Library for Javascript
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

var rpJSON = {
    uho : !!{}.hasOwnProperty,
    m : {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    },
    eString: function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = this.m[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                Math.floor(c / 16).toString(16) +
                (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    },
    eArray: function(o){
        var a = ["["], b, i, l = o.length, v;
        for (i = 0; i < l; i += 1) {
            v = o[i];
            switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (b) {
                        a.push(',');
                    }
                    a.push(v === null ? "null" : this.eAny(v));
                    b = true;
            }
        }
        a.push("]");
        return a.join("");
    },
    eDate: function(o){
        var m = o.getMonth() + 1, d = o.getDate(), h = o.getHours(), i = o.getMinutes(), s = o.getSeconds(), y = o.getFullYear();
        m = (m < 10?"0":"") + m;
        d = (d < 10?"0":"") + d;
        h = (h < 10?"0":"") + h;
        i = (i < 10?"0":"") + i;
        s = (s < 10?"0":"") + s;
        return '"' + y + "-" + m + "-" + d + "T" + h + ":" + i + ":" + s + '"';
    },
    eAny: function() {
        var e;
        return function(o) {
            e = !e? this.encode: e;
            return e(o);
        };
    },
    decode: function(json){
        return eval("(" + json + ')');
    },
    encode: function(o){
        if(!isset(o) || o === null) return "null";
        else if(rpDataType.isArray(o)) return this.eArray(o);
        else if(rpDataType.isDate(o)) return this.eDate(o);
        else if(rpDataType.isString(o)) return this.eString(o);
        else if(typeof o == "number") return isFinite(o) ? String(o) : "null";
        else if(rpDataType.isBoolean(o)) return String(o);
        else {
            var a = ["{"], b, i, v;
            for (i in o)
                if(!o.getElementsByTagName)
                    if(!this.uho || o.hasOwnProperty(i)) {
                        v = o[i];
                        switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if (b)
                                    a.push(',');
                                a.push(" "+ i, ":",
                                    v === null ? "null" : this.encode(v));
                                b = true;
                        }
                    }

            a.push("}");
            return a.join("");
        }
    },
    d: function (json){
        return this.decode(json);
    },
    e: function (o){
        return this.encode(o);
    }
}

// End of file