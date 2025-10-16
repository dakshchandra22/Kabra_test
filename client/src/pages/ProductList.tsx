import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProducts, updateProductQuantity } from '../slices/productsSlice';
import { addToCart, fetchCart } from '../slices/cartSlice';

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.products);
  const [qtyState, setQtyState] = useState<Record<string, number>>({});

  const getQty = (id: string) => qtyState[id] ?? 1;
  const setQty = (id: string, value: number) =>
    setQtyState((prev) => ({ ...prev, [id]: Math.max(1, Math.min(99, Math.floor(value || 1))) }));

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row g-3">
      {items.map((p) => (
        <div key={p._id} className="col-md-4">
          <div className="card h-100 shadow-sm">
            <img src={`http://localhost:4000${p.imagePath}`} className="card-img-top" style={{ objectFit: 'cover', height: 200 }} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title mb-1">{p.name}</h5>
              <p className="card-text small text-muted flex-grow-1">{p.description}</p>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold h5 m-0">${p.unitPrice.toFixed(2)}</span>
                <span className="badge bg-success">In stock: {p.quantity}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="input-group" style={{ width: 140 }}>
                  <button className="btn btn-outline-secondary" type="button" onClick={() => setQty(p._id, getQty(p._id) - 1)}>-</button>
                  <input
                    type="number"
                    className="form-control text-center"
                    min={1}
                    max={99}
                    value={getQty(p._id)}
                    onChange={(e) => setQty(p._id, Number(e.target.value))}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={() => setQty(p._id, getQty(p._id) + 1)}>+</button>
                </div>
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={() => dispatch(addToCart({ productId: p._id, quantity: getQty(p._id) }))}
                >
                  Add to cart
                </button>
              </div>
              <div className="mt-3">
                <div className="input-group" style={{ maxWidth: 260 }}>
                  <span className="input-group-text">Update stock</span>
                  <input type="number" className="form-control" min={0} value={p.quantity}
                    onChange={(e) => dispatch(updateProductQuantity({ id: p._id, quantity: Math.max(0, Number(e.target.value)) }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


