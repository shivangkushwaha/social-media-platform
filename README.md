
## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:shivangkushwaha/oxinus-task.git
    cd backend-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the `env` folder with `local` configration of your database credentials and JWT secret:

4. Start the server:
    ```sh
    npm start
    ```

### Curl request to test all Endpoints

1. Create Account
```curl -X POST http://localhost:3000/api/accounts \
-H "Content-Type: application/json" \
-d '{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "password": "password123",
  "birthday": "1990-01-01"
}'
```

2. Login
```
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

3. Get All Accounts (with token from login)
```
curl -X GET http://localhost:3000/api/accounts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

4. Get Account By ID (with token from login)
```
curl -X GET http://localhost:3000/api/accounts/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

5. Update Account (with token from login)
```
curl -X PUT http://localhost:3000/api/accounts/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com",
  "phone": "0987654321",
  "birthday": "1991-02-02"
}'
```

6. Delete Account (with token from login)
```
curl -X DELETE http://localhost:3000/api/accounts/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```