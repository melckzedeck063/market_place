import React from "react";
import { X } from "lucide-react";

export default function WithdrawContribution({ isOpen, onClose, amount, setAmount, withdrawTo, setWithdrawTo, withdrawAccount, setWithdrawAccount, handleWithdraw }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-4/12 shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Withdraw Money</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Amount (Min 60,000 Tsh)</label>
            <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Withdraw To</label>
            <select className="w-full p-2 border rounded-md" value={withdrawTo} onChange={(e) => setWithdrawTo(e.target.value)}>
              <option value="agent">Agent</option>
              <option value="bank">Bank</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Enter {withdrawTo} Number</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter number" value={withdrawAccount} onChange={(e) => setWithdrawAccount(e.target.value)} />
          </div>
        </div>

        <button className="w-full mt-6 mb-8 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700" onClick={handleWithdraw}>
          Confirm Withdraw
        </button>
      </div>
    </div>
  );
}
