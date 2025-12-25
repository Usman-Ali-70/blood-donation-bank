import { motion } from "framer-motion";
import { Droplet, Heart, Users, Search, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block p-6 bg-white/70 dark:bg-gray-800/70 rounded-full backdrop-blur mb-8"
        >
          <Droplet className="w-24 h-24 text-red-600 dark:text-red-400 fill-current" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Donate Blood,<br />Save Lives
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Connect with willing donors in your area instantly. One donation can save up to three lives.
        </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Link
    to="/search"
    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-xl transition"
  >
    <Search className="w-6 h-6" />
    Find Donors Now
  </Link>
</motion.div>

<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Link
    to="/register"
    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 dark:from-gray-800 dark:to-gray-700 hover:from-red-700 hover:to-pink-700 dark:hover:from-gray-700 dark:hover:to-gray-600 text-white dark:text-white font-semibold rounded-xl shadow-xl transition"
  >
    <Heart className="w-6 h-6 text-white dark:text-red-400 fill-current" />
    Become a Donor
  </Link>
</motion.div>
</div>
      </motion.section>

      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="inline-flex p-6 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
              <MapPin className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Location-Based Search</h3>
            <p className="text-gray-600 dark:text-gray-400">Find available donors in your city or nearby areas quickly.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex p-6 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6">
              <Phone className="w-12 h-12 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Direct Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">Call or message donors instantly with one tap.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex p-6 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <Users className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Growing Community</h3>
            <p className="text-gray-600 dark:text-gray-400">Join thousands of heroes ready to make a difference.</p>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 text-center"
      >
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Every blood donation is a gift of life.
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
          Be the reason someone smiles today.
        </p>
      </motion.section>
    </div>
  );
}