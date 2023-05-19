# RESTful API

- Node.js
- Express
- TypeScript
- Docker
- MongoDB

# Usage

1. Clone this project
2. Install
   ```bash
   cd restful-api
   npm install
   # or
   pnpm install
   ```
3. Add a `.env` file into root
   ```env
   PORT=3000
   MONGODB_USERNAME=todoUser
   MONGODB_PASSWORD=todo123
   MONGODB_DATABASE=restful-api
   ```
4. `docker compose up -d`
5. Run server
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
