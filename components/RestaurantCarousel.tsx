"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const restaurantPartners = [
  {
    name: "The Steakhouse",
    description: "Premium Cuts & Fine Dining Experience",
    link: "https://www.thesteakhouse.com",
    category: "Steakhouse",
    background: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    priceRange: "$$$"
  },
  {
    name: "Bella Vista",
    description: "Authentic Italian Cuisine & Wine",
    link: "https://www.bellavista.com",
    category: "Italian",
    background: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    priceRange: "$$"
  },
  {
    name: "Le Bistro Parisien",
    description: "French Elegance in Every Bite",
    link: "https://www.lebistroparisien.com",
    category: "French",
    background: "https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    priceRange: "$$$"
  },
  {
    name: "Coastal Grill",
    description: "Fresh Seafood & Ocean Views",
    link: "https://www.coastalgrill.com",
    category: "Seafood",
    background: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    priceRange: "$$"
  },
  {
    name: "Rustic Tavern",
    description: "American Classics & Craft Beer",
    link: "https://www.rustictavern.com",
    category: "American",
    background: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    priceRange: "$$"
  },
  {
    name: "The Chophouse",
    description: "Prime Meats & Extensive Wine List",
    link: "https://www.thechophouse.com",
    category: "Fine Dining",
    background: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    priceRange: "$$$$"
  },
  {
    name: "Mediterranean Blue",
    description: "Coastal Flavors & Healthy Choices",
    link: "https://www.mediterraneanblue.com",
    category: "Mediterranean",
    background: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    priceRange: "$$"
  },
  {
    name: "Urban Grill",
    description: "Modern Fusion & Creative Cocktails",
    link: "https://www.urbangrill.com",
    category: "Fusion",
    background: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    priceRange: "$$$"
  }
];

export default function RestaurantCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  
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
    <section className="w-full py-24 bg-linear-to-br from-amber-900 via-[#2A2722] to-amber-900 relative overflow-hidden">
      {/* Background Elements - Different colors for restaurants */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-amber-600/50"></div>
            <span className="text-sm text-amber-100 tracking-widest uppercase">Culinary Excellence</span>
            <div className="w-12 h-px bg-amber-600/50"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Restaurant Partners
          </h2>
          <p className="text-xl text-amber-50/90 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional dining experiences with our curated selection of world-class restaurants. 
            Each offering unique flavors, ambiance, and impeccable service.
          </p>
        </div>
        
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex max-w-7xl">
            {restaurantPartners.map((restaurant, idx) => (
              <div
                key={idx}
                className="embla__slide shrink-0 min-w-0 w-[400px] md:w-[450px] lg:w-[500px] px-4"
              >
                <a
                  href={restaurant.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 overflow-hidden h-96">
                    {/* Background Image with Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${restaurant.background})` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>
                      <div className="absolute inset-0 bg-linear-to-r from-amber-900/20 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      {/* Category & Price Range */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center px-4 py-2 bg-amber-500/20 backdrop-blur-sm text-amber-100 rounded-full text-sm font-semibold border border-amber-400/30">
                          {restaurant.category}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-amber-100 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                            {restaurant.priceRange}
                          </span>
                          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            <span className="text-white text-sm font-semibold">{restaurant.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Restaurant Name */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors duration-300">
                        {restaurant.name}
                      </h3>

                      {/* Description */}
                      <p className="text-amber-50/90 text-lg mb-6 leading-relaxed">
                        {restaurant.description}
                      </p>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between">
                        <span className="text-amber-100 font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                          View Menu & Reservations
                        </span>
                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                          <svg className="w-5 h-5 text-white group-hover:text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay - Different colors */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features - Restaurant specific */}
        <div className="text-center mt-16">
          <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8 text-amber-50/90">
            <div className="flex flex-col items-center p-6 bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-400/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold">Quick Reservations</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-400/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546V6a2 2 0 012-2h14a2 2 0 012 2v9.546z" />
                </svg>
              </div>
              <span className="font-semibold">Exclusive Tables</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-400/20">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <span className="font-semibold">Seasonal Menus</span>
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