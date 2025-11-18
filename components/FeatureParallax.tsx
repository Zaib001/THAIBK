"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Cost of Living Guide",
    link: "/lifestyle",
    image: "https://plus.unsplash.com/premium_photo-1678139620956-cbd87b6ba3d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Healthcare & Insurance",
    link: "/healthcare",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    title: "Visa & Legal Support",
    link: "/visas",
    image: "https://images.unsplash.com/photo-1639034741369-1e0c771adaeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
  },
  {
    title: "Local Communities & Meetups",
    link: "/community",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];

export default function FeatureParallax() {
  return (
    <section className="py-28 bg-amanSand">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <h2 className="text-center text-4xl tracking-wide uppercase text-amanCharcoal">
          Key Essentials for Settling in Thailand
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, i) => (
            <ParallaxCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ feature }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link href={feature.link}>
      <motion.div
        ref={ref}
        style={{ y }}
        className="relative overflow-hidden rounded-xl cursor-pointer group shadow-lg"
      >
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition"></div>

        <div className="absolute bottom-6 left-6 text-amanLinen">
          <h3 className="text-2xl tracking-wide uppercase text-white font-serif">{feature.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
