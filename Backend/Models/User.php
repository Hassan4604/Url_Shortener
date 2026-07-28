<?php

class User
{
    private DB $db;

    public function __construct(DB $db)
    {
        $this->db = $db;
    }


    public function create($data)
    {
        $sql = "INSERT INTO users (name, email, password) 
                VALUES (:name, :email, :password)";

        return $this->db->execute($sql, [
            "name" => $data['name'],
            "email" => $data['email'],
            "password" => $data['password']
        ]);
    }


    public function findByEmail($email)
    {
        $sql = "SELECT * FROM users WHERE email = :email";

        return $this->db->fetch($sql, [
            "email" => $email
        ]);
    }


    public function findById($id)
    {
        $sql = "SELECT * FROM users WHERE id = :id";

        return $this->db->fetch($sql, [
            "id" => $id
        ]);
    }
}