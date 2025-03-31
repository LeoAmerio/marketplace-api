# NestJS API with Supabase Authentication

## Project Overview
This is a robust NestJS-based API that integrates Supabase for authentication, leveraging JWT tokens for secure access. The application is built using modern technologies including PostgreSQL for data persistence, offering a comprehensive solution for user management, sales tracking, and template handling.

Key Technologies:
- NestJS (Node.js framework)
- Supabase (Authentication)
- PostgreSQL (Database)
- JWT (Token-based authentication)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL database

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
SUPABASE_JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
DATABASE_HOST=your_db_host
DATABASE_PORT=5432
DATABASE_NAME=your_db_name
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
```

3. Install dependencies:
```bash
npm install
```

4. Run the application:

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## API Documentation by Module

### Auth Module
| Endpoint         | Method | Description                         | Access     |
|------------------|--------|-------------------------------------|------------|
| /auth/login      | POST   | Authenticate user and return token  | Public     |
| /auth/register   | POST   | Register a new user                 | Public     |
| /auth/me         | POST    | Custom login reserved for my own user            | Authorized |

{FB5D7B72-4B96-4805-ACA1-80B58285C875}.png

### Users Module
| Endpoint          | Method | Description                           | Access      |
|-------------------|--------|---------------------------------------|-------------|
| /users            | GET    | List all users                        | Admin only  |
| /users/:id        | GET    | Get user by ID                        | Admin only  |
| /users            | POST   | Create a new user                     | Admin only  |
| /users/:id        | PATCH    | Update a user                         | Admin only  |
| /users/:id        | DELETE | Delete a user                         | Admin only  |

{0D61F12B-C479-4326-ACE4-5780B4C1E521}.png

### Sales Module
| Endpoint                 | Method | Description                        | Access                |
|--------------------------|--------|------------------------------------|----------------------|
| /sales                   | POST   | Create a new sale                  | Authorized           |
| /sales                   | GET    | List all sales                     | Admin only           |
| /sales/user              | GET    | Get current user's sales           | Authorized           |
| /sales/analytics         | GET    | Get sales analytics                | Admin only           |
| /sales/:id               | GET    | Get sale by ID                     | Admin/Sale owner     |
| /sales/:id/status        | PATCH    | Update sale status                 | Admin only           |

{72BF6B09-B896-4B63-83AF-9D9078A4812E}.png

### Templates Module
| Endpoint             | Method | Description                        | Access                |
|----------------------|--------|------------------------------------|----------------------|
| /templates           | GET    | List all templates                 | Authorized           |
| /templates/:id       | GET    | Get template by ID                 | Authorized           |
| /templates           | POST   | Create a new template              | Admin only           |
| /templates/:id       | PATCH    | Update a template                  | Admin only           |
| /templates/:id       | DELETE | Delete a template                  | Admin only           |

{01043723-B15C-480E-B2B4-7A50520816D2}.png

## Authentication

The API uses JWT-based authentication for secure endpoints:

1. **Bearer Tokens**: For protected endpoints, include an `Authorization` header with a Bearer token:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
   Tokens are obtained through the authentication process via `/auth/login`.

2. **Role-Based Access**: Certain endpoints are restricted by user roles:
   - Regular users can access endpoints related to their own data.
   - Admin users have additional privileges for managing all data in the system.

3. **Token Validation**: All tokens are validated against the Supabase JWT secret to ensure secure communication.

## Stay in touch

- Author - [LeoAmerio](https://x.com/LeoAmerio)
- Website - [Porfolio Here.](https://personal-porfolio-leoamerios-projects.vercel.app/)
- LinkedIn - [Leonardo Amerio](https://www.linkedin.com/in/leonardo-amerio/)
