"use client";
import Logo from "@/src/component/Logo";
import {
  useForgetPasswordMutation,
  useResetPasswordMutation,
} from "@/src/lib/features/api/userApi";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const [updatePassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    resetCode: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    resetCode: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [step, setStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword({ email })
      .unwrap()
      .then(() => {
        toast.success("An email has been sent to reset your password");
        setStep(1);
      })
      .catch((error: any) => {
        toast.error(
          error?.data?.message || `an unexpected ${error?.status} error occured`
        );
      });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirmation = () =>
    setShowPasswordConfirmation((prev) => !prev);

  const handleGoBack = () => {
    router.back();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      resetCode: "",
      password: "",
      passwordConfirmation: "",
    };

    // ✅ Validate reset code
    if (!formData.resetCode || formData.resetCode.length !== 6) {
      newErrors.resetCode = "Please enter a valid 6-digit code";
      valid = false;
    } else if (!/^\d{6}$/.test(formData.resetCode)) {
      newErrors.resetCode = "Code must contain only digits";
      valid = false;
    }

    // ✅ Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    // ✅ Validate password confirmation
    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleResetSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      handleResetPassword(formData);
    }
  };

  const handleResetPassword = async (values: any) => {
    const payload = {
      email,
      resetCode: values.resetCode,
      newPassword: values.password,
    };

    updatePassword(payload)
      .unwrap()
      .then((res) => {
        toast.success("Password has been reset successfully");
        router.back();
      })
      .catch((error: any) => {
        toast.error(
          error?.data?.message || `an unexpected ${error?.status} error occured`
        );
      });
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits

    const codeArray = formData.resetCode.split("");

    if (value) {
      codeArray[index] = value;
      const newCode = codeArray.join("");
      setFormData((prev) => ({ ...prev, resetCode: newCode }));

      // Move to next input automatically
      const nextInput = e.target.nextElementSibling as HTMLInputElement | null;
      if (nextInput) nextInput.focus();
    } else {
      codeArray[index] = "";
      setFormData((prev) => ({ ...prev, resetCode: codeArray.join("") }));
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const codeArray = formData.resetCode.split("");
      codeArray[index] = "";
      setFormData((prev) => ({ ...prev, resetCode: codeArray.join("") }));

      // Move focus back to previous input if empty
      const prevInput = e.currentTarget
        .previousElementSibling as HTMLInputElement | null;
      if (index > 0 && prevInput) prevInput.focus();
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-lg">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-2">
              <Logo />
              <h1 className="text-2xl font-bold text-navy font-inter  mt-2">
                {step === 0
                  ? "Reset your entri password"
                  : "Set a new password"}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step === 0
                  ? "Enter your email address and we'll send you instructions to reset your password."
                  : "Enter the 6-digit code sent to your email and set your new password."}
              </p>
            </div>

            {/* Form */}
            {step === 0 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-garden focus:outline-none transition-colors duration-200 placeholder-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primaryCol text-white py-3 px-4 rounded-lg font-medium hover:bg-primaryCol/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-garden disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending instructions...
                    </div>
                  ) : (
                    "Send reset instructions"
                  )}
                </button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={handleResetSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="resetCode"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Reset Code
                  </label>

                  <div className="flex justify-between gap-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={formData.resetCode[index] || ""}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-16 h-16 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-garden"
                      />
                    ))}
                  </div>

                  {errors.resetCode && (
                    <div className="text-red-500 text-xs mt-1 text-left">
                      {errors.resetCode}
                    </div>
                  )}
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Enter new password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-garden"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-9 text-sm text-gray-500 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && (
                    <div className="text-red-500 text-xs mt-1 text-left">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    onChange={handleChange}
                    value={formData.passwordConfirmation}
                    placeholder="Confirm new password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.passwordConfirmation
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-garden"
                    }`}
                  />
                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePasswordConfirmation}
                    className="absolute right-3 top-9 text-sm text-gray-500 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPasswordConfirmation ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  {errors.passwordConfirmation && (
                    <div className="text-red-500 text-xs mt-1 text-left">
                      {errors.passwordConfirmation}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResetLoading}
                  className="mt-4 w-full sm:mt-5 lg:mt-6 px-6 py-3 bg-primaryCol text-white rounded-md hover:bg-primaryCol/90 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResetLoading ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}

            {/* Back to login link */}
            <div className="mt-6 text-center">
              <div
                onClick={handleGoBack}
                className="text-sm text-navy/90 hover:text-navy font-medium transition-colors duration-200 cursor-pointer"
              >
                ← Back to login
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            Need help? Contact our{" "}
            <Link
              href={"/contact"}
              className="text-navy hover:text-navy/35 underline transition-colors duration-200"
            >
              support team
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
