<?php
    declare(strict_types = 1);
    include_once __DIR__ . "/../database.php";

    // repair jobs
    $INSERT_REPAIR_JOB = "insert_repair_jobs.sql";
    $SELECT_REPAIR_JOB = "select_repair_jobs.sql";

    // 

    function get_repair_jobs(IDatabase $db, array $params) {
        $db->get_results_file($SELECT_REPAIR_JOB, $params);
    }

    function insert_repair_jobs(IDatabase $db, array $params) {
        $db->execute_file($INSERT_REPAIR_JOB, $params);
    }
