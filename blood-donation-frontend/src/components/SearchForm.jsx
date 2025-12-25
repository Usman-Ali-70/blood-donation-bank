import React from "react";
import { motion } from "framer-motion";
import { MapPin, Droplet, Search } from "lucide-react";

const SearchForm = ({ city, bloodGroup, setCity, setBloodGroup, onSearch }) => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSearch}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative">
          <MapPin className="absolute left-4 top-4 w-5 h-5 text-red-500" />
          <input
            type="text"
            placeholder="Enter city or location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>

        <div className="relative">
          <Droplet className="absolute left-4 top-4 w-5 h-5 text-red-500 fill-current" />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition text-gray-900 dark:text-white appearance-none cursor-pointer"
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-5 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition transform"
        >
          <Search className="w-5 h-5" />
          Search Donors
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchForm;