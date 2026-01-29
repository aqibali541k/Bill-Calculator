import React from "react";

const BillForm = ({ form, setForm, addItem }) => {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-400 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold text-amber-900 mb-4 font-serif">
        🛒 آئٹم شامل کریں
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="p-3 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Qty"
          className="p-3 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="qty"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="p-3 border border-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          name="price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>

      <button
        onClick={addItem}
        className="mt-5 w-full bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-800 hover:to-yellow-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-300"
      >
        ➕ Add Item
      </button>
    </div>
  );
};

export default BillForm;
