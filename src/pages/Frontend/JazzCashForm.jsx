import React, { useState } from "react";
import CryptoJS from "crypto-js"; // Install using `npm install crypto-js`

const JazzCashForm = () => {
  const generateTxnRefNo = () => {
    return "T" + Date.now() + Math.floor(Math.random() * 1000); // Unique transaction reference
  };

  // JazzCash required fields
  const [formData, setFormData] = useState({
    pp_Version: "1.1",
    pp_TxnType: "",
    pp_MerchantID: "MC147332", // Provided Merchant ID
    pp_Language: "EN",
    pp_SubMerchantID: "",
    pp_Password: "s0v2t02t07", // Provided Password
    pp_TxnRefNo: generateTxnRefNo(), // Unique transaction reference
    pp_Amount: "10000", // Amount in paisas (e.g., Rs. 100 = 10000 paisas)
    pp_DiscountedAmount: "",
    pp_DiscountBank: "",
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: "20250105202320",
    pp_TxnExpiryDateTime: "20250106202320",
    pp_BillReference: "billRef", // Arbitrary bill reference
    pp_Description: "Description of transaction",
    pp_ReturnURL: "http://www.localhost:8000/api/jazzcash-callback", // Provided Return URL
    pp_InstitutionCode: "MC147332",
    ppmpf_1: "1",
    ppmpf_2: "2",
    ppmpf_3: "3",
    ppmpf_4: "4",
    ppmpf_5: "5",
    pp_SecureHash: "", // Will be calculated dynamically
  });

  // User-specific fields (not part of JazzCash-required fields)
  const [userInput, setUserInput] = useState({
    userEmail: "",
    userName: "",
    userPhone: "",
  });

  const [hashString, setHashString] = useState(""); // Store hash string for debugging

  const integritySalt = "9y78guze04"; // Provided Integrity Salt

  const calculateHash = () => {
    let hashString = `${integritySalt}&`;

    // Add all the required fields to the hash string in the correct order
    Object.keys(formData).forEach((key) => {
      if (key.startsWith("pp_") && formData[key] !== "") {
        hashString += `${formData[key]}&`;
      }
    });

    // Remove the last '&' character
    hashString = hashString.slice(0, -1);

    // Calculate HMAC-SHA256 hash
    const hash = CryptoJS.HmacSHA256(hashString, integritySalt).toString();

    // Update the form data with the calculated hash
    setFormData((prev) => ({ ...prev, pp_SecureHash: hash }));
    setHashString(hashString); // For debugging
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateHash(); // Calculate the hash before form submission

    setTimeout(() => {
      document.forms["jsform"].submit(); // Submit the form programmatically
    }, 1000); // Delay to ensure hash is calculated
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-bold text-red-600 mb-4 text-center">
          JazzCash Payment
        </h3>

        {/* User-Related Fields */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4">User Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Email:</label>
              <input
                type="email"
                name="userEmail"
                value={userInput.userEmail}
                onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name:</label>
              <input
                type="text"
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Phone:</label>
              <input
                type="text"
                name="userPhone"
                value={userInput.userPhone}
                onChange={handleUserInput}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-red-

700 transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Hidden JazzCash Fields */}
        <form
          name="jsform"
          method="post"
          action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"
        >
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={formData[key]}
              readOnly
            />
          ))}

          {/* Debugging Section */}
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h4 className="font-bold mb-2">Hash String (Debugging):</h4>
            <pre className="text-sm">{hashString}</pre>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JazzCashForm;