"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Home,
  HeartHandshake,
  BookOpen,
  Users,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const relocationSections = [
  {
    title: "Relocation Pathways",
    description: "Your step-by-step roadmap for a smooth transition to life in Thailand.",
    icon: Plane,
    href: "/relocation/pathways",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    features: ["Arrival Checklist", "Moving Guides", "District Profiles"]
  },
  {
    title: "Housing & Real Estate",
    description: "Curated advice and services to help you find your dream home.",
    icon: Home,
    href: "/relocation/housing",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    features: ["Rental Assistance", "Property Buying", "Area Guides"]
  },
  {
    title: "Health & Insurance",
    description: "Navigate the Thai healthcare system and find the right coverage.",
    icon: HeartHandshake,
    href: "/relocation/health",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    features: ["Insurance Quotes", "Hospital Reviews", "Mental Health"]
  },
  {
    title: "Visa & Legal Hub",
    description: "Expert assistance for all Thai visa types and legal requirements.",
    icon: ShieldCheck,
    href: "/visas/options",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    features: ["Visa Options", "Renewals", "Legal Support"]
  }
];

export default function RelocationPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111]">
      {/* Hero Section */}
      <section className="relative py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 text-blue-600 font-bold text-xs tracking-widest uppercase mb-8">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              Relocation Services
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
              Move to Thailand <br />
              <span className="text-blue-600">Without the Stress</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              From visa applications to finding your first condo, we provide the expert guidance and local connections you need for a seamless relocation.
            </p>
          </motion.div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-0"></div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relocationSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${section.bgColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {section.description}
                </p>
                <div className="space-y-3 mb-8">
                  {section.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                      <div className={`w-1 h-1 rounded-full ${section.bgColor.replace('bg-', 'bg-').replace('-50', '-500')}`} />
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href={section.href}
                  className="flex items-center gap-2 text-xs font-bold text-gray-900 group/link"
                >
                  LEARN MORE
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial/Trust Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              <Sparkles className="w-12 h-12 text-blue-300 mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start your journey?</h2>
              <p className="text-lg text-blue-100 mb-12">
                Join 5,000+ expats who used THAIBK to make their move to Thailand successful and stress-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-sm shadow-xl hover:bg-gray-50 transition-all">
                  GET A FREE CONSULTATION
                </button>
                <button className="bg-blue-700 text-white border border-blue-500 px-10 py-5 rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all">
                  VIEW PRICING
                </button>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
