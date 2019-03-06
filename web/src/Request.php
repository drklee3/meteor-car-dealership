<?php
    declare(strict_types = 1);

    include_once 'IRequest.php';

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
         * Gets the body for a request
         *
         * @return array|null
         */
        public function get_body(): ?array {
            if($this->request_method !== "POST") {
                return null;
            }

            $body = array();

            foreach($_POST as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }
            return $body;
        }
    }