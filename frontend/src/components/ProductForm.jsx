import { useState, useEffect } from "react";

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      setForm({ name: "", description: "", price: "", stock: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h3>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />
      <div className="flex gap-3 mb-3">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-1/2 border p-2 rounded"
          required
        />
      </div>
      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingProduct ? "Update" : "Add"} Product
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
