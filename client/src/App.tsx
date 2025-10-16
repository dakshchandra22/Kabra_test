import { Link, NavLink, Route, Routes } from 'react-router-dom';
import ProductCreate from './pages/ProductCreate';
import ProductList from './pages/ProductList';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <div className="container py-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Kabra Test</Link>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className="nav-link" to="/">Products</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/create">Create</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/cart">Cart</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductCreate />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}



