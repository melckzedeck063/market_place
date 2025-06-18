import React from "react";
import { X } from "lucide-react";

export default function DepositContribution({ isOpen, onClose, selectedProduct, setSelectedProduct, amount, setAmount, paymentSource, setPaymentSource, handleDeposit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-5/12 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Deposit Money</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Select Product</label>
            <select className="w-full p-2 border rounded-md" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="savings">Savings</option>
              <option value="amana_kawaida">Amana Kawaida</option>
              <option value="amana_maalum">Amana Maalum</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Amount (Tsh)</label>
            <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Payment Source</label>
            <select className="w-full p-2 border rounded-md" value={paymentSource} onChange={(e) => setPaymentSource(e.target.value)}>
              <option value="bank">Bank</option>
              <option value="phone">Phone</option>
            </select>
          </div>
        </div>

        <button className="w-full mt-6 mb-8 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700" onClick={handleDeposit}>
          Confirm Deposit
        </button>
      </div>
    </div>
  );
}
