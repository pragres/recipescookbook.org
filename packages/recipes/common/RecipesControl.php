<?php

/**
 * Mirta Recipes Common Control
 *
 */

class RecipesControl extends rpApplication {

	static $configuration = null;

	/**
	 * Get app's configuration
	 * @return rpPropertiesFile
	 */
	static function getConfiguration() {

		if (is_null(self::$configuration)){
			self::$configuration = new rpPropertiesFile(DATA."recipes-config/recipes.ini", false);
		}

		return self::$configuration;
	}

	/**
	 * Connect to database
	 *
	 */
	static function connectToDB() {
		if (objectDB::$connection == null) {
			$conf = self::getConfiguration();
			objectDB::connect($conf->dburl);
		}
	}

	/**
	 * Checking access to events
	 *
	 * @return boolean
	 */
	static function checkEventAccess($event) {

		$user = self::getAuthUser();
		if (is_null($user)) {

			// Access denied for ORM events
			if (substr($event, 0, strlen("recipes/common/model/orm/")) == "recipes/common/model/orm/")
			if (substr($event, 0, strlen("recipes/common/model/orm/addusercomments")) != "recipes/common/model/orm/addusercomments")
			return false;

			// Access denied for admin forms
			if (substr($event, 0, strlen("recipes/admin/view/forms/")) == "recipes/admin/view/forms/")
			return false;

			// Access denied for admin browsers
			if (substr($event, 0, strlen("recipes/admin/view/browsers/")) == "recipes/admin/view/browsers/")
			return false;
		}

		return true;
	}

	/**
	 * Get current user
	 *
	 * @return unknown
	 */
	static function getAuthUser() {
		if (isset($_SESSION['recipes_user']))
		return self::getUser($_SESSION['recipes_user']);
		return null;
	}

	/**
	 * Get user
	 *
	 * @param string $nick
	 * @return object
	 */
	static function getUser($nick) {
		if (file_exists(DATA . "recipes-config/users.json")) {
			$f = fopen(DATA . "recipes-config/users.json", "r");
			$s = "";
			while (!feof($f)) {
				$s .= fgets($f);
			}
			fclose($f);
			$json = new Services_JSON();
			$users = $json->decode($s);
			foreach ($users->users as $user) {
				if ($user->user === $nick)
				return $user;
			}
		}
		return null;
	}
}

// End of file