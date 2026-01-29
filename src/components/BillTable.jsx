import React from "react";
import { motion } from "framer-motion";

const BillTable = ({ items, removeItem }) => {
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <>
      <motion.table
        className="w-full text-left border-t border-gray-200"
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
              <td className="py-2 px-4">Rs {item.qty * item.price}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 font-bold"
                >
                  ✖
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      <div className="mt-6 text-right text-xl font-bold text-gray-800">
        Total: Rs {total}
      </div>
    </>
  );
};

export default BillTable;
