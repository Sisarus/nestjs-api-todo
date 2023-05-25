
## Running the app

### Install project
```
yarn
```
### Run prisma to see Database
```
npx prisma studio
```
### Start postgres in docker and push migrations
```
yarn db:dev:restart
```
### Open new terminal. start api in dev mode:
```
yarn start:dev
```

* Docker will run port - 5434:5432
* Runs in: http://localhost:3333/

Signup and signin do not need JWT Token. When using signin and everything goes right, back will return JWT Token that last 15m. Chance token lasting time from: src/auth/auth.service.ts -> row 68. 
Others calls will need this as header "Authorization Bearer AUTH_TOKEN"

Use Postgress or Insomnia

#### Addresses for data
- **POST** */api/v1/signup*: Sign up as an user of the system, using email & password
- **POST** */api/v1/signin*: Sign in using email & password. The system will return the JWT token that can be used to call the APIs that follow
- **PUT** */api/v1/changePassword*: Change user’s password
- **GET** */api/v1/todos?status=[status]*: Get a list of todo items. Optionally, a status query param can be included to return only items of specific status. If not present, return all items
- **POST** */api/v1/todos*: Create a new todo item
- **PUT** */api/v1/todos/:id*: Update a todo item
- **DELETE** */api/v1/todos/:id*: Delete a todo item
