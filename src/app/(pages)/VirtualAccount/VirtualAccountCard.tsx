// components/VirtualAccountCard.tsx
"use client";

import { useState, useEffect } from "react";

interface VirtualAccount {
  id: string;
  accountNumber: string;
  bankName: string;
  customerName: string;
  assignedAt: string;
  transactions: any[];
}

interface VirtualAccountCardProps {
  customerEmail: string;
}

export default function VirtualAccountCard({
  customerEmail,
}: VirtualAccountCardProps) {
  const [accounts, setAccounts] = useState<VirtualAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch(
          `/api/customers/${encodeURIComponent(customerEmail)}/virtual-accounts`
        );
        const result = await response.json();

        if (result.success) {
          setAccounts(result.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    }

    if (customerEmail) {
      fetchAccounts();
    }
  }, [customerEmail]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="border rounded-lg p-4 bg-white shadow">
          <h3 className="font-semibold text-lg mb-2">
            Virtual Account Details
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Account Number:</span>
              <p className="text-xl font-mono font-bold">
                {account.accountNumber}
              </p>
            </div>
            <div>
              <span className="font-medium">Bank Name:</span>
              <p>{account.bankName}</p>
            </div>
            <div>
              <span className="font-medium">Customer Name:</span>
              <p>{account.customerName}</p>
            </div>
            <div>
              <span className="font-medium">Assigned On:</span>
              <p>{new Date(account.assignedAt).toLocaleDateString()}</p>
            </div>
          </div>

          {account.transactions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Recent Transactions</h4>
              <div className="space-y-2">
                {account.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between text-sm border-b pb-1"
                  >
                    <span>₦{transaction.amount.toLocaleString()}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        transaction.status === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <span>
                      {new Date(transaction.paidAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
