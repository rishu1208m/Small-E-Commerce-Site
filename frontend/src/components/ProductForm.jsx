import { useState, useEffect } from "react";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "Other",
];

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Other",
    imageUrl: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category || "Other",
        imageUrl: editingProduct.imageUrl || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "Other",
        imageUrl: "",
      });
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-8 border border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <input
        type="url"
        name="imageUrl"
        placeholder="Image URL (optional — leave blank for placeholder)"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>
      <div className="flex gap-3">
        <button className="bg-orange-500 text-white px-5 py-2 rounded font-medium hover:bg-orange-600 transition">
          {editingProduct ? "Update" : "Add"} Product
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-5 py-2 rounded font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
