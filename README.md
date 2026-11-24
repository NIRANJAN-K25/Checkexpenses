# checkexprense (React + Express + MongoDB)

```
checkexprense/
├── backend/                 Express API
│   ├── server.js            starts the server
│   └── src/
│       ├── app.js           express setup
│       ├── config/          env + database connection
│       ├── models/          MongoDB schemas (User, Expense)
│       ├── routes/          URL -> controller
│       ├── controllers/     handle request/response
│       ├── services/        business logic
│       ├── middleware/      auth, error handler
│       └── utils/
└── frontend/                React (Vite)
    └── src/ pages/ components/ services/ utils/
```
Add a feature (example: categories): model -> service -> controller -> route on the backend,
then a service + component on the frontend.

## Run locally
1. `cp backend/.env.example backend/.env` and fill it in.
2. `npm run build`   (installs both parts, builds React into frontend/dist)
3. `npm start`       -> http://localhost:3000

## Develop with hot reload
Terminal 1: `npm run dev:backend`   Terminal 2: `npm run dev:frontend` -> http://localhost:5173
(Add http://localhost:5173 as an authorized JavaScript origin in Google Cloud too.)

## Deploy (Render / Railway) - one server
- Build: `npm run build`   Start: `npm start`
- Env vars: MONGODB_URI, GOOGLE_CLIENT_ID, JWT_SECRET, NODE_ENV=production
- Add your live URL as an authorized JavaScript origin in Google Cloud.
