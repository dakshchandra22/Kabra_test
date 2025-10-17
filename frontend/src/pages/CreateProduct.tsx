import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/productSlice";
import { AppDispatch } from "../redux/store";

export default function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price.toString());
    form.append("quantity", quantity.toString());
    form.append("image", image);
    
    dispatch(createProduct(form));
    alert("Product added!");
    
    // Reset form
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setImage(null);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h1>Add Product</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input 
              type="text" 
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input 
              type="number" 
              className="form-control"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input 
              type="number" 
              className="form-control"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input 
              type="file" 
              className="form-control"
              onChange={e => setImage(e.target.files?.[0] || null)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  );
}