import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, MapPin, Bike, UtensilsCrossed, ArrowRight } from "lucide-react";
import burger from "@/assets/hero-burger.png";
import pizza from "@/assets/hero-pizza.png";
import biryani from "@/assets/hero-biryani.png";
import dosa from "@/assets/hero-dosa.png";
import dessert from "@/assets/hero-dessert.png";
import { Button } from "@/components/ui/button";
import { bestSellersQuery, categoriesQuery, restaurantsQuery } from "@/lib/queries";
import { RestaurantCard } from "@/components/food/RestaurantCard";
import { Skeleton, VegIcon, RatingPill } from "@/components/food/bits";
import { inr } from "@/lib/bill";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodieX — Hot food from Pune's best kitchens" },
      { name: "description", content: "Order burgers, biryani, misal pav, dosa and desserts online. Live order tracking and fast delivery across Pune." },
      { property: "og:title", content: "FoodieX — Hot food from Pune's best kitchens" },
      { property: "og:description", content: "Order burgers, biryani, misal pav, dosa and desserts online with live tracking." },
    ],
  }),
  component: Home,
});

const WORDS = ["Biryani", "Misal Pav", "Pizza", "Dosa", "Burgers"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  useEffect(() => {
    const w = WORDS[i % WORDS.length] ?? "";
    if (txt.length < w.length) {
      const t = setTimeout(() => setTxt(w.slice(0, txt.length + 1)), 90);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setTxt(""); setI(i + 1); }, 1600);
    return () => clearTimeout(t);
  }, [txt, i]);
  return (
    <span className="text-brand">
      {txt}
      <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-primary align-middle" style={{ height: "0.8em" }} />
    </span>
  );
}

const FLOATERS = [
  { src: burger, cls: "left-[2%] top-[6%] w-40 md:w-56", d: 0, depth: 120 },
  { src: pizza, cls: "right-[0%] top-[0%] w-44 md:w-64", d: 0.6, depth: -80 },
  { src: biryani, cls: "right-[30%] bottom-[2%] w-36 md:w-52", d: 1.2, depth: 160 },
  { src: dosa, cls: "left-[18%] bottom-[0%] w-40 md:w-56", d: 0.3, depth: -60 },
  { src: dessert, cls: "right-[6%] bottom-[18%] w-28 md:w-40", d: 0.9, depth: 100 },
];

function Floater({ f, i }: { f: (typeof FLOATERS)[number]; i: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, f.depth]);
  return (
    <motion.div style={{ y }} className={`absolute ${f.cls}`}>
      <motion.img
        src={f.src}
        alt=""
        width={816}
        height={816}
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -18, 0] }}
        transition={{
          opacity: { delay: 0.2 + i * 0.12, duration: 0.6 },
          scale: { delay: 0.2 + i * 0.12, type: "spring" },
          rotate: { delay: 0.2 + i * 0.12, duration: 0.8 },
          y: { repeat: Infinity, duration: 4 + i * 0.7, ease: "easeInOut", delay: f.d },
        }}
        whileHover={{ rotate: 12, scale: 1.08 }}
        className="drop-shadow-2xl"
      />
    </motion.div>
  );
}

function Hero() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-primary/25 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-0 top-40 size-80 rounded-full bg-chart-2/30 blur-3xl animate-blob [animation-delay:3s]" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-24">
        <div className="relative z-10 space-y-6">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-sm font-semibold shadow-soft">
            <Bike className="size-4 text-primary" /> Delivering across Pune in 30 min
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Craving <br /><Typewriter /><br />right now?
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-md text-lg text-muted-foreground">
            12 kitchens, 72 dishes and a scooter already warming up. Order in a few taps, track it live.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            onSubmit={(e) => { e.preventDefault(); navigate({ to: "/restaurants", search: { q } }); }}
            className="flex max-w-lg items-center gap-2 rounded-2xl border bg-card p-2 shadow-lift"
          >
            <Search className="ml-2 size-5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for misal, biryani, pizza…" className="h-11 flex-1 bg-transparent text-base outline-none" />
            <Button type="submit" variant="hero" className="animate-pulse-ring h-11 px-5">Order Now</Button>
          </motion.form>
        </div>
        <div className="relative h-[360px] md:h-[520px]">
          {FLOATERS.map((f, i) => <Floater key={i} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const { data } = useQuery(categoriesQuery);
  const list = [...(data ?? []), ...(data ?? [])];
  return (
    <section className="overflow-hidden border-y bg-card py-5">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {list.map((c, i) => (
          <Link key={i} to="/restaurants" search={{ cuisine: c.name }} className="flex items-center gap-3 rounded-full border bg-background py-1.5 pl-1.5 pr-5 transition hover:border-primary">
            <img src={c.image_url ?? ""} alt="" className="size-10 rounded-full object-cover" loading="lazy" />
            <span className="whitespace-nowrap font-semibold">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const { data, isLoading } = useQuery(bestSellersQuery);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      <SectionTitle eyebrow="Top rated" title="Best Sellers" />
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4">
        {isLoading && Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-64 w-56 shrink-0" />)}
        {data?.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }} className="w-56 shrink-0 snap-start">
            <Link to="/restaurants/$id" params={{ id: d.restaurant_id }} className="block overflow-hidden rounded-2xl border bg-card shadow-soft hover:shadow-lift">
              <img src={d.image_url ?? ""} alt={d.name} className="aspect-square w-full object-cover" loading="lazy" />
              <div className="space-y-1 p-3">
                <div className="flex items-center gap-1.5"><VegIcon veg={d.is_veg} /><p className="truncate font-semibold">{d.name}</p></div>
                <p className="truncate text-xs text-muted-foreground">{d.restaurants?.name}</p>
                <div className="flex items-center justify-between"><span className="font-bold">{inr(d.price)}</span><RatingPill value={d.rating} /></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Popular() {
  const { data, isLoading } = useQuery(restaurantsQuery);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16">
      <div className="flex items-end justify-between">
        <SectionTitle eyebrow="Loved by Pune" title="Popular Restaurants" />
        <Link to="/restaurants" className="mb-6 flex items-center gap-1 text-sm font-semibold text-primary">See all <ArrowRight className="size-4" /></Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading && Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
        {data?.slice(0, 8).map((r, i) => <RestaurantCard key={r.id} r={r} index={i} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: MapPin, t: "Pick a kitchen", d: "Browse 12 restaurants near you" },
    { icon: ShoppingBag, t: "Fill your cart", d: "Apply a coupon, choose COD, UPI or card" },
    { icon: Bike, t: "Track it live", d: "Watch your order move, step by step" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <SectionTitle eyebrow="Simple" title="How it works" center />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div key={s.t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative rounded-3xl border bg-card p-8 text-center shadow-soft">
            <span className="absolute right-5 top-4 font-display text-5xl font-black text-secondary">{i + 1}</span>
            <motion.div whileHover={{ rotate: -10, scale: 1.1 }} className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-brand text-primary-foreground shadow-lift">
              <s.icon className="size-7" />
            </motion.div>
            <h3 className="text-xl font-bold">{s.t}</h3>
            <p className="mt-1 text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, { duration: 2, onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-IN") + suffix; } });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function Stats() {
  const s = [
    { n: 25000, s: "+", l: "Orders delivered" },
    { n: 12, s: "", l: "Partner restaurants" },
    { n: 18000, s: "+", l: "Happy customers" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <div className="grid gap-6 rounded-3xl bg-brand p-10 text-center text-primary-foreground shadow-lift md:grid-cols-3">
        {s.map((x) => (
          <div key={x.l}>
            <p className="font-display text-5xl font-extrabold"><Counter to={x.n} suffix={x.s} /></p>
            <p className="mt-1 font-medium opacity-90">{x.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={`mb-6 ${center ? "text-center" : ""}`}>
      <p className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-primary" style={center ? { justifyContent: "center" } : undefined}>
        <UtensilsCrossed className="size-4" /> {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <BestSellers />
      <Popular />
      <HowItWorks />
      <Stats />
    </>
  );
}
