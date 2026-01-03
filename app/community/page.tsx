"use client";

import { motion } from "framer-motion";
import {
  Users,
  HeartHandshake,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Globe,
  Share2,
  Calendar
} from "lucide-react";
import Link from "next/link";

const communitySections = [
  {
    title: "Forum Discussions",
    description: "Join the conversation with thousands of expats and locals sharing advice and experiences.",
    icon: MessageSquare,
    href: "/community/forum",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    features: ["Expert Q&A", "City Guides", "Marketplace"]
  },
  {
    title: "Local Clubs & Activities",
    description: "Find your hobby groups, sports teams, and social circles in your new home.",
    icon: Calendar,
    href: "/community/clubs",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    features: ["Hobby Groups", "Sports Teams", "Expat Meetups"]
  },
  {
    title: "Volunteer & Give Back",
    description: "Connect with local charities and initiatives to make a positive impact in Thailand.",
    icon: HeartHandshake,
    href: "/community/volunteer",
    color: "text-red-500",
    bgColor: "bg-red-50",
    features: ["Charity Work", "Teaching", "Eco-Projects"]
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Dynamic Header */}
      <section className="pt-20 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-7xl font-serif font-bold tracking-tighter mb-8 leading-none">
                The Heart of <br />
                <span className="text-purple-600">Thailand’s Expat</span> <br />
                Community.
              </h1>
              <p className="text-xl text-gray-400 font-medium leading-relaxed">
                Connect, share, and thrive with the largest network of international residents in the Land of Smiles.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 pb-2"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold tracking-widest text-gray-900">
                +12K MEMBERS
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Service Cards */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {communitySections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-3xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-3xl ${section.bgColor} flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform duration-500`}>
                    <section.icon className={`w-10 h-10 ${section.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6">{section.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed mb-10">
                    {section.description}
                  </p>

                  <div className="flex flex-col gap-4 mb-12">
                    {section.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm font-bold text-gray-900">
                        <ArrowRight className={`w-4 h-4 ${section.color}`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={section.href}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#111] text-white text-xs font-bold tracking-widest hover:bg-purple-600 transition-colors duration-300`}
                  >
                    EXPLORE NOW
                    <Share2 className="w-4 h-4" />
                  </Link>
                </div>

                {/* Decorative background circle */}
                <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${section.bgColor} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-3xl`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-gradient-to-br from-purple-900 to-black rounded-[4rem] p-16 relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold tracking-[0.3em] uppercase mb-8 border border-purple-500/30">
                <Sparkles className="w-3 h-3" />
                COMMUNITY HIGHLIGHT
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-white font-bold mb-8 leading-tight">
                Don’t miss the <br />
                <span className="text-purple-400 underline decoration-purple-400/30 underline-offset-8 italic">Bangkok Meetup</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl">
                Our biggest monthly social event is happening next week at Thong Lo. Reserve your spot and meet the community in person.
              </p>
              <button className="px-12 py-6 bg-white text-black rounded-2xl font-bold text-sm hover:bg-purple-400 hover:text-white transition-all duration-300">
                BOOK YOUR TICKET
              </button>
            </div>
            <div className="hidden lg:block w-72 h-72 bg-purple-500 rounded-full blur-[120px] absolute top-1/2 right-0 -translate-y-1/2 opacity-20" />
          </div>
        </div>
      </section>
    </div>
  );
}
