<?php
    declare(strict_types = 1);

    include_once __DIR__ . "/IRoutes.php";
    include_once __DIR__ . "/Util.php";

    class Routes implements IRoutes {
        private $routes;
    
        function __construct(string $routes_path) {
            $content_str = read_file($routes_path);
            $content = json_decode($content_str, true);

            if ($content === null) {
                error_log("Failed to decode routes file");
                throw new Exception("Failed to decode routes file");
            }

            $this->routes = $content;
            $this->clean_routes();
        }

        /**
         * Remove routes that begin with __
         *
         * @return void
         */
        private function clean_routes(): void {
            foreach ($this->routes as $route => $data) {
                if (substr($route, 0, 2) === "__") {
                    unset($this->routes[$route]);
                    continue;
                }
            }
        }

        public function get_routes(): array {
            return $this->routes;
        }
    }
