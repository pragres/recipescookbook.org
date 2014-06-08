<?php

/**
 * Ramifip Abstraction of an Application
 *
 * This file is part of the Ramifip PHP Framework.
 * 
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

abstract class rpApplication {

    public static $title = "Welcome";

    /**
     * Check access of events
     * 
     * @param string $event
     * @return bool
     */
    public static function checkEventAccess($event) {
        return true;
    }

    /**
     * Check access of routers
     *
     * @param string $type
     * @param string $path
     * @return bool
     */
    public static function checkRouterAccess($type, $path) {
        return true;
    }
    
    /**
     * Return the custom HTML of header
     * 
     * @return string
     */
    public static function getHTMLHeaders(){
    	return "";
    }

    /**
     * Hook before event
     * 
     * @return boolean
     */
    public static function beforeEvent(){
        return true;
    }

    /**
     * Hook after router
     * 
     * @return boolean
     */
    public static function afterEvent(){
        return true;
    }

    /**
     * Hook before router
     *
     * @param string $type
     * @param string $path
     * @return bool
     */
    public static function beforeRouter($type, $path){
    	return true;
    }
    
	/**
     * Hook after router
     *
     * @param string $type
     * @param string $path
     * @return bool
     */
    public static function afterRouter($type, $path){
    	return true;
    }

    /**
     * Verify HTTP Authentication
     *
     * @param string $user
     * @param string $pass
     * @return bool
     */
	public static function verifyHTTPAuth($user, $pass){
		return false;
	}
	
	/**
	 * Return the default Database Driver of the Application
	 * 
	 * @return rpDBDriver
	 */
	public static function getDBDriver($orm_id = null){
		if (!class_exists("rpDBDriver")){
			throw new rpException("The module Ramifip Databse Driver is not installed");
		}
		throw new rpException("Some method need the app::getDBDriver method for connect to their database");
	}
}

// End of file