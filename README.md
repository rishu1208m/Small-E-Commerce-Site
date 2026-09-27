# ShopKart — Authentication & Product CRUD API

A full-stack e-commerce platform built as part of the Sheryians Coding School assignment. Implements a complete JWT authentication flow (access + refresh tokens), full CRUD APIs for products with category and image support, request validation using express-validator, and a React + Tailwind CSS frontend.

## Tech Stack

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, express-validator, cookie-parser, cors

**Frontend:** React (Vite), React Router, Axios, Tailwind CSS

## Features

- JWT authentication with short-lived access tokens and long-lived refresh tokens
- Refresh tokens persisted in the database and revoked on logout
- Protected routes via Bearer token middleware
- Full Product CRUD (Create, Read, Update, Delete) with category and image support
- Request validation on all auth and product routes using express-validator
- Category-based product filtering on the frontend
- Responsive, Amazon-style product grid UI

## Project Structure

```
COHORT ASSIGMENT/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── product.routes.js
│   ├── utils/
│   │   └── generateTokens.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── product.validator.js
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProductForm.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Products.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account (free tier works) or a local MongoDB instance

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder-name>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

### 4. Usage
- Open `http://localhost:5173` in your browser
- Register a new account, then log in
- Browse, filter by category, and (once logged in) add/edit/delete products

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user (name, email, password, confirmPassword) |
| POST | `/api/auth/login` | Public | Log in, returns access token + sets refresh token cookie |
| POST | `/api/auth/refresh-token` | Public (valid refresh token required) | Issues a new access token |
| POST | `/api/auth/logout` | Authenticated | Revokes the refresh token and clears the cookie |
| GET | `/api/auth/me` | Authenticated | Returns the logged-in user's profile |

**Note:** The refresh token is sent both as an httpOnly cookie (for the browser frontend) and in the JSON response body (to make testing with tools like Postman/Thunder Client easier, since some HTTP clients don't reliably persist cookies across requests).

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/products` | Authenticated | Create a new product |
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/:id` | Public | Get a single product by ID |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

**Product fields:** `name`, `description`, `price`, `stock`, `category` (Electronics, Clothing, Books, Home & Kitchen, Beauty, Sports, Toys, Other), `imageUrl`

## Validation

All routes validate request bodies/params using express-validator and return field-level 400 errors on invalid input, including:
- Email format and password strength on register/login
- Matching confirmPassword on register
- Required fields, positive price, non-negative stock on products
- Valid MongoDB ObjectId on all `:id` route params

## Security Notes

- Passwords are hashed with bcrypt (10 salt rounds) and never returned in any response
- JWT secrets are stored in environment variables, never committed to the repo
- Refresh tokens are persisted server-side so they can be revoked on logout
- Refresh token cookie uses `httpOnly` always, and `secure: true` + `sameSite: none` in production (for cross-origin deployment), `secure: false` + `sameSite: strict` in local development


## Author

Rishab Mishra
GitHub: [rishu1208m](https://github.com/rishu1208m)