# Kabra Test - Simple Products & Cart (Node + React)

## Backend (server)
- Tech: Express, TypeScript, Mongoose, Multer (local uploads)
- Endpoints:
  - POST `/api/products` (multipart form: name, image, description, quantity, unitPrice)
  - GET `/api/products`
  - POST `/api/cart/add` { productId, quantity }
  - POST `/api/cart/update` { productId, quantity } (0 removes)
  - GET `/api/cart`

### Run
1. `cd server`
2. `npm i`
3. `npm run dev`

Default: `http://localhost:4000` and images served from `/uploads`.

## Frontend (client)
- Tech: React, Vite, TypeScript, Redux Toolkit, Bootstrap
- Pages:
  - Product List (`/`): view products, add to cart
  - Create Product (`/create`): create new product with image
  - Cart (`/cart`): view items, update quantities, see total

### Run
1. `cd client`
2. `npm i`
3. Create `.env` with `VITE_API_BASE=http://localhost:4000/api`
4. `npm run dev` then open the shown URL

Make sure backend is running first.

