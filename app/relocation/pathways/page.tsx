"use client";

import { motion } from "framer-motion";
import { Plane, ArrowLeft, ShieldCheck, Sparkles, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function PathwaysPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Navigation */}
            <nav className="p-6">
                <Link href="/relocation" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-semibold">Back to Relocation</span>
                </Link>
            </nav>

            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <Plane className="w-10 h-10 text-blue-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Relocation Pathways
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Your step-by-step roadmap for a smooth transition. We guide you through everything from packing to your first night in Thailand.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Arrival Checklist",
                            desc: "A mission-critical list of tasks for your first 48 hours in the kingdom.",
                            icon: Search,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        },
                        {
                            title: "Moving Guides",
                            desc: "Expert tips on shipping, customs, and what to bring vs what to buy locally.",
                            icon: MapPin,
                            color: "text-emerald-500",
                            bgColor: "bg-emerald-50"
                        },
                        {
                            title: "District Profiles",
                            desc: "In-depth insights into the best areas to live based on your budget and lifestyle.",
                            icon: ShieldCheck,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-bold tracking-widest uppercase border border-gray-100">
                                <Sparkles className="w-3 h-3" />
                                PATHWAY COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-blue-700 rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative shadow-2xl shadow-blue-900/40">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic leading-tight">Need a professional <br /> transition team?</h2>
                    <p className="text-blue-100 text-lg mb-12 opacity-80">
                        Our premium relocation concierge handles everything so you can focus on enjoying your new life in Thailand.
                    </p>
                    <button className="px-12 py-6 bg-white text-blue-700 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl">
                        GET A CONCIERGE QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
}
