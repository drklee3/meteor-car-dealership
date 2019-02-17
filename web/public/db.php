<?php
	declare(strict_types=1);
	require "../vendor/autoload.php";

	$dotenv = Dotenv\Dotenv::create("../");
	$dotenv->load();
	
	$conn = oci_pconnect(
		getenv("ORACLE_USR"),
		getenv("ORACLE_PWD"),
		getenv("ORACLE_URL")
	);

	if ($conn) {
		print "connection successful yea boiiiiiiiii<br>\n";
		// $stid = oci_parse($conn, "CREATE TABLE test(ayy INTEGER PRIMARY KEY)");
		// oci_execute($stid);
		$stid2 = oci_parse($conn, "INSERT INTO test VALUES (19)");
		oci_execute($stid2);

		$sql = 'SELECT * FROM test';
		$stid3 = oci_parse($conn, $sql);
		oci_execute($stid3);
		while (($row = oci_fetch_array($stid3, OCI_ASSOC)) != false) {
			echo $row['AYY'] ."<br>\n";
		}
	} else {
		$e = oci_error();
		print "connection failed: ";
		print htmlentities($e["message"]);
	}
?>
