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
    image: "/assets/frontend.png"
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

const subprocessorLogos = [
  { name: "Dodo Payments", path: "/assets/logos/dodopayments-com-logo.png" },
  { name: "Mintlify", path: "/assets/logos/mintlify-com-logo.png" },
  { name: "Sentry", path: "/assets/logos/sentry.png" },
  { name: "Supabase", path: "/assets/logos/supabase.png" },
  { name: "Resend", path: "/assets/logos/resend-com-logo.png" },
  { name: "Cloudflare", path: "/assets/logos/cloudflare.png" },
  { name: "Better Auth", path: "/assets/logos/betterauth.png" },
  { name: "Stripe", path: "/assets/logos/stripe-com-logo.png" },
  { name: "PostHog", path: "/assets/logos/posthog-com-eight-vercel-app-logo.png" },
  { name: "Redis", path: "/assets/logos/redis-io-logo.png" },
  { name: "DigitalOcean", path: "/assets/logos/digitalocean-com-logo.png" },
  { name: "Better Stack", path: "/assets/logos/betterstack.png" },
  { name: "BullMQ", path: "/assets/logos/bullmq-logo.png" },
  { name: "GitHub", path: "/assets/logos/github-blog-logo.png" }
];

const faqItems = [
  {
    question: "What is the duration of the residency?",
    answer: "The residency is a 45-day intensive program, running from July 16th to late August. Selected builders live and work together in Bangalore to co-build and launch V1 of TokenSupply."
  },
  {
    question: "What does the sponsored stay cover?",
    answer: "It covers 100% of your logistical costs. This includes premium accommodation in Bangalore, daily chef-prepared meals (breakfast, lunch, and dinner), a dedicated high-speed workstation setup, and your round-trip travel tickets to Bangalore."
  },
  {
    question: "Who is this residency for?",
    answer: "It is for cracked developers, designers, and system engineers who have shipped impressive side projects or worked on high-growth products, and want to build real infrastructure in a high-density talent environment."
  },
  {
    question: "Can I work on my own projects during the residency?",
    answer: "The primary focus of this residency is collaborating together to ship V1 of TokenSupply. However, you will have plenty of opportunities to network, bounce ideas, and jam on side projects with other builders in the house."
  },
  {
    question: "Is there a selection process?",
    answer: "Yes. Since seats are highly limited (only 3 cracked builders), we run an interview and review process to select builders based on their technical skills, proof of work, and ability to ship rapidly."
  }
];

const programDetails = [
  {
    step: "01",
    title: "Invite only",
    description: "A vetted cohort of proven builders. No spectators — only shippers.",
    icon: (
      <div className="relative w-10 h-10 select-none">
        <Image
          src="/assets/location.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    )
  },
  {
    step: "02",
    title: "Live & work together",
    description: "Housing, workspace, meals, and rhythm. Everything designed for flow.",
    icon: (
      <div className="relative w-12 h-12 select-none">
        <Image
          src="/assets/coke.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    )
  },
  {
    step: "03",
    title: "Engineers, designers, founders",
    description: "Multidisciplinary teams operating as one product organism.",
    icon: (
      <div className="relative w-10 h-10 select-none">
        <Image
          src="/assets/infrastructure.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    )
  },
  {
    step: "04",
    title: "Focused execution",
    description: "No distractions. One goal, one timeline, one team. Ship or iterate.",
    icon: (
      <div className="relative w-10 h-10 select-none">
        <Image
          src="/assets/focus.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    )
  },
  {
    step: "05",
    title: "Build → collaborate → launch",
    description: "From architecture reviews to launch day. Every phase in one house.",
    icon: (
      <div className="relative w-10 h-10 select-none">
        <Image
          src="/assets/collab.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
    )
  },
  {
    step: "06",
    title: "Ship Token Supply V1",
    description: "Contribute to real infrastructure powering the next commerce layer.",
    icon: (
      <div className="relative w-10 h-10 select-none">
        <Image
          src="/assets/win.png"
          alt="Pin Badge Icon"
          fill
          className="object-contain pointer-events-none"
        />
      </div>
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
    <main className="min-h-screen text-white flex flex-col font-sans selection:bg-white selection:text-black relative">
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
          <span className="font-geist-pixel-circle text-[10px] text-[#e2b857] font-bold uppercase">
            Loading... {progress.toString().padStart(2, '0')}%
          </span>
        </div>
      )}

      {/* Floating Sticky Music Player (Corner Pill) */}
      <div
        id="floating-player"
        className="fixed bottom-6 sm:bottom-auto sm:top-12 right-4 md:right-8 z-50 p-2 md:p-2.5 px-4 bg-[#0d0d0f] border border-zinc-800/80 rounded-full shadow-2xl text-white flex items-center gap-3 select-none transition-[transform,opacity] duration-300 opacity-0 translate-y-4 sm:-translate-y-4 pointer-events-none"
      >
        <span className="font-geist-pixel-circle font-bold text-[9px] text-[#e2b857] tracking-wider text-zinc-400 max-w-[120px] truncate">
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

      {/* Sticky BUILDER HOUSE logo in top-left */}
      <div className="fixed top-8 left-4 md:left-8 z-40 pointer-events-none select-none">
        <h1 className="text-left text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-coastersans leading-none uppercase text-white font-normal pt-1">
          BUILDER HOUSE
        </h1>
      </div>

      {/* Header Container */}
      <div className="relative w-full pt-8 pb-4 px-4 md:px-8 max-w-[1800px] mx-auto flex flex-row justify-between items-start">
        {/* Invisible Spacer logo to keep layout spacing balanced */}
        <div className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-coastersans leading-none uppercase opacity-0 pointer-events-none select-none pt-1">
          BUILDER HOUSE
        </div>

        {/* Right Side: Bangalore & FM Player */}
        <div className="flex flex-col items-end pr-2 md:pr-4">
          <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter leading-none mb-3">
            Bangalore, 16th July
          </span>
          {/* Inline lo-fi FM player */}
          <div
            id="inline-player"
            className="flex items-center gap-2.5 select-none transition-opacity duration-300 text-[#8e8e93] opacity-100 pointer-events-auto"
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
            <span className="text-[8px] min-[375px]:text-[7.5px] sm:text-[11px] uppercase tracking-widest font-instrument-sans text-black whitespace-nowrap">
              A Sponsored Residency for Cracked People
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-geist-pixel-circle select-none mb-10 leading-[1.05] tracking-tight">
          <span className="text-[10.5vw] md:text-[5.5vw] lg:text-[5.8vw] font-light block text-[#ededed]">
            The <span className="font-instrument-serif italic  text-[#e2b857] pr-1 md:pr-2">Builders</span> Are
          </span>
          <span className="text-[9vw] md:text-[6.5vw] lg:text-[5.5vw] font-geist-pixel-circle block text-white tracking-tight">
            Assembling
          </span>
        </h2>

        {/* CTA Button */}
        <a
          href="https://luma.com/zc8zrg9g"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black font-geist-pixel-circle font-bold text-[13px] md:text-[12px] px-6 py-3.5 rounded-full hover:bg-zinc-200 active:scale-105 transition duration-200 cursor-pointer uppercase -mt-6 block text-center"
        >
          Apply Now
        </a>
      </div>

      {/* About Section */}
      <div className="w-full pt-36 md:pt-48 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col">
        {/* Main Grid: Left = Text, Right = Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
          {/* Left Column: Text Content */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start pl-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist-pixel-circle text-white mb-2 tracking-tight font-normal">
              About TokenSupply
            </h2>
            <h3 className="text-lg md:text-xl font-semibold font-instrument-sans text-[#e2b857] mb-6 tracking-tight">
              Built for Digital Product Sellers
            </h3>
            <p className="text-[#ededed] text-[18px] md:text-[22px] lg:text-[25px] font-instrument-sans leading-[1.35] tracking-normal mb-6 font-normal">
              Token Supply is a unified platform that helps businesses selling <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">digital products</span> such as game keys, gift cards, and software licenses manage their <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">entire operation</span> from one dashboard. Connect multiple marketplaces, automate digital product fulfillment, track inventory and orders in real time, and eliminate manual workflows.
            </p>
            <p className="text-[#8e8e93] border-l border-zinc-400 pl-4 text-[15px] md:text-[17px] leading-[1.4] tracking-normal mb-8 font-bold font-geist-pixel-circle">
              One platform to manage products, inventory, orders, fulfillment, and sales channels so you can focus on growing your business, not managing spreadsheets.
            </p>
            <button className="bg-white text-black font-geist-pixel-circle font-semibold text-[13px] md:text-[12px] px-6 py-2.5 rounded-full hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer">
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
            <span className="text-[10px] uppercase font-semibold font-geist-pixel-circle tracking-widest text-[#e2b857] mb-3">
              Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist-pixel-circle text-white tracking-tight leading-[1.1] mb-4">
              TokenSupply <span className="italic">Subprocessors</span>
            </h2>
            <p className="text-[#8e8e93] text-sm md:text-base leading-relaxed max-w-[380px]">
              We partner with world-class security and hosting infrastructure providers to ensure high availability, data security, and seamless platform performance.
            </p>
          </div>

          {/* Right Column: Subprocessors Logos Grid */}
          <div className="lg:col-span-8 w-full pl-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {subprocessorLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center p-5 bg-[#0d0d0f]/60 border border-zinc-850 hover:border-zinc-700/80 rounded-2xl h-24 transition-all duration-300 shadow-md group relative overflow-hidden"
                >
                  {/* Grid overlay for texture */}
                  <div
                    className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-300"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                      backgroundSize: '15px 15px'
                    }}
                  />
                  <div className="relative w-full h-full max-w-[85%] max-h-[75%] select-none pointer-events-none transition duration-300 transform group-hover:scale-105 flex items-center justify-center">
                    <img
                      src={logo.path}
                      alt={`${logo.name} Logo`}
                      className="max-w-full max-h-full object-contain filter brightness-95 opacity-80 group-hover:opacity-100 group-hover:brightness-100 transition duration-300 pointer-events-none select-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Builder House Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col pt-24 md:pt-26">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist-pixel-circle text-white mb-6 tracking-tight font-normal">
              What is Builder House?
            </h2>
            <p className="text-[#ededed] text-[18px] md:text-[22px] lg:text-[25px] font-instrument-sans leading-[1.35] tracking-normal mb-10 font-normal">
              Builder House is all about developers, designers, and engineers with great past works who are absolutely <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">cracked</span> and have a crazy level of mind when it comes to <span className="text-[#8e8e93] border-b border-zinc-700/80 pb-[1px]">building cool shit</span>. In this residency, they will be collaborating with our core team to work on v1 of TokenSupply.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 w-full">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-geist-pixel-circle text-white tracking-tight mb-1">3</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold">Cracked Minds</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-geist-pixel-circle text-white tracking-tight mb-1">45</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Days of shipping</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-geist-pixel-circle text-white tracking-tight mb-1">v1</div>
                <div className="text-[#8e8e93] text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Launch target</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What happens in the Builder House Grid Section */}
      <div className="w-full pb-24 flex flex-col max-w-[1400px] mx-auto px-4 md:px-8">
        {/* 6-Box Grid Layout: 3 boxes in one line, 3 in the next line, sticking to each other */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
          {programDetails.map((activity, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden bg-[#0d0d0f]/60 border border-zinc-850  rounded-2xl p-6 flex flex-col items-start justify-between min-h-[230px] transition-all duration-300 group"
            >
              {idx === 0 && (
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-1.jpeg"
                    alt="Invite Only Background"
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              )}
              {idx === 1 && (
                <div className="absolute inset-0 -z-10 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-2.jpeg"
                    alt="Live & Work Together Background"
                    fill
                    className="object-cover opacity-180 pointer-events-none"
                  />
                </div>
              )}
              {idx === 2 && (
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-3.jpeg"
                    alt="Engineers, designers, founders Background"
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              )}
              {idx === 3 && (
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-4.jpeg"
                    alt="Focused execution Background"
                    fill
                    className="object-cover opacity-60 pointer-events-none"
                  />
                </div>
              )}
              {idx === 4 && (
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-5.jpeg"
                    alt="Build collaborate launch Background"
                    fill
                    className="object-cover opacity-60 pointer-events-none"
                  />
                </div>
              )}
              {idx === 5 && (
                <div className="absolute inset-0 select-none pointer-events-none">
                  <Image
                    src="/assets/bg-6.gif"
                    alt="Ship Token Supply V1 Background"
                    fill
                    unoptimized
                    className="object-cover opacity-60 pointer-events-none"
                  />
                </div>
              )}
              <div className="flex justify-between items-start w-full mb-6 z-10">
                <span className="text-xs font-mono text-white uppercase tracking-widest">{activity.step}</span>
                <div className="p-2 bg-transparent">
                  {activity.icon}
                </div>
              </div>
              <div className="z-10">
                <h3 className="text-[19px] md:text-[22px] font-geist-pixel-circle text-white tracking-tight mb-1.5">
                  {activity.title}
                </h3>
                <p className="text-xs md:text-sm text-white leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Collaborative Callout */}
        <div className="mt-12 w-full flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3.5 bg-[#0a0a0c]/40 border border-zinc-850 rounded-full max-w-[800px] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#e2b857] shrink-0" />
            <p className="text-xs sm:text-sm text-zinc-400 tracking-tight font-instrument-sans font-semibold text-left">
              Anyone building something can also just join us and work with other builders there to collaborate.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="w-full pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col border-t border-zinc-900/60 pt-24 md:pt-26">
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-geist-pixel-circle text-white mb-1 tracking-tight">
                  The Road to V1
                </h2>
                <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] font-semibold font-geist-pixel-circle max-w-[550px]">
                  Six weeks. Seven workstreams. One shipped product.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="flex flex-col gap-4 w-full">
          {roadmapPhases.map((phase, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-[#0d0d0f]/60 border border-zinc-850 hover:border-zinc-700/80 rounded-2xl items-center transition-all duration-300 group"
            >
              {/* Phase & Date */}
              <div className="md:col-span-4 flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#e2b857]">{phase.id}</span>
                <span className="text-white text-lg font-geist-pixel-circle">{phase.date}</span>
              </div>

              {/* Title & Body */}
              <div className="md:col-span-6 flex flex-col gap-2">
                <h3 className="text-[18px] md:text-[20px] font-semibold font-geist-pixel-circle text-white tracking-tight">
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
        {/* Centered Header Block */}
        <div className="w-full mb-16 max-w-[850px] mx-auto flex flex-col items-center text-center px-4 relative">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-geist-pixel-circle text-white mb-4 tracking-tight">
            The Minds Behind Builder House
          </h2>
          <p className="text-[#8e8e93] text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[600px] mb-6">
            A multidisciplinary group of developers, designers, and construction specialists building the future of residential design.
          </p>

          {/* Slider Navigation Controls */}
          <div className="flex items-center gap-2">
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
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-geist-pixel-circle text-white tracking-tight text-center">
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
                    <span className="text-sm md:text-base font-semibold font-geist-pixel-circle pr-4">
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
            <span className="font-geist-pixel-circle italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Live
            </span>
          </div>

          {/* Build Box */}
          <div className="aspect-square flex items-center justify-center border border-white rounded-sm group cursor-pointer transition duration-300">
            <span className="font-geist-pixel-circle italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Build
            </span>
          </div>

          {/* Network Box */}
          <div className="aspect-square flex items-center justify-center border border-white rounded-sm group cursor-pointer transition duration-300">
            <span className="font-geist-pixel-circle italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
              Network
            </span>
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="text-center mt-12 text-[14px] md:text-[16px] text-zinc-500">
          Pick a pillar. <span className="font-geist-pixel-circle text-white ml-0.5 text-lg">Step inside.</span>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 md:px-8 max-w-[1400px] mx-auto mb-24 mt-12">
        <div className="relative w-full rounded-3xl overflow-hidden bg-transparent border border-white px-8 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-2xl">
          {/* Background Image overlay */}
          <div className="absolute inset-0 select-none pointer-events-none">
            <Image
              src="/assets/footer-bg.jpeg"
              alt="CTA Background"
              fill
              className="object-cover"
            />
          </div>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist-pixel-circle text-white mb-2 tracking-tight select-none">
                Ready to ship?
              </h2>
              <p className="text-zinc-400 text-sm md:text-base max-w-[450px] font-normal">
                Let's build the incredible together, with TokenSupply
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-row gap-3.5 shrink-0">
              <a
                href="https://luma.com/zc8zrg9g"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-semibold font-geist-pixel-circle text-[14px] px-5 py-2.5 rounded-lg hover:bg-zinc-200 active:scale-95 transition duration-200 cursor-pointer shadow-md flex items-center justify-center"
              >
                Apply Now
              </a>
              <a
                href="mailto:hi@realanshuman.com"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold font-geist-pixel-circle text-[14px] px-5 py-2.5 rounded-lg active:scale-95 transition duration-200 cursor-pointer flex items-center gap-1.5 shadow-lg"
              >
                Contact us
                <svg className="w-3.5 h-3.5 text-white mt-[0.5px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full pt-16 pb-6 px-4 md:px-8 max-w-[1800px] mx-auto flex flex-col">
        {/* Footer Top Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-[700px] mx-auto text-center text-[13px] md:text-[15px] text-[#8e8e93] mb-20">
          <div className="flex flex-col items-center justify-center font-geist-pixel-circle font-semibold">
            <span>©2026 TokenSupply</span>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center font-geist-pixel-circle font-semibold">
            <span>Have more queries?</span>
            <a href="mailto:admint@tokensupply.io" className="hover:text-white transition duration-200 font-geist-pixel-circle font-semibold">
              admin@tokensupply.io
            </a>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center font-geist-pixel-circle font-semibold">
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

