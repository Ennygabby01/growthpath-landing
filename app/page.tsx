"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignJustify, X, Rocket, Layers, BarChart3, Bot, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrowthPathLanding() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      (window as any).voiceflow?.chat?.load({
        verify: { projectID: "6999af97e3ec6ddc82607074" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };
    document.body.appendChild(script);
  }, []);

  const openChat = () => {
    (window as any).voiceflow?.chat?.open?.();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="text-2xl font-semibold tracking-tight text-[#7018B4] cursor-pointer">
            GrowthPath
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-[#7018B4] rounded-full text-sm font-medium text-white overflow-hidden">
            <a href="#services" className="px-6 py-3 border-r border-white/40 hover:bg-white/10 transition">
              Services
            </a>
            <a href="#process" className="px-6 py-3 border-r border-white/40 hover:bg-white/10 transition">
              Process
            </a>
            <a href="#contact" className="px-6 py-3 hover:bg-white/10 transition">
              Contact
            </a>
          </div>

          <div className="hidden md:block">
            <Button onClick={openChat} className="bg-[#7018B4] text-white rounded-full px-6 flex items-center gap-2 cursor-pointer">
              <Calendar size={16} />
              Book Session
            </Button>
          </div>

          {/* Mobile Icon */}
          <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? <X /> : <AlignJustify />}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-6"
            >
              <a href="#services" className="block">Services</a>
              <a href="#process" className="block">Process</a>
              <a href="#contact" className="block">Contact</a>
              <Button onClick={openChat} className="w-full bg-[#7018B4] text-white rounded-full">
                Book Session
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="pt-32 md:pt-36 pb-20 md:pb-28 bg-[#7018B4] text-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold leading-tight"
          >
            Intelligent Growth Infrastructure
            <br className="hidden md:block" />
            Built for Modern Businesses
          </motion.h1>

          <p className="mt-6 md:mt-8 text-lg text-purple-100 max-w-2xl mx-auto">
            AI qualification. Automated booking. Structured follow-ups.
            Conversion without friction.
          </p>

<div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
  
  <Button
  onClick={openChat}
  className="w-full sm:w-[260px] bg-white text-[#7018B4] hover:bg-[#4c0e7c] hover:text-white rounded-full py-6 text-base cursor-pointer"
>
  Book Free Strategy Session
</Button>

<Button
  onClick={openChat}
  className="w-full sm:w-[260px] bg-[#121212] text-white rounded-full py-6 hover:bg-[#4c0e7c] flex items-center justify-center gap-2 text-base cursor-pointer"
>
  <Bot size={18} />
  Talk to AI Assistant
</Button>

</div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">What We Build</h2>

          <div className="mt-14 md:mt-20 border border-[#7018B4]">
            <div className="grid md:grid-cols-3">
{[
  { icon: Rocket, title: "Paid Growth" },
  { icon: Layers, title: "Conversion Systems" },
  { icon: BarChart3, title: "Strategic Scaling" },
].map((item, i) => {
  const isMiddle = i === 1;

  return (
    <motion.div
      key={i}
      whileHover={!isMiddle ? { backgroundColor: "#faf5ff" } : {}}
      className={`p-10 md:p-14 text-center transition
        ${i !== 2 ? "md:border-r border-[#7018B4]" : ""}
        ${isMiddle ? "bg-[#7018B4] text-white" : ""}
      `}
    >
      <item.icon
        className={`mx-auto ${isMiddle ? "text-white" : "text-[#7018B4]"}`}
        size={34}
      />

      <h3 className="mt-6 text-lg md:text-xl font-medium">
        {item.title}
      </h3>

      <p
        className={`mt-3 max-w-xs mx-auto text-sm md:text-base ${
          isMiddle ? "text-purple-100" : "text-gray-600"
        }`}
      >
        Modern acquisition and automation systems engineered for predictable growth.
      </p>
    </motion.div>
  );
})}
            </div>
          </div>
        </div>
      </section>

{/* HOW IT WORKS */}
<section
  id="process"
  className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
>
  {/* Dashed flight path */}
  <div className="absolute top-10 right-10 hidden md:block opacity-20">
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      stroke="#7018B4"
      strokeWidth="1.5"
      strokeDasharray="6 6"
    >
      <path d="M10 100 C 60 10, 120 10, 150 80" />
    </svg>
  </div>

  {/* Paper plane */}
  <div className="absolute top-6 right-6 hidden md:block opacity-30">
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#7018B4"
      strokeWidth="1.5"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  </div>

  <div className="max-w-4xl mx-auto px-6">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-semibold">
        How It Works
      </h2>
    </div>

    <div className="relative mt-16 md:mt-24">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-px bg-gray-200" />

      {[
        {
          title: "Start Conversation",
          text: "Visitors interact with our AI assistant which qualifies intent instantly."
        },
        {
          title: "Automated Qualification",
          text: "Leads are scored, logged into CRM, and high-value prospects are identified."
        },
        {
          title: "Convert & Scale",
          text: "Qualified leads book strategy sessions and enter structured follow-ups."
        },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative mb-16 md:mb-20 md:flex ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Dot */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#7018B4] rounded-full border-4 border-white" />

          <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
            <h3 className="text-xl md:text-2xl font-medium">
              {step.title}
            </h3>
            <p className="mt-3 md:mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
              {step.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-24 text-center bg-[#7018B4] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold">Ready to Automate Growth?</h2>
          <Button onClick={openChat} className="mt-8 md:mt-10 bg-white text-[#7018B4] hover:text-white rounded-full px-12 py-6 mx-auto cursor-pointer">
            Book Free Strategy Session
          </Button>
        </div>
      </section>

<footer className="bg-[#5A1092] text-white">
  <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm">
    
    <p className="opacity-80">
      © {new Date().getFullYear()} GrowthPath Digital Consulting
    </p>

    <div className="flex items-center gap-6 mt-2 md:mt-0 opacity-80">
      <a href="#services" className="hover:opacity-100 transition">
        Services
      </a>
      <a href="#process" className="hover:opacity-100 transition">
        Process
      </a>
      <a href="#contact" className="hover:opacity-100 transition">
        Contact
      </a>
    </div>

  </div>
</footer>

    </div>
  );
}
