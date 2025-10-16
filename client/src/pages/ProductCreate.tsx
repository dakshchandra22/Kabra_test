import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createProduct } from '../slices/productsSlice';

export default function ProductCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | undefined>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) { setMessage('Please select an image'); return; }
    await dispatch(createProduct({ name, description, quantity, unitPrice, image })).unwrap();
    setMessage('Product created');
    setName(''); setDescription(''); setQuantity(0); setUnitPrice(0); setImage(null);
  };

  return (
    <div className="card">
      <div className="card-header">Create Product</div>
      <div className="card-body">
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Product name</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Product image</label>
            <input className="form-control" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input className="form-control" type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Unit Price</label>
              <input className="form-control" type="number" min={0} step={0.01} value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} required />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}



