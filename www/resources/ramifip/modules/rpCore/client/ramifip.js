/**
 * Ramifip Javascript Layer
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

var ramifip = {
    log: {
        max_logs: 50,
        logs: new rpCollection(),
        add: function(msg){
            ramifip.log.logs.addItem({
                moment: date("y-m-d h:i:s"),
                msg: msg
            });
            if (ramifip.log.logs.getLength() > ramifip.log.max_logs)
                ramifip.log.logs.removeItem(0);
        }
    },
	cache: {
		default_life_time: 60,
		data: new rpCollection(),
		add: function(id, value){
			ramifip.cache.data.addItem({
				id: id,
				value: value,
				time: date("d:h:i")
			});
		},
		clean: function(){
			var tmp = new rpCollection();
			for(var i in this.data.data){
				var c = this.data.data[i];
				var t = date("d:h:i");
				var arr = explode(":",t);
				
				var d1 = arr[0];
				var h1 = arr[1];
				var m1 = arr[2];
				
				arr = explode(":", c.time);
				
				var d2 = arr[0];
				var h2 = arr[1];
				var m2 = arr[2];
				
				m1 = h1 * 60 + m1;
				m2 = h2 * 60 + m2;
				var dif = 0;
				if (d1 == d2){
					dif = d1 - d2;
				} else {
					dif = ((23 * 60 + 60) - d2) + d1;
				}
				
				if (dif< this.default_life_time){
					tmp.addItem(c);
				}
			}
			this.data = tmp;
		},
		get: function(id){
			this.clean();
			for (var i in this.data.data) {
				var c = this.data.data[i];
				if (c.id == id){
					return c.value;
				}
			}
			return null;
		}
	},
    usage_history: [],
    addUsageHistory: function(pkg) {
        this.usage_history[this.usage_history.length] = pkg;
    },
    getUsageHistory: function(pkg){
        for(var i in this.usage_history){
            if (this.usage_history[i] == pkg)
                return true;
        }
        return false;
    },
    paths: [],
    config: {
        show_ajax_status: true
    },
    DEBUG_MODE: false,

    /**
     * Return TRUE if DOM element exists
     */
    elementExists: function(id){
        return document.getElementById(id) != null;
    },

    removeFromArray: function(arr, index){
        if (arr.length > 1){
            arr[index] = arr[arr.length - 1];
        }
        arr.pop();
        return arr;
    },
	
	addGlobalVar: function(vname, value){
		window[vname] = value;
	}

};

// ------------------ Some functions ------------------- //
/**
 * Clone isset() PHP function
 */
function isset(v){
    return typeof v !== 'undefined';
}

/**
 * Translate message
 */
function t(m){
    var temp = new rpApplication("Translator");
    ramifip.log.add("Translating message " + m);
    var o = temp.loadObjectFromEvent({
        EVENT: "ramifip/server/events/translator",
        message: m
    });
    ramifip.log.add("Message translated " + o.result);
    return o.result;
}

/**
 * Clone for JS of function u() in PHP side of Ramifip 
 * 
 * @param string ppackages
 * @param boolean force
 */
function u(ppackages, force){
    if (!isset(force)) force = false;
    if (ramifip.getUsageHistory(ppackages) == false || force == true){
        ramifip.log.add("Using packages " + ppackages);
        jQuery.ajax({
            url: WWW + CLEAN_URL_BACK_PATH + "index.php",
            type: "POST",
            dataType: "html",
            async: false,
            data: {
                EVENT: "ramifip/modules/rpCore/events/usage",
                packages: ppackages
            },
            complete:  function(res, status){
                if (status == "success" || status == "notmodified") {
					//$('body').append('<script type="text/javascript">' + res.responseText + '</script>');
					$('body').append('<script type="text/javascript" src="' + CLEAN_URL_BACK_PATH + 'js.php?f='+ppackages+'"/>');
					//eval(res.responseText);
				}
            }
        });
        ramifip.addUsageHistory(ppackages);
    }
}

function e(object){
    return rpJSON.encode(object);
}

function d(str){
    return rpJSON.decode(str);
}

/**
 * Complete object properties
 */
function cop(o, p){
	for(var i in p){
		if (!isset(o[i]))
			eval('o.' + i + ' = p.' + i + ';');
	}
	return o;
}


function img(path, properties, default_image){
	if (isset(default_image))
		default_image = "&default=" + default_image;
	else	
		default_image = "";
    var html = '<img src = "' + CLEAN_URL_BACK_PATH + 'img.php?f=' + path + default_image + '" ' + properties + '>';
    return html;
}

/**
 * Get value from $_GET
 * Clone of Ramifip PHP function get()
 */
function get(key, dv /*default value*/){
    if (!isset(dv))
        dv = null;
    if (isset($_GET[key]))
        return $_GET[key];
    return dv;
}


/**
 * Get value from $_POST
 * Clone of Ramifip PHP function post()
 */
function post(key, dv /*default value*/){
    if (!isset(dv))
        dv = null;
    if (isset($_POST[key]))
        return $_POST[key];
    return dv;
}

/**
 * Return a valid url
 * @param <type> $url
 * @return string
 */
function url(url, for_not_clean_url) {
	if (!isset(url))
		url = "index.php";
	if (!isset(for_not_clean_url))
		for_not_clean_url = "?q=";
	
    self = PHP_SELF;
    self = str_replace("index.php", "", self);
    if (ramifip.use_clean_url == true)
        self = self + url;
    else
        self = self + for_not_clean_url + url;

    return self;
}

/**
 * Return a valid html link
 * @param <type> $url
 * @param <type> $caption
 * @param <type> $title
 * @param <type> $target
 * @return string
 */
function l(url, caption, title, target) {
	if (!isset(url))
		url = "index.php";
	if (!isset(caption))
		caption = "";
	if (!isset(title))
		title = "";
	if (!isset(target))
		target = "";
    if (caption == "")
        caption = url;

    url = url(url);

    l = "<a href = \""+ url + "\"";
    if (target != "")
        l = l + " target = \"" + target + "\" ";

    if (title != "")
        l = l + " title = \"" + title + "\" ";

    l = l + ">" + caption + "</a>";

    return $l;
};

// ----------------------------
// Now, create the app object!
// ----------------------------

var app = new rpApplication(); 

// End of file