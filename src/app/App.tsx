import { useState, useEffect, useRef, useCallback } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Menu, X, Phone, Mail, MapPin, ChevronRight, ChevronDown, Leaf,
  Award, Globe, Package, CheckCircle, ArrowRight, Star, Truck,
  ShieldCheck, Layers, RefreshCw, DollarSign, Settings, Clock, MessageCircle,
} from "lucide-react";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

/* ─── DATA ─── */

const HERO_SLIDES = [
  {
    heading: "Leading Cocopeat Manufacturer in India",
    sub: "Bulk Export to Global Growers",
    img: publicAsset("coconut-photos/res-cocopeat-banner.jpg"),
  },
  {
    heading: "Cocopeat Manufacturer & Exporter",
    sub: "for your Coir Solutions",
    img: publicAsset("coconut-photos/Coco-Peat-1.jpg"),
  },
  {
    heading: "Premium Coir Products & Sustainable Solutions",
    sub: "for Global Agriculture",
    img: publicAsset("coconut-photos/Hydroponics.jpg"),
  },
];

const VALUE_PROPS = [
  { icon: <ShieldCheck className="w-7 h-7" />, title: "Quality Assurance", sub: "Crafted with Care, Built to Exceed" },
  { icon: <Truck className="w-7 h-7" />, title: "On-Time Delivery", sub: "Reliability Delivered, On Every Time" },
  { icon: <Layers className="w-7 h-7" />, title: "Transparency", sub: "Clear Communication and Honest Practices" },
];

const STATS = [
  { target: 500, suffix: "+", label: "Valuable Clients" },
  { target: 2000, suffix: "+", label: "Containers Exported" },
  { target: 20, suffix: "+", label: "Countries Served" },
];

const PRODUCTS = [
  {
    name: "Washed Loose Cocopeat",
    sub: "Refined Coir Pith",
    img: publicAsset("coconut-photos/Loosen Cocopeat washed.jpg"),
    descriptionFile: "washed-loose-cocopeat.txt",
    desc: "A refined coir pith product made from coconut husk after coir fibre extraction. It is washed to remove excess soluble salts and impurities, then drained and dried while retaining cocopeat's natural porous structure.",
    specs: ["Loose form", "Washed", "Lower salinity", "Horticultural use"],
    tag: "Washed",
  },
  {
    name: "Washed Cocopeat Blocks",
    sub: "Compressed Growing Medium",
    img: publicAsset("coconut-photos/Blocks Cocopeat washed.jpg"),
    descriptionFile: "washed-cocopeat-blocks.txt",
    desc: "Compressed cocopeat blocks processed through washing, draining, drying, and screening to reduce excess soluble salts and impurities. The blocks save storage and transport space and expand into a porous growing medium when hydrated.",
    specs: ["Compressed blocks", "Washed", "High water retention", "Good aeration"],
    tag: "Washed",
  },
  {
    name: "Unwashed Loose Cocopeat",
    sub: "Natural Coir Pith",
    img: publicAsset("coconut-photos/loosen unwashed cocopeat.webp"),
    descriptionFile: "unwashed-loose-cocopeat.txt",
    desc: "Natural coir pith obtained during mechanical coconut-husk processing. It is screened and supplied loose without washing or chemical buffering, preserving its natural mineral content for general horticultural use or further processing.",
    specs: ["Loose form", "Unwashed", "Natural minerals", "Raw material"],
    tag: "Natural",
  },
  {
    name: "Unwashed Cocopeat Blocks",
    sub: "Compressed Natural Cocopeat",
    img: publicAsset("coconut-photos/unwashed cocopeat blocks.png"),
    descriptionFile: "unwashed-cocopeat-blocks.txt",
    desc: "Compressed blocks made from screened and dried natural cocopeat without washing or buffering. When hydrated, they expand into loose cocopeat suitable for a variety of horticultural and agricultural applications.",
    specs: ["Compressed blocks", "Unwashed", "Efficient transport", "Natural content"],
    tag: "Natural",
  },
  {
    name: "Premium Low EC Loose Cocopeat",
    sub: "Low-Salinity Growing Medium",
    img: publicAsset("coconut-photos/premiu low ec loose cocopeat.webp"),
    descriptionFile: "premium-low-ec-loose-cocopeat.txt",
    desc: "Loose, ready-to-use coir pith processed through washing, screening, and drying to maintain a low and controlled concentration of soluble salts. Suitable for seed propagation, nurseries, greenhouses, potting mixes, and hydroponics.",
    specs: ["Loose form", "Low EC", "Ready to use", "Hydroponic suitable"],
    tag: "Premium",
  },
  {
    name: "Premium Low EC Cocopeat Blocks",
    sub: "Controlled-Salinity Blocks",
    img: publicAsset("coconut-photos/premium low ec block cocopeat.jpg"),
    descriptionFile: "premium-low-ec-cocopeat-blocks.txt",
    desc: "Washed, dried, screened, and compressed cocopeat blocks designed for a low and controlled level of soluble salts. Hydration produces a lightweight growing medium with strong water retention, aeration, and root-zone structure.",
    specs: ["Compressed blocks", "Low EC", "Washed", "Nursery suitable"],
    tag: "Premium",
  },
  {
    name: "Premium Buffered Loose Cocopeat",
    sub: "Stabilized Growing Medium",
    img: publicAsset("coconut-photos/premium buffered loose cocopeat.jpg"),
    descriptionFile: "premium-buffered-loose-cocopeat.txt",
    desc: "Premium loose coir pith that undergoes washing and controlled calcium-based buffering to reduce excess soluble salts and balance exchangeable minerals. Supplied expanded and ready to use for professional horticulture, nurseries, greenhouses, and hydroponics.",
    specs: ["Loose form", "Buffered", "Low salinity", "Ready to use"],
    tag: "Premium",
  },
  {
    name: "Premium Buffered Cocopeat Blocks",
    sub: "Compressed Stabilized Cocopeat",
    img: publicAsset("coconut-photos/premium buffered block cocpeat.jpg"),
    descriptionFile: "premium-buffered-cocopeat-blocks.txt",
    desc: "Washed, buffered, dried, and compressed cocopeat blocks that reduce storage and transportation volume. When hydrated, they expand into a lightweight, porous growing medium with excellent water retention and root-zone aeration.",
    specs: ["Compressed blocks", "Buffered", "Space efficient", "Excellent aeration"],
    tag: "Premium",
  },
  {
    name: "Cocopeat Grow Bags",
    sub: "Ready-to-Use Growing Media",
    img: publicAsset("coconut-photos/Cocopeat growbag.jpg"),
    descriptionFile: "cocopeat-grow-bags.txt",
    desc: "Ready-to-use growing media made from processed coconut coir pith and packed in durable, UV-resistant polyethylene bags. They provide water retention, aeration, and drainage for greenhouse, nursery, and soilless cultivation.",
    specs: ["UV-resistant bags", "Ready to use", "Custom EC options", "Greenhouse suitable"],
    tag: "Commercial",
  },
  {
    name: "Coco Coir Fibre",
    sub: "Natural Renewable Fibre",
    img: publicAsset("coconut-photos/Coco coir fibre.jpg"),
    descriptionFile: "coco-coir-fibre.txt",
    desc: "A natural, renewable fibre extracted from mature coconut husks during mechanical processing. Available in long, medium, short, or baled forms, it is valued for strength, durability, resilience, and moisture resistance.",
    specs: ["Long / medium / short", "Baled options", "Moisture resistant", "Industrial use"],
    tag: "Bulk",
  },
];

const PRODUCT_CHARACTERISTICS: Record<string, string[][]> = {
  "Washed Loose Cocopeat": [
    ["Product", "Washed Loose Cocopeat"], ["Raw material", "Coconut husk"], ["Form", "Loose"],
    ["Colour", "Brown to dark brown"], ["Texture", "Fine, spongy and fibrous"],
    ["pH", "Typically mildly acidic"], ["EC", "Lower than unwashed cocopeat; batch-dependent"],
    ["Water retention", "High"], ["Aeration", "Good"], ["Particle size", "Fine / medium / coarse"],
    ["Treatment", "Washed, not necessarily buffered"], ["Moisture", "As per agreed specification"],
    ["Foreign matter", "Controlled"], ["Packaging", "Bags / bales / bulk"],
  ],
  "Washed Cocopeat Blocks": [
    ["Product", "Washed Cocopeat Block"], ["Raw material", "Coconut husk"], ["Form", "Compressed block"],
    ["Treatment", "Washed"], ["Colour", "Brown"], ["pH", "Typically 5.5–6.5"],
    ["EC", "Lower than unwashed cocopeat; batch-dependent"], ["Moisture", "Controlled according to specification"],
    ["Particle size", "Fine / Medium / Coarse"], ["Water retention", "High"], ["Aeration", "Good"],
    ["Expansion", "High and batch-dependent"], ["Packaging", "Individual wrap / cartons / bales"],
  ],
  "Unwashed Loose Cocopeat": [
    ["Product", "Unwashed Loose Cocopeat"], ["Raw material", "Coconut husk"], ["Form", "Loose"],
    ["Particle size", "Fine / Medium / Coarse"], ["Fibre content", "Standard / Low-fibre"],
    ["Moisture", "As per specification"], ["EC", "Batch-tested (High EC)"], ["pH", "Batch-tested"],
    ["Packaging", "Bags / Bales / Bulk"],
  ],
  "Unwashed Cocopeat Blocks": [
    ["Product", "Unwashed Cocopeat Block"], ["Raw material", "Coconut husk"], ["Form", "Compressed block"],
    ["Treatment", "Unwashed / Unbuffered"], ["Colour", "Brown to dark brown"], ["pH", "Generally mildly acidic"],
    ["EC", "Variable and generally higher than washed cocopeat"], ["Water retention", "High"], ["Aeration", "Good"],
    ["Particle size", "Fine / Medium / Coarse"], ["Expansion", "Batch-dependent"], ["Packaging", "Individual wrap / bales"],
  ],
  "Premium Low EC Loose Cocopeat": [
    ["Product", "Low EC Loose Cocopeat"], ["Raw material", "Coconut husk"], ["Form", "Loose"],
    ["Colour", "Brown"], ["EC", "≤ 0.5 mS/cm*"], ["pH", "5.5–6.5*"],
    ["Moisture", "As specified"], ["Particle size", "Fine / Medium / Coarse"],
    ["Water retention", "Excellent"], ["Aeration", "Excellent"], ["Foreign matter", "Minimal to none"],
    ["Treatment", "Washed / Low-salt processed"], ["Packaging", "Bags / bales / bulk"],
  ],
  "Premium Low EC Cocopeat Blocks": [
    ["Product", "Low EC Cocopeat Block"], ["Raw material", "Coconut husk"], ["Form", "Compressed block"],
    ["Treatment", "Washed / low-salt processed"], ["EC", "≤ 0.5 mS/cm"], ["pH", "5.5–6.5"],
    ["Moisture", "Controlled"], ["Particle size", "Fine / Medium / Coarse"], ["Water retention", "High"],
    ["Aeration", "Good"], ["Expansion", "High, batch-dependent"], ["Packaging", "PE wrapping / cartons / PP woven bags"],
  ],
  "Premium Buffered Loose Cocopeat": [
    ["Product", "Buffered Loose Cocopeat"], ["Raw material", "Coconut husk"], ["Form", "Loose"],
    ["Colour", "Uniform brown"], ["pH", "Typically 5.5–6.5"], ["EC", "Often targeted at less than 0.5 mS/cm"],
    ["Water-holding capacity", "High"], ["Aeration", "Good"], ["Particle size", "Fine / Medium / Coarse"],
    ["Sodium", "Controlled / low"], ["Potassium", "Controlled"], ["Calcium", "Improved through buffering"],
    ["Foreign matter", "Minimal"], ["Treatment", "Washed + buffered"],
  ],
  "Premium Buffered Cocopeat Blocks": [
    ["Product", "Premium Buffered Cocopeat Block"], ["Raw material", "Coconut husk"], ["Form", "Compressed block"],
    ["Treatment", "Washed + Buffered"], ["pH", "5.5–6.5"], ["EC", "≤ 0.5 mS/cm"],
    ["Moisture", "As specified"], ["Expansion", "High"], ["Particle size", "Fine / Medium / Coarse"],
    ["Fibre content", "Controlled"], ["Foreign matter", "Minimal"], ["Colour", "Uniform brown"],
    ["Packaging", "Individual wrap/carton/bale"],
  ],
  "Cocopeat Grow Bags": [
    ["Product", "Cocopeat Grow Bag"], ["Growing medium", "Cocopeat / cocopeat blend"],
    ["Treatment", "Washed / Low EC / Buffered"], ["pH", "Typically 5.5–6.5"], ["EC", "According to crop requirement"],
    ["Bag material", "UV-resistant PE film"], ["Colour", "Commonly white exterior"],
    ["Drainage", "Designed according to application"], ["Planting holes", "Customized"],
    ["Dimensions", "Customized"], ["Weight", "Customized"], ["Packaging", "Bundles / cartons / pallets"],
  ],
  "Coco Coir Fibre": [
    ["Product", "Coco Coir Fibre"], ["Raw material", "Coconut husk"], ["Colour", "Brown / Golden / Natural"],
    ["Fibre type", "Long / Medium / Short"], ["Fibre length", "As per grade"], ["Moisture", "As specified"],
    ["Impurities", "Controlled"], ["Strength", "Grade-dependent"], ["Packaging", "Loose / Bales"],
    ["Processing", "Mechanically extracted / retted"], ["Origin", "Coconut husk"],
  ],
};

const COCOPEAT_COMPARISON = [
  ["Washing", "❌", "✅", "✅"],
  ["Buffering", "❌", "❌", "✅"],
  ["Salt reduction", "Limited", "High", "High"],
  ["EC consistency", "Variable", "Better", "Better"],
  ["Processing cost", "Low", "Medium", "Higher"],
  ["Typical positioning", "Economy/raw material", "Standard horticulture", "Premium/hydroponics"],
];

const LOW_EC_COMPARISON = [
  ["Washing", "✅", "✅", "✅"],
  ["Low EC target", "Not necessarily", "✅", "✅"],
  ["Buffering", "❌", "Usually ❌", "✅"],
  ["K/Na conditioning", "Limited", "Reduced soluble salts", "Further controlled"],
  ["General horticulture", "✅", "✅", "✅"],
  ["Plant propagation", "✅", "Excellent", "Excellent"],
  ["Hydroponics", "Application-dependent", "Suitable if tested", "Premium option"],
];

const WASHED_UNWASHED_COMPARISON = [
  ["Washing", "❌", "✅"],
  ["Salt reduction", "Limited", "Higher"],
  ["EC", "Higher EC", "Lower EC"],
  ["Water retention", "High", "Very High"],
  ["Aeration", "Good", "Very Good"],
  ["Processing cost", "Lower", "Higher"],
  ["Suitable for general horticulture", "✅", "✅"],
  ["Suitable for sensitive crops", "Limited", "Better"],
  ["Hydroponics", "Usually not preferred", "Preferred"],
  ["Further buffering", "Possible", "Possible"],
];

const WASHED_COMPARISON_PRODUCTS = ["Washed Loose Cocopeat", "Washed Cocopeat Blocks", "Unwashed Loose Cocopeat", "Unwashed Cocopeat Blocks"];
const LOW_EC_COMPARISON_PRODUCTS = ["Premium Low EC Loose Cocopeat", "Premium Low EC Cocopeat Blocks"];
const BUFFERED_COMPARISON_PRODUCTS = ["Premium Buffered Loose Cocopeat", "Premium Buffered Cocopeat Blocks"];

const WHY_ITEMS = [
  { icon: <ShieldCheck />, title: "Premium Quality Products", desc: "Every batch tested in-house for EC, pH, and moisture before dispatch." },
  { icon: <DollarSign />, title: "Competitive Pricing", desc: "Best cocopeat price compared to other exporters — no compromise on quality." },
  { icon: <Leaf />, title: "Eco-Friendly Solutions", desc: "100% organic, biodegradable, and sustainable from source to delivery." },
  { icon: <Award />, title: "Stringent Quality Control", desc: "ISO-certified process with full batch traceability from raw husk to finished product." },
  { icon: <Globe />, title: "Global Reach", desc: "Serving 20+ countries across Europe, Americas, Australia, and the Middle East." },
  { icon: <Settings />, title: "Customizable Orders", desc: "Tailored EC values, dimensions, packaging, and OEM branding to your requirements." },
  { icon: <Package />, title: "Efficient Packaging", desc: "Industry-standard palletization, shrink-wrap, and export-compliant container loading." },
  { icon: <RefreshCw />, title: "Flexible Payment Options", desc: "LC, TT, DP terms available. Transparent documentation and competitive lead times." },
  { icon: <Clock />, title: "Timely Delivery", desc: "Robust supply chain with Tuticorin and Chennai port connections for on-schedule shipments." },
];

const INDUSTRIES = [
  { name: "Agriculture", desc: "Enhance soil health and productivity with natural cocopeat as a soil conditioner and amendment.", img: "https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=500&h=350&fit=crop&auto=format" },
  { name: "Horticulture", desc: "Sustainable plant growth with superior water and nutrient retention for commercial flower and vegetable growers.", img: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=500&h=350&fit=crop&auto=format" },
  { name: "Hydroponics", desc: "The ideal eco-friendly growing medium for controlled, soilless cultivation with precise water and nutrient management.", img: "https://images.pexels.com/photos/37113938/pexels-photo-37113938/free-photo-of-fresh-hydroponic-greens-in-indoor-garden.jpeg?h=1000&w=1500&fit=crop" },
  { name: "Nurseries", desc: "Safe, weed-free, and fungal-resistant growing substrate for healthy seedling and young plant development.", img: "https://images.unsplash.com/photo-1519462568576-0c687427fb2e?w=500&h=350&fit=crop&auto=format" },
];

const TESTIMONIALS = [
  { name: "Viltus", company: "Cocopeat Importer, Australia", text: "Their commitment to delivering high-quality cocopeat and timely service exceeded our expectations. A truly reliable export partner." },
  { name: "Anlet Jose", company: "Coir Fiber Distributor, USA", text: "Their team's dedication and commitment to on-time delivery have greatly contributed to our business success. Highly recommended." },
  { name: "Joselin Thomas", company: "Coir Fiber Distributor, USA", text: "Their attention to detail and dedication to meeting our needs have made a significant difference in our product quality and margins." },
];

const FAQS = [
  { q: "What is your port of supply?", a: "We mainly ship from the Port of Tuticorin (V.O. Chidambaranar Port) and Port of Chennai. Both are major Indian ports with excellent connectivity to all global destinations." },
  { q: "Do you ship to all countries?", a: "Yes, we supply across the globe, including the USA, Netherlands, Spain, Canada, Australia, China, UK, and 15+ other countries." },
  { q: "Can I customize my order specifications?", a: "Absolutely! We offer tailored solutions including custom EC levels, pH ranges, dimensions, moisture content, packaging size, and OEM branding to match your exact requirements." },
  { q: "Are product samples available before bulk orders?", a: "Yes. We provide free samples to qualified buyers and importers. Contact our sales team to request a sample shipment to your location." },
  { q: "How do I import in bulk?", a: "Contact our sales team with your requirements. We handle the complete logistics end-to-end — production, quality testing, documentation, phytosanitary certification, container loading, and freight booking." },
  { q: "Why choose Aditya Overseas Enterprises Private Limited over other exporters?", a: "We are a professional cocopeat manufacturer with consistent export-quality products, ISO 9001:2015 certification, and in-house laboratory testing. Our client retention rate speaks for itself." },
];

const COUNTRIES = ["🇺🇸", "🇦🇺", "🇨🇦", "🇨🇳", "🇳🇱", "🇪🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇮🇹", "🇰🇷", "🇯🇵", "🇧🇷", "🇿🇦", "🇸🇬", "🇲🇾", "🇸🇦", "🇦🇪", "🇳🇿", "🇧🇪"];

/* ─── HOOKS ─── */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─── SUBCOMPONENTS ─── */

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCounter(stat.target, active);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        {count}{stat.suffix}
      </div>
      <div className="text-white/70 text-sm tracking-wide">{stat.label}</div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [productDescriptions, setProductDescriptions] = useState<Record<string, string>>({});
  const [productDescriptionErrors, setProductDescriptionErrors] = useState<Record<string, string>>({});
  const [loadingDescription, setLoadingDescription] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "", message: "" });
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  // Hero slider auto-advance
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!expandedProduct || productDescriptions[expandedProduct]) return;
    const product = PRODUCTS.find((item) => item.name === expandedProduct);
    if (!product) return;

    setLoadingDescription(expandedProduct);
    fetch(publicAsset(`products/${product.descriptionFile}`))
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${product.name} description`);
        return response.text();
      })
      .then((description) => setProductDescriptions((current) => ({ ...current, [expandedProduct]: description })))
      .catch((error: Error) => setProductDescriptionErrors((current) => ({ ...current, [expandedProduct]: error.message })))
      .finally(() => setLoadingDescription(null));
  }, [expandedProduct, productDescriptions]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Product Enquiry${form.product ? ` - ${form.product}` : ""}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone || "Not provided"}`,
      `Product: ${form.product || "Not specified"}`,
      "",
      "Requirements:",
      form.message,
    ].join("\n");

    window.location.href = `mailto:krishna@adityaoverseasenterprises.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
  };

  const NAV = ["home", "about", "products", "industries", "contact"];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href="https://wa.me/919187152499"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-card/97 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5">
            <img
              src={publicAsset("aditya-overseas-logo.png")}
              alt="Aditya Overseas Enterprises Private Limited logo"
              className="w-10 h-10 rounded-lg object-contain shrink-0"
            />
            <div>
              <div className="font-bold text-foreground leading-none text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                Aditya Overseas Enterprises Private Limited
              </div>
              <div className="text-[9px] tracking-widest text-muted-foreground uppercase mt-0.5">
                The Seniors Choice
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {["Home", "About Us", "Products", "Industries", "Contact Us"].map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(NAV[i])}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+919187152499" className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 91871 52499
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:block bg-primary text-primary-foreground text-xs px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Contact Now
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-5 py-4 flex flex-col gap-3">
            {["Home", "About Us", "Products", "Industries", "Contact Us"].map((label, i) => (
              <button key={label} onClick={() => scrollTo(NAV[i])} className="text-sm text-left text-muted-foreground hover:text-primary">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded self-start mt-1">
              Contact Now
            </button>
          </div>
        )}
      </header>

      {/* ── HERO SLIDER ── */}
      <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === slide ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
              style={{
                backgroundImage: `url('${s.img}')`,
                transform: i === slide ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-start justify-center max-w-7xl mx-auto px-6 pt-16">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className="absolute max-w-2xl transition-all duration-700"
              style={{
                opacity: i === slide ? 1 : 0,
                transform: i === slide ? "translateY(0)" : "translateY(20px)",
                pointerEvents: i === slide ? "auto" : "none",
              }}
            >
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-5">
                <Leaf className="w-3 h-3 text-green-300" />
                <span className="text-white/90 text-xs tracking-widest uppercase">The Seniors Choice</span>
              </div>
              <h1
                className="text-white text-4xl md:text-6xl font-bold leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.heading}
              </h1>
              <p className="text-white/80 text-xl md:text-2xl mb-8 font-light">{s.sub}</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => scrollTo("about")}
                  className="flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-white/90 transition-colors"
                >
                  Discover More <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 border-2 border-white/50 text-white px-6 py-3 rounded hover:bg-white/10 transition-colors"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="transition-all duration-300"
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === slide ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── VALUE PROPS BAR ── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {VALUE_PROPS.map((v, i) => (
            <FadeIn key={v.title} delay={i * 100} className="flex items-start gap-4 p-6">
              <div className="text-green-300 shrink-0 mt-0.5">{v.icon}</div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">{v.title}</div>
                <div className="text-white/65 text-xs leading-relaxed">{v.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1623136299195-570a06bdae6b?w=700&h=525&fit=crop&auto=format"
                alt="Greenhouse crops growing in coco peat media"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-accent opacity-20" />
          </FadeIn>

          <FadeIn delay={150}>
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">About Aditya Overseas Enterprises Private Limited</span>
            <h2
              className="text-foreground text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aditya Overseas Enterprises Private Limited — Cocopeat Exporter & Manufacturer for Global Growers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Based in India — the heart of coconut cultivation — Aditya Overseas Enterprises Private Limited manufactures and exports premium
              coconut byproducts to growers worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We serve markets including the <strong className="text-foreground">USA, Netherlands, Spain, Canada, Australia,</strong> and{" "}
              <strong className="text-foreground">China</strong> with customizable solutions and unparalleled customer service.
              Our products are processed with the latest technology ensuring the best texture, EC values, and water retention.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-7">
              Our focus on <em>sustainability</em> and <em>innovation in agriculture</em> drives us to deliver coir solutions
              that are 100% organic, chemical-free, and safe against fungal and bacterial growth.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("products")}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded hover:bg-primary/90 transition-colors text-sm"
              >
                View Products <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded hover:border-primary hover:text-primary transition-colors text-sm"
              >
                Contact Us
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-20 bg-primary" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} active={statsInView} />
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">What We Do</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3 mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Finest Coir Products, Sustainably Sourced
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Cocopeat is derived from the fibrous husks of mature coconuts. We offer it in compressed 5 kg block form
              and a variety of other formats, all of which expand dramatically upon hydration to create the ideal
              growing medium.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our cocopeat is safe against fungal and bacterial growth, weed-sterilized, 100% organic, and
              entirely chemical-free — making it the preferred choice of professional growers worldwide.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Sustainable Coir", icon: <Leaf className="w-5 h-5" /> },
                { label: "Custom Solutions", icon: <Settings className="w-5 h-5" /> },
                { label: "Quality & Innovation", icon: <Award className="w-5 h-5" /> },
              ].map((item) => (
                <div key={item.label} className="bg-card border border-border rounded-lg p-4 flex flex-col items-center text-center gap-2">
                  <div className="text-primary">{item.icon}</div>
                  <div className="text-xs font-semibold text-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150} className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted row-span-2">
              <img
                src={publicAsset("coconut-photos/coconut-husk.webp")}
                alt="Coconut husks — raw material for cocopeat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={publicAsset("coconut-photos/Blocks Cocopeat washed.jpg")}
                alt="Coconut shells used in coir processing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={publicAsset("coconut-photos/Coco coir fibre.jpg")}
                alt="Young plants growing in cocopeat medium"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">Our Products</span>
            <h2
              className="text-foreground text-3xl md:text-4xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Complete Coco Peat Product Range
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              All products available in custom specifications, OEM packaging, and bulk FCL shipments from Indian ports.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
            {PRODUCTS.map((p, i) => (
              <FadeIn
                key={p.name}
                delay={i * 60}
                className={expandedProduct === p.name ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : ""}
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg hover:border-primary/25 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setExpandedProduct(expandedProduct === p.name ? null : p.name)}
                    className="relative w-full h-44 bg-muted overflow-hidden flex items-center justify-center text-center p-6 cursor-pointer"
                    aria-expanded={expandedProduct === p.name}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <span className="absolute top-2.5 left-2.5 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded">
                      {p.tag}
                    </span>
                  </button>
                  <div className="p-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{p.sub}</div>
                    <button
                      type="button"
                      onClick={() => setExpandedProduct(expandedProduct === p.name ? null : p.name)}
                      className="font-bold text-foreground text-sm mb-2 text-left"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      aria-expanded={expandedProduct === p.name}
                    >
                      {p.name}
                    </button>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="text-xs border border-primary text-primary py-1.5 rounded hover:bg-primary hover:text-primary-foreground transition-colors w-full"
                    >
                      Enquire Now
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        expandedProduct === p.name ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                      <div className="border-t border-border pt-5">
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {loadingDescription === p.name
                            ? "Loading full description..."
                            : productDescriptionErrors[p.name] || productDescriptions[p.name]}
                        </p>
                        <div className="mt-8 grid lg:grid-cols-2 gap-6">
                          <div className="overflow-x-auto lg:col-span-2">
                            <h4 className="font-semibold text-foreground text-sm mb-3">Product Characteristics</h4>
                            <table className="w-full text-xs border-collapse">
                              <thead><tr className="border-b border-border">
                                <th className="text-left font-semibold text-foreground py-2 pr-4">Parameter</th>
                                <th className="text-left font-semibold text-foreground py-2">Typical characteristic</th>
                              </tr></thead>
                              <tbody>{(PRODUCT_CHARACTERISTICS[p.name] || []).map(([label, value]) => (
                                <tr key={label} className="border-b border-border/60">
                                  <td className="py-2 pr-4 text-muted-foreground">{label}</td>
                                  <td className="py-2 text-muted-foreground">{value}</td>
                                </tr>
                              ))}</tbody>
                            </table>
                          </div>
                          {WASHED_COMPARISON_PRODUCTS.includes(p.name) && (
                            <div className="overflow-x-auto lg:col-span-2">
                              <h4 className="font-semibold text-foreground text-sm mb-3">Washed vs Unwashed Cocopeat</h4>
                              <table className="w-full text-xs border-collapse">
                                <thead><tr className="border-b border-border">
                                  {["Feature", "Unwashed Loose", "Washed Loose"].map((heading) => (
                                    <th key={heading} className="text-left font-semibold text-foreground py-2 pr-3">{heading}</th>
                                  ))}
                                </tr></thead>
                                <tbody>{WASHED_UNWASHED_COMPARISON.map(([feature, unwashed, washed]) => (
                                  <tr key={feature} className="border-b border-border/60">
                                    <td className="py-2 pr-3 text-muted-foreground">{feature}</td>
                                    <td className="py-2 pr-3 text-muted-foreground">{unwashed}</td>
                                    <td className="py-2 text-muted-foreground">{washed}</td>
                                  </tr>
                                ))}</tbody>
                              </table>
                            </div>
                          )}
                          {LOW_EC_COMPARISON_PRODUCTS.includes(p.name) && (
                            <div className="overflow-x-auto lg:col-span-2">
                              <h4 className="font-semibold text-foreground text-sm mb-3">Washed vs Low EC vs Buffered Low EC</h4>
                              <table className="w-full text-xs border-collapse">
                                <thead><tr className="border-b border-border">
                                  {["Feature", "Washed", "Low EC", "Buffered Low EC"].map((heading) => (
                                    <th key={heading} className="text-left font-semibold text-foreground py-2 pr-3">{heading}</th>
                                  ))}
                                </tr></thead>
                                <tbody>{LOW_EC_COMPARISON.map(([feature, washed, lowEc, bufferedLowEc]) => (
                                  <tr key={feature} className="border-b border-border/60">
                                    <td className="py-2 pr-3 text-muted-foreground">{feature}</td>
                                    <td className="py-2 pr-3 text-muted-foreground">{washed}</td>
                                    <td className="py-2 pr-3 text-muted-foreground">{lowEc}</td>
                                    <td className="py-2 text-muted-foreground">{bufferedLowEc}</td>
                                  </tr>
                                ))}</tbody>
                              </table>
                            </div>
                          )}
                          {BUFFERED_COMPARISON_PRODUCTS.includes(p.name) && (
                            <div className="overflow-x-auto lg:col-span-2">
                              <h4 className="font-semibold text-foreground text-sm mb-3">Unwashed vs Washed vs Buffered Cocopeat</h4>
                              <table className="w-full text-xs border-collapse">
                                <thead><tr className="border-b border-border">
                                  {["Feature", "Unwashed", "Washed", "Buffered"].map((heading) => (
                                    <th key={heading} className="text-left font-semibold text-foreground py-2 pr-3">{heading}</th>
                                  ))}
                                </tr></thead>
                                <tbody>{COCOPEAT_COMPARISON.map(([feature, unwashed, washed, buffered]) => (
                                  <tr key={feature} className="border-b border-border/60">
                                    <td className="py-2 pr-3 text-muted-foreground">{feature}</td>
                                    <td className="py-2 pr-3 text-muted-foreground">{unwashed}</td>
                                    <td className="py-2 pr-3 text-muted-foreground">{washed}</td>
                                    <td className="py-2 text-muted-foreground">{buffered}</td>
                                  </tr>
                                ))}</tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                  </div>
                </div>
                </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-green-300 text-xs tracking-widest uppercase font-semibold">Why Choose Us</span>
            <h2
              className="text-white text-3xl md:text-4xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              9 Reasons to Partner With Us
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_ITEMS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="bg-white/8 border border-white/12 rounded-lg p-5 group hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white/10 text-green-300 flex items-center justify-center mb-3 group-hover:bg-green-300 group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-white/65 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">Industries We Serve</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Serving Every Corner of Agriculture
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <FadeIn key={ind.name} delay={i * 80}>
                <div className="group rounded-lg overflow-hidden bg-card border border-border hover:border-primary/25 transition-colors">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={ind.img}
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <div
                      className="absolute bottom-3 left-4 text-white text-lg font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {ind.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-xs leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GREEN PRACTICES ── */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">Sustainability</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Green Practices,
              <br />
              Sustainable Impact
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 italic text-sm">
              "Embracing Eco-Conscious Practices"
            </p>
            <div className="space-y-4">
              {[
                { title: "Eco-Friendly Materials", desc: "Cocopeat is a 100% natural, renewable by-product of coconut processing — diverting waste from landfills." },
                { title: "Energy Efficiency", desc: "Our manufacturing process is optimised to reduce our carbon footprint at every production stage." },
                { title: "Commitment to Sustainability", desc: "From raw husk sourcing to container loading, every step prioritises environmental responsibility." },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-0.5">{item.title}</div>
                    <div className="text-muted-foreground text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150} className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1537191072641-5e19cc173c6a?w=700&h=525&fit=crop&auto=format"
                alt="Coconut plantation — sustainable source of coir products"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-4 rounded-lg max-w-[200px]"
            >
              <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>100%</div>
              <div className="text-xs opacity-85 leading-snug mt-1">Organic, Biodegradable & Chemical-Free</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">Client Testimonials</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by Growers Worldwide
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 100}>
                <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.company}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">Global Presence</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Exporting to 20+ Countries
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Our products reach commercial growers and importers across six continents.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {COUNTRIES.map((flag, i) => (
                <div
                  key={i}
                  className="text-3xl hover:scale-125 transition-transform duration-200 cursor-default"
                  title="Exporting worldwide"
                >
                  {flag}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <span className="text-accent text-xs tracking-widest uppercase font-semibold">FAQ</span>
            <h2
              className="text-foreground text-3xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <Accordion.Root type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <Accordion.Item
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <Accordion.Trigger className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors group">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed data-[state=open]:animate-none">
                    {faq.a}
                  </Accordion.Content>
                </Accordion.Item>
              </FadeIn>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14">
          <FadeIn>
            <span className="text-green-300 text-xs tracking-widest uppercase font-semibold">Contact Us</span>
            <h2
              className="text-white text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Request a Quote or
              <br />
              Sample Today
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 text-sm">
              Whether you need a trial shipment or an annual supply contract, our export team responds within 24 hours.
              Free samples available for qualified buyers and importers.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Firm Address</div>
                  <div className="text-white/65 text-xs leading-relaxed">
                    102, Soudha Nucleus, Jayabheri<br />
                    Pine Valley, Gachibowli, Hyderabad,<br />
                    Telangana-500032
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Phone / WhatsApp</div>
                  <a href="tel:+919187152499" className="text-white/65 text-xs hover:text-white transition-colors">+91 91871 52499</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Email</div>
                  <a href="mailto:krishna@adityaoverseasenterprises.com" className="text-white/65 text-xs hover:text-white transition-colors">krishna@adityaoverseasenterprises.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {["🌍 USA", "🌏 Australia", "🌍 Netherlands", "🌎 Canada"].map((c) => (
                <span key={c} className="text-xs bg-white/10 border border-white/15 rounded-full px-3 py-1 text-white/70">{c}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="rounded-xl overflow-hidden shadow-xl h-full min-h-[420px] bg-muted">
              <img
                src={publicAsset("coconut-photos/coconut-husk.webp")}
                alt="Coconuts and coconut husk"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background/70">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={publicAsset("aditya-overseas-logo.png")}
                alt="Aditya Overseas Enterprises Private Limited logo"
                className="w-10 h-10 rounded-lg object-contain shrink-0"
              />
              <div>
                <div className="text-background font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Aditya Overseas Enterprises Private Limited</div>
                <div className="text-background/40 text-[9px] tracking-widest uppercase">The Seniors Choice</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              India's trusted cocopeat manufacturer and exporter. Serving commercial growers across 20+ countries with premium coir products.
            </p>
            <div className="text-xs text-background/40">ISO 9001:2015 · APEDA Registered · RHP Compliant · IEC Holder</div>
          </div>
          <div>
            <div className="text-background font-semibold text-xs uppercase tracking-wider mb-4">Products</div>
            <ul className="space-y-2">
              {PRODUCTS.map((p) => (
                <li key={p.name}>
                  <button onClick={() => scrollTo("products")} className="text-xs hover:text-background transition-colors text-left">
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-background font-semibold text-xs uppercase tracking-wider mb-4">Contact</div>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                102, Soudha Nucleus, Jayabheri Pine Valley, Gachibowli, Hyderabad, Telangana-500032
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <a href="tel:+919187152499" className="hover:text-background">+91 91871 52499</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href="mailto:krishna@adityaoverseasenterprises.com" className="hover:text-background break-all">krishna@adityaoverseasenterprises.com</a>
              </li>
            </ul>
            <div className="mt-5">
              <a
                href="https://wa.me/919187152499"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs bg-[#25D366] text-white px-3 py-2 rounded hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[11px] text-background/35">© {new Date().getFullYear()} Aditya Overseas Enterprises Private Limited. All Rights Reserved.</span>
          <span className="text-[11px] text-background/35">Made in India · Exported Worldwide</span>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(42,80,22,0.25); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(42,80,22,0.45); }
        [data-state="open"] .accordion-content { animation: slideDown 0.2s ease; }
        [data-state="closed"] .accordion-content { animation: slideUp 0.2s ease; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}
