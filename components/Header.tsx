"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  Globe,
  HeartHandshake,
  MapPin,
  Sparkles,
  LogOut,
  MessageCircle,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    },
    {
      label: "Relocation",
      href: "/relocation",
      icon: MapPin,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Community",
      href: "/community",
      icon: HeartHandshake,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "SOLA",
      href: "/sola",
      icon: MessageCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
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
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${pathname.startsWith(item.href)
                    ? `${item.bgColor} ${item.color} shadow-md`
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${pathname.startsWith(item.href) ? item.color : "text-gray-400 group-hover:text-gray-600"}`} />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
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

              {/* User Authentication Actions */}
              {status === "loading" ? (
                <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse hidden sm:block"></div>
              ) : session ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-xl border border-gray-200">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt=""
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px] uppercase">
                        {session.user?.name?.charAt(0) || <User className="w-3 h-3" />}
                      </div>
                    )}
                    <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">
                      {session.user?.name?.split(' ')[0]}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut()}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 border border-transparent hover:border-red-100"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                </motion.div>
              )}

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
              <div className="px-4 py-6 space-y-4">
                {session && (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      {session.user?.image ? (
                        <img src={session.user.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {session.user?.name?.charAt(0) || <User className="w-5 h-5" />}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-900">{session.user?.name}</p>
                        <p className="text-[10px] text-gray-500">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl text-sm font-semibold transition-all duration-200 ${pathname.startsWith(item.href)
                        ? `${item.bgColor} ${item.color} shadow-sm border border-${item.color.split("-")[1]}-200`
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-6 h-6 mb-2" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {!session && (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-3 w-full py-4 text-gray-700 font-semibold bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Login to Account
                  </Link>
                )}

                <Link
                  href="/sola"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-black text-white font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all duration-300 active:scale-[0.98]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  Explore THAIBK
                </Link>
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
