'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { User, Heart, ShoppingBag, X, Menu, Plus, Minus, ChevronRight, ArrowRight, ArrowUpRight, Star } from 'lucide-react';

const IMG = {
  hero: '/images/img_hero.jpg',
  editorial1: '/images/img_editorial1.jpg',
  editorial2: '/images/img_editorial2.jpg',
  editorial3: '/images/img_editorial3.jpg',
  materialBamboo: '/images/img_materialBamboo.jpg',
  materialWood: '/images/img_materialWood.jpg',
  materialFibre: '/images/img_materialFibre.jpg',
  materialPaper: '/images/img_materialPaper.jpg',
  craft: '/images/img_craft.jpg',
  pottery1: '/images/img_pottery1.jpg',
  pottery2: '/images/img_pottery2.jpg',
  pottery3: '/images/img_pottery3.jpg',
};

const P = [
  '/images/p_0.jpg',
  '/images/p_1.jpg',
  '/images/p_2.jpg',
  '/images/p_3.jpg',
  '/images/p_4.jpg',
  '/images/p_5.jpg',
  '/images/p_6.jpg',
  '/images/p_7.jpg',
  '/images/p_8.jpg',
  '/images/p_9.jpg',
  '/images/p_10.jpg',
  '/images/p_11.jpg',
  '/images/p_12.jpg',
  '/images/p_13.jpg',
  '/images/p_14.jpg',
  '/images/p_15.jpg',
  '/images/p_16.jpg',
  '/images/p_17.jpg',
];

const PRODUCTS = [
  { id: 'k01', name: 'Bamboo Cooking Spoon', category: 'Kitchen', use: 'Cooking', material: 'Bamboo', price: 480, img: P[0], alt: P[4], desc: 'Hand-finished bamboo. Warm to the touch.' },
  { id: 'k02', name: 'Bamboo Serving Spoon', category: 'Kitchen', use: 'Serving', material: 'Bamboo', price: 520, img: P[1], alt: P[5], desc: 'A quiet spoon for the everyday table.' },
  { id: 'k03', name: 'Bamboo Turner', category: 'Kitchen', use: 'Cooking', material: 'Bamboo', price: 460, img: P[2], alt: P[0], desc: 'Gentle on pans. Easy in the hand.' },
  { id: 'k04', name: 'Bamboo Ladle', category: 'Kitchen', use: 'Serving', material: 'Bamboo', price: 540, img: P[3], alt: P[1], desc: 'Deep bowl. Long handle. Considered form.' },
  { id: 'k05', name: 'Bamboo Chopsticks (Set of 4)', category: 'Kitchen', use: 'Dining', material: 'Bamboo', price: 380, img: P[17], alt: P[2], desc: 'Hand-sanded ends. Natural finish.' },
  { id: 'k06', name: 'Bamboo Cutting Board', category: 'Kitchen', use: 'Prep', material: 'Bamboo', price: 1180, img: P[4], alt: P[5], desc: 'Dense grain. Kind to knives.' },
  { id: 'k07', name: 'Bamboo Mixing Bowl', category: 'Kitchen', use: 'Prep', material: 'Bamboo', price: 890, img: P[12], alt: P[13], desc: 'A bowl that feels made for the hand.' },
  { id: 'k08', name: 'Bamboo Kitchen Organiser', category: 'Kitchen', use: 'Storage', material: 'Bamboo', price: 1450, img: P[8], alt: P[10], desc: 'Order without noise.' },
  { id: 'd01', name: 'Bamboo Dinner Plate', category: 'Dining', use: 'Dining', material: 'Bamboo', price: 620, img: P[6], alt: P[7], desc: 'A daily plate with quiet presence.' },
  { id: 'd02', name: 'Bamboo Snack Plate', category: 'Dining', use: 'Dining', material: 'Bamboo', price: 380, img: P[7], alt: P[6], desc: 'For evenings and small rituals.' },
  { id: 'd03', name: 'Bamboo Serving Tray', category: 'Dining', use: 'Serving', material: 'Bamboo', price: 980, img: P[15], alt: P[16], desc: 'Wide surface. Warm edge.' },
  { id: 'd04', name: 'Bamboo Cutlery Set', category: 'Dining', use: 'Dining', material: 'Bamboo', price: 720, img: P[17], alt: P[0], desc: 'Four pieces. One companion.' },
  { id: 'd05', name: 'Bamboo Drinking Cup', category: 'Dining', use: 'Dining', material: 'Bamboo', price: 340, img: P[14], alt: P[13], desc: 'Light in the hand. Warm to hold.' },
  { id: 'd06', name: 'Bamboo Straw Set', category: 'Dining', use: 'Dining', material: 'Bamboo', price: 240, img: P[16], alt: P[7], desc: 'Six straws. One brush. Quiet routine.' },
  { id: 'b01', name: 'Bamboo Toothbrush', category: 'Bath & Care', use: 'Personal', material: 'Bamboo', price: 180, img: P[2], alt: P[1], desc: 'A brush that belongs beside your basin.' },
  { id: 'b02', name: 'Bamboo Toothbrush Holder', category: 'Bath & Care', use: 'Personal', material: 'Bamboo', price: 420, img: P[13], alt: P[12], desc: 'A small object with a clear purpose.' },
  { id: 'b03', name: 'Bamboo Soap Dish', category: 'Bath & Care', use: 'Personal', material: 'Bamboo', price: 380, img: P[15], alt: P[14], desc: 'Slatted. Draining. Simple.' },
  { id: 'b04', name: 'Bamboo Comb', category: 'Bath & Care', use: 'Personal', material: 'Bamboo', price: 240, img: P[3], alt: P[2], desc: 'Smooth teeth. Warm handle.' },
  { id: 'b05', name: 'Bamboo Cotton Bud Holder', category: 'Bath & Care', use: 'Personal', material: 'Bamboo', price: 320, img: P[11], alt: P[10], desc: 'A small vessel for a small ritual.' },
  { id: 'b06', name: 'Bamboo Storage Box', category: 'Bath & Care', use: 'Storage', material: 'Bamboo', price: 780, img: P[10], alt: P[8], desc: 'Lidded. Lined. Quietly useful.' },
  { id: 'h01', name: 'Bamboo Basket', category: 'Home', use: 'Storage', material: 'Bamboo', price: 1280, img: P[8], alt: P[9], desc: 'Woven with intention.' },
  { id: 'h02', name: 'Bamboo Storage Tray', category: 'Home', use: 'Storage', material: 'Bamboo', price: 640, img: P[9], alt: P[8], desc: 'For keys, letters, the everyday.' },
  { id: 'h03', name: 'Laundry Basket', category: 'Home', use: 'Storage', material: 'Bamboo', price: 2450, img: P[11], alt: P[8], desc: 'A tall vessel that stands quietly.' },
  { id: 'h04', name: 'Desktop Organiser', category: 'Home', use: 'Storage', material: 'Bamboo', price: 1180, img: P[5], alt: P[4], desc: 'Ordered. Uncluttered. Warm.' },
  { id: 'h05', name: 'Drawer Organiser', category: 'Home', use: 'Storage', material: 'Bamboo', price: 780, img: P[4], alt: P[6], desc: 'Inner architecture, quietly.' },
  { id: 'h06', name: 'Plant Stand', category: 'Home', use: 'Storage', material: 'Wood', price: 1980, img: P[12], alt: P[13], desc: 'Height, honestly considered.' },
  { id: 's01', name: 'Reusable Bamboo Cutlery Kit', category: 'Everyday', use: 'Journey', material: 'Bamboo', price: 620, img: P[17], alt: P[0], desc: 'Rolled. Portable. Personal.' },
  { id: 's02', name: 'Travel Dining Set', category: 'Everyday', use: 'Journey', material: 'Bamboo', price: 980, img: P[0], alt: P[17], desc: 'Everything for the road.' },
  { id: 's03', name: 'Lunch Accessories', category: 'Everyday', use: 'Journey', material: 'Bamboo', price: 540, img: P[1], alt: P[3], desc: 'For lunches taken thoughtfully.' },
  { id: 's04', name: 'Kraft Paper Bags (Set of 10)', category: 'Everyday', use: 'Storage', material: 'Paper', price: 280, img: P[11], alt: P[9], desc: 'Honest paper. Nothing more.' },
  { id: 's05', name: 'Sustainable Gift Box', category: 'Everyday', use: 'Gift', material: 'Paper', price: 480, img: P[9], alt: P[10], desc: 'A thoughtful vessel for a thoughtful gift.' },
  { id: 's06', name: 'Natural Storage Solutions', category: 'Everyday', use: 'Storage', material: 'Natural Fibre', price: 890, img: P[10], alt: P[11], desc: 'Woven answers to daily questions.' },
];

const CATEGORIES = [
  { key: 'Bath & Care', title: 'THE MORNING', desc: 'Personal care, toothbrushes and bathroom objects.', img: P[15] },
  { key: 'Dining', title: 'THE TABLE', desc: 'Cutlery, utensils and dining essentials.', img: P[6] },
  { key: 'Kitchen', title: 'THE KITCHEN', desc: 'Tools and objects for everyday preparation.', img: P[0] },
  { key: 'Home', title: 'THE HOME', desc: 'Storage, organisation and natural household objects.', img: P[8] },
  { key: 'Everyday', title: 'THE JOURNEY', desc: 'Portable cutlery and everyday carry products.', img: P[17] },
];

const MATERIALS = [
  { n: '01', name: 'BAMBOO', img: IMG.materialBamboo, desc: 'A fast-growing grass that has served Indian kitchens and Japanese homes for centuries. Warm, resilient, honest.' },
  { n: '02', name: 'WOOD', img: IMG.materialWood, desc: 'Slow-grown and thoughtfully finished. Wood asks to be lived with — its grain deepens with use.' },
  { n: '03', name: 'NATURAL FIBRE', img: IMG.materialFibre, desc: 'Woven, spun and knotted by hand. Textures that carry the memory of the maker.' },
  { n: '04', name: 'PAPER', img: IMG.materialPaper, desc: 'Handmade Indian paper and washi-inspired sheets. Quiet, tactile, essentially useful.' },
];

const NOTES = [
  { text: 'The cutlery set has permanently found a place in my work bag.', name: 'Ananya', city: 'Kolkata' },
  { text: 'The toothbrush is simple. That is exactly why I like it.', name: 'Riya', city: 'Bengaluru' },
  { text: 'It sits on our table like it has always been there.', name: 'Aarav', city: 'Mumbai' },
  { text: 'Everything I bought feels considered. Nothing feels shouted.', name: 'Meera', city: 'Chennai' },
];
function SmartImg({
  src,
  alt = '',
  className = '',
  priority = false,
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 overflow-hidden bg-[#E7DDCC]"
        >
          <div className="absolute inset-0 image-skeleton" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          console.error('IMAGE LOAD FAILED:', src);
          e.currentTarget.style.opacity = '1';
          setLoaded(true);
        }}
        className={`
          ${className}
          ${loaded ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-300
        `}
      />
    </>
  );
}
function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#F8F4EC] paper-grain flex items-center justify-center w-full min-h-screen"
    >
      <div className="relative flex flex-col items-center">
        <svg width="360" height="140" viewBox="0 0 360 140" fill="none" className="mb-6 max-w-full">
          <path
            d="M 30 80 C 90 40, 180 110, 260 60 S 330 90, 340 70"
            stroke="#B4341F"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            className="brush-draw"
            style={{ filter: 'url(#roughen)' }}
          />
          <defs>
            <filter id="roughen">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" />
              <feDisplacementMap in="SourceGraphic" scale="3" />
            </filter>
          </defs>
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: 'easeOut' }}
          className="font-serif tracking-[0.5em] text-3xl md:text-5xl text-[#1F1B18]"
        >
          XYLEM
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="mt-2 text-[10px] tracking-[0.5em] text-[#B4341F]"
        >
          ECOMMERCE
        </motion.div>
      </div>
    </motion.div>
  );
}

const BrushMark = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none">
    <path
      d="M 8 32 C 22 18, 42 22, 52 34 C 46 40, 30 44, 12 40 Z"
      fill="#B4341F"
      opacity="0.92"
    />
    <path d="M 14 28 C 26 24, 40 28, 46 34" stroke="#F8F4EC" strokeWidth="1.2" opacity="0.7" />
  </svg>
);

function Nav({ onOpenMenu, scrolled }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        scrolled ? 'bg-[#EFE7D8]/90 backdrop-blur-lg border-b border-[#D9C7A7]/50 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-5 md:px-10 py-4 md:py-5">
        <a href="#top" className="flex items-center gap-3 group">
          <BrushMark className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-none">
            <span className="font-serif tracking-[0.3em] text-base md:text-2xl font-medium">XYLEM</span>
            <span className="text-[7px] md:text-[8px] tracking-[0.4em] text-[#B4341F] mt-1 font-bold">ECOMMERCE</span>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-[10px] tracking-[0.3em] font-semibold">
          <a href="#shop" className="hover:text-[#B4341F] transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-[#B4341F] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300">SHOP</a>
          <a href="#ritual" className="hover:text-[#B4341F] transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-[#B4341F] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300">RITUALS</a>
          <a href="#materials" className="hover:text-[#B4341F] transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-[#B4341F] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300">MATERIALS</a>
          <a href="#story" className="hover:text-[#B4341F] transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-[#B4341F] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300">STORY</a>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          <a href="#waitlist" className="hidden md:inline-block text-[10px] font-semibold tracking-[0.35em] border border-[#1F1B18] px-5 py-2.5 hover:bg-[#1F1B18] hover:text-[#F8F4EC] transition-all duration-300 rounded-sm">
            JOIN WAITLIST
          </a>
          <button
            aria-label="Menu"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenMenu();
            }}
            type="button"
            className="lg:hidden p-2 flex items-center justify-center text-[#1F1B18] active:text-[#B4341F] transition-colors cursor-pointer touch-manipulation"
          >
            <Menu size={24} strokeWidth={1.5} className="pointer-events-none" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
function Hero() {
  const ref = useRef(null);

  return (
 <section
  ref={ref}
  id="top"
  className="relative min-h-screen w-full flex items-center justify-center p-3 md:p-6 pt-20 md:pt-28 lg:pt-32 bg-[#F8F4EC]"
>
      <div className="w-full h-full min-h-[80vh] relative rounded-xl md:rounded-3xl overflow-hidden shadow-2xl shadow-[#4A3B2A]/10 border border-[#D9C7A7]/40">
        
        <div className="absolute inset-0">
     <img
  src={IMG.hero}
  alt="XYLEM interior"
  loading="eager"
  fetchPriority="high"
  decoding="sync"
  className="absolute inset-0 w-full h-full object-cover object-center"
/>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F1B18]/30 via-transparent to-[#F8F4EC]/90" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-14 pb-16 md:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.8,
              duration: 1.2,
              ease: 'easeOut',
            }}
            className="flex flex-col gap-4"
          >
            <h1 className="font-serif text-[11vw] md:text-[8.5vw] leading-[0.95] text-[#1F1B18] max-w-[14ch] font-light break-words drop-shadow-sm">
              Objects <span className="italic text-[#4A3B2A]">for</span>
              <br />
              quieter living.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 1 }}
            className="mt-8 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-[#1F1B18]/10 pt-6"
          >
            <p className="max-w-md text-sm md:text-[15px] leading-relaxed text-[#4A3B2A] font-medium">
              Natural materials, considered forms and everyday objects
              chosen for a more thoughtful way of living.
            </p>

            <a
              href="#shop"
              className="group inline-flex items-center gap-4 self-start md:self-end bg-[#1F1B18] text-[#F8F4EC] px-6 py-3.5 rounded-full hover:bg-[#B4341F] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span className="text-[10px] font-bold tracking-[0.3em]">
                EXPLORE COLLECTION
              </span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[9px] font-bold tracking-[0.4em] text-[#4A3B2A] hidden md:flex flex-col items-center gap-3 mix-blend-color-burn">
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          className="w-[1.5px] h-10 bg-[#4A3B2A] rounded-full"
        />
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="py-24 md:py-40 px-5 md:px-10 max-w-[1400px] mx-auto border-b border-[#D9C7A7]/50 relative">
      <div className="absolute top-0 right-10 w-64 h-64 bg-[#EFE7D8]/40 rounded-full blur-3xl -z-10 mix-blend-multiply pointer-events-none"></div>
      <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-3 flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">— EVERYDAY</span>
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#4A3B2A]/60">RITUALS · OBJECTS</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.1] text-[#1F1B18] font-light max-w-[16ch]">
            The things we <span className="italic text-[#4A3B2A]">touch</span> every day matter.
          </h2>
          <div className="mt-12 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl relative before:absolute before:-left-4 before:top-0 before:w-[2px] before:h-full before:bg-[#D9C7A7]/40 md:before:block before:hidden pl-0 md:pl-8">
            <p className="text-[14px] md:text-[15px] leading-[2] text-[#4A3B2A] font-medium">
              We believe everyday objects deserve more thought. From the toothbrush beside your mirror to the utensils around your table, Xylem brings together natural materials and purposeful design for the rituals that quietly shape our lives.
            </p>
            <div className="flex flex-col justify-between gap-6">
              <p className="text-lg md:text-xl leading-[1.8] text-[#1F1B18] italic font-serif">
                "Less noise. Better objects. Made to belong in your everyday."
              </p>
              <div className="flex items-center gap-3">
                <BrushMark className="w-8 h-8 opacity-60" />
                <span className="text-[9px] font-bold tracking-[0.3em] text-[#4A3B2A]">DESIGNED IN INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopByRitual({ onCategory }) {
  return (
    <section id="ritual" className="py-24 md:py-36 px-6 md:px-10 border-b border-[#D9C7A7]/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#B4341F]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">01</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-light">Shop by ritual.</h2>
          </div>
          <div className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A] border border-[#D9C7A7] px-4 py-2 rounded-full w-max">
            FIVE MOMENTS · ONE HOUSE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.key}
              onClick={() => onCategory(c.key)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
              className={`group relative overflow-hidden text-center rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 ${
                i < 3 ? 'md:col-span-4 aspect-[4/5]' : 'md:col-span-6 aspect-[16/11]'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden bg-[#EFE7D8]">
                <SmartImg src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/80 via-[#1F1B18]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-[#F8F4EC]">
                <h3 className="font-serif text-3xl md:text-4xl font-light mb-4 drop-shadow-md">
                  {c.title}
                </h3>
                <p className="text-xs md:text-sm max-w-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-medium">
                  {c.desc}
                </p>
                <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-10 h-10 rounded-full border border-[#F8F4EC]/40 flex items-center justify-center bg-[#F8F4EC]/10 backdrop-blur-sm">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProductCard({ p, onClick, i }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: (i % 4) * 0.06,
        ease: 'easeOut',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer flex flex-col h-full bg-[#F8F4EC] rounded-2xl border border-[#D9C7A7]/40 hover:border-[#D9C7A7] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      onClick={() => onClick(p)}
    >
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE7D8] m-2 rounded-xl">
        <SmartImg
          src={hover && p.alt ? p.alt : p.img}
          alt={p.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* SOON BADGE */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-[#F8F4EC]/95 backdrop-blur-md shadow-sm text-[8px] font-bold tracking-[0.3em] px-3 py-1.5 rounded-full text-[#1F1B18]">
            SOON
          </span>
        </div>

        {/* WISHLIST */}
        <button
          type="button"
          aria-label={`Add ${p.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 z-20 w-9 h-9 bg-[#F8F4EC]/95 backdrop-blur-md shadow-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-[#B4341F]"
        >
          <Heart size={14} strokeWidth={1.5} />
        </button>

        {/* HOVER OVERLAY */}
        <div
          className={`absolute inset-0 z-10 bg-[#1F1B18]/10 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span
            className={`bg-[#1F1B18] shadow-lg text-[#F8F4EC] text-[9px] font-bold tracking-[0.4em] px-6 py-3 rounded-full transition-all duration-500 ${
              hover
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            VIEW OBJECT
          </span>
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-serif text-[15px] md:text-[17px] leading-tight text-[#1F1B18] font-medium">
            {p.name}
          </h3>

          <span className="text-[10px] font-semibold tracking-[0.1em] text-[#4A3B2A] mt-0.5 whitespace-nowrap">
            ₹{p.price}
          </span>
        </div>

        <p className="text-[11px] text-[#4A3B2A]/70 mt-auto line-clamp-1">
          {p.material} · {p.category}
        </p>
      </div>
    </motion.div>
  );
}

function Featured({ onProduct }) {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <section id="featured" className="py-24 md:py-36 px-6 md:px-10 bg-gradient-to-b from-[#F8F4EC] to-[#EFE7D8]/40 border-b border-[#D9C7A7]/50">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#B4341F]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">02</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light max-w-[14ch]">Objects we are living with.</h2>
          </div>
          <a href="#shop" className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] bg-[#F8F4EC] border border-[#D9C7A7] px-6 py-3 rounded-full hover:border-[#B4341F] hover:text-[#B4341F] transition-colors shadow-sm">
            VIEW FULL COLLECTION <ArrowRight size={14} />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {featured.map((p, i) => (
            <ProductCard key={p.id} p={p} onClick={onProduct} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialStory() {
  const [active, setActive] = useState(0);
  const m = MATERIALS[active];
  return (
    <section id="materials" className="py-24 md:py-40 px-6 md:px-10 border-b border-[#D9C7A7]/50">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#B4341F]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">03 / MATERIAL INDEX</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light mb-8 leading-[1.05]">Begin with the material.</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={m.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-[15px] leading-[1.9] text-[#4A3B2A] max-w-xl mb-12 font-medium h-24 md:h-20"
            >
              {m.desc}
            </motion.p>
          </AnimatePresence>
          <div className="border-t border-[#D9C7A7]">
            {MATERIALS.map((mm, i) => (
              <button
                key={mm.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`w-full flex items-center justify-between py-6 border-b border-[#D9C7A7] group text-left transition-all duration-300 ${active === i ? 'text-[#B4341F] pl-4' : 'text-[#1F1B18] hover:pl-2'}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold tracking-widest transition-opacity ${active === i ? 'opacity-100' : 'opacity-40'}`}>{mm.n}</span>
                  <span className="font-serif text-2xl md:text-3xl font-light tracking-wide">{mm.name}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${active === i ? 'bg-[#B4341F] text-[#F8F4EC]' : 'bg-transparent text-[#4A3B2A]'}`}>
                  <ChevronRight size={16} strokeWidth={2} className={`transition-transform ${active === i ? 'translate-x-0.5' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 order-1 md:order-2 relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#D9C7A7]/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={m.img}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <SmartImg src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[#F8F4EC]">
            <span className="text-[10px] font-bold tracking-[0.4em] inline-block bg-[#1F1B18]/40 backdrop-blur-md px-4 py-2 rounded-full border border-[#F8F4EC]/20">{m.n} — {m.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndiaJapan() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <section id="story" ref={ref} className="py-24 md:py-40 px-6 md:px-10 bg-[#1F1B18] text-[#F8F4EC] paper-grain relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C4816B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="text-[10px] font-bold tracking-[0.4em] text-[#C4816B] mb-6 border border-[#C4816B]/30 px-4 py-2 rounded-full">— 04</div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light max-w-[16ch] leading-[1.1]">
            Rooted here. <br/><span className="italic text-[#C4816B]">Inspired</span> by restraint.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-5xl mx-auto">
          <motion.div style={{ x: x1 }} className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border border-[#F8F4EC]/10">
            <SmartImg src={IMG.craft} alt="Indian craft" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-4 left-4 text-[9px] font-bold tracking-widest text-[#F8F4EC]/70 mix-blend-overlay">INDIAN CRAFT</div>
          </motion.div>
          <motion.div style={{ x: x2 }} className="aspect-[4/5] rounded-2xl overflow-hidden md:mt-32 relative shadow-2xl border border-[#F8F4EC]/10">
            <SmartImg src={IMG.editorial1} alt="Japanese restraint" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-4 right-4 text-[9px] font-bold tracking-widest text-[#F8F4EC]/70 mix-blend-overlay">JAPANESE RESTRAINT</div>
          </motion.div>
        </div>
        <p className="mt-20 md:mt-32 max-w-2xl mx-auto text-center text-base md:text-lg leading-[2] text-[#F8F4EC]/80 font-medium">
          Xylem is an Indian approach to everyday living. We find inspiration in the quiet discipline of Japanese design and the material intelligence of Indian craft — two traditions that understand that useful objects do not need to be loud.
        </p>
      </div>
    </section>
  );
}

function Manifesto() {
  const lines = [
    'LESS NOISE',
    'BETTER OBJECTS',
    'NATURAL MATERIALS',
    'EVERYDAY PURPOSE',
    'OBJECTS TO LIVE WITH',
    'XYLEM',
  ];
  
  return (
    <section className="bg-[#B4341F] text-[#F8F4EC] py-16 md:py-24 overflow-hidden border-y border-[#F8F4EC]/20 relative">
      <div className="absolute inset-0 paper-grain mix-blend-overlay opacity-50 pointer-events-none"></div>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex whitespace-nowrap items-center gap-8 md:gap-16 w-max"
      >
        {/* Render twice for seamless loop */}
        {[...lines, ...lines].map((l, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-16">
            <span className={`font-serif text-5xl md:text-8xl font-light tracking-tight ${l === 'XYLEM' ? 'italic tracking-[0.1em]' : ''}`}>
              {l}
            </span>
            <Star className="w-6 h-6 md:w-10 md:h-10 opacity-40" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function Journey() {
  const steps = [
    { n: '01', title: 'MATERIAL', text: 'We begin with what an object is made from.', img: IMG.materialBamboo },
    { n: '02', title: 'PURPOSE', text: 'Every product must have a reason to belong.', img: IMG.pottery1 },
    { n: '03', title: 'FORM', text: 'Simple forms. Comfortable use.', img: IMG.pottery2 },
    { n: '04', title: 'EVERYDAY', text: 'The final test is simple: will we actually live with it?', img: IMG.editorial3 },
  ];
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-[#D9C7A7]/50 bg-[#F8F4EC]">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#B4341F]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">05</span>
            <span className="w-8 h-[1px] bg-[#B4341F]"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-light">From material to everyday.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 md:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:mt-20' : ''}`}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFE7D8] mb-6 relative shadow-md border border-[#D9C7A7]/40">
                <SmartImg src={s.img} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 w-8 h-8 bg-[#F8F4EC] rounded-full flex items-center justify-center text-[10px] font-bold text-[#B4341F] shadow-sm">
                  {s.n}
                </div>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mb-3 text-[#1F1B18]">{s.title}</h3>
              <p className="text-[14px] leading-[1.8] text-[#4A3B2A] font-medium">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Shop({ onProduct, filterCategory, setFilterCategory }) {
  const [material, setMaterial] = useState('All');
  const [sort, setSort] = useState('featured');
  
  const filtered = PRODUCTS.filter(p => (filterCategory === 'All' || p.category === filterCategory) && (material === 'All' || p.material === material));
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'lowhigh') return a.price - b.price;
    if (sort === 'highlow') return b.price - a.price;
    if (sort === 'newest') return b.id.localeCompare(a.id);
    return 0;
  });

  const cats = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const mats = ['All', ...new Set(PRODUCTS.map(p => p.material))];

  return (
    <section id="shop" className="py-24 md:py-36 px-5 md:px-10 bg-[#F8F4EC] border-b border-[#D9C7A7]/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 md:mb-16 flex flex-col items-center text-center">
          <div className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F] mb-4 bg-[#B4341F]/5 px-4 py-2 rounded-full">— COLLECTION 01</div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light mb-6">The full house.</h2>
          <p className="text-[15px] text-[#4A3B2A] max-w-lg font-medium">Every object is being thoughtfully prepared. Explore the catalogue and join the waitlist for our upcoming launch.</p>
        </div>

        <div className="bg-[#EFE7D8]/50 rounded-2xl p-6 md:p-8 mb-12 border border-[#D9C7A7]/60 shadow-sm flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A] mb-4">CATEGORY</div>
              <div className="flex flex-wrap gap-2">
                {cats.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterCategory(c)}
                    className={`text-[10px] font-bold tracking-[0.2em] px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${filterCategory === c ? 'bg-[#1F1B18] text-[#F8F4EC] shadow-md border-transparent' : 'bg-transparent border border-[#D9C7A7] text-[#4A3B2A] hover:border-[#1F1B18]'}`}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A] mb-4">MATERIAL</div>
              <div className="flex flex-wrap gap-2">
                {mats.map(m => (
                  <button
                    key={m}
                    onClick={() => setMaterial(m)}
                    className={`text-[10px] font-bold tracking-[0.2em] px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${material === m ? 'bg-[#1F1B18] text-[#F8F4EC] shadow-md border-transparent' : 'bg-transparent border border-[#D9C7A7] text-[#4A3B2A] hover:border-[#1F1B18]'}`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-[#D9C7A7] pt-6 md:pt-0 md:pl-12 min-w-[200px]">
            <div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A] mb-4">SORT BY</div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-transparent border border-[#D9C7A7] text-[11px] font-bold tracking-[0.2em] text-[#1F1B18] py-2.5 pl-4 pr-10 rounded-full focus:outline-none focus:border-[#1F1B18] cursor-pointer w-full"
                >
                  <option value="featured">FEATURED</option>
                  <option value="newest">NEWEST</option>
                  <option value="lowhigh">PRICE: LOW TO HIGH</option>
                  <option value="highlow">PRICE: HIGH TO LOW</option>
                </select>
                <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none text-[#4A3B2A]" />
              </div>
            </div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A] mt-6 md:mt-0">
              {sorted.length} {sorted.length === 1 ? 'OBJECT' : 'OBJECTS'}
            </div>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <BrushMark className="w-12 h-12 opacity-40 mb-6" />
            <p className="text-lg font-serif text-[#4A3B2A]">No objects match these filters.</p>
            <button onClick={() => { setFilterCategory('All'); setMaterial('All'); }} className="mt-6 text-[10px] font-bold tracking-[0.3em] border-b border-[#1F1B18] pb-1 hover:text-[#B4341F] hover:border-[#B4341F] transition-colors cursor-pointer">
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {sorted.map((p, i) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                  <ProductCard p={p} onClick={onProduct} i={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Packaging() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-10 border-b border-[#D9C7A7]/50 bg-[#EFE7D8]/30">
      <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="md:col-span-6 aspect-[4/5] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden relative shadow-xl border border-[#D9C7A7]/40">
          <SmartImg src={IMG.editorial2} alt="Packaging" className="w-full h-full object-cover" />
        </div>
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#B4341F]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F]">06 / PACKAGING</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05] max-w-[14ch]">
            The object arrives. <br/><span className="italic text-[#4A3B2A]">Not the excess.</span>
          </h2>
          <p className="mt-8 md:mt-12 text-[15px] leading-[2] text-[#4A3B2A] max-w-lg font-medium">
            Kraft paper, paper tape and a small red mark. Packaging that carries the object without demanding attention of its own. Made in India, kept intentionally quiet.
          </p>
          <div className="mt-12 inline-flex items-center gap-4 bg-[#F8F4EC] border border-[#D9C7A7] px-6 py-4 rounded-xl shadow-sm w-max">
            <BrushMark className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#1F1B18]">XYLEM · INDIA</span>
              <span className="text-[9px] font-medium tracking-[0.2em] text-[#4A3B2A] mt-1">100% RECYCLABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setState('loading');
    try {
      const r = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email }) });
      const d = await r.json();
      if (r.ok) { setState('success'); setMsg(d.message); setName(''); setEmail(''); }
      else { setState('error'); setMsg(d.error || 'Try again.'); }
    } catch { setState('error'); setMsg('Could not reach the server.'); }
  };
  return (
    <section id="waitlist" className="py-24 md:py-48 px-6 md:px-10 bg-[#1F1B18] text-[#F8F4EC] relative overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-40 mix-blend-overlay pointer-events-none"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10 bg-[#1F1B18]/80 backdrop-blur-md p-8 md:p-16 rounded-3xl border border-[#F8F4EC]/10 shadow-2xl">
        <div className="flex justify-center mb-8"><BrushMark className="w-12 h-12" /></div>
        <div className="text-[10px] font-bold tracking-[0.4em] text-[#C4816B] mb-4 bg-[#C4816B]/10 px-4 py-1.5 rounded-full inline-block">COLLECTION 01 · LAUNCHING SOON</div>
        <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05] mt-6">Be among the first.</h2>
        <p className="mt-8 text-[15px] leading-[2] text-[#F8F4EC]/80 max-w-xl mx-auto font-medium">
          We are preparing our first collection of thoughtfully selected everyday objects. Join the waitlist to receive early access before public release.
        </p>
        <form onSubmit={submit} className="mt-12 grid md:grid-cols-[1fr_1fr_auto] gap-4 max-w-3xl mx-auto">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="bg-[#F8F4EC]/5 border border-[#F8F4EC]/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#C4816B] focus:bg-[#F8F4EC]/10 transition-colors placeholder:text-[#F8F4EC]/40" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="bg-[#F8F4EC]/5 border border-[#F8F4EC]/20 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#C4816B] focus:bg-[#F8F4EC]/10 transition-colors placeholder:text-[#F8F4EC]/40" />
          <button disabled={state === 'loading'} className="text-[10px] font-bold tracking-[0.3em] bg-[#F8F4EC] text-[#1F1B18] rounded-xl px-8 py-4 hover:bg-[#C4816B] hover:text-[#F8F4EC] transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-black/20">
            {state === 'loading' ? 'SENDING…' : 'JOIN WAITLIST'}
          </button>
        </form>
        {msg && <p className={`mt-6 text-sm font-medium px-4 py-2 rounded-lg inline-block ${state === 'success' ? 'bg-[#C4816B]/20 text-[#C4816B]' : 'bg-red-500/20 text-red-200'}`}>{msg}</p>}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    const d = await r.json();
    setMsg(d.message || d.error);
    if (r.ok) setEmail('');
  };
  return (
    <section className="py-20 md:py-32 px-6 md:px-10 border-y border-[#D9C7A7]/60">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="font-serif text-3xl md:text-5xl font-light leading-[1.15]">Occasional notes on objects and everyday living.</h3>
        <form onSubmit={submit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 bg-transparent border-b border-[#4A3B2A]/40 px-2 py-3 text-sm focus:outline-none focus:border-[#B4341F]" />
          <button className="text-[11px] font-bold tracking-[0.35em] border border-[#1F1B18] px-6 py-3 rounded-full hover:bg-[#1F1B18] hover:text-[#F8F4EC] transition cursor-pointer">RECEIVE NOTES</button>
        </form>
        <p className="mt-6 text-xs text-[#4A3B2A]/70 font-medium">No noise. Only when we have something worth sharing.</p>
        {msg && <p className="mt-4 text-sm text-[#B4341F]">{msg}</p>}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#EFE7D8] text-[#1F1B18] pt-24 pb-10 px-5 md:px-10 paper-grain relative">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-20">
          <div className="flex items-center gap-6">
            <BrushMark className="w-12 h-12 md:w-16 md:h-16" />
            <div>
              <div className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] font-light leading-none">XYLEM</div>
              <div className="text-[9px] md:text-[11px] font-bold tracking-[0.5em] text-[#B4341F] mt-3">ECOMMERCE</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-[#D9C7A7] pt-16">
          <div>
            <div className="text-[10px] font-bold tracking-[0.4em] mb-6 text-[#4A3B2A]">SHOP</div>
            <ul className="space-y-4 text-[13px] font-medium text-[#1F1B18]/80">
              <li><a href="#ritual" className="hover:text-[#B4341F] transition-colors">Kitchen</a></li>
              <li><a href="#ritual" className="hover:text-[#B4341F] transition-colors">Dining</a></li>
              <li><a href="#ritual" className="hover:text-[#B4341F] transition-colors">Bath &amp; Care</a></li>
              <li><a href="#ritual" className="hover:text-[#B4341F] transition-colors">Home</a></li>
              <li><a href="#ritual" className="hover:text-[#B4341F] transition-colors">Everyday</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.4em] mb-6 text-[#4A3B2A]">BRAND</div>
            <ul className="space-y-4 text-[13px] font-medium text-[#1F1B18]/80">
              <li><a href="#story" className="hover:text-[#B4341F] transition-colors">Our Story</a></li>
              <li><a href="#materials" className="hover:text-[#B4341F] transition-colors">Materials</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Journal</a></li>
              <li><a href="#waitlist" className="hover:text-[#B4341F] transition-colors">Waitlist</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.4em] mb-6 text-[#4A3B2A]">CARE</div>
            <ul className="space-y-4 text-[13px] font-medium text-[#1F1B18]/80">
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.4em] mb-6 text-[#4A3B2A]">FOLLOW</div>
            <ul className="space-y-4 text-[13px] font-medium text-[#1F1B18]/80">
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#B4341F] transition-colors">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-[#D9C7A7]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-[0.2em] text-[#4A3B2A]">
          <div>© 2025 · XYLEM ECOMMERCE · INDIA</div>
          <div className="opacity-60">An Oikotan Industries venture.</div>
        </div>
      </div>
    </footer>
  );
}

function ProductModal({ product, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []); // Run once on mount

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, product: product.name }) });
    const d = await r.json();
    setMsg(r.ok ? d.message : d.error);
    setLoading(false);
    if (r.ok) { setName(''); setEmail(''); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#1F1B18]/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8F4EC] max-w-6xl w-full max-h-[92vh] overflow-y-auto grid md:grid-cols-2 rounded-3xl shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 bg-[#F8F4EC] rounded-full flex items-center justify-center text-[#1F1B18] shadow-md hover:text-[#B4341F] transition-colors cursor-pointer">
          <X size={20} className="pointer-events-none" />
        </button>
        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] bg-[#EFE7D8] overflow-hidden">
          <SmartImg src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute top-6 left-6 inline-block bg-[#1F1B18]/80 backdrop-blur-md text-[#F8F4EC] text-[9px] font-bold tracking-[0.3em] px-4 py-2 rounded-full">
            COLLECTION 01
          </div>
        </div>
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="text-[10px] font-bold tracking-[0.4em] text-[#B4341F] mb-3">{product.category.toUpperCase()}</div>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-[1.05] text-[#1F1B18] mb-4">{product.name}</h2>
          <div className="text-xl font-medium text-[#4A3B2A] mb-6">₹{product.price}</div>
          
          <p className="text-[15px] leading-[1.9] text-[#4A3B2A] mb-8 font-medium bg-[#EFE7D8]/50 p-6 rounded-2xl border border-[#D9C7A7]/50">
            {product.desc}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-xs mb-10 border-y border-[#D9C7A7]/50 py-6">
            <div><div className="text-[9px] font-bold tracking-[0.3em] text-[#4A3B2A]/60 mb-2">MATERIAL</div><div className="font-medium text-[#1F1B18]">{product.material}</div></div>
            <div><div className="text-[9px] font-bold tracking-[0.3em] text-[#4A3B2A]/60 mb-2">USE</div><div className="font-medium text-[#1F1B18]">{product.use}</div></div>
            <div><div className="text-[9px] font-bold tracking-[0.3em] text-[#4A3B2A]/60 mb-2">ORIGIN</div><div className="font-medium text-[#1F1B18]">India</div></div>
            <div><div className="text-[9px] font-bold tracking-[0.3em] text-[#4A3B2A]/60 mb-2">CARE</div><div className="font-medium text-[#1F1B18]">Hand wash. Air dry.</div></div>
          </div>

          <div className="bg-[#1F1B18] text-[#F8F4EC] rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4"><BrushMark className="w-40 h-40" /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C4816B] animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#C4816B]">WAITLIST</span>
              </div>
              <h3 className="font-serif text-2xl font-light leading-tight mb-3">Reserve this object.</h3>
              <p className="text-[13px] text-[#F8F4EC]/70 leading-relaxed mb-6 max-w-sm">
                Join the waitlist to be notified instantly when the {product.name} becomes available.
              </p>
              <form onSubmit={submit} className="flex flex-col gap-3">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full bg-[#F8F4EC]/10 border border-[#F8F4EC]/20 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-[#C4816B] transition-colors" />
                <button type="submit" disabled={loading} className="w-full text-[10px] font-bold tracking-[0.35em] bg-[#F8F4EC] text-[#1F1B18] py-4 rounded-xl hover:bg-[#C4816B] hover:text-[#F8F4EC] transition-colors disabled:opacity-60 cursor-pointer">
                  {loading ? 'ADDING…' : 'NOTIFY ME ON LAUNCH'}
                </button>
                {msg && <p className="text-[11px] font-medium text-[#C4816B] text-center mt-2">{msg}</p>}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileMenu({ open, onClose }) {
  const links = [['SHOP', '#shop'], ['RITUALS', '#ritual'], ['MATERIALS', '#materials'], ['STORY', '#story'], ['WAITLIST', '#waitlist']];
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else if (!open && document.body.style.overflow === 'hidden') document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[120] bg-[#F8F4EC] paper-grain"
        >
          <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-[#D9C7A7]/50 pb-6">
              <div className="flex items-center gap-3">
                <BrushMark className="w-8 h-8" />
                <div className="flex flex-col leading-none">
                  <span className="font-serif tracking-[0.3em] text-xl font-medium">XYLEM</span>
                  <span className="text-[8px] font-bold tracking-[0.4em] text-[#B4341F] mt-1">ECOMMERCE</span>
                </div>
              </div>
              <button aria-label="Close menu" onClick={onClose} className="p-2 bg-[#EFE7D8] rounded-full hover:bg-[#D9C7A7] transition-colors cursor-pointer text-[#1F1B18]">
                <X size={24} strokeWidth={2} className="pointer-events-none" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-8 py-10">
              {links.map(([l, h], i) => (
                <motion.a
                  key={l}
                  href={h}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="font-serif text-4xl md:text-5xl font-light text-[#1F1B18] hover:text-[#B4341F] transition-colors relative group w-max"
                >
                  {l}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#B4341F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </motion.a>
              ))}
            </nav>
            <div className="pt-6 border-t border-[#D9C7A7]/50 flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#4A3B2A]">INDIA · EVERYDAY OBJECTS</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#B4341F]">COLLECTION 01 SOON</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCategory = (key) => {
    setFilterCategory(key);
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden bg-[#F8F4EC] text-[#1F1B18] font-sans selection:bg-[#B4341F] selection:text-[#F8F4EC] flex flex-col min-h-screen">
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <Nav onOpenMenu={() => setMenuOpen(true)} scrolled={scrolled} />

      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Philosophy />
        <ShopByRitual onCategory={handleCategory} />
        <Featured onProduct={setProduct} />
        <MaterialStory />
        <IndiaJapan />
        <Manifesto />
        <Journey />
        <Shop onProduct={setProduct} filterCategory={filterCategory} setFilterCategory={setFilterCategory} />
        <Packaging />
        <Waitlist />
        <Newsletter />
      </main>

      <Footer />

      {/* AnimatePresence is placed safely outside the Modal to track exit state */}
      <AnimatePresence>
        {product && <ProductModal product={product} onClose={() => setProduct(null)} />}
      </AnimatePresence>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

export default Home;
