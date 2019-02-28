<?php
    declare(strict_types = 1);

    class DirReadException extends Exception {
    }

    class Migrations {
        // path to migrations directory
        private $migrations_path;

        // list of migration files
        private $files;

        // path to history file
        private $hist_path;

        // list of already executed migrations
        private $history = array();

        // database
        private $db;

        public function __construct(
            string $migrations_path = "../migrations/",
            string $hist_path = "./.migrations") {
            // update paths
            $this->migrations_path = __DIR__ . "/" . $migrations_path;
            $this->hist_path = __DIR__ . "/" . $hist_path;
            
            // read history file
            $this->read_hist();
        }

        /**
         * Gets the migration history from file
         *
         * @return void
         */
        private function read_hist(): void {
            // file already exists, open
            if (file_exists($this->hist_path)) {
                $this->history = explode(
                    "\n",
                    file_get_contents($this->hist_path)
                );
            }
        }

        /**
         * Runs migrations
         *
         * @param resource $conn database connection
         * @return void
         */
        public function start($db): void {
            $this->read_dir();
            $this->db = $db;
            // execute 
            $this->run_migrations();
        }

        /**
         * Gets list of all migrations
         *
         * @return void
         */
        private function read_dir(): void {
            if (!file_exists($this->migrations_path)) {
                throw new Exception("Migrations path not found");
            }
            // get list of files
            $this->files = scandir($this->migrations_path);
            // remove "." and ".." files
            array_splice($this->files, 0, 2);

            // invalid path
            if (!$this->files) {
                throw new DirReadException("Failed to list migrations");
            }

            echo json_encode($this->files);
        }

        /**
         * Runs pending migrations
         *
         * @return void
         */
        private function run_migrations(): void {
            // get migrations that haven't been executed
            $pending_migrations = array_diff($this->files, $this->history);

            foreach ($pending_migrations as $mig) {
                $path = $this->migrations_path . $mig;
                
                // ignore empty paths
                if ($path === "") {
                    continue;
                }

                $sql = file_get_contents($path);

                // ignore empty migrations
                if ($sql !== "") {
                    $this->db->execute($sql);
                }

                // add query to history file
                $this->history[] = $mig;
            }
            
            // save migrations only if there were new ones run
            if (!empty($pending_migrations)) {
                $this->save_migrations();
            }
        }

        /**
         * Saves migrations to file
         *
         * @return void
         */
        private function save_migrations(): void {
            $bytes_written = file_put_contents(
                $this->hist_path,
                implode("\n", $this->history)
            );

            if ($bytes_written === false) {
                throw new Exception("Failed to write migration history file");
            }
        }
    }