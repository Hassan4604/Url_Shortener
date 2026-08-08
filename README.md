# URL Shortener

A full-stack URL shortening application built from scratch using React, Vite, Pure PHP, MySQL, and JWT authentication.

The project allows authenticated users to create, manage, and delete shortened URLs while tracking the number of clicks on each link.

## Problem

Long URLs can be difficult to share and manage, especially when used in messages, social media, or other applications. This project provides a simple way to convert long URLs into short, shareable links while giving users a dashboard to manage their links.

## Features

* User registration and login
* JWT-based authentication
* Protected API routes
* Create shortened URLs
* Redirect short URLs to original URLs
* View user's shortened URLs
* Delete URLs
* Click tracking
* Protected React routes
* Authentication state management
* Automatic dashboard updates
* Copy shortened URLs
* Toast notifications
* Responsive dashboard interface

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Fetch API
* Tailwind CSS

### Backend

* Pure PHP
* Custom MVC architecture
* REST-style API
* JWT authentication
* Middleware
* MySQL

## Architecture

The backend follows a custom MVC-style structure:

```text
Backend/
├── Config/
├── Controllers/
├── Core/
├── Middleware/
├── Models/
├── Services/
└── Public/
```

The frontend is organized around reusable React components, context-based authentication, API utilities, and protected routes.

## Authentication

The application uses JSON Web Tokens for authentication.

The flow is:

```text
Login
  ↓
PHP API
  ↓
JWT generated
  ↓
Token stored in frontend
  ↓
Authorization header
  ↓
Auth Middleware
  ↓
Protected Controller
```

The user ID is obtained from the authenticated JWT rather than being trusted from frontend input.

## API

Main endpoints include:

```text
POST   /api/register
POST   /api/login
GET    /api/me
POST   /api/urls
GET    /api/urls
DELETE /api/urls/{id}
GET    /{code}
```

## Project Goal

The main goal of this project was to understand full-stack application architecture by building the backend without relying on Laravel or pre-built authentication packages.

This project provided practical experience with:

* HTTP routing
* Middleware
* JWT authentication
* Controllers
* Services
* Models
* Database operations
* API design
* React state management
* Frontend-backend communication

## Current Status

The initial MVP is complete and working end-to-end.

Future improvements include:

* Advanced URL analytics
* Search and filtering
* Pagination
* Improved API error handling
* Additional security improvements
* Production deployment
* Further UI refinement

## License

This project is intended primarily as a learning and portfolio project.
