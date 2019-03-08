<?php
    declare(strict_types = 1);

    # dependencies
    include_once __DIR__ . "/../vendor/autoload.php";

    # other stuff
    include_once __DIR__ . "/Database.php";
    include_once __DIR__ . "/Migrations.php";
    include_once __DIR__ . "/Request.php";
    include_once __DIR__ . "/Router.php";
    include_once __DIR__ . "/Routes.php";

    // error logging
    error_reporting(E_ALL);
    ini_set("ignore_repeated_errors", "1");
    ini_set("log_errors", "1");
    

    // run migrations
    $mig = new Migrations("../migrations/", "../.migrations");
    $db  = new Database();
    try {
        $mig->start($db);
    } catch (Exception $e) {
        error_log("Error running migrations" . $e);
        $err = array(
            "error" => "Failed to connect to database",
        );
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode($err, JSON_PRETTY_PRINT);
        return;
    }

    // get current request (post data etc)
    $req = new Request();
    // read routes from file
    $routes = new Routes(__DIR__ . "/routes.json");
    // router on base url /api/*
    $router = new Router($req, "/api");

    $routes_list = $routes->get_routes();

    // build routes from file
    foreach ($routes_list as $path => $values) {
        // destructure values array
        list($method, $query_type, $file) = $values;
        // build absolute file path
        $file_path = __DIR__ . "/../sql/" . $file;

        // closure function, requires variables from parent scope
        $func = function () use ($db, $query_type, $file_path, $req) {
            $msg = null;


            try {
                // try running the query
                $res = $db->run_query($query_type, $file_path, $req);

                // no response
                if ($res === null) {
                    // give succ message
                    $msg = array("result" => "success");
                } else {
                    // has response
                    list($nrows, $rows) = $res;
                    // give data
                    $msg = array(
                        "result" => "success",
                        "num_rows" => $nrows,
                        "rows" => $rows,
                    );
                }

            } catch (Exception $e) {
                // had an oopsies, give error
                $msg = array(
                    "result" => "error",
                    "message" => $e,
                );
            }

            // respond in json
            return json_encode($msg, JSON_PRETTY_PRINT);
        };

        // add path to router
        // equivalent to $router->{$method}($path, $func, "application/json")
        call_user_func_array(
            array($router, strtolower($method)),
            // i guess rn it's all json responses
            array($path, $func, "application/json"),
        );
    }

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

