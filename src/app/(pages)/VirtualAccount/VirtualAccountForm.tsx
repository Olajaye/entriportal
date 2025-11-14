// components/VirtualAccountForm.tsx
"use client";

import { useState } from "react";

interface VirtualAccountFormProps {
  onAccountCreated: (account: any) => void;
}

export default function VirtualAccountForm({
  onAccountCreated,
}: VirtualAccountFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerName: "",
    phone: "",
    preferredBank: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/virtual-accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onAccountCreated(result.data);
        setFormData({
          customerEmail: "",
          customerName: "",
          phone: "",
          preferredBank: "",
        });
        alert("Virtual account created successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create virtual account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Customer Email</label>
        <input
          type="email"
          required
          value={formData.customerEmail}
          onChange={(e) =>
            setFormData({ ...formData, customerEmail: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="customer@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          type="text"
          required
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="+234..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Virtual Account"}
      </button>
    </form>
  );
}
