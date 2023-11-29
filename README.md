# Project Name: Level-2 assignment

## Description

## This is a TypeScript project using Express, Mongoose, and Zod.

## Run development Command path

1. Create user using post

```bash
post http://localhost:5000/api/users
```

2. Get all users using get method

```bash
get http://localhost:5000/api/users
```

3. Get A single users using get method

```bash
get http://localhost:5000/api/users/:userId
```

4. update A single users using put method

```bash
put http://localhost:5000/api/users/:userId
```

4. Delete A single users using delete method

```bash
delete http://localhost:5000/api/users/:userId
```

4. Add New Product in Order using put method

```bash
delete http://localhost:5000/api/users/:userId/orders
```

4. Retrieve all orders for a specific user

```bash
Get http://localhost:5000/api/users/:userId/orders
```

4. Calculate Total Price of Orders for a Specific User

```bash
Get http://localhost:5000/api/users/:userId/orders/total-price
```

## Installation and instruction

1. Clone the repository:

```bash
git clone exmaple:https://github.com/your-username/assignment.git
```

2. Navigate to the project directory:

```bash
  cd assignment
```

3. Install dependencies:

```bash
  npm install
```

4. To run the project in development mode:

```bash
 npm run start:dev
```

5. To build and run the project in production mode:

```bash
  npm run build
  npm run start:prod
```

6. Run ESLint and Auto-fix ESLint issues:

```bash
 npm run lint
 npm run lint:fix
```

7. Run Prettier and Auto-fix Prettier formatting:

```bash
 npm run format
 npm run prettier:fix
```
