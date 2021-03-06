<?php
    declare(strict_types = 1);

    use PHPUnit\Framework\Error\Warning;

    include_once __DIR__ . "/../src/Database.php";

    use PHPUnit\Framework\TestCase;

    final class databaseTest extends TestCase {
        protected $db;

        public function setUp(): void {
            $this->db = new Database();
        }

        protected function onNotSuccessfulTest(Throwable $t): void {
            // drop testing table
            $sql = "DROP TABLE testing123";

            try {
                $res = $this->db->execute($sql);
            } catch (Exception $e) {
                // do nothing if this fails since some dont require this table
            }

            fwrite(STDOUT, __METHOD__ . "\n");
            throw $t;
        }

        public function testMigrations(): void {
            // run migrations
            $migrations_dir = __DIR__ . "/../migrations/";
            $migrations_file = __DIR__ . "/../.migrations";
            $mig = new Migrations($migrations_dir, $migrations_file);
            try {
                $mig->start($this->db);
            } catch (Exception $e) {
                $sql = "SELECT LINE, POSITION, TEXT FROM ALL_ERRORS";
                $res = $this->db->get_results($sql);
                $res_str = "";
                var_dump($res);
                foreach ($res[1] as $key => $val) {
                    $res_str .= $val["TEXT"];
                }

                error_log($res_str);

                throw $e;
            }

            $this->addToAssertionCount(1); // no exception thrown
        }

        public function testGetResults(): void {
            
            $sql = "SELECT 1 + 1 AS SUM FROM DUAL";
            $res = $this->db->get_results($sql);
            $nrows = $res[0];
            $rows  = $res[1];

            $this->assertEquals($nrows, 1);
            $this->assertEquals($rows, [["SUM" => "2"]]);
        }
        
        public function testExecuteCreateTable(): void {
            $sql = "CREATE TABLE testing123 (val INTEGER)";
            $res = $this->db->execute($sql);

            $this->addToAssertionCount(1); // no exception thrown
        }

        /**
         * @depends testExecuteCreateTable
         */
        public function testInsertIntoTable(): void {
            $sql = "
                BEGIN
                    INSERT INTO testing123 VALUES (1);
                    INSERT INTO testing123 VALUES (20);
                    INSERT INTO testing123 VALUES (80);
                END;";
            $res = $this->db->execute($sql);

            // get the values back
            $sql = "SELECT * FROM testing123";
            $res = $this->db->get_results($sql);
            list($nrows, $rows) = $res;

            $this->assertEquals($nrows, 3);
            $this->assertEquals($rows, [
                ["VAL" => "1"],
                ["VAL" => "20"],
                ["VAL" => "80"]
            ]);
        }

        /**
         * @depends testExecuteCreateTable
         */
        public function testInsertIntoTableFile() {
            $exec_path = __DIR__ . "/sql/test_exec.sql";
            $binds = array(
                ":val1" => 200,
                ":val2" => 300,
                ":val3" => 400,
            );

            $this->db->execute_file($exec_path, $binds);

            $select_path = __DIR__ . "/sql/test_select.sql";
            $binds = array(":search" => 300);

            // get the values back
            $sql = "SELECT * FROM testing123";
            $res = $this->db->get_results($sql);
            list($nrows, $rows) = $res;

            // added 3 more rows
            $this->assertEquals($nrows, 6);

            $res = $this->db->get_results_file($select_path, $binds);
            list($nrows, $rows) = $res;

            $this->assertEquals($nrows, 1);
            $this->assertEquals($rows, [
                ["VAL" => "300"]
            ]);
        }

        /**
         * Tests that running a query with binds unreplaced should fail
         *
         * @depends testExecuteCreateTable
         * @return void
         */
        public function testTooFewBinds() {
            $exec_path = __DIR__ . "/sql/test_exec.sql";
            $binds = array(
                ":val1" => 200, // just 1 bind ye
            );

            $this->expectException(Exception::class);
            $this->db->execute_file($exec_path, $binds);
        }

        /**
         * Tests that running a query without binds replaced should fail
         * 
         * @depends testExecuteCreateTable
         * @return void
         */
        public function testTooManyBinds() {
            $exec_path = __DIR__ . "/sql/test_exec.sql";
            $binds = array(
                ":val1" => 200,
                ":val2" => 300,
                ":val3" => 300,
                ":val4" => 300, // this ones extra
            );

            $this->expectException(Exception::class);
            $this->db->execute_file($exec_path, $binds);
        }

        /**
         * Tests binding an array
         *
         * @depends testExecuteCreateTable
         * @return void
         */
        public function testBindArray() {
            $exec_path = __DIR__ . "/sql/test_array.sql";

            $binds = array(
                ":numbers" => array(
                    999,
                    999,
                    999,
                    999,
                ),
            );

            $this->db->execute_file($exec_path, $binds);
            // get the values back
            $sql = "SELECT * FROM testing123 WHERE val = 999";
            $res = $this->db->get_results($sql);
            list($nrows, $rows) = $res;

            $this->assertEquals($nrows, 4);
        }

        /**
         * Drops the testing table
         *
         * @depends testInsertIntoTable
         * @depends testInsertIntoTableFile
         * @depends testTooFewBinds
         * @depends testTooManyBinds
         * @depends testBindArray
         */
        public function testDropTable(): void {
            $sql = "DROP TABLE testing123";

            $res = $this->db->execute($sql);
            $this->addToAssertionCount(1); // no exception thrown
        }
    }
?>