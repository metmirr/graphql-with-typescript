# A simple GraphQL server based on TypeORM, TypeGrapQL

## Requirements

`yarn install`

## Commands

`yarn start` starts GraphQL server on http://localhost:4000

## Project Structure

```bash
src
├── app.ts              // Entry point for the GraphQL server and database connection
├── entities            // Database models
│   ├── Author.ts
│   └── Book.ts
├── inputs              // Objects used for mutation
│   ├── CreateAuthor.ts
│   └── CreateBook.ts
└── resolvers           // Resolvers for data querying, data mutation and subscriptions
    ├── author.ts
    ├── book.ts
    └── index.ts
```
