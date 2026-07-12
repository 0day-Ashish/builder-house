"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import dynamic from "next/dynamic";

const PixelGridBackground = dynamic(() => import("../components/PixelGridBackground"), {
  ssr: false,
});

const teamMembers = [
  {
    name: "Ashish Ranjan Das",
    role: "Founder & Lead Designer",
    image: "/assets/team-1.avif",
    socials: {
      x: "#",
      github: "https://github.com/0day-Ashish",
      website: "https://realanshuman.com"
    }
  },
  {
    name: "Sarah K.",
    role: "Lead Engineer",
    image: "/assets/team-2.avif",
    socials: {
      github: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    name: "Vikram R.",
    role: "Construction Lead",
    image: "/assets/team-3.avif",
    socials: {
      x: "#",
      linkedin: "#",
      website: "#"
    }
  },
  {
    name: "Ananya S.",
    role: "Interior Architect",
    image: "/assets/team-4.avif",
    socials: {
      x: "#",
      linkedin: "#",
      website: "#"
    }
  }
];

const roadmapPhases = [
  {
    id: "Phase 01",
    date: "Week 01",
    title: "Product architecture",
    description: "System design, data models, and technical decisions that unlock the rest of V1.",
    status: "upcoming",
    image: "/assets/architecture.png"
  },
  {
    id: "Phase 02",
    date: "Week 01–02",
    title: "Design system",
    description: "A cohesive visual and interaction language across the product surface.",
    status: "upcoming",
    image: "/assets/design.png"
  },
  {
    id: "Phase 03",
    date: "Week 02–04",
    title: "Frontend",
    description: "Ship the user-facing product with performance and polish as first-class.",
    status: "upcoming",
    image: ""
  },
  {
    id: "Phase 04",
    date: "Week 02–04",
    title: "Backend",
    description: "APIs, services, and business logic that power the Token Supply layer.",
    status: "upcoming",
    image: "/assets/backend.png"
  },
  {
    id: "Phase 05",
    date: "Week 03–05",
    title: "Infrastructure",
    description: "Scalable, observable, and secure by default. The foundation V1 stands on.",
    status: "upcoming",
    image: "/assets/infrastructure.png"
  },
  {
    id: "Phase 06",
    date: "Week 04–05",
    title: "Testing & QA",
    description: "End-to-end coverage, load testing, and hardening for production traffic.",
    status: "upcoming",
    image: "/assets/testing.png"
  },
  {
    id: "Phase 07",
    date: "Week 05–06",
    title: "Launch preparation",
    description: "Marketing, docs, onboarding, and the launch itself. Go time.",
    status: "upcoming",
    image: "/assets/launch.png"
  }
];

const perks = [
  {
    num: "01",
    title: "Sponsored Stay",
    description: "Fully covered housing in Bangalore for the entire 45 days. Private beds, cozy common rooms, zero rent."
  },
  {
    num: "02",
    title: "Chef-Prepared Meals",
    description: "Daily chef-cooked breakfast, lunch, and dinner tailored to keep your energy high and brain fueled."
  },
  {
    num: "03",
    title: "Cracked Workspace",
    description: "High-speed workspace with gigabit internet, backup power, 27-inch monitors, and hot desks."
  },
  {
    num: "04",
    title: "Founder Mentorship",
    description: "Direct whiteboard sessions, code reviews, and feedback loops with TokenSupply founders and core engineers."
  },
  {
    num: "05",
    title: "Travel Stipend",
    description: "We cover your flight or train tickets to and from Bangalore so you don't pay anything to get here."
  },
  {
    num: "06",
    title: "Seed Fund Access",
    description: "Direct pipeline and pitch preparation for active tier-1 venture funds and prominent developer angels."
  }
];

const subprocessors = [
  { name: "AWS", purpose: "Cloud infrastructure and hosting services", location: "United States", website: "https://aws.amazon.com" },
  { name: "Deepgram", purpose: "Speech-to-text and audio processing", location: "United States", website: "https://deepgram.com" },
  { name: "OpenAI", purpose: "AI language model services", location: "United States", website: "https://openai.com" },
  { name: "Grok", purpose: "AI language model services", location: "United States", website: "https://grok.x.ai" },
  { name: "Stripe", purpose: "Payment processing and billing", location: "United States", website: "https://stripe.com" },
  { name: "Intercom", purpose: "Customer support and messaging", location: "Ireland", website: "https://intercom.com" },
  { name: "Cloudflare", purpose: "CDN and security services", location: "United States", website: "https://cloudflare.com" },
  { name: "WorkOS", purpose: "Enterprise authentication and SSO", location: "United States", website: "https://workos.com" },
  { name: "Anthropic", purpose: "AI language model services", location: "United States", website: "https://anthropic.com" },
  { name: "Vercel", purpose: "Frontend hosting and deployment", location: "United States", website: "https://vercel.com" }
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
    title: "Invite only",
    description: "A vetted cohort of proven builders. No spectators — only shippers.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    step: "02",
    title: "Live & work together",
    description: "Housing, workspace, meals, and rhythm. Everything designed for flow.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    step: "03",
    title: "Engineers, designers, founders",
    description: "Multidisciplinary teams operating as one product organism.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    step: "04",
    title: "Focused execution",
    description: "No distractions. One goal, one timeline, one team. Ship or iterate.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    step: "05",
    title: "Build → collaborate → launch",
    description: "From architecture reviews to launch day. Every phase in one house.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    step: "06",
    title: "Ship Token Supply V1",
    description: "Contribute to real infrastructure powering the next commerce layer.",
    icon: (
      <svg className="w-5 h-5 text-[#e2b857]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.2.3 2.3.8 3.3L7 11c1-1 2.5-1 3.5 0l2.5 2.5c1 1 1 2.5 0 3.5l-4.3 4.2c1 .5 2.1.8 3.3.8 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    )
  }
];

const playlist = [
  {
    title: "Succession Theme",
    src: "/songs/Succession (Main Title Theme) - Nicholas Britell _ Succession (HBO Original Series Soundtrack).mp3"
  },
  {
    title: "End of Beginning",
    src: "/songs/Djo_-_End_of_Beginning_(mp3.pm).mp3"
  },
  {
    title: "In Motion",
    src: "/songs/In Motion (HD) - From the Soundtrack to The Social Network.mp3"
  }
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  // Sync playback when song source updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch((err) => console.log("Autoplay on skip failed:", err));
    }
  }, [currentSongIndex]);

  // Preloader State
  const [showPreloader, setShowPreloader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Slower increments (1% to 5%)
      const increment = Math.floor(Math.random() * 5) + 1;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setShowPreloader(false);
          }, 800);
        }, 200);
      }
    }, 70); // Ticking every 70ms

    return () => clearInterval(interval);
  }, []);

  // Team slider state and scroll control
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const isMarqueePausedRef = useRef(false);

  // Sync state to Ref to prevent stale closures in the mount-only useEffect loop
  useEffect(() => {
    isMarqueePausedRef.current = isMarqueePaused;
  }, [isMarqueePaused]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initialize position to the second set to support infinite left scrolling (runs once on mount)
    requestAnimationFrame(() => {
      const item = container.children[0] as HTMLElement;
      if (item) {
        const itemWidth = item.offsetWidth || (typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 320);
        const setWidth = (itemWidth + 24) * 4;
        container.scrollLeft = setWidth;
      }
    });

    let animId: number;
    const scrollSpeed = (typeof window !== "undefined" && window.innerWidth < 768) ? 0.8 : 1.8; // Slower on mobile

    const step = () => {
      if (container && !isManualScrollingRef.current && !isMarqueePausedRef.current) {
        container.scrollLeft += scrollSpeed;

        // Wrap around seamlessly using exact set width
        const item = container.children[0] as HTMLElement;
        if (item) {
          const itemWidth = item.offsetWidth || (typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 320);
          const setWidth = (itemWidth + 24) * 4;
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    isManualScrollingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1500); // 1.5s to let swipe momentum decelerate
  };

  const handleWheel = () => {
    isManualScrollingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  };

  const scrollNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Pause auto-scroll temporarily
    isManualScrollingRef.current = true;
    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);

    const item = container.children[0] as HTMLElement;
    if (item) {
      const itemWidth = item.offsetWidth + 24;
      const setWidth = itemWidth * 4;

      // Jump back if we get too far right
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      }
    }

    const cardWidth = window.innerWidth < 768 ? 280 + 24 : 320 + 24;
    container.scrollTo({
      left: container.scrollLeft + cardWidth,
      behavior: "smooth"
    });

    manualScrollTimeoutRef.current = setTimeout(() => {
      // Resume auto-scroll marquee
      isManualScrollingRef.current = false;
    }, 1000);
  };

  const scrollPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Pause auto-scroll temporarily
    isManualScrollingRef.current = true;
    if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);

    const item = container.children[0] as HTMLElement;
    if (item) {
      const itemWidth = item.offsetWidth + 24;
      const setWidth = itemWidth * 4;

      // Jump forward if we are too far left
      if (container.scrollLeft < setWidth) {
        container.scrollLeft += setWidth;
      }
    }

    const cardWidth = window.innerWidth < 768 ? 280 + 24 : 320 + 24;
    container.scrollTo({
      left: container.scrollLeft - cardWidth,
      behavior: "smooth"
    });

    manualScrollTimeoutRef.current = setTimeout(() => {
      // Resume auto-scroll marquee
      isManualScrollingRef.current = false;
    }, 1000);
  };

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
  });

  return (
    <main className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black relative">
      {/* Preloader Overlay */}
      {showPreloader && (
        <div className={`fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center select-none pointer-events-auto transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Logo / Heading */}
          <h1 className="text-white font-coastersans text-[8vw] sm:text-[6vw] tracking-wider mb-8 uppercase">
            Builder House
          </h1>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-zinc-950 overflow-hidden relative mb-3 rounded-full border border-zinc-900">
            <div
              className="absolute left-0 top-0 h-full bg-[#e2b857] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percent */}
          <span className="font-mono text-[10px] text-[#e2b857] tracking-widest uppercase">
            Loading... {progress.toString().padStart(2, '0')}%
          </span>
        </div>
      )}

      {/* Floating Sticky Music Player (Corner Pill) */}
      <div
        id="floating-player"
        className="fixed top-6 right-4 md:right-8 z-50 p-2 md:p-2.5 px-4 bg-[#0d0d0f] border border-zinc-800/80 rounded-full shadow-2xl text-white flex items-center gap-3 select-none transition-[transform,opacity] duration-300 opacity-0 -translate-y-4 pointer-events-none"
      >
        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 max-w-[120px] truncate">
          FM: {playlist[currentSongIndex].title}
        </span>
        {/* Animated Sound Wave bars */}
        <div className="flex items-end gap-[1.5px] h-3 w-4 pb-0.5">
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-1 h-3' : 'h-1'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-2 h-3' : 'h-2.5'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-3 h-3' : 'h-1.5'}`} />
          <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-4 h-3' : 'h-2'}`} />
        </div>

        {/* Playlist Skip & Play Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevSong}
            className="hover:text-white text-zinc-400 transition duration-200 border border-zinc-800 rounded p-1 bg-[#0a0a0c] cursor-pointer flex items-center justify-center"
            aria-label="Previous Song"
          >
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="hover:text-white transition duration-200 uppercase font-mono text-[9px] border border-zinc-850 rounded px-1.5 py-0.5 bg-[#0a0a0c] cursor-pointer min-w-[40px] text-center"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleNextSong}
            className="hover:text-white text-zinc-400 transition duration-200 border border-zinc-800 rounded p-1 bg-[#0a0a0c] cursor-pointer flex items-center justify-center"
            aria-label="Next Song"
          >
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Root audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentSongIndex].src}
        onEnded={handleNextSong}
      />

      {/* Background Pixel Grid */}
      <div className="fixed inset-0 w-full h-full -z-10 opacity-80 pointer-events-none">
        <PixelGridBackground />
      </div>

      {/* Header Container */}
      <div className="w-full pt-6 pb-2 px-4 md:px-8 max-w-[1800px] mx-auto">
        {/* BUILDER HOUSE giant heading */}
        <h1 className="w-full text-center text-[11vw] sm:text-[11.5vw] md:text-[12.7vw] font-coastersans leading-[0.8] whitespace-nowrap uppercase select-none text-white font-normal">
          BUILDER HOUSE
        </h1>

        {/* Navigation Bar */}
        <div className="flex justify-between items-start w-full mt-4 text-[13px] md:text-[15px] text-[#8e8e93] font-normal px-1">
          <div className="flex flex-col items-end ml-auto pr-2 md:pr-4">
            <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter leading-none">
              Bangalore, 16th July
            </span>
            {/* Inline lo-fi FM player */}
            <div
              id="inline-player"
              className="flex items-center gap-2.5 select-none transition-opacity duration-300 mt-6 text-[#8e8e93] opacity-100 pointer-events-auto"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 max-w-[120px] truncate">
                FM: {playlist[currentSongIndex].title}
              </span>
              {/* Animated Sound Wave bars */}
              <div className="flex items-end gap-[1.5px] h-3 w-4 pb-0.5">
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-1 h-3' : 'h-1'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-2 h-3' : 'h-2.5'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-3 h-3' : 'h-1.5'}`} />
                <span className={`w-[1.5px] bg-[#e2b857] rounded-full transition-all duration-300 ${isPlaying ? 'animate-sound-bar-4 h-3' : 'h-2'}`} />
              </div>

              {/* Playlist Skip & Play Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevSong}
                  className="hover:text-white text-zinc-400 transition duration-200 border border-zinc-800 rounded p-1 bg-[#0a0a0c] cursor-pointer flex items-center justify-center"
                  aria-label="Previous Song"
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={togglePlay}
                  className="hover:text-white transition duration-200 uppercase font-mono text-[9px] border border-zinc-850 rounded px-1.5 py-0.5 bg-[#0a0a0c] cursor-pointer min-w-[40px] text-center"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={handleNextSong}
                  className="hover:text-white text-zinc-400 transition duration-200 border border-zinc-800 rounded p-1 bg-[#0a0a0c] cursor-pointer flex items-center justify-center"
                  aria-label="Next Song"
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Centered Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 max-w-[1800px] mx-auto w-full pt-48 pb-20 md:py-36 text-center">
        {/* Badge with Overlapping Avatars and Info Pill */}
        <div className="flex items-center gap-3 mb-6 select-none">
          {/* Overlapping circular avatars - separate */}
          <div className="flex -space-x-2">
            <div className="relative w-10 h-10 rounded-full border-2 border-[#1c1d1f] bg-zinc-800 overflow-hidden">
              <Image src="/assets/pile_1.webp" alt="Team Member 1" fill className="object-cover" />
            </div>
            <div className="relative w-10 h-10 rounded-full border-2 border-[#1c1d1f] bg-zinc-800 overflow-hidden">
              <Image src="/assets/pile_4.webp" alt="Team Member 2" fill className="object-cover" />
            </div>
            <div className="relative w-10 h-10 rounded-full border-2 border-[#1c1d1f] bg-zinc-800 overflow-hidden">
              <Image src="/assets/pile_7.webp" alt="Team Member 3" fill className="object-cover" />
            </div>
          </div>

          {/* Badge text in its own white box */}
          <div className="bg-white px-4 py-1 shadow-lg border border-black">
            <span className="text-[8px] min-[375px]:text-[7.5px] sm:text-[11px] uppercase tracking-widest font-mono text-black font-semibold whitespace-nowrap">
              A Sponsored Residency for Cracked People
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-sans select-none mb-10 leading-[1.05] tracking-tight">
          <span className="text-[10.5vw] md:text-[5.5vw] lg:text-[5.8vw] font-light block text-[#ededed]">
            The <span className="font-instrument-serif italic font-normal text-[#e2b857] pr-1 md:pr-2">Builders</span> Are
          </span>
          <span className="text-[9vw] md:text-[6.5vw] lg:text-[4.5vw] font-bold block text-white tracking-tight">
            Assembling
          </span>
        </h2>

        {/* CTA Button */}
        <button className="bg-white text-black font-semibold text-[13px] md:text-[12px] px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer uppercase -mt-5">
          Apply Now
        </button>
      </div>

      {/* About Section */}
      <div className="w-full pt-36 md:pt-48 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col">
        {/* Main Grid: Left = Text, Right = Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
          {/* Left Column: Text Content */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start pl-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2 tracking-tight font-normal">
              About TokenSupply
            </h2>
            <h3 className="text-lg md:text-xl font-medium text-[#e2b857] mb-6 tracking-tight">
              Built for Digital Product Sellers
            </h3>
            <p className="text-[#ededed] text-[18px] md:text-[22px] lg:text-[25px] font-serif leading-[1.35] tracking-normal mb-6 font-normal">
              Token Supply is a unified platform that helps businesses selling <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">digital products</span> such as game keys, gift cards, and software licenses manage their <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">entire operation</span> from one dashboard. Connect multiple marketplaces, automate digital product fulfillment, track inventory and orders in real time, and eliminate manual workflows.
            </p>
            <p className="text-[#8e8e93] border-l border-zinc-800 pl-4 text-[15px] md:text-[17px] leading-[1.4] tracking-normal mb-8 font-normal">
              One platform to manage products, inventory, orders, fulfillment, and sales channels so you can focus on growing your business, not managing spreadsheets.
            </p>
            <button className="bg-white text-black font-semibold text-[13px] md:text-[12px] px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer uppercase tracking-wider">
              Learn More
            </button>
          </div>

          {/* Right Column: Image Section */}
          <div className="col-span-1 lg:col-span-6 w-full">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800/40 shadow-2xl">
              <Image
                src="/assets/tokensupply.png"
                alt="About TokenSupply Developer working"
                fill
                className="object-cover object-center pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subprocessor Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-start">
          {/* Left Column: Title */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8 pt-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#e2b857] mb-3">
              Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white tracking-tight leading-[1.1] mb-4">
              TokenSupply <span className="italic">Subprocessors</span>
            </h2>
            <p className="text-[#8e8e93] text-sm md:text-base leading-relaxed max-w-[380px]">
              We partner with world-class security and hosting infrastructure providers to ensure high availability, data security, and seamless platform performance.
            </p>
          </div>

          {/* Right Column: Subprocessors Table */}
          <div className="lg:col-span-8 w-full overflow-hidden">
            <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              <table className="w-full text-left border-collapse min-w-[600px] pl-1">
                <thead>
                  <tr className="border-b border-zinc-900">
                    <th className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase pb-4 w-[20%]">Name</th>
                    <th className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase pb-4 w-[45%]">Purpose</th>
                    <th className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase pb-4 w-[15%]">Location</th>
                    <th className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase pb-4 w-[20%]">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {subprocessors.map((sub, idx) => (
                    <tr key={idx} className="group border-b border-zinc-900/40 hover:bg-zinc-950/20 transition duration-150">
                      <td className="py-4 font-semibold text-white tracking-tight text-sm group-hover:text-[#e2b857] transition-colors duration-150">
                        {sub.name}
                      </td>
                      <td className="py-4 text-[#8e8e93] text-xs md:text-sm font-normal">
                        {sub.purpose}
                      </td>
                      <td className="py-4 text-zinc-500 text-xs md:text-sm font-normal">
                        {sub.location}
                      </td>
                      <td className="py-4">
                        <a
                          href={sub.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#e2b857]/80 hover:text-[#e2b857] hover:underline font-mono text-[11px] md:text-xs tracking-tight transition duration-150"
                        >
                          {sub.website.replace("https://", "")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* About Builder House Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col pt-24 md:pt-36">
        {/* Main Grid: Left = Image, Right = Text & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
          {/* Left Column: Image */}
          <div className="col-span-1 lg:col-span-6 w-full">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-800/40 shadow-2xl">
              <Image
                src="/assets/hero.gif"
                alt="About Builder House Building Project"
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Text & Stats */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start pl-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 tracking-tight font-normal">
              What is Builder House?
            </h2>
            <p className="text-[#ededed] text-[18px] md:text-[22px] lg:text-[25px] font-serif leading-[1.35] tracking-normal mb-10 font-normal">
              Builder House is all about developers, designers, and engineers with great past works who are absolutely <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">cracked</span> and have a crazy level of mind when it comes to <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">building cool shit</span>. In this residency, they will be collaborating with our core team to work on v1 of TokenSupply.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 w-full">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">3</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold">Cracked Minds</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">45</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Days of shipping</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white tracking-tight mb-1">v1</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Launch target</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What happens in the Builder House Grid Section */}
      <div className="w-full pb-24 flex flex-col max-w-[1400px] mx-auto px-4 md:px-8">
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

        {/* Collaborative Callout */}
        <div className="mt-12 w-full flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3.5 bg-[#0a0a0c]/40 border border-zinc-850 rounded-full max-w-[700px] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#e2b857] animate-pulse shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-400 tracking-tight text-left">
              Anyone building something can also just join us and work with other builders there to collaborate.
            </p>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col pt-12 border-t border-zinc-900/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8 pt-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#e2b857] mb-3">
              The Benefits
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white tracking-tight leading-[1.1] mb-4">
              Perks of the <span className="italic">Residency</span>
            </h2>
            <p className="text-[#8e8e93] text-sm md:text-base leading-relaxed max-w-[380px]">
              We cover all the logistical overhead so you can focus entirely on shipping high-fidelity product code and designs.
            </p>
          </div>

          {/* Right Column: Perks Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 pl-1">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex flex-col items-start group">
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="font-mono text-[9px] text-[#e2b857] uppercase tracking-wider bg-transparent px-2 py-0.5 border border-zinc-800 rounded">
                      {perk.num}
                    </span>
                    <h3 className="text-[18px] md:text-[20px] font-semibold text-white tracking-tight group-hover:text-[#e2b857] transition-colors duration-200">
                      {perk.title}
                    </h3>
                  </div>
                  <p className="text-[#8e8e93] text-xs md:text-sm leading-relaxed max-w-[340px]">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col border-t border-zinc-900/60 pt-24 md:pt-36">
        {/* Header grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-16">

          {/* Right Column: Title */}
          <div className="md:col-span-8 flex flex-col items-start pl-1">
            <div className="flex items-start gap-4 md:gap-5 w-full">
              <div className="relative w-14 h-14 md:w-18 md:h-18 rounded-xl overflow-hidden bg-transparent shrink-0 select-none mt-1">
                <Image
                  src="/assets/roadmap.png"
                  alt="Roadmap Header Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white mb-1 tracking-tight">
                  The Road to V1
                </h2>
                <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[550px]">
                  Six weeks. Seven workstreams. One shipped product.
                </p>
              </div>
            </div>
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

              {/* Status Icon Image */}
              <div className="md:col-span-2 flex md:justify-end pt-1">
                {phase.image ? (
                  <div className="relative w-17 h-17 rounded-xl overflow-hidden bg-transparent select-none shadow-md">
                    <Image
                      src={phase.image}
                      alt={phase.title}
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </div>
                ) : (
                  /* Elegant placeholder dashed box with plus icon */
                  <div className="w-16 h-16 rounded-xl border border-dashed border-zinc-800 bg-transparent flex items-center justify-center text-zinc-500 shadow-sm select-none">
                    <svg className="w-5 h-5 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full pb-20 flex flex-col pt-14 md:pt-26">
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
          <div className="md:col-span-8 flex flex-col items-start pl-1 relative w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-instrument-serif text-white mb-4 tracking-tight">
              The Minds Behind Builder House
            </h2>
            <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[550px]">
              A multidisciplinary group of developers, designers, and construction specialists building the future of residential design.
            </p>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 md:absolute md:top-2 md:right-0">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-zinc-800 bg-[#0a0a0c]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 transition duration-200 cursor-pointer shadow-md"
                aria-label="Previous Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Autoplay Play/Pause Toggle */}
              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className="w-10 h-10 rounded-full border border-zinc-800 bg-[#0a0a0c]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 transition duration-200 cursor-pointer shadow-md"
                aria-label={isMarqueePaused ? "Resume Autoplay" : "Pause Autoplay"}
              >
                {isMarqueePaused ? (
                  <svg className="w-4 h-4 fill-zinc-400" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-zinc-400" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>

              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-zinc-800 bg-[#0a0a0c]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-95 transition duration-200 cursor-pointer shadow-md"
                aria-label="Next Slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider Area */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="w-full overflow-x-auto scrollbar-none flex flex-row gap-6 py-4 px-4 md:px-8 marquee-mask"
        >
          {/* Duplicated sets for infinite-like wrapping */}
          {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => (
            <div
              key={idx}
              className="w-[280px] md:w-[320px] flex-shrink-0 bg-[#111]/30 border border-zinc-900/60 rounded-3xl p-5 flex flex-col group"
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
                  {member.socials.website && (
                    <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="transition">
                      <svg className="w-4 h-4 text-zinc-500 hover:text-white transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[850px] mx-auto flex flex-col border-t border-zinc-900/60 pt-24 md:pt-36">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-10 select-none">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-instrument-serif text-white tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
              <Image
                src="/assets/pin.png"
                alt="FAQ Pin Badge Icon"
                fill
                className="object-contain pointer-events-none"
              />
            </div>
          </div>

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
                    <span className={`text-xl font-light text-[#8e8e93] transition-transform duration-300 transform select-none ${isOpen ? "rotate-45 text-white" : ""
                      }`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] border-t border-zinc-900/40" : "max-h-0"
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

      {/* CTA Section */}
      <div className="w-full px-4 md:px-8 max-w-[1400px] mx-auto mb-24 mt-12">
        <div className="relative w-full rounded-3xl overflow-hidden bg-transparent border border-white px-8 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-2xl">
          {/* Grid lines background overlay */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Left Column: Animated CTA Graphic */}
          <div className="relative w-40 h-40 md:w-64 md:h-64 shrink-0 z-10 select-none rounded-2xl overflow-hidden border border-zinc-800/40">
            <Image
              src="/assets/cta.gif"
              alt="CTA loop animation"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          {/* Right Column: Text & Buttons */}
          <div className="flex-1 flex flex-col md:flex-row items-center md:justify-between gap-6 w-full z-10">
            {/* Text details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white mb-2 tracking-tight select-none">
                Ready to ship?
              </h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-[450px] font-normal">
                Let's build the incredible together, with TokenSupply
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-row gap-3.5 shrink-0">
              <button className="bg-white text-black font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer shadow-md">
                Apply Now
              </button>
              <a
                href="mailto:hi@realanshuman.com"
                className="bg-transparent text-white border border-white/60 font-medium text-[14px] px-5 py-2.5 rounded-lg hover:bg-white/5 active:scale-95 transition duration-200 cursor-pointer flex items-center gap-1"
              >
                Contact us
                <svg className="w-3.5 h-3.5 text-zinc-300 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
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
            <a href="mailto:admint@tokensupply.io" className="hover:text-white transition duration-200">
              admin@tokensupply.io
            </a>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center">
            <a href="https://www.instagram.com/tokensupplyhq" className="hover:text-white transition duration-200">Instagram</a>
            <a href="#" className="hover:text-white transition duration-200">X (Twitter)</a>
            <a href="#" className="hover:text-white transition duration-200">Youtube</a>
          </div>
        </div>

        {/* Footer BUILDER HOUSE Giant Stamp */}
        <h1 className="w-full text-center text-[11.9vw] font-coastersans leading-[0.8] whitespace-nowrap uppercase select-none text-white font-normal pb-6 pr-4 md:pr-6">
          BUILDER HOUSE
        </h1>
      </footer>
    </main>
  );
}

