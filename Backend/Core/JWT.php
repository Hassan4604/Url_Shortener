<?php

class JWT
{
    private string $secret;

    public function __construct(string $secret)
    {
        $this->secret = $secret;
    }


    private function base64UrlEncode(string $data): string
    {
        return rtrim(
            strtr(
                base64_encode($data),
                '+/',
                '-_'
            ),
            '='
        );
    }


    private function base64UrlDecode(string $data): string
    {
        return base64_decode(
            strtr(
                $data,
                '-_',
                '+/'
            )
        );
    }


    private function sign(string $header, string $payload): string
    {
        $signature = hash_hmac(
            'sha256',
            $header . "." . $payload,
            $this->secret,
            true
        );

        return $this->base64UrlEncode($signature);
    }


    public function encode(array $payload): string
    {
        $header = [
            "alg" => "HS256",
            "typ" => "JWT"
        ];


        $headerEncoded = $this->base64UrlEncode(
            json_encode($header)
        );


        $payload["iat"] = time();


        $payloadEncoded = $this->base64UrlEncode(
            json_encode($payload)
        );


        $signature = $this->sign(
            $headerEncoded,
            $payloadEncoded
        );


        return $headerEncoded . "." .
               $payloadEncoded . "." .
               $signature;
    }



    public function decode(string $token): array|false
    {
        $parts = explode(".", $token);


        if(count($parts) !== 3){
            return false;
        }


        [$header, $payload, $signature] = $parts;


        $validSignature = $this->sign(
            $header,
            $payload
        );


        if(!hash_equals($validSignature, $signature)){
            return false;
        }


        return json_decode(
            $this->base64UrlDecode($payload),
            true
        );
    }
}
