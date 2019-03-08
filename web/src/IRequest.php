<?php
interface IRequest {
    public function get_body(): ?array;
    public function get_bind_variables(): ?array;
    public function get_base_uri(): string;
}
