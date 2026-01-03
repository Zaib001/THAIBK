"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, BookOpen, Sparkles, Languages, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function GuidesPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Navigation */}
            <nav className="p-6">
                <Link href="/lifestyle" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Lifestyle</span>
                </Link>
            </nav>

            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <GraduationCap className="w-10 h-10 text-amber-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Guides & Learning
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Accelerate your integration with expert-led courses on Thai language, business culture, and local logistics.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Thai Language",
                            desc: "Practical, conversational Thai designed for expats who want to navigate daily life with ease.",
                            icon: Languages,
                            color: "text-amber-500",
                            bgColor: "bg-amber-50"
                        },
                        {
                            title: "Business Culture",
                            desc: "Master the nuances of Thai business etiquette, hierarchy, and relationship building.",
                            icon: Lightbulb,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        },
                        {
                            title: "Expert Guides",
                            desc: "Deep-dive manuals on complex topics from tax residency to property law.",
                            icon: BookOpen,
                            color: "text-emerald-500",
                            bgColor: "bg-emerald-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform`}>
                                <item.icon className={`w-8 h-8 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-400 rounded-2xl text-[10px] font-bold tracking-widest uppercase">
                                COURSE MODULES COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-amber-500 rounded-[4rem] py-24 px-8 text-center text-black overflow-hidden relative shadow-2xl shadow-amber-900/20">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic leading-tight">Empower your <br /> Thai journey.</h2>
                    <p className="text-amber-900 text-lg mb-12 opacity-80 font-medium">
                        Join our premium learning community and get access to monthly live Q&A sessions with Thailand experts.
                    </p>
                    <button className="px-12 py-6 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-900 transition-all shadow-xl">
                        JOIN THE ACADEMY
                    </button>
                </div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </section>
        </div>
    );
}
