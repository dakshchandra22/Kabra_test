import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchCart, updateCartItem } from '../slices/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((s: RootState) => s.cart.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = (cart?.items || []).reduce((sum, i) => sum + i.quantity * i.product.unitPrice, 0);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Your Cart</h4>
        <span className="badge bg-primary">{cart?.items.length || 0} items</span>
      </div>
      <div className="card shadow-sm">
        <div className="list-group list-group-flush">
          {(cart?.items || []).map((i) => (
            <div key={i.product._id} className="list-group-item d-flex align-items-center">
              <img src={`http://localhost:4000${i.product.imagePath}`} style={{ width: 64, height: 64, objectFit: 'cover' }} className="me-3 rounded" />
              <div className="flex-grow-1">
                <div className="fw-bold">{i.product.name}</div>
                <div className="text-muted small">${i.product.unitPrice.toFixed(2)} • In stock: {i.product.quantity}</div>
              </div>
              <div className="input-group" style={{ width: 140 }}>
                <button className="btn btn-outline-secondary" type="button" onClick={() => dispatch(updateCartItem({ productId: i.product._id, quantity: Math.max(0, i.quantity - 1) }))}>-</button>
                <input
                  type="number"
                  min={0}
                  className="form-control text-center"
                  value={i.quantity}
                  onChange={(e) => dispatch(updateCartItem({ productId: i.product._id, quantity: Math.max(0, Number(e.target.value)) }))}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={() => dispatch(updateCartItem({ productId: i.product._id, quantity: i.quantity + 1 }))}>+</button>
              </div>
              <div className="ms-3" style={{ width: 120, textAlign: 'right' }}>
                <div className="fw-semibold">${(i.quantity * i.product.unitPrice).toFixed(2)}</div>
              </div>
            </div>
          ))}
          {(!cart || cart.items.length === 0) && (
            <div className="list-group-item text-center text-muted">Your cart is empty.</div>
          )}
        </div>
        <div className="card-body d-flex justify-content-end">
          <div className="h5 mb-0">Total: ${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}


