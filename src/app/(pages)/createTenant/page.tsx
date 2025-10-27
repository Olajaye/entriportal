"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, ArrowLeft } from "lucide-react";
import { useCreateEstateAdminMutation } from "@/src/lib/features/api/tenantApi";
import toast from "react-hot-toast";
import CheckoutPopup from "@/src/component/miniComp/checkout";
import { CheckoutData, TenantCreationResponse } from "@/src/type";

export default function CreateTenantPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  console.log(plan);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState<TenantCreationResponse>(
    {} as TenantCreationResponse
  );
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTenant, setNewTenant] = useState({
    estateName: "",
    adminFirstName: "",
    adminLastName: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    adminEmail: "",
    adminPhone: "",
    temporary_password: "",
  });

  const [createTenantAdmin] = useCreateEstateAdminMutation();

  useEffect(() => {
    const generatePassword = () => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
      let password = "";
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setNewTenant((prev) => ({ ...prev, temporary_password: password }));
    };
    generatePassword();
  }, []);

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setNewTenant((prev) => ({ ...prev, [id]: value }));
  };

  const createTenantWithAdmin = async () => {
    setIsSubmitting(true);
    const adminName = newTenant.adminFirstName + " " + newTenant.adminLastName;
    const payload = {
      estateName: newTenant.estateName,
      tenantAdminEmail: newTenant.adminEmail,
      tenantAdminName: adminName,
      estatePlan: plan,
      tenantAdminPhone: newTenant.adminPhone,
      estateAddress: {
        streetName: newTenant.streetName,
        city: newTenant.city,
        state: newTenant.state,
        zipCode: newTenant.zipCode,
        country: newTenant.country,
      },
    };

    createTenantAdmin(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        setCheckoutData(res.data);
        setShowCheckout(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error(error.data.error);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-offWhite via-background to-lightGray py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-lg text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold font-roboto text-gray-900">
              New Estate Admin
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill out the form below to create a new estate and admin account.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createTenantWithAdmin();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="adminFirstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Admin First Name
                  </label>
                  <input
                    id="adminFirstName"
                    type="text"
                    value={newTenant.adminFirstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="adminLastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Admin Last Name
                  </label>
                  <input
                    id="adminLastName"
                    type="text"
                    value={newTenant.adminLastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="adminEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estate Admin Email
                  </label>
                  <input
                    id="adminEmail"
                    type="email"
                    value={newTenant.adminEmail}
                    onChange={handleInputChange}
                    placeholder="admin@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="estateName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estate Name
                  </label>
                  <input
                    id="estateName"
                    type="text"
                    value={newTenant.estateName}
                    onChange={handleInputChange}
                    placeholder="Estate/Company Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="adminPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Admin Phone Number
                </label>
                <input
                  id="adminPhone"
                  type="tel"
                  value={newTenant.adminPhone}
                  onChange={handleInputChange}
                  placeholder="+234 8104398765"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="streetName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address
                </label>
                <input
                  id="streetName"
                  type="text"
                  value={newTenant.streetName}
                  onChange={handleInputChange}
                  placeholder="123 Estate Street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={newTenant.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State/Province
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={newTenant.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP/Postal Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    value={newTenant.zipCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={newTenant.country}
                    onChange={handleInputChange}
                    placeholder="Nigeria"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-garden focus:border-garden"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-garden"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primaryCol hover:bg-primaryCol/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryCol disabled:opacity-75"
                >
                  {isSubmitting ? (
                    "Creating..."
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Estate & Admin
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <CheckoutPopup
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        data={checkoutData}
      />
    </>
  );
}
