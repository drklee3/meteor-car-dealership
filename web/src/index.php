<?php
    require_once "../vendor/autoload.php";
    require_once "migrations.php";
    require_once "database.php";

    echo "hello world<br>";

    $mig = new Migrations("../migrations/", "../.migrations");
    $db = new Database;
    $conn = $db->get_connection();
    $mig->start($conn);
?>
