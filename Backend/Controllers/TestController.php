<?php

class TestController extends Controller
{

    public function profile()
    {
        Response::success(
            "Protected route working"
        );
    }


    public function user($id)
    {
        Response::success(
            "User route working",
            [
                "user_id" => $id
            ]
        );
    }


    public function short($code)
    {
        Response::success(
            "Short code received",
            [
                "code" => $code
            ]
        );
    }
}