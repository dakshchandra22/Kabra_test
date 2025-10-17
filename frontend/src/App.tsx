import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            Kabra Shop
          </Link>
          
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/">Products</Link>
            <Link className="nav-link" to="/create">Add Product</Link>
            <Link className="nav-link" to="/cart">Cart</Link>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}