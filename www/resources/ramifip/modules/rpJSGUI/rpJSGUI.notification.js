/**
 * Ramifip JS GUI Notifications
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License
 * for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program as the file LICENSE.txt; if not, please see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 * 
 * @version 1.0
 * @link http://ramifip.com
 */

ramifip.gui.showNotification = function(html, timeout){
    if (!isset(timeout)) 
        timeout = 5000;
    $("body").append("<div class = \"hidden ramifip-notification\">" + html + "</div>");
    $(".ramifip-notification").fadeIn("slow");
    setTimeout("ramifip.gui.hideNotification()", 5000);
};

ramifip.gui.hideNotification = function(){
    $(".ramifip-notification").fadeOut("slow");
    $(".ramifip-notification").remove();
    setTimeout("$(\".ramifip-notification\").remove();", 2000);
};

// End of file