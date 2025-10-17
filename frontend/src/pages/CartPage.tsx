import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQuantity, removeFromCart } from "../redux/cartSlice";
import { AppDispatch, RootState } from "../redux/store";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(cartItemId));
    } else {
      dispatch(updateCartQuantity({ cartItemId, quantity: newQuantity }));
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {items.map((cartItem: any) => (
              <div key={cartItem._id} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      {cartItem.productId.imagePath && (
                        <img
                          src={`http://localhost:5001${cartItem.productId.imagePath}`}
                          alt={cartItem.productId.name}
                          className="img-fluid"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    
                    <div className="col-md-4">
                      <h6>{cartItem.productId.name}</h6>
                      <p className="text-muted">{cartItem.productId.description}</p>
                      <p>Price: ₹{cartItem.productId.price}</p>
                    </div>
                    
                    <div className="col-md-3">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(cartItem._id, cartItem.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={() => dispatch(removeFromCart(cartItem._id))}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="col-md-3 text-end">
                      <h6>₹{(cartItem.productId.price * cartItem.quantity).toFixed(2)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5>Order Summary</h5>
                <p>Total: ₹{calculateTotal().toFixed(2)}</p>
                <button className="btn btn-success w-100">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}