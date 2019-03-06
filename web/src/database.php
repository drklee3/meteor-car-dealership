<?php
	declare(strict_types = 1);
    require_once __DIR__ . "/../vendor/autoload.php";
    
    /**
     * Database connections
     */
    class Database {
		function __construct() {
			$dotenv = Dotenv\Dotenv::create(__DIR__ . "/../");
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
				$e = oci_error();
				throw new Exception("Failed to connect to the database: " . $e["message"]);
			}

			return $conn;
        }

        /**
         * Executes a SQL without response
         *
         * @param string $sql
         * @return void
         */
        public function execute(string $sql): void {
            $conn = $this->get_connection();

            $stid = oci_parse($conn, $sql);
            $res = oci_execute($stid);

            if ($res === FALSE) {
                $e = oci_error($conn);
                trigger_error(htmlentities($e["message"]), E_USER_ERROR);
                throw new Exception("Error running migrations: " . $e["message"]);
            }
        }
        
        /**
         * Runs a SQL query and gets all rows returned
         *
         * @param string $sql
         * @return array [# of returned rows, rows]
         */
        public function get_results(string $sql): array {
            $conn = $this->get_connection();

            $stid = oci_parse($conn, $sql);
            $res = oci_execute($stid);
            
            if ($res === FALSE) {
                $e = oci_error($conn);
                trigger_error(htmlentities($e["message"]), E_USER_ERROR);
                throw new Exception("Error running migrations: " . $e["message"]);
            }

            // The outer array will contain one sub-array per query row.
            $nrows = oci_fetch_all($stid, $rows, null, null, OCI_FETCHSTATEMENT_BY_ROW);

            return array($nrows, $rows);
        }
	}
?>
