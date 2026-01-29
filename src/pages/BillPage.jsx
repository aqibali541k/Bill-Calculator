import React, { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BillForm from "../components/BillForm";
import BillTable from "../components/BillTable";
import { message } from "antd";

const BillPage = () => {
  const [customer, setCustomer] = useState("");
  const [form, setForm] = useState({ name: "", qty: "", price: "" });
  const [items, setItems] = useState([]);
  const componentRef = useRef();

  const addItem = () => {
    if (!form.name || !form.qty || !form.price) {
      message.warning("Please fill all fields");
      return;
    }
    setItems([
      ...items,
      { ...form, qty: Number(form.qty), price: Number(form.price) },
    ]);
    setForm({ name: "", qty: "", price: "" });
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const saveBillToFirestore = async () => {
    if (!customer.trim()) {
      message.warning("Please enter customer name");
      return;
    }
    if (items.length === 0) {
      message.warning("No items to save");
      return;
    }
    try {
      await addDoc(collection(db, "bills"), {
        customer: customer.trim(),
        items,
        total,
        createdAt: serverTimestamp(),
      });
      message.success("Bill saved successfully!");
      setItems([]);
      setCustomer("");
    } catch (error) {
      message.error("Failed to save bill");
    }
  };

  return (
    <>
      <Navbar className="no-print" />

      {/* Printable Receipt */}
      <div
        ref={componentRef}
        className="max-w-3xl mx-auto mt-4 p-5 bg-[#fffdf7] border border-amber-700 rounded-lg shadow font-serif"
      >
        {/* Header */}
        <div className="text-center mb-4 border-b border-dashed border-amber-700 pb-2">
          <h1 className="text-2xl font-extrabold text-amber-900">
            🏪 مہر ارشاد کریانہ سٹور
          </h1>
          <p className="text-xs text-gray-600">Ghanta Ghar, Faisalabad</p>
          <p className="text-xs text-gray-600">📞 0300-1234567</p>
        </div>

        {/* Customer */}
        <div className="mb-3">
          <p className="text-sm font-bold text-amber-900">
            کسٹمر:{" "}
            <span className="font-normal text-black">
              {customer || "__________"}
            </span>
          </p>

          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="no-print mt-2 p-2 border border-amber-500 rounded w-full text-sm"
          />
        </div>

        {/* Form */}
        <div className="no-print mb-3">
          <BillForm form={form} setForm={setForm} addItem={addItem} />
        </div>

        {/* Items */}
        <BillTable items={items} removeItem={removeItem} />

        {/* Total */}
        <div className="mt-4 flex justify-end">
          <div className="bg-amber-100 border border-amber-700 px-4 py-2 rounded-md text-lg font-bold text-amber-900">
            Total: Rs {total}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600 border-t border-dashed pt-3">
          <p>✔️ شکریہ — دوبارہ تشریف لائیں</p>
          <p className="mt-1">Computer Generated Bill</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="no-print max-w-xl mx-auto mt-4 mb-3 flex gap-3 justify-center">
        <button
          onClick={saveBillToFirestore}
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-md shadow"
        >
          💾 Save
        </button>

        <button
          onClick={() => window.print()}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md shadow"
        >
          🖨️ Print
        </button>
      </div>

      <Footer />
    </>
  );
};

export default BillPage;
