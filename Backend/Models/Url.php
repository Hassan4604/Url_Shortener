<?php

class Url
{
    private DB $db;

    public function __construct(DB $db)
    {
        $this->db = $db;
    }

    public function create(array $data)
    {
        $sql = "INSERT INTO urls (user_id, original_url, short_code)
                VALUES (:user_id, :original_url, :short_code)";

        return $this->db->execute($sql, [
            "user_id" => $data['user_id'],
            "original_url" => $data['original_url'],
            "short_code" => $data['short_code']
        ]);
    }

    public function findById($id)
    {
        $sql = "SELECT * FROM urls
                WHERE id = :id";

        return $this->db->fetch($sql, [
            "id" => $id
        ]);
    }

    public function findByCode($code)
    {
        $sql = "SELECT * FROM urls
                WHERE short_code = :short_code";

        return $this->db->fetch($sql, [
            "short_code" => $code
        ]);
    }

    public function getUserUrls($userId)
    {
        $sql = "SELECT *
                FROM urls
                WHERE user_id = :user_id
                ORDER BY created_at DESC";

        return $this->db->fetchAll($sql, [
            "user_id" => $userId
        ]);
    }

    public function incrementClicks($id)
    {
        $sql = "UPDATE urls
                SET clicks = clicks + 1
                WHERE id = :id";

        return $this->db->execute($sql, [
            "id" => $id
        ]);
    }

    public function delete($id)
    {
        $sql = "DELETE FROM urls
                WHERE id = :id";

        return $this->db->execute($sql, [
            "id" => $id
        ]);
    }
}