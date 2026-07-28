<?php

class UrlService
{
    private Url $url;


    public function __construct(Url $url)
    {
        $this->url = $url;
    }


    public function createUrl($userId, $originalUrl)
    {
        if (!$this->validateUrl($originalUrl)) {

            return [
                "success" => false,
                "message" => "Invalid URL"
            ];
        }


        do {

            $shortCode = $this->generateShortCode();

        } while (!$this->isUniqueCode($shortCode));


        $this->url->create([
            "user_id" => $userId,
            "original_url" => $originalUrl,
            "short_code" => $shortCode
        ]);


        return [
            "success" => true,
            "message" => "URL shortened successfully",
            "data" => [
                "short_code" => $shortCode
            ]
        ];
    }


    private function validateUrl($url)
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        $scheme = parse_url($url, PHP_URL_SCHEME);

        return in_array($scheme, [
            "http",
            "https"
        ]);
    }


    private function generateShortCode()
    {
        return substr(
            bin2hex(random_bytes(4)),
            0,
            7
        );
    }


    private function isUniqueCode($code)
    {
        return !$this->url->findByCode($code);
    }


    public function getUserUrls($userId)
    {
        return $this->url->getUserUrls($userId);
    }


    public function deleteUrl($urlId, $userId)
    {
        $url = $this->url->findById($urlId);


        if (!$url) {
            return [
                "success" => false,
                "message" => "URL not found"
            ];
        }


        if ($url['user_id'] != $userId) {
            return [
                "success" => false,
                "message" => "You are not authorized to delete this URL"
            ];
        }


        $this->url->delete($urlId);


        return [
            "success" => true,
            "message" => "URL deleted successfully"
        ];
    }


    public function redirect($shortCode)
    {
        $url = $this->url->findByCode($shortCode);


        if (!$url) {
            return [
                "success" => false,
                "message" => "Short URL not found"
            ];
        }


        $this->url->incrementClicks($url['id']);


        return [
            "success" => true,
            "original_url" => $url['original_url']
        ];
    }
}