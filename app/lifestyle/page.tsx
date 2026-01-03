"use client";

import { motion } from "framer-motion";
import {
  Home,
  Users,
  Briefcase,
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  Globe
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Living in Thailand",
    description: "Your guide to finding a home and settling into local neighborhoods.",
    icon: Home,
    href: "/lifestyle/living",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    features: ["Housing Guides", "Neighborhood Reviews", "Daily Essentials"]
  },
  {
    title: "Culture & Etiquette",
    description: "Understand the nuances of Thai social norms and traditions.",
    icon: Users,
    href: "/lifestyle/culture",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    features: ["Social Norms", "Traditional Festivals", "Language Basics"]
  },
  {
    title: "Cost of Living Guide",
    description: "Manage your budget with up-to-date pricing for daily life.",
    icon: Briefcase,
    href: "/lifestyle/cost",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    features: ["Monthly Budgets", "Market Prices", "Lifestyle Comparisons"]
  },
  {
    title: "Guides & Learning",
    description: "Deep dive into Thai language and local expertise.",
    icon: GraduationCap,
    href: "/learn/guides",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    features: ["Language Courses", "Cultural Workshops", "Expert Guides"]
  }
];

export default function LifestylePage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase mb-6">
              <Globe className="w-3 h-3" />
              Thai Lifestyle
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6">
              Live the <span className="text-emerald-600 italic">Thai Way</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Explore everything from local culture and etiquette to finding your perfect home in the Land of Smiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-4 rounded-2xl ${section.bgColor} group-hover:scale-110 transition-transform duration-500`}>
                      <section.icon className={`w-8 h-8 ${section.color}`} />
                    </div>
                    <Link
                      href={section.href}
                      className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-gray-900 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all duration-300"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-1">
                    {section.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                    {section.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-semibold text-gray-600 border border-gray-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Callout */}
      <section className="py-20 bg-black text-white overflow-hidden rounded-[4rem] mx-4 mb-20 shadow-2xl shadow-gray-900/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center uppercase tracking-widest text-[10px] font-bold">
            <div>
              <p className="text-gray-400 mb-4 tracking-[0.3em]">CONCIERGE SERVICES</p>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                NEED PERSONALIZED <br />
                <span className="text-emerald-400">ASSISTANCE?</span>
              </h2>
              <button className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-5 rounded-2xl font-bold text-xs transition-all duration-300 group">
                CHAT WITH OUR EXPERTS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 border border-white/10 rounded-3xl backdrop-blur-sm">
                <div className="text-3xl font-serif mb-2 text-emerald-400">98%</div>
                <div className="text-gray-500">CLIENT SATISFACTION</div>
              </div>
              <div className="p-8 border border-white/10 rounded-3xl backdrop-blur-sm">
                <div className="text-3xl font-serif mb-2 text-emerald-400">24/7</div>
                <div className="text-gray-500">EXPAT SUPPORT</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
