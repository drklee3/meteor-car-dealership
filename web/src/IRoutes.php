<?php
    declare(strict_types = 1);

    interface IRoutes {
        function __construct(string $routes_path);
        public function get_routes(): array;
    }
