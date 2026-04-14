# Blog API

## Overview

This is a full-stack backend Blog API built with Node.js, Express, and MongoDB. It supports authentication, authorization, and CRUD operations for blog posts.

The system includes role-based access control (admin and user), JWT authentication, and secure middleware protection.

---

## Features

### Authentication
- User registration
- User login
- Password hashing using bcrypt
- JWT token-based authentication

### Authorization
- Role-based access control (admin and user)
- Protected routes using middleware
- Admin-only actions (delete operations)

### Blog Posts
- Create blog posts (authenticated users only)
- Read all posts
- Read single post by ID
- Update posts (authenticated users)
- Delete posts (admin only or authorized users depending on setup)

### User System
- User model with roles (user/admin)
- Relationship between users and posts using MongoDB ObjectId references

### Security
- JWT token verification middleware
- Protected routes using auth middleware
- Role validation middleware
- Environment variable usage for secrets

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

---
## Author

Blog API Project - Backend Development Practice


