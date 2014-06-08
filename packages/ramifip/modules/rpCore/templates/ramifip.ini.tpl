{strip}
# Ramifip PHP Framework - Setup{\n}
# The Run mode cant be a: development, debug or production 
# 	DEVELOPMENT MODE = - OPTIMIZATION + DEBUG MESSAGES
# 	DEBUG MODE = + OPTIMIZATION + DEBUG MESSAGES
# 	PRODUCTION MODE = + OPTIMIZATION - DEBUG MESSAGES{\n}

run_mode = "{$run_mode}"{\n}

# During the development of the project, maybe you are working in a folder 
# or sub-folder of the web server, for example http://localhost/myproject. 
# Then, specify the name of this directory in the following configuration parameter 
# and the robot will be able to generate correct htaccess files.
# Remember that the file htaccess that is in the directory root of the project 
# (myproject/www/.htaccess) should be created by you and the robot doesn't modify it.{\n}

folder_root = "{$folder_root}"{\n}

# Javascript Compression Mode: "none", "hot", "precompression" or "mixed"
#	NONE - Ramifip do not compress anything
#   HOT - Ramifip compress the javascript when the script are used  and ignored the precomression "*.min.js" (SLOWEST)
#   PRECOMPRESSION - Ramifip send to the browsers the precrompressed javascript files, resulting of the robot's job.(FASTEST)
#   MIXED - Ramifip compress the javascript when the used script was not precompressed and send precompressed 
#   file if it exists
#
#   Example of test:
#   Script                   Size       Load time
#   ----------------------------------------------
#   ramifip.min.js           4KB         146ms       << PRECOMPRESSION
#   ramifip.js               9.6KB       107ms       << NONE
#   ramifip.js&compression   4KB         283ms       << HOT
#
#   php.min.js               160KB       240ms       << PRECOMPRESSION
#   php.js                   83KB        165ms       << NONE
#   php.js&compression       83KB        2.7s        << HOT{\n}

js_compression_mode = "{$js_compression_mode}"{\n}

# Folder for storage the compressed js files, as a subfolder of FILES

js_compression_folder = "{$js_compression_folder}"{\n}

# CSS compression{\n}

css_compression = {$css_compression} {\n}

# Security section {\n}
?$available_hosts [$available_hosts] available_hosts[] = "{$value}" [/$available_hosts] $available_hosts?
?$http_authentication [$http_authentication] http_authentication[{$_key}] = {$value} {\n} [/$http_authentication] $http_authentication?{\n}

# Application's paths {\n}

?$app_php [$app_php] app_php[{$_key}] = "{$value}" 
[/$app_php] $app_php?
?$app_js [$app_js] app_js[{$_key}] = "{$value}"	
[/$app_js] $app_js?{\n}

# Config's paths
# config_js_part[] = "anotherpackage: anotherpackage/config"{\n}

# Global configuration for clean URL.{\n}

use_clean_url = {$use_clean_url}{\n}

# Controling session_start
#session_start[some_path_here] = false or true{\n}
{/strip}