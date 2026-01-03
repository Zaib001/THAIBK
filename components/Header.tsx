"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  User,
  Globe,
  HeartHandshake,
  MapPin,
  BookOpen,
  Sparkles,
  Home,
  Users,
  GraduationCap,
  Briefcase,
  Plane
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      label: "Lifestyle",
      href: "/lifestyle",
      icon: Globe,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      dropdown: [
        { label: "Living in Thailand", href: "/lifestyle/living", icon: Home },
        { label: "Culture & Etiquette", href: "/lifestyle/culture", icon: Users },
        { label: "Cost of Living Guide", href: "/lifestyle/cost", icon: Briefcase },
        { label: "Guides & Learning", href: "/learn/guides", icon: GraduationCap },
        { label: "Courses & Classes", href: "/learn/courses", icon: BookOpen },
        { label: "Workshops & Experiences", href: "/learn/workshops", icon: Sparkles },
      ]
    },
    {
      label: "Relocation",
      href: "/relocation",
      icon: MapPin,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      dropdown: [
        { label: "Relocation Pathways", href: "/relocation/pathways", icon: Plane },
        { label: "Find Housing", href: "/relocation/housing", icon: Home },
        { label: "Health & Insurance", href: "/relocation/health", icon: HeartHandshake },
        { label: "Visa Options", href: "/visas/options", icon: BookOpen },
        { label: "Visa Assistance", href: "/visas/assistance", icon: Users },
      ]
    },
    {
      label: "Community",
      href: "/community",
      icon: HeartHandshake,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      dropdown: [
        { label: "Forum Discussions", href: "/community/forum", icon: Users },
        { label: "Local Clubs & Activities", href: "/community/clubs", icon: HeartHandshake },
        { label: "Volunteer & Give Back", href: "/community/volunteer", icon: Sparkles },
      ]
    },
    {
      label: "SOLA",
      href: "/sola",
      icon: Sparkles,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      dropdown: [
        { label: "AI Translator", href: "/sola", icon: Globe },
        { label: "Language Learning", href: "/sola", icon: GraduationCap },
        { label: "Cultural Guide", href: "/sola", icon: BookOpen },
      ]
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-200/50 border-b border-gray-100/50"
            : "bg-white/90 backdrop-blur-md border-b border-gray-100/30"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-black rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-all duration-300">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    THAIBK
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 font-medium">Your Thailand Companion</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${pathname.startsWith(item.href)
                        ? `${item.bgColor} ${item.color} shadow-md`
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <item.icon className={`w-4 h-4 ${pathname.startsWith(item.href) ? item.color : "text-gray-400 group-hover:text-gray-600"}`} />
                    {item.label}
                    <motion.div
                      animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.label && item.dropdown.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem, index) => (
                            <motion.div
                              key={dropdownItem.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className={`p-2 rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                                  <dropdownItem.icon className={`w-4 h-4 ${item.color}`} />
                                </div>
                                <span className="font-medium">{dropdownItem.label}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button with Expandable Input */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:block text-sm font-medium">Search</span>
                </motion.button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2"
                    >
                      <div className="flex items-center gap-2 p-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search THAIBK..."
                          className="flex-1 outline-none text-sm placeholder-gray-400"
                          autoFocus
                        />
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Login Button */}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              </motion.div>

              {/* Get Started Button */}
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Get Started
              </motion.button> */}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between p-3 rounded-xl text-base font-semibold transition-all duration-200 ${pathname.startsWith(item.href)
                          ? `${item.bgColor} ${item.color} shadow-sm`
                          : "text-gray-700 hover:bg-gray-50"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </div>
                      {item.dropdown.length > 0 && (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Link>

                    {/* Mobile Dropdown */}
                    {item.dropdown.length > 0 && (
                      <div className="ml-8 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <dropdownItem.icon className="w-4 h-4 text-gray-400" />
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
                  <button className="flex items-center justify-center gap-3 w-full py-3 text-gray-700 font-semibold border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                    <User className="w-5 h-5" />
                    Login to Account
                  </button>
                  <button className="flex items-center justify-center gap-3 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/30 transition-all duration-300">
                    <Sparkles className="w-5 h-5" />
                    Start Your Journey
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}