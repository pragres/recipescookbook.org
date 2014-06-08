/**
 * Ramifip String Library for Javascript
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

var rpString = {

    /**
     * Construct a unique id
     * @name getReplica
     * @return <string>
     */
    getReplica: function(prefix, min, max, characters){
        if (!isset(prefix)) prefix = "";
        if (!isset(min)) min = 15;
        if (!isset(max)) max = 20;
        if (!isset(characters)) characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var c = characters;
        var count = rand(min,max);
        var s ='';
        for(i = 0; i < count; i++)
            s = s + substr(c, rand(0,strlen(c)-1), 1);
        var momento = str_replace("/","",date("d/m/y h:i:s"));
        momento=str_replace(" ","",momento);
        momento=str_replace(":","",momento);
        return prefix +  momento + time() + s;
    },
    /**
     * Check if char c exists in string s
     */
    checkChars: function(s, c){
        for(var i = 0; i< s.length; i++)
            if (strpos(c, s[i])===false)
                return false;
        return true;
    }
}

// End of file