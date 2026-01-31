import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { message, Spin } from "antd";
import { FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [editingTotal, setEditingTotal] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBills = async () => {
    const snap = await getDocs(collection(db, "bills"));
    setBills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const overallTotal = bills.reduce((s, b) => s + (b.total || 0), 0);

  const clearAllBills = async () => {
    if (!window.confirm("Delete all bills?")) return;
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "bills"));
      await Promise.all(
        snap.docs.map((d) => deleteDoc(doc(db, "bills", d.id))),
      );
      fetchBills();
      message.success("All bills deleted");
    } catch {
      message.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const deleteBill = async (id) => {
    if (!window.confirm("Delete this bill?")) return;
    await deleteDoc(doc(db, "bills", id));
    fetchBills();
    message.success("Bill deleted");
  };

  const saveEdit = async () => {
    await updateDoc(doc(db, "bills", selectedBill.id), {
      total: Number(editingTotal),
    });
    setSelectedBill(null);
    setEditingTotal("");
    fetchBills();
    message.success("Bill updated");
  };

  return (
    <>
      <Navbar />
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Spin size="large" tip="Loading bills..." />
        </div>
      )}

      <div className="min-h-screen bg-[#fffdf7] px-3 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold text-amber-900 font-serif">
              📋 Admin Dashboard
            </h2>

            <button
              onClick={clearAllBills}
              disabled={loading}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm"
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Overall Total */}
          <div className="bg-amber-100 border border-amber-400 rounded-lg px-4 py-3 mb-5 text-right">
            <p className="text-sm font-semibold text-amber-900">
              Total Sale:
              <span className="text-lg ml-2">Rs {overallTotal}</span>
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow border">
            <table className="w-full text-sm">
              <thead className="bg-amber-800 text-white">
                <tr>
                  <th className="p-2 text-left">Customer</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-amber-50">
                    <td className="p-2 font-medium">{bill.customer}</td>
                    <td className="p-2 text-green-700 font-semibold">
                      Rs {bill.total}
                    </td>
                    <td className="p-2 text-blue-600 text-xs">
                      {bill.createdAt?.toDate().toLocaleDateString()}
                    </td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedBill(bill);
                          setEditingTotal(bill.total);
                        }}
                        className="px-2 py-1 bg-yellow-500 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBill(bill.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Box */}
          {editingTotal && (
            <div className="mt-6 bg-yellow-50 border border-yellow-400 rounded-lg p-4 max-w-sm">
              <h3 className="font-bold mb-2 text-yellow-900">✏️ Edit Total</h3>

              <input
                type="number"
                value={editingTotal}
                onChange={(e) => setEditingTotal(e.target.value)}
                className="border p-2 rounded w-full mb-3"
              />

              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-green-700 text-white py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingTotal("");
                    setSelectedBill(null);
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;
