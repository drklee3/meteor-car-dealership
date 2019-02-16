<?php
	declare(strict_types=1);

	require "../vendor/autoload.php";
	// require_once "../vendor/vlucas/phpdotenv/src/Dotenv.php";
	// require_once "../vendor/vlucas/phpdotenv/src/Loader.php";

	$dotenv = Dotenv\Dotenv::create("../");
	$dotenv->load();

	$conn = oci_connect($_ENV["ORACLE_USR"], $_ENV["ORACLE_PWD"], $_ENV["ORACLE_URL"]);
	if($conn) {
		print "connection successful yea boiiiiiiiii";
	} else {
		$e = oci_error();
		print "connection failed: ";
		print htmlentities($e["message"]);
		exit;
	}
?>
