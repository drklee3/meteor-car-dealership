<?php
	declare(strict_types = 1);
	require "../src/database.php";

	try {
		$db = new Database;
		$conn = $db->get_connection();
		$sql = "INSERT INTO test VALUES (6)";
		$stid = oci_parse($conn, $sql);
		oci_execute($stid);
		$sql = "SELECT * FROM test";
		$stid = oci_parse($conn, $sql);
		oci_execute($stid);
		$rows = oci_fetch_all($stid, $res);
		if ($rows == false) {
			echo "Failed to fetch rows";
			return;
		}

		echo json_encode($res);
	} catch (Exception $e) {
		echo "Caught exception: ",  $e->getMessage(), "\n";
	}
?>
