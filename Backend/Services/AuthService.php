<?php

require_once __DIR__ . '/../Core/JWT.php';

class AuthService
{
    private User $user;
    private JWT $jwt;


    public function __construct(User $user, JWT $jwt)
    {
        $this->user = $user;
        $this->jwt = $jwt;
    }


    public function register($userName, $email, $password)
    {
        $existingUser = $this->user->findByEmail($email);

        if ($existingUser) {
            return [
                "success" => false,
                "message" => "Email already exists"
            ];
        }


        $hashedPassword = password_hash(
            $password,
            PASSWORD_DEFAULT
        );


        $this->user->create([
            "name" => $userName,
            "email" => $email,
            "password" => $hashedPassword
        ]);


        return [
            "success" => true,
            "message" => "User registered successfully"
        ];
    }


    public function login($email, $password)
    {
        $user = $this->user->findByEmail($email);


        if (!$user) {
            return [
                "success" => false,
                "message" => "Invalid credentials"
            ];
        }


        if (!password_verify($password, $user['password'])) {
            return [
                "success" => false,
                "message" => "Invalid credentials"
            ];
        }


        $token = $this->jwt->encode([
            "user_id" => $user['id'],
            "email" => $user['email']
        ]);


        return [
            "success" => true,
            "token" => $token
        ];
    }
}