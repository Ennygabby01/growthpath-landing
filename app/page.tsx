"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlignJustify, X, Rocket, BarChart3, Bot,
  Calendar, ArrowRight, Zap, Target, TrendingUp, CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Animated particle canvas ─────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        a: Math.random() * 0.45 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(160,80,255,${(1 - d / 130) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,100,255,${p.a})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── Noise texture svg data url ────────────────────────────────────────── */
const noiseBg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ─── Counter hook ───────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1500, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [active, target, duration]);
  return value;
}

/* ─── Main page ─────────────────────────────────────────────────────────── */
export default function GrowthPathLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const c1 = useCounter(3, 1200, statsVisible);
  const c2 = useCounter(10, 1400, statsVisible);
  const c3 = useCounter(98, 1600, statsVisible);

  /* ── Voiceflow ── */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      (window as any).voiceflow?.chat?.load({
        verify: { projectID: "69afe44851ea9833d0f6f240" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };
    document.body.appendChild(script);
  }, []);

  /* ── Stats intersection observer ── */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openChat = () => (window as any).voiceflow?.chat?.open?.();

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#07050f] text-white overflow-x-hidden selection:bg-purple-500/30">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 px-4 pt-4">
        <div className="max-w-7xl mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-xl shadow-black/40">

          <div className="text-lg font-bold tracking-tight cursor-pointer">
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">Growth</span>
            <span className="text-white">Path</span>
          </div>

          <nav className="hidden md:flex items-center">
            {(["Services", "Process", "Contact"] as const).map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="px-4 py-2 text-sm text-white/50 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <Button
            onClick={openChat}
            className="hidden md:flex bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-5 h-9 text-sm items-center gap-2 border border-purple-500/40 shadow-lg shadow-purple-600/20 cursor-pointer transition-all"
          >
            <Calendar size={13} />
            Book Session
          </Button>

          <button
            className="md:hidden text-white/60 hover:text-white transition"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <AlignJustify size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto mt-1 bg-[#0c0818]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-6 py-5 space-y-4"
            >
              {(["Services", "Process", "Contact"] as const).map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/60 hover:text-white transition text-sm"
                >
                  {label}
                </a>
              ))}
              <Button onClick={openChat} className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-xl cursor-pointer">
                Book Session
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleField />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: noiseBg, backgroundSize: "220px 220px" }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(140,60,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(140,60,255,.8) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-purple-700/18 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-violet-600/12 blur-[110px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 md:pt-36">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-[11px] text-purple-300 mb-10 backdrop-blur-sm"
          >
            <Zap size={11} className="text-purple-400" />
            AI-Powered Growth Infrastructure
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[86px] font-extrabold leading-[0.92] tracking-tight"
          >
            <span className="text-white">Intelligent</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #7c3aed 80%, #c084fc 100%)",
              }}
            >
              Growth Systems
            </span>
            <br />
            <span className="text-white/30 text-4xl md:text-5xl lg:text-6xl font-light">for Modern Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-base md:text-lg text-white/45 max-w-lg mx-auto leading-relaxed"
          >
            AI qualification. Automated booking. Structured follow-ups.
            <br className="hidden md:block" />
            Convert visitors into revenue — without friction.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={openChat}
              className="group bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-8 py-6 text-base font-semibold border border-purple-400/30 shadow-2xl shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              Book Free Strategy Session
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>

            <Button
              onClick={openChat}
              className="group bg-white/[0.06] hover:bg-white/[0.1] text-white rounded-2xl px-8 py-6 text-base font-medium border border-white/[0.09] flex items-center gap-2 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
            >
              <Bot size={15} className="text-purple-400" />
              Talk to AI Assistant
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-14 flex items-center justify-center gap-6 md:gap-10 flex-wrap"
          >
            {["AI-Qualified Leads", "Automated Booking", "24/7 Systems"].map((label) => (
              <div key={label} className="flex items-center gap-1.5 text-white/28 text-xs">
                <CheckCircle size={12} className="text-purple-500/70" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#07050f] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[
              { val: c1, suffix: "x", label: "Revenue Multiplier" },
              { val: c2, suffix: "+", label: "Hours Saved / Week" },
              { val: c3, suffix: "%", label: "Lead Show-Up Rate" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-7 text-center overflow-hidden hover:border-purple-500/25 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(112,24,180,0.12) 0%, transparent 70%)" }}
                />
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-white to-purple-300 bg-clip-text text-transparent tabular-nums">
                  {s.val}{s.suffix}
                </div>
                <div className="mt-1.5 text-[11px] text-white/35 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-10 md:mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-3"
            >
              What We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold"
            >
              Systems That Scale
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                Icon: Rocket,
                title: "Paid Growth",
                desc: "Data-driven ad campaigns across every channel, engineered for acquisition at scale. ROI-first from day one.",
                featured: false,
              },
              {
                Icon: Target,
                title: "Conversion Systems",
                desc: "AI-powered funnels that qualify, nurture, and convert. Your pipeline runs on autopilot around the clock.",
                featured: true,
              },
              {
                Icon: TrendingUp,
                title: "Strategic Scaling",
                desc: "Full-stack growth infrastructure — from zero to systematic, predictable, measurable revenue.",
                featured: false,
              },
            ].map(({ Icon, title, desc, featured }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-8 overflow-hidden group cursor-default transition-all duration-300 ${
                  featured
                    ? "bg-gradient-to-br from-purple-600/25 to-violet-800/15 border border-purple-500/30 shadow-2xl shadow-purple-600/15"
                    : "bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/20"
                }`}
              >
                {/* Noise layer */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl"
                  style={{ backgroundImage: noiseBg, backgroundSize: "160px 160px" }}
                />

                {featured && (
                  <span className="absolute top-5 right-5 text-[10px] bg-purple-500/20 border border-purple-400/30 text-purple-300 rounded-full px-2.5 py-0.5 tracking-wide">
                    Premium
                  </span>
                )}

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-7 ${
                    featured ? "bg-purple-500/25" : "bg-white/[0.05]"
                  }`}
                >
                  <Icon size={20} className={featured ? "text-purple-300" : "text-purple-400"} />
                </div>

                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>

                <div className="mt-7 flex items-center gap-1 text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight size={11} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="process" className="py-14 md:py-20 relative overflow-hidden">

        {/* Subtle background sweep */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(112,24,180,0.06) 0%, transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-purple-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-bold">Three Steps to Scale</h2>
          </div>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-[30px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent" />

            {[
              {
                num: "01",
                Icon: Bot,
                title: "Start Conversation",
                text: "Visitors interact with our AI assistant which instantly qualifies their intent and pain points.",
              },
              {
                num: "02",
                Icon: BarChart3,
                title: "Automated Qualification",
                text: "Leads are scored, logged into CRM, and high-value prospects are identified in real-time.",
              },
              {
                num: "03",
                Icon: Rocket,
                title: "Convert & Scale",
                text: "Qualified leads book strategy sessions and enter structured follow-up sequences automatically.",
              },
            ].map(({ num, Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.14 }}
                className={`relative mb-16 md:flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
              >
                {/* Dot */}
                <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 w-[18px] h-[18px] bg-[#07050f] border-2 border-purple-500 rounded-full flex items-center justify-center z-10 mt-1">
                  <div className="w-[6px] h-[6px] bg-purple-500 rounded-full" />
                </div>

                <div className={`ml-16 md:ml-0 md:w-1/2 md:px-12 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                  <span className="block text-[72px] font-black text-white/[0.03] leading-none select-none -mb-6">{num}</span>
                  <div className={`flex items-center gap-2.5 mb-3 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                    <Icon size={17} className="text-purple-400 flex-shrink-0" />
                    <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
                  </div>
                  <p className="text-white/45 leading-relaxed text-sm md:text-base">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-purple-600/18 to-violet-900/10 border border-purple-500/18 rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          >
            {/* Glow center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(112,24,180,0.18) 0%, transparent 70%)" }}
            />
            {/* Noise */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-3xl"
              style={{ backgroundImage: noiseBg, backgroundSize: "200px 200px" }}
            />

            <p className="relative text-purple-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-5">Get Started</p>
            <h2 className="relative text-3xl md:text-5xl font-bold mb-5">Ready to Automate Growth?</h2>
            <p className="relative text-white/40 mb-10 max-w-md mx-auto text-sm md:text-base leading-relaxed">
              Book a free strategy session and discover how GrowthPath can transform your business pipeline.
            </p>

            <Button
              onClick={openChat}
              className="relative group bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-10 py-6 text-base font-semibold border border-purple-400/30 shadow-2xl shadow-purple-600/35 flex items-center gap-2 mx-auto cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-500/50"
            >
              Book Free Strategy Session
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">Growth</span>
            <span className="text-white/50">Path</span>
          </div>
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} GrowthPath Digital Consulting</p>
          <div className="flex gap-6 text-xs text-white/35">
            {(["Services", "Process", "Contact"] as const).map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="hover:text-white/70 transition">
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
