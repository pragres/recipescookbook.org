<?php

class app extends RecipesControl {

	static $access_denied = false;

	/**
	 * Verify authentication
	 *
	 */
	static function verifyAuth() {
		if (!isset($_SESSION['recipes_user'])) {
			if (isset($_POST['btnLogin'])) {
				$user = self::getUser(post("edtUser"));
				if ($user != null) {
					if (isset($user->password)) {

						if ($user->password === post("edtPassword"))
						$_SESSION['recipes_user'] = $user->user;
						else
						self::$access_denied = true;
					}
					else
					self::$access_denied = true;
				}
				else
				self::$access_denied = true;
			}
		}
	}

	/**
	 * Show the administration page
	 *
	 */
	static function showAdminPage(){
		$data = RecipesModel::getStatistics();
		$data['section'] = 'recipes/admin/design/statistics';
		e('recipes/admin/design/admin', $data);
	}

	/**
	 * Show the authentication page
	 *
	 */
	static function showAuthPage(){
		echo new rpPage("recipes/admin/design/auth", array(
				"access_denied" => self::$access_denied
		));
	}

	/**
	 * Run the application
	 *
	 */
	static function Run(){
		self::verifyAuth();
		$user = self::getAuthUser();
		if ($user === null){
			self::showAuthPage();
		} else {
			self::showAdminPage();
		}
	}
}

// End of file