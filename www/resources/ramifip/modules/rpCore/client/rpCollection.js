/**
 * Ramifip Javascript Collection
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

var rpCollection = function(){
    this.data = [];

    this.addItem = function(value){
        this.data.push(value);
    };
	
	this.addIfNotExists = function(value){
		var idx = this.search(value);
		if (idx == null)
			this.addItem(value);
	};

    this.getLength = function(){
        return this.data.length;
    };

    this.removeItem = function(index){
        var l = this.getLength();
        if (index >= 0 && index <= l){
            for(var i = index; i < l - 1; i++){
                this.data[i] = this.data[i + 1];
            }
        }
        this.data.pop();
    };

	this.search = function(value){
		var l = this.getLength();
        for(var i = 0; i < l; i++){
            if (this.data[i] == value)
				return i;
        }
		return null;
	};

	this.searchAndRemove = function(value){
		var idx = this.search(value);
		if (idx != null)
			this.removeItem(idx);
	};

    this.getItem = function(index){
        return this.data[index];
    };

    this.insertItem = function(index, value){
        this.data.push(this.data[l - 1]);
        var l = this.getLength();
        for(var i = l - 1; i > index; i--){
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = value;
    };
    
    this.foreach = function(f, fstop, changeValues){
        var v = null;

        if (changeValues == null || typeof changeValues =='undefined')
            changeValues = true;

        for(var i = 0; i < this.data.length; i++){
            v = f(this.data[i]);

            if (changeValues == true)
                if (typeof v != 'undefined')
                    this.data[i] = v;

             if (isset(fstop))
                if (fstop(this.data[i]) == true)
                    return v;
        }
        
        return null;
    };
}

// End of file