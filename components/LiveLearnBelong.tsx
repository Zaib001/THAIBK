import { LLB_ITEMS } from "./data/liveLearnBelong";
import Link from "next/link";

export default function LiveLearnBelong() {
  return (
    <section className="py-20 bg-amanSand">
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

        {LLB_ITEMS.map((item) => (
          <Link href={item.link} key={item.title}>
            <div className="group cursor-pointer">

              {/* IMAGE CARD */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
              </div>

              {/* TITLE (OUTSIDE, BELOW) */}
              <h3
                className="mt-4 text-2xl md:text-3xl tracking-wider font-serif  group-hover:translate-x-1 transition-all duration-500"
              >
                {item.title}
              </h3>


            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}
