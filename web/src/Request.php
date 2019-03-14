<?php
    declare(strict_types = 1);

    include_once __DIR__ . "/IRequest.php";

    class Request implements IRequest {
        function __construct() {
            $this->bootstrap_self();
        }

        private function bootstrap_self(): void {
            foreach($_SERVER as $key => $value) {
                $this->{strtolower($key)} = $value;
            }
        }

        /**
         * Gets the base URI without url parameters
         *
         * @return string
         */
        public function get_base_uri(): string {
            return strtok($this->request_uri, "?");
        }

        /**
         * Gets the body for a request
         *
         * @return array|null
         */
        public function get_body(): ?array {
            if($this->request_method !== "POST") {
                return null;
            }

            return $_POST;
        }

        /**
         * Fetch bind variables array from request body
         *
         * @return array
         */
        public function get_bind_variables(): ?array {
            $body = $this->get_body();
            if (!isset($body["binds"])) {
                return null;
            }
            error_log(json_encode($_POST));
            error_log(json_encode($body));
            return $body["binds"];
        }
    }