# Kabra TypeScript Shop 🛒

A full-stack TypeScript mini e-commerce application with image uploads, cart functionality, and modern UI.

## Features ✨

- **Product Management**: Create products with images
- **Image Upload**: Upload images from your PC to the backend
- **Shopping Cart**: Add products to cart and view cart contents
- **TypeScript**: Full TypeScript support for both frontend and backend
- **Modern Stack**: React + Redux Toolkit + Express + MongoDB

## Tech Stack 🛠️

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Multer (for image uploads)
- CORS

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Vite

## Project Structure 📁

```
Kabra_TS_Shop/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── models/
│   │   │   ├── Product.ts
│   │   │   └── Cart.ts
│   │   ├── routes/
│   │   │   ├── productRoutes.ts
│   │   │   └── cartRoutes.ts
│   │   └── middleware/
│   │       └── upload.ts
│   ├── uploads/        ← Images stored here
│   ├── tsconfig.json
│   └── package.json
└── frontend/
    ├── src/
    │   ├── main.tsx
    │   ├── App.tsx
    │   ├── pages/
    │   │   ├── ProductList.tsx
    │   │   ├── CreateProduct.tsx
    │   │   └── CartPage.tsx
    │   └── redux/
    │       ├── store.ts
    │       ├── productSlice.ts
    │       └── cartSlice.ts
    ├── tsconfig.json
    └── package.json
```

## Setup Instructions 🚀

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on localhost:27017)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## How It Works 🔄

### Product Creation
1. Fill out the product form with name, description, price, and quantity
2. Select an image file from your PC
3. Submit the form → image uploads to `/backend/uploads/`
4. Backend stores product data + image path in MongoDB
5. Product appears in the product list

### Shopping Cart
1. Browse products on the main page
2. Click "Add to Cart" → product added to cart
3. View cart contents on the cart page
4. Cart persists in MongoDB

### Image Handling
- Images are uploaded to `/backend/uploads/` folder
- Backend serves images via `/uploads/` endpoint
- Frontend displays images using `http://localhost:5000/uploads/<filename>`

## API Endpoints 📡

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (with image upload)

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add product to cart

## Development Commands 💻

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Beginner-Friendly Features 👶

- **Clear TypeScript interfaces** for all data structures
- **Simple Redux setup** with Redux Toolkit
- **Comprehensive comments** in all code files
- **Step-by-step explanations** in this README
- **Clean folder structure** for easy navigation

## Troubleshooting 🔧

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017`
   - Check if MongoDB service is started

2. **Image Upload Issues**
   - Ensure `/backend/uploads/` directory exists
   - Check file permissions

3. **CORS Errors**
   - Backend has CORS enabled for all origins
   - If issues persist, check browser console

4. **Port Conflicts**
   - Backend runs on port 5000
   - Frontend runs on port 3000
   - Change ports in respective config files if needed

## Next Steps 🎯

- Add user authentication
- Implement product categories
- Add order management
- Enhance UI with CSS/styling
- Add product search and filtering
- Implement payment integration

---

Happy coding! 🎉
