import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckoutPopupProps } from "@/src/type";
import Image from "next/image";

const CheckoutPopup: React.FC<CheckoutPopupProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setIsVisible(true);
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining in subscription
  const getDaysRemaining = () => {
    const endDate = new Date(data.estate.subscriptionEndDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      } ${isClosing ? "scale-95" : "scale-100"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#D97757] text-white p-2 md:p-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex">
                <div>
                  <Image
                    src={"/logo/logoLight.png"}
                    alt={"test"}
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h2 className="text-xl sm;text-2xl font-bold mb-2">
                    Complete Your Estate Registration
                  </h2>
                  <p className="text-blue-100 opacity-90 hidden sm:block">
                    Estate: {data.estate.estateName}
                  </p>
                  <div className="items-center mt-2 space-x-3 hidden sm:flex ">
                    <div>
                      Subscription Status{" "}
                      <span
                        className={`px-2 py-1 ms-3 rounded-full text-xs font-medium ${
                          data.estate.paymentStatus === "PENDING"
                            ? "bg-yellow-500 text-yellow-900"
                            : data.estate.paymentStatus === "SUCCESSFULL"
                            ? "bg-green-500 text-green-900"
                            : "bg-red-500 text-red-900"
                        }`}
                      >
                        {data.estate.paymentStatus}
                      </span>
                    </div>

                    <div className="">
                      Subscription Plan
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          data.estate.estatePlan === "BASIC"
                            ? "bg-green-500 text-green-900"
                            : "bg-gray-500 text-gray-900"
                        }`}
                      >
                        {data.estate.estatePlan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tenant Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Admin Information
              </h3>

              <InfoField label="Full Name" value={data.tenant.name} />
              <InfoField label="Email" value={data.tenant.email} type="email" />
              <InfoField label="Phone" value={data.tenant.phone} type="phone" />
              <InfoField
                label="Estate ID"
                value={`${data.tenant.id.slice(0, 10)}...`}
                type="code"
              />
            </div>

            {/* Payment & Subscription Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Payment Details
              </h3>

              <InfoField
                label="Reference Number"
                value={`${data.payment.reference.slice(0, 10)}...`}
                type="code"
              />
              {/* <InfoField
                label="Access Code"
                value={data.payment.access_code}
                type="code"
              /> */}

              <div className="grid grid-cols-2 gap-4">
                <InfoField
                  label="Subscription Start"
                  value={formatDate(data.estate.subscriptionStartDate)}
                />
                <InfoField
                  label="Subscription End"
                  value={formatDate(data.estate.subscriptionEndDate)}
                />
              </div>

              <div className="bg-[#D97757]/20 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  Subscription Duration:{" "}
                  <span className="font-bold">
                    {daysRemaining} days remaining
                  </span>
                </p>
              </div>
            </div>

            {/* Estate Address */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Estate Address
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoField
                  label="Street"
                  value={data.estate.estateAddress.streetName}
                />
                <InfoField
                  label="City"
                  value={data.estate.estateAddress.city}
                />
                <InfoField
                  label="State"
                  value={data.estate.estateAddress.state}
                />
                <InfoField
                  label="Zip Code"
                  value={data.estate.estateAddress.zipCode}
                />
              </div>
              <InfoField
                label="Country"
                value={data.estate.estateAddress.country}
              />
            </div>

            {/* Important Notes */}
            <div className="md:col-span-2">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">
                      Important Information
                    </h4>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          Your temporary password and login credentials will be
                          sent via email after payment confirmation
                        </li>
                        <li>
                          Subscription will be activated immediately upon
                          successful payment
                        </li>
                        <li>
                          Keep your reference number for future inquiries:{" "}
                          <strong>{data.payment.reference.slice(0, 10)}</strong>
                        </li>
                        <li>
                          You can verify your payment status using:{" "}
                          <strong>{data.verify_url.slice(0, 10)}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 pb-5 pt-3 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>Need help? Contact entri@neurobytes.io</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Cancel
              </button>
              <Link
                href={data.payment.authorization_url}
                // target="_blank"
                rel="noopener noreferrer"
                className="px-8 hidden sm:block py-2 bg-gradient-to-r from-[#D97757] to-[#D97757] text-white font-medium rounded-lg hover:from-[#D97757] hover:to-[#D97757] transition-all transform hover:scale-105 shadow-lg"
              >
                Proceed to Payment
              </Link>
              <Link
                href={data.payment.authorization_url}
                // target="_blank"
                rel="noopener noreferrer"
                className="px-8 sm:hidden  py-2 bg-gradient-to-r from-[#D97757] to-[#D97757] text-white font-medium rounded-lg hover:from-[#D97757] hover:to-[#D97757] transition-all transform hover:scale-105 shadow-lg"
              >
                Proceed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable InfoField component
interface InfoFieldProps {
  label: string;
  value: string;
  type?: "default" | "email" | "phone" | "code";
}

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  type = "default",
}) => {
  const formatValue = () => {
    switch (type) {
      case "email":
        return (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </a>
        );
      case "phone":
        return (
          <a
            href={`tel:${value}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </a>
        );
      case "code":
        return (
          <code className="bg-gray-50 px-2 py-1 rounded text-sm font-mono">
            {value}
          </code>
        );
      default:
        return <span className="text-gray-900">{value}</span>;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      <div className="text-base font-semibold">{formatValue()}</div>
    </div>
  );
};

export default CheckoutPopup;
