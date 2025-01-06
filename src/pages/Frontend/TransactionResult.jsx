import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TransactionResult = () => {
  const location = useLocation();
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Parse query parameters from the URL
    const params = new URLSearchParams(location.search);
    const details = {
      responseCode: params.get("responseCode"),
      responseMessage: params.get("responseMessage"),
      txnRefNo: params.get("txnRefNo"),
      amount: params.get("amount"),
      billReference: params.get("billReference"),
      txnDateTime: parseTxnDateTime(params.get("txnDateTime")), // Convert txnDateTime
    };

    setTransactionDetails(details);
    console.log("Transaction Details:", details);
  }, [location]);

  // Function to convert `YYYYMMDDHHMMSS` to a readable date
  const parseTxnDateTime = (txnDateTime) => {
    if (!txnDateTime || txnDateTime.length !== 14) {
      return "Invalid Date";
    }
    const year = txnDateTime.slice(0, 4);
    const month = txnDateTime.slice(4, 6) - 1; // Month is 0-indexed
    const day = txnDateTime.slice(6, 8);
    const hours = txnDateTime.slice(8, 10);
    const minutes = txnDateTime.slice(10, 12);
    const seconds = txnDateTime.slice(12, 14);

    return new Date(year, month, day, hours, minutes, seconds).toLocaleString();
  };

  if (!transactionDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  const { responseCode, responseMessage } = transactionDetails;

  // Determine transaction status
  let status = "failed"; // Default status
  if (responseCode === "000") {
    status = "success";
  } else if (responseMessage.includes("waiting for financials")) {
    status = "pending";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-lg p-8">
        <div
          className={`text-center mb-6 ${
            status === "success"
              ? "text-green-600"
              : status === "pending"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          <h1 className="text-3xl font-bold">
            {status === "success"
              ? "Transaction Successful"
              : status === "pending"
              ? "Payment Pending"
              : "Transaction Failed"}
          </h1>
          <p className="text-gray-600">{responseMessage}</p>
        </div>
        <div className="text-sm text-gray-700 space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Transaction Reference:</span>
            <span>{transactionDetails.txnRefNo || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span>
              Rs. {(transactionDetails.amount / 100).toFixed(2) || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Bill Reference:</span>
            <span>{transactionDetails.billReference || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Transaction Date:</span>
            <span>{transactionDetails.txnDateTime || "Invalid Date"}</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          {status === "success" ? (
            <a
              href="/dashboard"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Continue to Dashboard
            </a>
          ) : status === "pending" ? (
            <p className="text-yellow-600">
              Please visit the payment counter to complete your payment.
            </p>
          ) : (
            <Link
              to="/jazz-form"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Retry Payment
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionResult;
