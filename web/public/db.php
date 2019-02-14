<?php
require '../vendor/autoload.php';
// require_once '../vendor/vlucas/phpdotenv/src/Dotenv.php';
// require_once '../vendor/vlucas/phpdotenv/src/Loader.php';

$dotenv = Dotenv\Dotenv::create("../src/");
$dotenv->load();

echo $_ENV['TEST'];

/*
$conn = oci_connect('username', 'password', '//dbserver.engr.scu.edu/db11g');
if($conn) {
	print "<br> connection successful";
} else {
	$e = oci_error;
	print "<br> connection failed:";
	print htmlentities($e['message']);
	exit;
}*/
?>
