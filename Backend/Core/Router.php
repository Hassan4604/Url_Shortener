<?php

class Router
{
    private array $routes = [];


    public function get($uri, $action, $middleware = [])
    {
        $this->routes['GET'][] = [
            "uri" => $uri,
            "action" => $action,
            "middleware" => $middleware
        ];
    }


    public function post($uri, $action, $middleware = [])
    {
        $this->routes['POST'][] = [
            "uri" => $uri,
            "action" => $action,
            "middleware" => $middleware
        ];
    }


    public function delete($uri, $action, $middleware = [])
    {
        $this->routes['DELETE'][] = [
            "uri" => $uri,
            "action" => $action,
            "middleware" => $middleware
        ];
    }



    public function dispatch($method, $uri)
    {
        if (!isset($this->routes[$method])) {
            Response::notFound("Route not found");
        }


        foreach ($this->routes[$method] as $route) {

            $params = $this->matchRoute(
                $route['uri'],
                $uri
            );


            if ($params !== false) {

                foreach ($route['middleware'] as $middleware) {
                    $middleware->handle();
                }


                [$controller, $action] = $route['action'];


                call_user_func_array(
                    [$controller, $action],
                    $params
                );

                return;
            }
        }


        Response::notFound("Route not found");
    }



    private function matchRoute($routeUri, $requestUri)
    {
        $routeParts = explode(
            '/',
            trim($routeUri, '/')
        );


        $requestParts = explode(
            '/',
            trim($requestUri, '/')
        );


        if (count($routeParts) !== count($requestParts)) {
            return false;
        }


        $params = [];


        foreach ($routeParts as $index => $part) {

            if (
                str_starts_with($part, '{') &&
                str_ends_with($part, '}')
            ) {

                $params[] = $requestParts[$index];

                continue;
            }


            if ($part !== $requestParts[$index]) {
                return false;
            }
        }


        return $params;
    }
}