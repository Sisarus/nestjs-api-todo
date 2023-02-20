
## Running the app


Docker will run port - 5434:5432


### Run the API in development mode
```javascript
yarn // install
yarn db:dev:restart // start postgres in docker and push migrations
yarn start:dev // start api in dev mode
```

Run prisma to see Database
```
npx prisma start
```

Runs in:
http://localhost:3333/ 
