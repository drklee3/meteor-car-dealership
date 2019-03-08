<?php
    declare(strict_types = 1);

    require_once __DIR__ . "/../vendor/autoload.php";
    require_once __DIR__ . "/Util.php";

    interface IDatabase {
        public function get_connection();
        public function execute(string $sql);
        public function get_results(string $sql);
    }

    /**
     * Database connections
     */
    class Database implements IDatabase {
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
         * Runs SQL statement with optional rows to be returned and optional
         * binding variables
         *
         * @param string $action "execute" || "get_results"
         * @param string $sql    SQL statement to execute
         * @param array $binds   binding variables to oracle placeholders
         * @return array|null
         */
        private function run_statement(string $action, string $sql, array $binds = null): ?array {
            $conn = $this->get_connection();

            $stid = oci_parse($conn, $sql);

            // bind parameters
            if ($binds !== null && count($binds)) {
                foreach ($binds as $placeholder => $value) {
                    // Example #3 Binding with a foreach() loop
                    // https://secure.php.net/manual/en/function.oci-bind-by-name.php
                    // oci_bind_by_name($stid, $key, $val) does not work
                    // because it binds each placeholder to the same location: $val
                    // instead use the actual location of the data: $ba[$key]
                    oci_bind_by_name($stid, $placeholder, $binds[$placeholder]);
                }
            }

            $res = oci_execute($stid);

            if ($res === FALSE) {
                $e = oci_error($conn);
                trigger_error(htmlentities($e["message"]), E_USER_ERROR);
                throw new Exception("Error running statement: " . $e["message"]);
            }

            // no return values for execute, don't run oci_fetch_all
            if ($action === "execute") {
                return null;
            }

            // The outer array will contain one sub-array per query row.
            // statement, output, skip, maxrows, flags
            $nrows = oci_fetch_all($stid, $rows, 0, -1, OCI_FETCHSTATEMENT_BY_ROW);

            return array($nrows, $rows);
        }

        /**
         * Executes a SQL statement without response
         *
         * @param string $sql
         * @param array $binds php variables to bind to oracle placeholders
         * @return void
         */
        public function execute(string $sql, array $binds = null): void {
            $this->run_statement("execute", $sql, $binds);
        }

        /**
         * Executes a SQL statement from file without response.
         * Use absolute paths to prevent any relative path errors by
         * concatenating __DIR__
         *
         * @param string $file_path
         * @return void
         */
        public function execute_file(string $file_path, array $binds = null): void {
            $sql = read_file($file_path);
            $this->execute($sql, $binds);
        }
        
        /**
         * Runs a SQL query and gets all rows returned
         *
         * @param string $sql
         * @return array [# of returned rows, rows]
         */
        public function get_results(string $sql, array $binds = null): array {
            return $this->run_statement("get_results", $sql, $binds);
        }

        /**
         * Runs a SQL query from file and gets all rows returned
         * Same as execute_file, use absolute paths to prevent any relative
         * path errors by concatenating __DIR__
         *
         * @param string $file_path Path to SQL file
         * @return array [# of returned rows, rows]
         */
        public function get_results_file(string $file_path, array $binds = null): array {
            $sql = read_file($file_path);
            return $this->get_results($sql, $binds);
        }

        /**
         * Runs a query from type to file
         *
         * @param string $type "get_results" || "execute"
         * @param string $file SQL file
         * @return array|null
         */
        public function run_query(string $type, string $file_path, IRequest $req = null): ?array {
            if ($req !== null) {
                $binds = $req->get_bind_variables();
            }

            // run results
            if ($type === "get_results") {
                return $this->get_results_file($file_path, $binds);
            }

            if ($type === "execute") {
                $this->execute_file($file_path, $binds);
                return null;
            }

            error_log("Invalid query type");
        }
	}
