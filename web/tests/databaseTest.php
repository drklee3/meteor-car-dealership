<?php
    declare(strict_types = 1);

    use PHPUnit\Framework\TestCase;

    final class databaseTest extends TestCase {
        protected $db;

        public function setUp(): void {
            $this->db = new Database;
        }

        protected function onNotSuccessfulTest(Throwable $t): void {
            // drop testing table
            $sql = "DROP TABLE testing123";
            $res = $this->db->execute($sql);

            fwrite(STDOUT, __METHOD__ . "\n");
            throw $t;
        }

        public function testGetResults(): void {
            
            $sql = "SELECT 1 + 1 AS SUM FROM DUAL";
            $res = $this->db->get_results($sql);
            $nrows = $res[0];
            $rows  = $res[1];

            echo json_encode($res);

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
            $nrows = $res[0];
            $rows = $res[1];

            echo json_encode($res);

            $this->assertEquals($nrows, 3);
            $this->assertEquals($rows, [
                ["VAL" => "1"],
                ["VAL" => "20"],
                ["VAL" => "80"]
            ]);
        }

        /**
         * Undocumented function
         *
         * @depends testInsertIntoTable
         */
        public function testDropTable(): void {
            $sql = "DROP TABLE testing123";

            $res = $this->db->execute($sql);
            $this->addToAssertionCount(1); // no exception thrown
        }
    }
?>