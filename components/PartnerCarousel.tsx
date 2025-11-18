"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const hotelPartners = [
  {
    name: "Marriott International",
    description: "Luxury Hospitality Worldwide",
    link: "https://www.marriott.com",
    category: "Luxury",
    background: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.8
  },
  {
    name: "Hilton Hotels & Resorts",
    description: "Premium Stays with Excellence",
    link: "https://www.hilton.com",
    category: "Premium",
    background: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.7
  },
  {
    name: "Hyatt Hotels",
    description: "Business & Leisure Perfected",
    link: "https://www.hyatt.com",
    category: "Business",
    background: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.6
  },
  {
    name: "Accor Hotels",
    description: "Global Hospitality Leader",
    link: "https://www.accor.com",
    category: "International",
    background: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.5
  },
  {
    name: "InterContinental",
    description: "World Class Luxury Experience",
    link: "https://www.ihg.com",
    category: "Luxury",
    background: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    name: "Four Seasons",
    description: "Ultra Luxury Redefined",
    link: "https://www.fourseasons.com",
    category: "Ultra Luxury",
    background: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    name: "Radisson Hotel Group",
    description: "Comfort with Modern Style",
    link: "https://www.radissonhotels.com",
    category: "Comfort",
    background: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.4
  },
  {
    name: "Wyndham Hotels",
    description: "Worldwide Trusted Presence",
    link: "https://www.wyndhamhotels.com",
    category: "Global",
    background: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.3
  }
];

export default function PartnerCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      dragFree: true,
      align: "center",
      containScroll: "trimSnaps",
    },
    [autoplay.current]
  );

  return (
    <section className="w-full py-24 bg-linear-to-br from-slate-900 via-[#3B3A36] to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3  mb-4">
            <div className="w-12 h-px bg-[#3B3A36]"></div>
            <span className="text-sm text-white tracking-widest uppercase">Partnerships</span>
            <div className="w-12 h-px bg-[#3B3A36]"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Hotel Partner
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled luxury with our curated selection of world-class hotel partners. 
            Each offering exceptional service and unforgettable stays.
          </p>
        </div>
        
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex max-w-7xl">
            {hotelPartners.map((hotel, idx) => (
              <div
                key={idx}
                className="embla__slide shrink-0 min-w-0 w-[400px] md:w-[450px] lg:w-[500px] px-4"
              >
                <a
                  href={hotel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 overflow-hidden h-96">
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${hotel.background})` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>
                      <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      {/* Category Badge */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white/30">
                          {hotel.category}
                        </span>
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <span className="text-white text-sm font-semibold">{hotel.rating}</span>
                        </div>
                      </div>

                      {/* Hotel Name */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[#E8E3D9] transition-colors duration-300">
                        {hotel.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                        {hotel.description}
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                          Explore Properties
                        </span>
                        <div className="w-10 h-10 bg-[#3B3A36] rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#E8E3D9]  transition-all duration-300">
                          <svg className="w-5 h-5 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="text-center mt-16">
          <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold">Best Price Guarantee</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-semibold">Free Cancellation</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
          user-select: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .embla__slide {
          position: relative;
          min-width: 0;
        }
      `}</style>
    </section>
  );
}