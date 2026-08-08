<?php

//require_once __DIR__ . 'Controller.php';

class AuthController extends Controller
{
    private AuthService $auth;

    public function __construct(AuthService $auth, Request $request)
    {
        parent::__construct($request);

        $this->auth = $auth;
    }

    public function register()
    {
        $name = $this->request->input('name');
        $email = $this->request->input('email');
        $password = $this->request->input('password');

        $result = $this->auth->register(
            $name,
            $email,
            $password
        );

        if (!$result['success']) {
            Response::error($result['message']);
        }

        Response::success($result['message']);
    }

    public function login()
    {
        $email = $this->request->input('email');
        $password = $this->request->input('password');

        $result = $this->auth->login(
            $email,
            $password
        );

        if (!$result['success']) {
            Response::unauthorized($result['message']);
        }

        Response::success(
            "Login successful",
            $result
        );
    }

    public function me()
    {
    $payload = $this->request->user();

    $user = $this->authService->getUserById(
        $payload['id']
    );

    if (!$user) {
        Response::notFound("User not found");
    }

    Response::success(
        "User fetched successfully",
        $user
     );
    }
}