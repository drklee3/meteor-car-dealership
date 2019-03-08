<?php
interface IRequest {
    public function get_body(): ?array;
    public function get_bind_variables(): ?array;
}
