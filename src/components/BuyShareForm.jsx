import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { buyShares } from "../store/actions/shares_actions";

export default function BuySharesModal({ isOpen, onClose }) {
  const [shares, setShares] = useState(0);
  const [product, setProduct] = useState("mandatory");
  const [paymentSource, setPaymentSource] = useState("bank");
  const [account, setAccount] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // Bank and Mobile options
  const banks = ["CRDB", "NMB", "NBC", "EXIM", "EQUITY", "TPB"];
  const mobileOperators = ["MPESA", "AIRTEL MONEY", "HALOPESA", "TIGO PESA", "AZAM PESA"];

  // Determine which methods to show
  const availableMethods = paymentSource === "bank" ? banks : mobileOperators;

  const handleConfirmPurchase = async () => {
    setLoading(true);
    setMessage("");

    const data = {
      account,
      paymentSource,
      amount: shares * 10000,
      method
    };

    try {
      const response = await dispatch(buyShares(data));

      setTimeout(() => {
        if (response?.payload?.success) {
          setMessage("Request was successful!");
          setShares(0);
          setAccount("");
          setMethod("");
          setPaymentSource("bank");
          setTimeout(() => {
            onClose();
            setMessage("");
          }, 2000);
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      }, 2000);
    } catch (error) {
      setMessage("Error processing request.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-5/12 shadow-lg">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-xl font-bold">Buy Shares</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Select Share Product</label>
            <select
              className="w-full p-2 border rounded-md"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Mandantory Shares">Mandatory Shares</option>
              <option value="Voluntary Shares">Voluntary Shares</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Number of Shares</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Enter number of shares"
              value={shares}
              onChange={(e) => setShares(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Total Amount (Tsh)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md bg-gray-100"
              value={shares * 10000 || 0}
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Payment Source</label>
            <select
              className="w-full p-2 border rounded-md"
              value={paymentSource}
              onChange={(e) => {
                setPaymentSource(e.target.value);
                setMethod(""); // Reset method when payment source changes
              }}
            >
              <option value="bank">Bank</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 mt-2">Bank or Mobile</label>
            <select
              className="w-full p-2 border rounded-md"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="" disabled>Select {paymentSource === "bank" ? "Bank" : "Mobile"}</option>
              {availableMethods.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1 mt-2">Account No</label>
            <input
              type="text"
              placeholder="Phone/Account No"
              className="w-full p-2 border rounded-md"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </div>
        )}

        {/* Confirm Purchase Button */}
        <button
          className={`w-full mt-6 mb-8 py-2 rounded-md ${loading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700 text-white"}`}
          onClick={handleConfirmPurchase}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>
      </div>
    </div>
  );
}
