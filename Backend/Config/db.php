<?php

class DB
{
    private static $instance = null;
    private $connection;

    private $host = "localhost";
    private $dbname = "url_shortener";
    private $username = "root";
    private $password = "";

    private function __construct()
    {
        try {
            $this->connection = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",
                $this->username,
                $this->password
            );

            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            die("Database Connection Failed: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new DB();
        }

        return self::$instance;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function execute($query, $params = [])
    {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }

    public function fetch($query, $params = [])
    {
        return $this->execute($query, $params)->fetch();
    }

    public function fetchAll($query, $params = [])
    {
        return $this->execute($query, $params)->fetchAll();
    }
}