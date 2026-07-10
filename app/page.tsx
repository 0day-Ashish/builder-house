"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(() => import("../components/FaultyTerminal"), {
  ssr: false,
});

const teamMembers = [
  {
    name: "Ashish Ranjan Das",
    role: "Founder & Lead Designer",
    image: "/assets/team-1.avif",
    socials: {
      x: "#",
      github: "#"
    }
  },
  {
    name: "Sarah K.",
    role: "Lead Engineer",
    image: "/assets/team-2.avif",
    socials: {
      github: "#",
      linkedin: "#"
    }
  },
  {
    name: "Vikram R.",
    role: "Construction Lead",
    image: "/assets/team-3.avif",
    socials: {
      x: "#",
      linkedin: "#"
    }
  },
  {
    name: "Ananya S.",
    role: "Interior Architect",
    image: "/assets/team-4.avif",
    socials: {
      x: "#",
      linkedin: "#"
    }
  }
];

const roadmapPhases = [
  {
    id: "Phase 01",
    date: "July 16th, 2026",
    title: "Applications Open",
    description: "Submit your developer or designer profile. We review candidates on a rolling basis with focused portfolio checks.",
    status: "active"
  },
  {
    id: "Phase 02",
    date: "August 1st, 2026",
    title: "Cohort Selection",
    description: "Final shortlist announced. 15 selected builders are interviewed and coordinated for moving details.",
    status: "upcoming"
  },
  {
    id: "Phase 03",
    date: "August 15th, 2026",
    title: "Residency Kickoff",
    description: "Move into the Bangalore space. Initiate collaborative sprints, hands-on building, and mentorship sessions.",
    status: "upcoming"
  },
  {
    id: "Phase 04",
    date: "September 10th, 2026",
    title: "Demo Day & Week",
    description: "Present completed integrations and residential systems to investors, design firms, and network partners.",
    status: "upcoming"
  }
];

const faqItems = [
  {
    question: "How long does it take to build a home?",
    answer: "A typical residential build takes between 8 to 12 months, depending on the scale, complexity of the architectural footprint, and site conditions. We provide a detailed project schedule during our initial design alignment."
  },
  {
    question: "What does your pricing include?",
    answer: "Our pricing is comprehensive and all-inclusive of design fees, structural engineering, council permits, procurement, site management, construction labor, and premium finishes. No hidden charges or unexpected variations."
  },
  {
    question: "Do you handle permits and approvals?",
    answer: "Yes, we manage the entire end-to-end municipal compliance, zoning approvals, structural certifications, and utility connection clearances required in Bangalore prior to site mobilization."
  },
  {
    question: "Can I customise the design?",
    answer: "Absolutely. Every project is fully bespoke. We work closely with you to draft custom architectural plans, interior specifications, and layout footprints tailored to your lifestyle and site orientation."
  },
  {
    question: "Do you offer a warranty on your builds?",
    answer: "Yes, all our builds are backed by a comprehensive structural warranty of 10 years, alongside standard performance warranties on plumbing, waterproofing, and electrical systems."
  }
];

const programDetails = [
  {
    step: "01",
    title: "Drafting & Sprints",
    description: "Hands-on collaborative design and development sessions iterating on real-world housing models.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    step: "02",
    title: "Masterclasses",
    description: "Intimate blueprint reviews, structural workshops, and engineering panels with industry leaders.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
  {
    step: "03",
    title: "Residency Living",
    description: "Fully sponsored shared lodging in Bangalore, fostering organic debate and deep friendships.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    step: "04",
    title: "Guest Lectures",
    description: "Casual fireside chats, design Q&As, and portfolio critiques with visiting expert builders.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    step: "05",
    title: "Joint Sprints",
    description: "Working in cross-disciplinary teams to execute concrete project prototypes and design layouts.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    step: "06",
    title: "Demo Day Pitching",
    description: "Pitch final designs, architectural specs, and integrations to design groups, angels, and partners.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerOffsetRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  };

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        let el = containerRef.current;
        let top = 0;
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent as HTMLDivElement;
        }
        containerOffsetRef.current = top;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLenis((lenis) => {
    const scroll = lenis.scroll;
    const sticky = scroll > 120;

    const inlinePlayer = document.getElementById("inline-player");
    const floatingPlayer = document.getElementById("floating-player");

    if (inlinePlayer && floatingPlayer) {
      if (sticky) {
        inlinePlayer.style.opacity = "0";
        inlinePlayer.style.pointerEvents = "none";
        
        floatingPlayer.style.opacity = "1";
        floatingPlayer.style.transform = "translateY(0)";
        floatingPlayer.style.pointerEvents = "auto";
      } else {
        inlinePlayer.style.opacity = "1";
        inlinePlayer.style.pointerEvents = "auto";
        
        floatingPlayer.style.opacity = "0";
        floatingPlayer.style.transform = "translateY(-16px)";
        floatingPlayer.style.pointerEvents = "none";
      }
    }

    if (!imageRef.current || !containerRef.current) return;
    const viewportHeight = window.innerHeight;
    const rectTop = containerOffsetRef.current - scroll;

    let progress = (viewportHeight - rectTop) / viewportHeight;
    progress = Math.max(0, Math.min(1, progress));

    const scale = 1.20 - progress * 0.20;
    imageRef.current.style.transform = `scale(${scale})`;
  });

  return (
    <main className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black relative">
      {/* Floating Sticky Music Player (Corner Pill) */}
      <div 
        id="floating-player"
        className="fixed top-6 right-4 md:right-8 z-50 p-2 md:p-2.5 px-4 bg-[#0d0d0f] border border-zinc-800/80 rounded-full shadow-2xl text-white flex items-center gap-2.5 select-none transition-[transform,opacity] duration-300 opacity-0 -translate-y-4 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Lo-Fi FM</span>
        {/* Animated Sound Wave bars */}
        <div className="flex items-end gap-[1.5px] h-3 w-4 pb-0.5">
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-1 h-3' : 'h-1'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-2 h-3' : 'h-2.5'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-3 h-3' : 'h-1.5'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-4 h-3' : 'h-2'}`} />
        </div>
        <button 
          onClick={togglePlay}
          className="hover:text-white transition duration-200 uppercase font-mono text-[9px] border border-zinc-800 rounded px-1.5 py-0.5 bg-[#0a0a0c] cursor-pointer"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Root audio element */}
      <audio 
        ref={audioRef} 
        src="https://assets.codepen.io/4358584/Anitek_-_01_-_Kisses.mp3" 
        loop
      />

      {/* Background Faulty Terminal */}
      <div className="fixed inset-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <FaultyTerminal
          scale={0.8}
          curvature={0.1}
          scanlineIntensity={0.2}
          glitchAmount={0.35}
          flickerAmount={0.15}
          brightness={0.7}
          tint="#ffffff"
          mouseReact={true}
          mouseStrength={0.5}
          className="w-full h-full"
        />
      </div>

      {/* Header Container */}
      <div className="w-full pt-6 pb-2 px-4 md:px-8 max-w-[1800px] mx-auto">
        {/* BUILDER HOUSE giant heading */}
        <h1 className="w-full text-center text-[12.7vw] font-coastersans leading-[0.8] whitespace-nowrap uppercase select-none text-white font-normal">
          BUILDER HOUSE
        </h1>

        {/* Navigation Bar */}
        <div className="flex justify-between items-start w-full mt-4 text-[13px] md:text-[15px] text-[#8e8e93] font-normal px-1">
          <a href="#" className="hidden md:inline-block text-[17px] md:text-[20px] hover:text-white transition duration-200 pt-[3px]">
            Home
          </a>
          <a href="#" className="hidden md:inline-block text-[17px] md:text-[20px] hover:text-white transition duration-200 pt-[3px]">
            About
          </a>
          <a href="#" className="hidden md:inline-block text-[17px] md:text-[20px] hover:text-white transition duration-200 pt-[3px]">
            Contact
          </a>
          <div className="flex flex-col items-end ml-auto pr-2 md:pr-4">
            <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter leading-none">
              Bangalore, 16th July
            </span>
            {/* Inline lo-fi FM player */}
            <div 
              id="inline-player"
              className="flex items-center gap-2.5 select-none transition-opacity duration-300 mt-1.5 text-[#8e8e93] opacity-100 pointer-events-auto"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Lo-Fi FM</span>
              {/* Animated Sound Wave bars */}
              <div className="flex items-end gap-[1.5px] h-3 w-4 pb-0.5">
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-1 h-3' : 'h-1'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-2 h-3' : 'h-2.5'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-3 h-3' : 'h-1.5'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-4 h-3' : 'h-2'}`} />
              </div>
              <button 
                onClick={togglePlay}
                className="hover:text-white transition duration-200 uppercase font-mono text-[9px] border border-zinc-800 rounded px-1.5 py-0.5 bg-[#0a0a0c] cursor-pointer"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Left-aligned text block and buttons */}
      <div className="flex-1 flex flex-col justify-end px-4 md:px-8 max-w-[1800px] mx-auto w-full pt-24 md:pt-46 md:pb-4">
        <div className="max-w-3xl mb-8 pl-1">
          <p className="text-[17px] sm:text-[20px] md:text-[23px] text-[#ededed] font-normal leading-[1.35] tracking-tight">
            Join a fully sponsored bootcamp here in Bangalore
            <br />
            For developers, designers, and engineers ready to
            <br />
            build, learn, and collaborate. Hosted by TokenSupply.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center gap-3 pl-1 pb-3">
          <button className="bg-white text-black font-medium text-[15px] md:text-[16px] px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer">
            Apply
          </button>
          <button className="bg-[#1c1c1e] text-white font-medium text-[15px] md:text-[16px] px-6 py-2.5 rounded-full border border-zinc-800/20 hover:bg-[#2c2c2e] active:scale-95 transition duration-200 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>

      {/* Hero Image Section - Full Width */}
      <div className="w-full border-t border-zinc-900">
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] md:aspect-[16/8] xl:aspect-[21/9] overflow-hidden"
        >
          <Image
            ref={imageRef}
            src="/assets/hero.gif"
            alt="Builder House Hero Room"
            fill
            unoptimized
            className="object-cover object-center will-change-transform"
            style={{ transform: "scale(1.2)" }}
            priority
          />
        </div>
      </div>

      {/* About Section */}
      <div className="w-full pt-36 md:pt-48 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col">
        {/* Top grid: Left column (About label) and Right column (Content) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left Column: Icon + About */}
          <div className="md:col-span-4 flex items-start gap-1.5 text-[#8e8e93] text-sm md:text-base font-normal tracking-wide pl-1">
            <svg className="w-4 h-4 mt-1 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="15" x2="17" y2="7" />
              <polyline points="9 7 17 7 17 15" />
            </svg>
            <span className="uppercase text-sm font-instrument-serif tracking-wider pt-[3px]">About</span>
          </div>

          {/* Right Column: Title, Body, Button */}
          <div className="md:col-span-8 flex flex-col items-start pl-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 tracking-tight">
              About TokenSupply
            </h2>
            <p className="text-[#ededed] text-[16px] md:text-[18px] leading-[1.45] tracking-tight mb-8 max-w-[550px]">
              Manage digital product fulfillment, inventory, orders, and support across every platform from one unified dashboard. No more spreadsheets.
            </p>
            <button className="bg-white text-black font-semibold text-[15px] px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Plus Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full text-[#3a3a3c] text-2xl md:text-3xl lg:text-4xl font-light py-8 pl-1 pr-1">
          <div className="hidden md:block md:col-span-4"></div>
          <div className="col-span-1 md:col-span-8 flex justify-between">
            <span>+</span>
            <span>+</span>
            <span className="text-right">+</span>
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full pl-1">
          <div className="hidden md:block md:col-span-4"></div>
          <div className="col-span-1 md:col-span-8">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/assets/token-supply.avif"
                alt="About TokenSupply Developer working"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Builder House Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col pt-24 md:pt-36">
        {/* Row 1: Image (columns 1-8) and Tag (columns 9-12) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left: Image (columns 1-8) */}
          <div className="col-span-1 md:col-span-8 pl-1">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/assets/builder-house.avif"
                alt="About Builder House Building Project"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Tag (columns 9-12) */}
          <div className="col-span-1 md:col-span-4 flex items-start md:justify-end gap-1.5 text-[#8e8e93] text-sm md:text-base font-normal tracking-wide pr-1 pt-2">
            <svg className="w-4 h-4 mt-1 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="uppercase text-sm font-instrument-serif tracking-wider pt-[3px]">Builder House</span>
          </div>
        </div>

        {/* Row 2: Plus Dividers (below image, columns 1-8) */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full text-[#3a3a3c] text-2xl md:text-3xl lg:text-4xl font-light py-8 pl-1 pr-1">
          <div className="col-span-1 md:col-span-8 flex justify-between">
            <span>+</span>
            <span>+</span>
            <span className="text-right">+</span>
          </div>
          <div className="hidden md:block md:col-span-4"></div>
        </div>

        {/* Row 3: Details (columns 1-8) */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full pl-1">
          <div className="col-span-1 md:col-span-8 flex flex-col items-start pr-0 md:pr-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 tracking-tight">
              What is Builder House?
            </h2>
            <p className="text-[#ededed] text-[16px] md:text-[18px] leading-[1.45] tracking-tight mb-10 max-w-[620px]">
              Builder House is a Bangalore-based construction studio crafting homes that are designed to last. From the first sketch to the final handover, we manage design, engineering, and build under one roof — so you always know who’s accountable.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-[620px]">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">10+</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold">Minds</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">15</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Years of building</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">10 yr</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Structural warranty</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4"></div>
        </div>
      </div>

      {/* What happens in the Builder House Grid Section */}
      <div className="w-full pb-24 flex flex-col max-w-[900px] mx-auto px-4 md:px-8">
        {/* 6-Box Grid Layout: 3 boxes in one line, 3 in the next line, sticking to each other */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 w-full pl-1 border-t border-l border-white">
          {programDetails.map((activity, idx) => (
            <div 
              key={idx}
              className="bg-[#0a0a0c]/20 border-r border-b border-white p-6 flex flex-col items-start justify-between min-h-[220px]"
            >
              <div className="flex justify-between items-start w-full mb-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{activity.step}</span>
                <div className="p-2 bg-zinc-950/80 rounded-lg border border-zinc-900">
                  {activity.icon}
                </div>
              </div>
              <div>
                <h3 className="text-[19px] md:text-[22px] font-instrument-serif text-white tracking-tight mb-1.5">
                  {activity.title}
                </h3>
                <p className="text-xs md:text-sm text-[#8e8e93] leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full pb-20 flex flex-col pt-24 md:pt-30">
        {/* Header grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-16 max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Left Column: Icon + Team label */}
          <div className="md:col-span-4 flex items-start gap-1.5 text-[#8e8e93] text-sm md:text-base font-normal tracking-wide pl-1 pt-2">
            <svg className="w-4 h-4 mt-1 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="uppercase text-sm font-instrument-serif tracking-wider pt-[3px]">Team</span>
          </div>

          {/* Right Column: Title */}
          <div className="md:col-span-8 flex flex-col items-start pl-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              The Minds Behind Builder House
            </h2>
            <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[550px]">
              A multidisciplinary group of developers, designers, and construction specialists building the future of residential design.
            </p>
          </div>
        </div>

        {/* Marquee Slider */}
        <div className="w-full overflow-hidden relative marquee-mask">
          <div className="flex flex-row animate-marquee py-4">
            {/* Duplicated set for infinite loop rendering */}
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={idx}
                className="w-[280px] md:w-[320px] flex-shrink-0 bg-[#111] rounded-3xl p-5 flex flex-col group mr-6"
              >
                {/* Profile Image Box */}
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-zinc-950 mb-5">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
                {/* Info */}
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-[17px] md:text-[19px] font-semibold text-white tracking-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                      {member.role}
                    </p>
                  </div>
                  {/* Social links */}
                  <div className="flex gap-2.5 pt-1.5">
                    {member.socials.x && (
                      <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-500 hover:text-white transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-500 hover:text-white transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-500 hover:text-white transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col border-t border-zinc-900/60 pt-24 md:pt-36">
        {/* Header grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-16">
          {/* Left Column: Icon + Roadmap label */}
          <div className="md:col-span-4 flex items-start gap-1.5 text-[#8e8e93] text-sm md:text-base font-normal tracking-wide pl-1 pt-2">
            <svg className="w-4 h-4 mt-1 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="uppercase text-sm font-instrument-serif tracking-wider pt-[3px]">Roadmap</span>
          </div>

          {/* Right Column: Title */}
          <div className="md:col-span-8 flex flex-col items-start pl-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Residency Timeline
            </h2>
            <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[550px]">
              Our structured roadmap outlining key steps leading up to the residency kickoff and demo day in Bangalore.
            </p>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="flex flex-col w-full pl-1 border-t border-zinc-900">
          {roadmapPhases.map((phase, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-zinc-900 items-start group"
            >
              {/* Phase & Date */}
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#e2b857]">{phase.id}</span>
                <span className="text-white text-lg font-instrument-serif">{phase.date}</span>
              </div>
              
              {/* Title & Body */}
              <div className="md:col-span-6 flex flex-col gap-2">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-white tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-[#8e8e93] text-sm md:text-base leading-relaxed max-w-[500px]">
                  {phase.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="md:col-span-2 flex md:justify-end pt-1">
                <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded border ${
                  phase.status === 'active' 
                    ? 'text-[#e2b857] border-[#e2b857]/30 bg-[#e2b857]/5' 
                    : 'text-zinc-600 border-zinc-900 bg-zinc-950/20'
                }`}>
                  {phase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col border-t border-zinc-900/60 pt-24 md:pt-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {/* Left Column: Trophy Icon + FAQ Tag */}
          <div className="md:col-span-4 flex items-start gap-1.5 text-[#8e8e93] text-sm md:text-base font-normal tracking-wide pl-1 pt-2">
            <svg className="w-4 h-4 mt-1 text-[#8e8e93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
              <path d="M12 2a4 4 0 0 1 4 4v8H8V6a4 4 0 0 1 4-4Z" />
            </svg>
            <span className="uppercase text-sm font-instrument-serif tracking-wider pt-[3px]">FAQ</span>
          </div>

          {/* Right Column: Title & Accordions */}
          <div className="md:col-span-8 flex flex-col items-start pl-1 w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-10 tracking-tight">
              Frequently Asked Questions
            </h2>
            
            {/* Accordion Stack */}
            <div className="flex flex-col gap-3 w-full">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className="w-full bg-[#0a0a0c]/60 border border-zinc-900/60 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left text-[#ededed] hover:text-white transition duration-200 cursor-pointer"
                    >
                      <span className="text-sm md:text-base font-medium tracking-tight pr-4">
                        {item.question}
                      </span>
                      <span className={`text-xl font-light text-[#8e8e93] transition-transform duration-300 transform select-none ${
                        isOpen ? "rotate-45 text-white" : ""
                      }`}>
                        +
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-zinc-900/40" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 py-4 text-xs md:text-sm text-[#8e8e93] leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="w-full pb-36 flex flex-col pt-24 md:pt-36 border-t border-zinc-900/60 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[850px] mx-auto px-4 md:px-8">
          {/* Live Box */}
          <div className="aspect-square flex items-center justify-center border border-white rounded-sm group cursor-pointer transition duration-300">
            <span className="font-instrument-serif italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Live
            </span>
          </div>

          {/* Build Box */}
          <div className="aspect-square flex items-center justify-center border border-white rounded-sm group cursor-pointer transition duration-300">
            <span className="font-instrument-serif italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Build
            </span>
          </div>

          {/* Network Box */}
          <div className="aspect-square flex items-center justify-center border border-white rounded-sm group cursor-pointer transition duration-300">
            <span className="font-instrument-serif italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Network
            </span>
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="text-center mt-12 text-[14px] md:text-[16px] text-zinc-500">
          Pick a pillar. <span className="font-instrument-serif text-white ml-0.5 text-lg">Step inside.</span>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full border-t border-zinc-900/60 pt-16 pb-6 px-4 md:px-8 max-w-[1800px] mx-auto flex flex-col">
        {/* Footer Top Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-[700px] mx-auto text-center text-[13px] md:text-[15px] text-[#8e8e93] mb-20">
          <div className="flex flex-col items-center justify-center">
            <span>©2026 TokenSupply</span>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center">
            <span>Have more queries?</span>
            <a href="mailto:contact@mail.com" className="hover:text-white transition duration-200">
              contact@mail.com
            </a>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center">
            <a href="#" className="hover:text-white transition duration-200">Instagram</a>
            <a href="#" className="hover:text-white transition duration-200">X (Twitter)</a>
            <a href="#" className="hover:text-white transition duration-200">Youtube</a>
          </div>
        </div>

        {/* Footer BUILDER HOUSE Giant Stamp */}
        <h1 className="w-full text-center text-[12.7vw] font-coastersans leading-[0.8] whitespace-nowrap uppercase select-none text-white font-normal pb-6 pr-4 md:pr-6">
          BUILDER HOUSE
        </h1>
      </footer>
    </main>
  );
}

