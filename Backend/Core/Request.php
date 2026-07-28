<?php

class Request
{
    private $body;
    private ?array $user = null;

    public function __construct()
    {
        $this->body = json_decode(file_get_contents('php://input'), true) ?? [];
    }

    public function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function uri()
    {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $scriptPath = dirname($_SERVER['SCRIPT_NAME']);

    if (
        strtolower(substr($uri, 0, strlen($scriptPath))) 
        === strtolower($scriptPath)
    ) {
        $uri = substr($uri, strlen($scriptPath));
    }

    return '/' . trim($uri, '/');
    }

    public function body()
    {
        return $this->body;
    }

    public function input($key)
    {
        return $this->body[$key] ?? null;
    }

    public function headers($key)
    {
        $headers = getallheaders();

        return $headers[$key] ?? null;
    }

    public function query($key = null)
    {
        if ($key === null) {
            return $_GET;
        }

        return $_GET[$key] ?? null;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function user()
    {
        return $this->user;
    }

   
}