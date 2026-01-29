import React from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
const BillTable = ({ items, removeItem }) => {
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <>
      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-3 bg-white shadow"
          >
            <div className="flex justify-between text-sm">
              <span className="font-bold">#{index + 1}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 font-bold"
              >
                <FaTrash />
              </button>
            </div>

            <p className="mt-1">
              <strong>Item:</strong> {item.name}
            </p>
            <p>
              <strong>Qty:</strong> {item.qty}
            </p>
            <p>
              <strong>Price:</strong> Rs {item.price}
            </p>
            <p className="font-semibold text-indigo-700">
              Subtotal: Rs {item.qty * item.price}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <motion.table
          className="min-w-[700px] w-full text-left border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Subtotal</th>
              <th className="py-2 px-4">Remove</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="hover:bg-gray-100"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.qty}</td>
                <td className="py-2 px-4">Rs {item.price}</td>
                <td className="py-2 px-4 font-medium">
                  Rs {item.qty * item.price}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 font-bold"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* ================= TOTAL ================= */}
      <div className="mt-6 text-right text-xl font-extrabold text-gray-800">
        Total: Rs {total}
      </div>
    </>
  );
};

export default BillTable;
