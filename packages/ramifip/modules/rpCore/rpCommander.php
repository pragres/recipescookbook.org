<?php

/**
 * Ramifip Commander
 *
 * This file is part of the Ramifip PHP Framework.
 *
 * @author Rafael Rodriguez Ramirez <rafa@pragres.com>
 */

class rpCommander extends rpCLI{

	/**
	 * Run the commander
	 *
	 */
	static function Run(){
		echo "\n";
		echo "---------------------------\n";
		echo "Ramifip Commander\n";
		echo "---------------------------\n";
		echo "Welcome developer!\n\n";

		do {
			$exit = false;

			$command = self::input("$ ");

			$parts = explode(" ",$command);
			if (isset($parts[0])) $com = trim($parts[0]); else continue;

			if ($com == "exit") break;

			$methods = get_class_methods("rpCommander");

			if (in_array("cmd_$com", $methods)){
				unset($parts[0]);
				eval("self::cmd_$com(\$parts);");
			} else {
				if ($com !== "") echo "'$com' is not recognized as an internal command\n";
			}

		} while($exit == false);

	}

	// COMMANDS

	static function cmd_addpkg($args){

		$id = self::input("ID: ");
		$name = self::input("Name: ");
		$description = self::input("Description: ");
		$group = self::input("Group: ");
		$version = self::input("Version: ");
		$path = self::input("Folder: ");

		if (!rpFileSystem::folderExists($path)){
			mkdir(PACKAGES.$path,0,true);
		}

		$tpl = new div("ramifip/modules/rpCore/templates/package.tpl", array(
			"id" => $id,
			"name" => $name,
			"description" => $description,
			"group" => $group,
			"version" => $version
		));

		file_put_contents(PACKAGES."$path/$id.package","$tpl");

		echo "\nThe package $id was created successfull!\n";
	}

	static function cmd_addapp($args){

		$folder = self::input("Folder: ");
		$author = self::input("Author: ");

		if (!rpFileSystem::folderExists($folder)){
			mkdir(PACKAGES.$folder,0,true);
		}
		$data = array(
			"folder" => $folder,
			"author" => $author
		);

		$tpl = new div("ramifip/modules/rpCore/templates/app.php.tpl", $data);
		file_put_contents(PACKAGES."$folder/app.php", "$tpl");

		$tpl = new div("ramifip/modules/rpCore/templates/app.js.tpl", $data);
		file_put_contents(PACKAGES."$folder/app.js", "$tpl");

		echo "\nThe applications app.php and app.js was created successfull in $folder/!\n";
	}

	static function cmd_help($args){
		echo "\nRamifip Commander - The list of commands\n";
		$help = new div("ramifip/modules/rpCore/templates/commander_help", array());
		echo "\n$help\n";
	}

	static function cmd_setup($args){
		if (isset($args[1]) && isset($args[2])){
			$setup = new rpPropertiesFile("ramifip.ini", false);
			$setup->$args[1] = $args[2];
			$tpl = new div("ramifip/modules/rpCore/templates/ramifip.ini.tpl",$setup);
			file_put_contents("ramifip.ini", "$tpl");
		}
	}

	static function cmd_list($args){

		if (isset($args[1])){
			switch($args[1]){
				case 'packages':
					$list = rpFileSystem::listFiles(PACKAGES, "package");
					echo str_repeat("-",60)."\n";
					foreach($list as $item){
						echo "  PACKAGE | ".substr(str_replace(".package","",$item), strlen(PACKAGES))."\n";
					}
					echo str_repeat("-",60)."\n";
					break;
				case 'jobs':
					echo str_repeat("-",60)."\n";
					$list = rpFileSystem::listFiles(ROBOT."jobs","php");
					foreach($list as $item)	{
						$prop = new rpPropertiesFile($item, false, true);
						if (!isset($prop->name)) $prop->name = "";
						echo " JOB | ".substr(str_replace(".php","",$item), strlen(ROBOT."job/")+1)." - {$prop->name} \n";
					}
					echo str_repeat("-",60)."\n";
					break;
				case "class":
					$classes = rpClassToolkit::getAllClasses();
					ksort($classes);
					foreach($classes as $class => $prop){
						echo str_repeat (" ",20 - strlen($class))."$class |".$prop['path']."\n";
					}

					break;
				case "events":

					break;
				default:
					$list = rpFileSystem::listFiles(PACKAGES, $args[1]);
					if (count($list) > 0){
						echo str_repeat("-",60)."\n";
							
						$i =0;
						foreach($list as $item)	{
							$i++;
							$size = 0;
							if (!is_dir($item)) $size = filesize($item)/1024;
							$int = intval($size); if ($int == 0) $int = " ";
							$size = str_repeat(" ", 10 - strlen("$int")).number_format($size, 3)." KB";
							echo $size." | ".substr($item,strlen(PACKAGES))."\n";
							if ($i % 20 == 0){
								$s = self::input("Press ENTER to continue...");
							}
						}
						echo str_repeat("-",60)."\n";
					}
					break;
			}
		}
	}

	static function cmd_robot($args){

		if (isset($args[1])){
			switch($args[1]){

				// Adding a job
				case "addjob":
					if (isset($args[2])){

						$id = $args[2];
						$exists = false;
						$dir = scandir(ROBOT."jobs");
						if (file_exists(ROBOT."jobs/$id.php")) $exists = true;

						foreach($dir as $entry){
							if (strtolower($entry) == strtolower("$id.php")){
								$exists = true;
								break;
							}
						}

						if ($exists == true){
							echo "The job $id was exists!\n";
						} else {
							echo "\n Type this optional job information:\n\n";

							$description = self::input("Description: ");
							$author = self::input("Author: ");
							$email = self::input("Email: ");
							$web = self::input("Web: ");

							if (substr($web,0,7)=="http://") $web = substr($web,7);

							$tpl = new div("ramifip/modules/rpCore/templates/job.tpl", array(
								"id" => $id,
								"description" => $description,
								"author" => $author,
								"email" => $email,
								"web" => $web
							));

							file_put_contents(ROBOT."jobs/$id.php", "$tpl");

							echo "\n\nThe skeleton of job $id was created. \nNow you can program in robot/jobs/$id.php\n\n";
						}
					} else {
						echo "Please, specify the job's ID\n";
					}
					break;

					// list jobs
				case "jobs":
					self::cmd_list(array("","jobs"));
					break;


			}
		} else {
			include ROBOT."robot.php";
		}
	}
}

// End of file