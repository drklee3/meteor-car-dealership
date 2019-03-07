<?php
    declare(strict_types = 1);

    require_once "../vendor/autoload.php";
    require_once "migrations.php";
    require_once "database.php";

    include_once "Request.php";
    include_once "Router.php";

    // error logging
    error_reporting(E_ALL);                          // Error engine - always ON!
    ini_set("ignore_repeated_errors", "1");          // always ON
    ini_set("log_errors", "1");                      // Error logging

    // run migrations
    $mig = new Migrations("../migrations/", "../.migrations");
    $db = new Database;
    try {
        $mig->start($db);
    } catch (Exception $e) {
        error_log("Error running migrations" . $e);
        echo "Error running migrations: " . $e;
    }

    error_log("test error");

    // run router
    $router = new Router(new Request);

    $router->get("/", function () {
        return "<p>Hello world</p>";
    });
    
    $router->get("/profile", function ($request) {
        return "profile";
    });

    $router->get("/server", function ($request) {
        return json_encode($_SERVER, JSON_PRETTY_PRINT);
    }, "application/json");

    $router->post("/data", function ($request) {
        return json_encode($request->get_body(), JSON_PRETTY_PRINT);
    }, "application/json");

    $router->not_found(function ($request) {
        return "page not found!";
    });

