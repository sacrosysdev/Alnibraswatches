import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  ChevronRight,
} from "lucide-react";

const HelpCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const supportCategories = [
    {
      id: "order",
      title: "Order Issues",
      description: "Track orders, returns, refunds",
      icon: "📦",
      email: "orders@alnibraswatches.com",
    },
    {
      id: "product",
      title: "Product Support",
      description: "Product information, sizing, features",
      icon: "⌚",
      email: "products@alnibraswatches.com",
    },
    {
      id: "account",
      title: "Account & Billing",
      description: "Account management, payments",
      icon: "👤",
      email: "billing@alnibraswatches.com",
    },
    {
      id: "technical",
      title: "Technical Support",
      description: "Website issues, app problems",
      icon: "🔧",
      email: "support@alnibraswatches.com",
    },
  ];

  const contactInfo = {
    email: "hello@alnibraswatches.com",
    phone: "+91 98765 43210",
    address: "Al Nibras Watches, Dubai, UAE",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM (GST)",
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${
      contactInfo.email
    }?subject=${encodeURIComponent(
      emailForm.subject
    )}&body=${encodeURIComponent(emailForm.message)}`;
    window.open(mailtoLink, "_blank");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setEmailForm((prev) => ({
      ...prev,
      subject: `[${category.title}] - Support Request`,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Center</h1>
        <p className="text-gray-600">
          We're here to help! Get in touch with our support team.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-lg  md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#005C53] p-2 rounded-full">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#005C53] font-medium hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#005C53] p-2 rounded-full">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-[#005C53] font-medium hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#005C53] p-2 rounded-full">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-800">{contactInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-[#005C53] p-2 rounded-full">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Hours</p>
                <p className="text-gray-800">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Email Form */}
        <div className="bg-white rounded-lg mt-5 md:mt-0  md:p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send us a Message
          </h2>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) =>
                  setEmailForm((prev) => ({ ...prev, subject: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005C53] focus:border-transparent"
                placeholder="What can we help you with?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={emailForm.message}
                onChange={(e) =>
                  setEmailForm((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005C53] focus:border-transparent"
                placeholder="Please describe your issue in detail..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#005C53] text-white py-2 px-4 rounded-md hover:bg-[#004a42] transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Email</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
