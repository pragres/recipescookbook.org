<?php

// event-type: return-object

/**
 * Ramifip Event Core
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

class core extends rpEvent {

    /**
     * getClientIPAddress
     * @param <type> $params
     */
    // event-action: getServerProperties
    public function getServerProperties($params) {

        echo "{";
        echo "ip: '" . rpNetwork::getClientIPAddress() . "',";
        echo "document_name: '" . ramifip::getDocumentName() . "',";
        echo "protocol: '" . rpURL::getProtocol() . "',";
        echo "url_self: '" . rpURL::getURLSelf() . "',";
        echo "host: '" . rpURL::getHost() . "'";
        echo "}";
    }

    /**
     * Set language
     * @param <type> $lang
     */
    // event-action: setLang
    public function setLang($params) {
        rpTranslator::setLang($params->lang);
    }

    /**
     * folderExists
     * @param <type> $path
     * @return <type>
     */
    // event-action: folderExists
    public function folderExists($params) {
        return rpFileSystem::folderExists($params->path);
    }

    /**
     * fileExists
     * @param <type> $path
     * @return <type>
     */
    // event-action: fileExists
    public function fileExists($params) {
        return rpFileSystem::fileExists($params->path);
    }

}

// End of file