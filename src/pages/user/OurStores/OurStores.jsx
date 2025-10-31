import React from "react";
import { MapPin, Phone, Clock, Store } from "lucide-react";

const OurStores = () => {
  const branches = [
    {
      id: 1,
      name: "Br-1 Safari Mall",
      location: "Safari Mall, Opp Joy Alukkas Jewellery, Ground Floor",
      mobile: "971569952114",
      kiosk: null,
      timings: "9:00 AM - 12:00 AM",
    },
    {
      id: 2,
      name: "Br-2 Safari Mall",
      location: "Safari Mall, First Floor, Near Mall Customer Service Centre",
      mobile: "971569931146",
      kiosk: null,
      timings: "9:00 AM - 12:00 AM",
    },
    {
      id: 3,
      name: "Br-3 Safari Mall",
      location: "Safari Mall, Ground Floor, Opp Kallyan Jewellery",
      mobile: "971569931162",
      kiosk: null,
      timings: "9:00 AM - 12:00 AM",
    },
    {
      id: 4,
      name: "Br-4 City Centre Al Zahia",
      location: "City Centre Al Zahia, Opp Dubai Library",
      mobile: "971504287768",
      kiosk: "TK-8",
      timings: "10:00 AM - 10:00 PM (Mon-Thu), 10:00 AM - 12:00 AM (Weekend)",
    },
    {
      id: 5,
      name: "Br-5 City Centre Sharjah",
      location: "City Centre Sharjah, First Floor, Opp Crocs",
      mobile: "971505101146",
      kiosk: "TK-55",
      timings: "10:00 AM - 10:00 PM (Mon-Thu), 10:00 AM - 12:00 AM (Weekend)",
    },
    {
      id: 6,
      name: "Br-6 City Centre Deira",
      location: "City Centre Deira",
      mobile: "971504287791",
      kiosk: "TK-63",
      timings: "10:00 AM - 10:00 PM (Mon-Thu), 10:00 AM - 12:00 AM (Weekend)",
    },
    {
      id: 7,
      name: "Br-7 Shara Centre",
      location: "Shara Centre, First Floor, Opp Nine West",
      mobile: "971504290345",
      kiosk: "29",
      timings: "10:00 AM - 11:00 PM (Mon-Thu), 10:00 AM - 12:00 AM (Weekend)",
    },
    {
      id: 8,
      name: "Br-8 City Centre Fujairah",
      location: "City Centre Fujairah, In Front of Carrefour",
      mobile: "971504298340",
      kiosk: "TK-18",
      timings: "10:00 AM - 10:00 PM (Mon-Thu), 10:00 AM - 12:00 AM (Weekend)",
    },
  ];

  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      <div className="p-5 xl:p-16">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#d8a44c] mb-3 font-bodoni tracking-wide">
            Our Outlets
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Visit us at any of our branches across the UAE. We're here to serve
            you!
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 md:p-6 border border-gray-100 hover:border-[#003F38]/20"
            >
              {/* Branch Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#005c53] p-2 rounded-lg">
                    <Store className="w-5 h-5 text-[#d8a44c]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 font-gilroy">
                    {branch.name}
                  </h3>
                </div>
              </div>

              {/* Branch Details */}
              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#003F38] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {branch.location}
                  </p>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#003F38] flex-shrink-0" />
                  <a
                    href={`tel:+${branch.mobile}`}
                    className="text-sm text-[#003F38] font-medium hover:underline transition-colors"
                  >
                    +{branch.mobile}
                  </a>
                </div>

                {/* Kiosk Number */}
                {branch.kiosk && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-[#003F38] flex-shrink-0 flex items-center justify-center font-bold text-xs">
                      #
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Kiosk:</span>{" "}
                      {branch.kiosk}
                    </p>
                  </div>
                )}

                {/* Timings */}
                <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                  <Clock className="w-5 h-5 text-[#003F38] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Opening Hours
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {branch.timings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-10 max-w-2xl mx-auto border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-bodoni">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Give us a call or visit any of our stores. Our friendly staff is
              ready to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+971588072123"
                className="bg-[#003F38] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00211E] transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStores;
