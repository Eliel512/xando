# Xando - Marketplace API

Welcome to Xando, a robust and flexible API for integrating marketplace functionalities into your applications. This README will guide you through the setup, usage, and structure of the Xando API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Xando is an API designed to provide essential marketplace functionalities, enabling developers to integrate buying and selling features seamlessly into their applications. The API is built using Node.js, Express, and MongoDB, offering scalability and flexibility.

## Features

- User authentication (signup, signin)
- Article management (create, read, update, delete)
- Cart management (add, remove, view items)
- Swagger documentation for easy API exploration

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Eliel512/xando.git
   cd xando
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory and add the following:
   ```bash
   MONGODB_URI=your_mongodb_uri
   PORT=your_port
   RENDER_EXTERNAL_URL=your_host_url
   ```

4. **Run the application**
   ```bash
   yarn start
   ```

## Usage

Once the server is running, you can access the API endpoints. The API uses JWT for authentication, so ensure you include the token in your requests where required.

### API Endpoints

#### User Routes

- **POST /api/users/signup**: Register a new user
  - **Request Body**:
    ```json
    {
      "email": "string",
      "tel": "string",
      "password": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "gender": "string",
      "accountType": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "email": "string",
      "tel": "string",
      "token": "string"
    }
    ```
  - **Errors**:
    - `400`: Invalid request body.
    - `409`: Email already exists.
    - `500`: Internal Server Error.

- **POST /api/users/signin**: Sign in an existing user
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "email": "string",
      "token": "string"
    }
    ```
  - **Errors**:
    - `404`: User not found.
    - `400`: Incorrect password.
    - `500`: Internal Server Error.

- **POST /api/users**: Validate email or token
  - **Request Body**:
    ```json
    {
      "type": "string",
      "email": "string",
      "token": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "found": "boolean"
    }
    ```
  - **Errors**:
    - `400`: Invalid request body.
    - `404`: Invalid email or token.
    - `500`: Internal Server Error.

- **GET /api/users**: Authenticate user
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "firstName": "string",
      "middleName": "string",
      "lastName": "string",
      "email": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
    ```
  - **Errors**:
    - `401`: Unauthorized.
    - `500`: Internal Server Error.

- **POST /api/users/edit**: Edit user details
  - **Request Body**:
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string",
      "file": "binary"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "imageUrl": "string"
    }
    ```
  - **Errors**:
    - `400`: Invalid request body.
    - `409`: Email already exists.
    - `500`: Internal Server Error.

#### Article Routes

- **GET /api/stuff/articles**: Get all articles
  - **Query Parameters**:
    ```
    category: string (optional)
    seller: string (optional)
    ```
  - **Response**:
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "seller": {
          "_id": "string",
          "fname": "string",
          "mname": "string",
          "lname": "string"
        },
        "category": "string"
      }
    ]
    ```
  - **Errors**:
    - `400`: Invalid request (malformed parameters).
    - `500`: Internal Server Error.

- **GET /api/stuff/articles/:id**: Get a specific article by ID
  - **Response**:
    ```json
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "seller": {
        "_id": "string",
        "fname": "string",
        "mname": "string",
        "lname": "string"
      },
      "category": "string"
    }
    ```
  - **Errors**:
    - `404`: Article not found.
    - `500`: Internal Server Error.

- **POST /api/stuff/articles**: Create a new article
  - **Request Body** (multipart/form-data):
    ```
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "integer",
      "category": "string",
      "files": ["binary"]
    }
    ```
  - **Response**:
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "seller": {
          "_id": "string",
          "fname": "string",
          "mname": "string",
          "lname": "string"
        },
        "category": "string"
      }
    ]
    ```
  - **Errors**:
    - `401`: Unauthorized.
    - `500`: Internal Server Error.

- **DELETE /api/stuff/articles/:id**: Delete an article
  - **Response**:
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "seller": {
          "_id": "string",
          "fname": "string",
          "mname": "string",
          "lname": "string"
        },
        "category": "string"
      }
    ]
    ```
  - **Errors**:
    - `400`: Invalid request (article not found or permission issue).
    - `500`: Internal Server Error.

#### Cart Routes

- **GET /api/stuff/cart**: Get cart items
  - **Response**:
    ```json
    {
      "articles": [
        {
          "meta": {
            "_id": "string",
            "name": "string",
            "price": "number"
          },
          "quantity": "number"
        }
      ]
    }
    ```
  - **Errors**:
    - `500`: Internal Server Error.

- **POST /api/stuff/cart**: Add item to cart
  - **Request Body**:
    ```json
    {
      "article": "string",
      "quantity": "number"
    }
    ```
  - **Response**:
    ```json
    {
      "articles": [
        {
          "meta": "string",
          "quantity": "number"
        }
      ]
    }
    ```
  - **Errors**:
    - `404`: Article not found.
    - `500`: Internal Server Error.

- **DELETE /api/stuff/cart/:article**: Remove item from cart
  - **Response**:
    ```json
    {
      "articles": [
        {
          "meta": {
            "_id": "string",
            "name": "string",
            "price": "number"
          },
          "quantity": "number"
        }
      ]
    }
    ```
  - **Errors**:
    - `404`: Article not found.
    - `500`: Internal Server

 Error.

## API Documentation

The API is documented using Swagger. Once the server is running, you can view the documentation at `/docs`.

## Project Structure

The project follows a modular structure, organized as follows:

- **app.js**: Main application setup
- **server.js**: Server configuration and setup
- **routes/**: API routes
  - `app.router.js`
  - `article.router.js`
  - `auth.router.js`
  - `cart.router.js`
  - `stuff.router.js`
- **controllers/**: Request handlers
  - `stuff/articles/`
    - `createOne.js`
    - `deleteOne.js`
    - `getAll.js`
    - `getAllForOne.js`
    - `getOne.js`
  - `stuff/cart/`
    - `addToCart.js`
    - `getCart.js`
    - `removeFromCart.js`
  - `users/`
    - `check.js`
    - `edit.js`
    - `getOne.js`
    - `signin.js`
    - `signup.js`
    - `validate.js`
- **middlewares/**: Middleware functions
- **models/**: Mongoose models
- **utils/**: Utility functions

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests. Ensure your code adheres to the existing style and includes relevant tests.