<?php

class Controller
{
    protected Request $request;

    public function __construct($request)
    {
        $this->request = $request;
    }
}
