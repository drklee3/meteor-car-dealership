<?php
    declare(strict_types = 1);

    /**
     * Reads file content
     *
     * @param  string $file_path Path to file to read
     * @return string file content 
     */
    function read_file(string $file_path): string {
        if (!file_exists($file_path)) {
            error_log("Invalid file path: " . $file_path);
            throw new Exception("Failed to find file");
        }

        $file_content = file_get_contents($file_path);

        // empty strings should be falsy too i guess?
        // if problem reading file or empty file
        if ($file_content === false || $file_content === "") {
            error_log("Failed to read file: " . $file_path);
            throw new Exception("Failed to read file");
        }

        return $file_content;
    }
