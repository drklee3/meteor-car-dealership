<?php
    declare(strict_types = 1);

    interface IRoutes {
        public function __call(string $name, array $args): void;
        public function resolve(): void;
        public function __destruct();
    }
