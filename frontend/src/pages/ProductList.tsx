import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      
      {items.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="row g-4">
          {items.map(product => (
            <div key={product._id} className="col-lg-4 col-md-6">
              <div className="card h-100">
                {product.imagePath && (
                  <img 
                    src={`http://localhost:5001${product.imagePath}`} 
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ₹{product.price}</p>
                  <p className="card-text">Stock: {product.quantity}</p>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={() => dispatch(addToCart(product._id!))}
                    disabled={product.quantity === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}