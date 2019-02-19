<?php
	declare(strict_types = 1);
    require_once "../vendor/autoload.php";
    
    /**
     * Database connections
     */
    class Database {
		function __construct() {
			$dotenv = Dotenv\Dotenv::create("../");
			$dotenv->load();
		}
        
        /**
         * Gets a database connection
         *
         * @return connection 
         */
		public function get_connection() {
			$conn = oci_pconnect(
				getenv("ORACLE_USR"),
				getenv("ORACLE_PWD"),
				getenv("ORACLE_URL")
			);

			if (!$conn) {
				$e = oci_error()["message"];
				throw new Exception("Failed to connect to the database: $e");
			}

			return $conn;
		}
	}
?>
