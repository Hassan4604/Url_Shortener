<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// =======================
// Core Files
// =======================

require_once __DIR__ . '/../Config/db.php';

require_once __DIR__ . '/../Core/Env.php';
require_once __DIR__ . '/../Core/Router.php';
require_once __DIR__ . '/../Core/Request.php';
require_once __DIR__ . '/../Core/Response.php';
require_once __DIR__ . '/../Core/JWT.php';


// =======================
// Controllers
// =======================

require_once __DIR__ . '/../Controllers/Controller.php';
require_once __DIR__ . '/../Controllers/AuthController.php';
require_once __DIR__ . '/../Controllers/UrlController.php';


// =======================
// Models
// =======================

require_once __DIR__ . '/../Models/User.php';
require_once __DIR__ . '/../Models/Url.php';


// =======================
// Services
// =======================

require_once __DIR__ . '/../Services/AuthService.php';
require_once __DIR__ . '/../Services/UrlService.php';


// =======================
// Middleware
// =======================

require_once __DIR__ . '/../Middleware/AuthMiddleware.php';


// =======================
// Load Environment
// =======================

Env::load(__DIR__ . '/../.env');


// =======================
// Database
// =======================

$db = DB::getInstance();


// =======================
// Authentication Dependencies
// =======================

$user = new User($db);

$jwt = new JWT(
    Env::get('JWT_KEY')
);

// =======================
// Router
// =======================

$router = new Router();

$request = new Request();


$authService = new AuthService(
    $user,
    $jwt
);


$authController = new AuthController(
    $authService , $request
);


// =======================
// URL Dependencies
// =======================

$url = new Url($db);


$urlService = new UrlService(
    $url
);


$urlController = new UrlController(
    $urlService , $request
);


// =======================
// Middleware
// =======================

$authMiddleware = new AuthMiddleware(
    $jwt , $request
);

// =======================
// Authentication Routes
// =======================

$router->post(
    '/api/register',
    [$authController, 'register']
);


$router->post(
    '/api/login',
    [$authController, 'login']
);


// =======================
// Protected URL Routes
// =======================


// Create short URL

$router->post(
    '/api/urls',
    [$urlController, 'store'],
    [
        $authMiddleware
    ]
);


// Get user's URLs

$router->get(
    '/api/urls',
    [$urlController, 'index'],
    [
        $authMiddleware
    ]
);


// Delete URL

$router->delete(
    '/api/urls/{id}',
    [$urlController, 'delete'],
    [
        $authMiddleware
    ]
);


// =======================
// Public Redirect Route
// =======================

$router->get(
    '/{code}',
    [$urlController, 'redirect']
);


// =======================
// Dispatch Request
// =======================

$router->dispatch(
    $request->method(),
    $request->uri()
);