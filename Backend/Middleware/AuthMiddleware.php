<?php

class AuthMiddleware
{
    private JWT $jwt;
    private Request $request;

    public function __construct(JWT $jwt, Request $request)
    {
        $this->jwt = $jwt;
        $this->request = $request;
    }

    public function handle()
    {
        $header = $this->request->headers('Authorization');

        if (!$header) {
            Response::unauthorized("Authorization header is missing");
        }

        if (!str_starts_with($header, "Bearer ")) {
            Response::unauthorized("Invalid authorization header");
        }

        $token = substr($header, 7);

        $payload = $this->jwt->decode($token);


        if (!$payload) {
            Response::unauthorized("Invalid or expired token");
        }

        return $this->request->setUser($payload);

    }
}