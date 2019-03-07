<?php
    declare(strict_types = 1);

    class Router {
        private $request;
        private $not_found;
        private $supportedHttpMethods = array(
            "GET",
            "POST",
        );

        function __construct(IRequest $request) {
            $this->request = $request;
        }
        
        /**
         * Set a new get / post request handler
         *
         * @param string $name Method name
         * @param array  $args Arguments
         * @return void
         */
        function __call(string $name, array $args): void {
            // 404
            if ($name == "not_found") {
                // $args[0] == method in this case
                $this->not_found = $args[0];
                return;
            }

            // push a null at end to prevent undefined offset error
            $args[] = null;

            // destructure arguments
            list($route, $method, $content_type) = $args;

            // check if method is supported
            if(!in_array(strtoupper($name), $this->supportedHttpMethods)) {
                $this->invalidMethodHandler();
            }

            // assign method[route] = function
            $this->{strtolower($name)}[$this->formatRoute($route)] = array($method, $content_type);
        }

        /**
         * Removes trailing forward slashes from the right of the route.
         *
         * @param string  $route
         * @return string trimmed route
         */
        private function formatRoute(string $route): string {
            $result = rtrim($route, '/');

            // root path
            if ($result === '') {
                return '/';
            }

            return $result;
        }

        /**
         * Sets the header to respond 405
         *
         * @return void
         */
        private function invalidMethodHandler(): void {
            header("{$this->request->server_protocol} 405 Method Not Allowed");
        }
        
        /**
         * Sets the header to respond 404
         *
         * @return void
         */
        private function defaultRequestHandler(): void {
            header("{$this->request->server_protocol} 404 Not Found");

            if ($this->not_found === null) {
                return;
            }

            // user defined 404 response
            echo call_user_func_array($this->not_found, array($this->request));
        }

        /**
         * Sets the content type for the response
         *
         * @param string $content_type
         * @return void
         */
        private function set_content_type(string $content_type): void {
            header("Content-Type: " . $content_type);
        }

        
        /**
         * Resolves the request to the corresponding path
         *
         * @return void
         */
        public function resolve(): void {
            $req_method = strtolower($this->request->request_method);
            if (!property_exists($this, $req_method) || !isset($this->$req_method)) {
                $this->defaultRequestHandler();
                return;
            }
            $method_dict = $this->$req_method;
            $formatted_route = $this->formatRoute($this->request->request_uri);

            if (!isset($method_dict[$formatted_route])) {
                $this->defaultRequestHandler();
                return;
            }

            // get the method from route
            list($method, $content_type) = $method_dict[$formatted_route];

            if ($content_type !== null) {
                $this->set_content_type($content_type);
            }

            // run the function and echo response
            echo call_user_func_array($method, array($this->request));
        }

        /**
         * Runs resolve on "exit"
         */
        public function __destruct() {
            $this->resolve();
        }
    }