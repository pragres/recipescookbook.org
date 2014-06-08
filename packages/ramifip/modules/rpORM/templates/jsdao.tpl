//<script type = "text/javascript">

/**
 * {$classname} Javascript Data Access Object
 *
 * @updated {/div.now: Y-m-d h:i:s/}
 */
 
{$classname}Table = {
	add: function(data){
		var obj = {};
		obj.EVENT = 'ramifip/modules/rpORM/events/addEntity';
		obj.ENTITY = '{$classname}';
		//[$fields]
		if (isset(data.{$name})) obj.field_{$classname}_{$name} = data.{$name};
		//[/$fields]
		return ramifip.loadObjectFromEvent(obj);
	},
	
	set: function(data){
		var obj = {};
		obj.EVENT = 'ramifip/modules/rpORM/events/setEntity';
		obj.ENTITY = '{$classname}';
		//[$primary_keys]
		if (isset(data.{$value})) obj.key_{$classname}_{$value} = data.{$value};
		//[/$primary_keys]
		//[$fields]
		if (isset(data.{$name})) obj.field_{$classname}_{$name} = data.{$name};
		//[/$fields]
		return ramifip.loadObjectFromEvent(obj);
	},
	
	remove: function(keys){
		var obj = {};
		obj.EVENT = 'ramifip/modules/rpORM/events/delEntity';
		obj.ENTITY = '{$classname}';
		//[$primary_keys]
		if (isset(keys.{$value})) obj.key_{$classname}_{$value} = keys.{$value};
		//[/$primary_keys]
		return ramifip.loadObjectFromEvent(obj);	
	},
	
	get: function(keys){
		var obj = {};
		obj.EVENT = 'ramifip/modules/rpORM/events/getEntity';
		obj.ENTITY = '{$classname}';
		//[$primary_keys]
		if (isset(keys.{$value})) obj.key_{$classname}_{$value} = keys.{$value};
		//[/$primary_keys]
		return ramifip.loadObjectFromEvent(obj);
	},
	
	getAll: function(params){
		obj.EVENT = 'ramifip/modules/rpORM/events/getCollection';
		obj.ENTITY = '{$classname}';
		return ramifip.loadObjectFromEvent(params);
	}
};

/**
 * {$classname} Entity
 * 
 * @updated {/div.now: Y-m-d h:i:s/}
 */
{$classname}Entity = function(properties, construct, load){
    
    if (!isset(construct)) construct = true;
    if (!isset(load)) load = true;
    if (!isset(properties)) properties = null;
    
    if (is_null(properties)) {
    	load = false;
    	construct = false;
    }
    
    var obj = {};
    if (construct == true){
		obj = {$classname}Table.add(properties);
	} else if (load == true) {
		obj = {$classname}Table.get(properties);
	} else {
		obj = properties;
	}
	
	//[$fields]
	if (isset(obj.{$name})) this.{$name} = obj.{$name}; else this.{$name} = null;
	this.get{$property_name} = function(){
		var keys = {};
		//[$primary_keys]
		keys.{$value} = this.{$value};
		//[/$primary_keys]
		var o = {$classname}Table.get(keys);
		this.{$name} = o.{$name};
		return o.{$name};
	};
	
	this.set{$property_name} = function(value){
		var data = {};
		//[$primary_keys]
		data.{$value} = this.{$value};
		//[/$primary_keys]
		data.{$name} = value;
		this.{$name} = value;
		return {$classname}Table.set(data);
	};
	//[/$fields] 
	
	//[$foreign_methods]
	this.add{$rcn} = function(properties){
		//[$fks]
		//[$fields]
		properties.{$localfield} = this.{$foreign_key}; 
		//[/$fields]
		//[/$fks]
		var obj = new {$rcn}Entity(properties);
		return obj;
	};
	
	this.get{$rcn}Rows = function(params){
		if (!isset(params)) params = {};
		if (!isset(params.where)) params.where = "TRUE";
		where = "";
		//[$fks]
		//[$fields]
		var v = this.{$foreign_key};
		if ("" + v == "" || is_null(v)) return [];
		if (is_string(v)){
			v = addslashes(v);
			v = "'" + v + "'";
		}
		where += "{$localfield} = " + v;
		//!$_is_last
		where  += " AND ";
		//$_is_last!
		//[/$fields]
		//[/$fks]
		
		params.where = "(" + where + ") AND (" + params.where + ")";
		var col = {$rcn}Table.getAll(params);
		return col;
	};
	//[/$foreign_methods]
};
//</script>