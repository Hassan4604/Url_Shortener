<?php

class Response
{
    public static function json($data, $status = 200)
    {
        http_response_code($status);
        header("Content-Type: application/json");

        echo json_encode($data);
        exit;
    }

    public static function success($message, $data = null)
    {
        self::json([
            "success" => true,
            "message" => $message,
            "data" => $data
        ]);
    }

    public static function error($message, $status = 400)
    {
        self::json([
            "success" => false,
            "message" => $message
        ], $status);
    }

    public static function unauthorized($message = "Unauthorized")
    {
        self::error($message, 401);
    }

    public static function notFound($message = "Resource not found")
    {
        self::error($message, 404);
    }

    public static function validationError($errors)
    {
        self::json([
            "success" => false,
            "errors" => $errors
        ], 422);
    }
}