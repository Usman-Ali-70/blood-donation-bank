import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Calendar, Droplet, Mail } from "lucide-react";

const bloodGroupColors = {
  "A+": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "A-": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-500",
  "B+": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  "B-": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
  "AB+": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  "AB-": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-500",
  "O+": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  "O-": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500",
};

const DonorCard = ({ donor, onToggleAvailability }) => {
  const bloodColorClass = bloodGroupColors[donor.bloodGroup] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-500 to-pink-600" />

      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {donor.fullName}
            </h3>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${bloodColorClass}`}
            >
              <Droplet className="w-4 h-4 fill-current" />
              {donor.bloodGroup}
            </span>
          </div>

          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{donor.city}</span>
            </p>

            <p className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <a href={`tel:${donor.phone}`} className="hover:text-green-600 dark:hover:text-green-400 transition">
                {donor.phone}
              </a>
            </p>

            {donor.email && (
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href={`mailto:${donor.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition break-all">
                  {donor.email}
                </a>
              </p>
            )}

            {donor.lastDonationDate && (
              <p className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span>Last donated: {new Date(donor.lastDonationDate).toLocaleDateString()}</span>
              </p>
            )}

            <p className="flex items-center gap-3 font-medium">
              <span className="text-gray-700 dark:text-gray-200">Availability:</span>
              <span
                className={`font-bold ${
                  donor.availability
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {donor.availability ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <a
              href={`tel:${donor.phone}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-medium shadow-md"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>
            <a
              href={`sms:${donor.phone}`}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAvailability}
            className={`px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all ${
              donor.availability
                ? "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            }`}
          >
            {donor.availability ? "Set Unavailable" : "Set Available"}
          </motion.button>

          <div className="mt-4 flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                donor.availability ? "bg-green-500" : "bg-red-500"
              } animate-pulse`}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {donor.availability ? "Ready to donate" : "Not ready"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DonorCard;