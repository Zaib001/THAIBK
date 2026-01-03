"use client";

import { motion } from "framer-motion";
import { HeartHandshake, ArrowLeft, ShieldCheck, Sparkles, PhoneCall, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function HealthPage() {
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                            <HeartHandshake className="w-10 h-10 text-rose-500" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic text-gray-900">
                            Health & Insurance
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
                            Stay healthy and protected. Explore the world-class Thai healthcare system and find the right insurance for your needs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Hospital Reviews",
                            desc: "Objective reviews and cost comparisons of the best international hospitals in Thailand.",
                            icon: Stethoscope,
                            color: "text-rose-500",
                            bgColor: "bg-rose-50"
                        },
                        {
                            title: "Insurance Quotes",
                            desc: "A marketplace of tailored insurance plans for retirees, nomads, and families.",
                            icon: ShieldCheck,
                            color: "text-blue-500",
                            bgColor: "bg-blue-50"
                        },
                        {
                            title: "Mental Health",
                            desc: "Access to bilingual counseling and support for the challenges of expat life.",
                            icon: PhoneCall,
                            color: "text-purple-500",
                            bgColor: "bg-purple-50"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-3xl transition-all duration-500"
                        >
                            <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed mb-12">{item.desc}</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-xs font-bold tracking-widest uppercase border border-gray-100">
                                <Sparkles className="w-3 h-3" />
                                PORTAL COMING SOON
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Professional Callout */}
            <section className="mx-4 mb-20 bg-rose-600 rounded-[4rem] py-24 px-8 text-center text-white overflow-hidden relative shadow-2xl shadow-rose-900/30">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 italic leading-tight">Your health is <br /> our priority.</h2>
                    <p className="text-rose-50 text-lg mb-12 opacity-90 italic">
                        Get personalized assistance choosing the right insurance tier for your visa and lifestyle requirements.
                    </p>
                    <button className="px-12 py-6 bg-white text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-50 transition-all shadow-xl">
                        GET AN INSURANCE QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
}
