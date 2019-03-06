<?php
    declare(strict_types = 1);

    require_once "../vendor/autoload.php";
    require_once "migrations.php";
    require_once "database.php";

    include_once "Request.php";
    include_once "Router.php";

    // run migrations
    $mig = new Migrations("../migrations/", "../.migrations");
    $db = new Database;
    try {
        $mig->start($db);
    } catch (Exception $e) {
        echo "Error running migrations: " . $e;
    }


    // run router
    $router = new Router(new Request);

    $router->get("/", function () {
        return "<p>Hello world</p>";
    });
    
    $router->get("/profile", function ($request) {
        return "profile";
    });

    $router->post("/data", function ($request) {
        return json_encode($request->get_body(), JSON_PRETTY_PRINT);
    });

    $router->not_found(function ($request) {
        return "page not found!";
    });

