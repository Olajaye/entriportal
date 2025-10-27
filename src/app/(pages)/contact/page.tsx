"use client";

import { useState } from "react";
import Logo from "@/src/component/Logo";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if (validateForm()) {
    //   handleResetPassword(formData);
    // }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center mb-6">
              <Logo />
              <h1 className="text-2xl font-bold text-navy font-inter mt-2">
                Contact Us
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Enter your full name"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-garden`}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-garden`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  onChange={handleChange}
                  value={formData.subject}
                  placeholder="What is this regarding?"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-garden`}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Tell us how we can help you..."
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none border-gray-300 focus:ring-garden`}
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full sm:mt-5 lg:mt-6 px-6 py-3 bg-primaryCol text-white rounded-md hover:bg-primaryCol/90 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
