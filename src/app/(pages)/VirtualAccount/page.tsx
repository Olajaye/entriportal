// app/page.tsx
"use client";

import { useState } from "react";
import VirtualAccountForm from "./VirtualAccountForm";
import VirtualAccountCard from "./VirtualAccountCard";

export default function Home() {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleAccountCreated = (data: any) => {
    setSelectedCustomer(data.customer.email);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dedicated Virtual Accounts</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Virtual Account</h2>
          <VirtualAccountForm onAccountCreated={handleAccountCreated} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Accounts</h2>
          {selectedCustomer ? (
            <VirtualAccountCard customerEmail={selectedCustomer} />
          ) : (
            <p className="text-gray-500">
              Create a virtual account to see details here
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
