"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import CurvedLoop from "@/components/CurvedLoop";

const playlist = [
  {
    title: "In Motion",
    src: "/songs/In Motion (HD) - From the Soundtrack to The Social Network.mp3"
  },
  {
    title: "End of Beginning",
    src: "/songs/Djo_-_End_of_Beginning_(mp3.pm).mp3"
  },
  {
    title: "Succession Theme",
    src: "/songs/Succession (Main Title Theme) - Nicholas Britell _ Succession (HBO Original Series Soundtrack).mp3"
  }
];

const subprocessorLogos = [
  { name: "Dodo Payments", path: "/assets/logos/dodopayments-com-logo.png" },
  { name: "Mintlify", path: "/assets/logos/mintlify-com-logo.png" },
  { name: "Sentry", path: "/assets/logos/sentry-io-logo.png" },
  { name: "Supabase", path: "/assets/logos/supabase.png" },
  { name: "Resend", path: "/assets/logos/resend-com-logo.png" },
  { name: "Cloudflare", path: "/assets/logos/cloudflare.png" },
  { name: "Better Auth", path: "/assets/logos/betterauth-logo.png" },
  { name: "Stripe", path: "/assets/logos/stripe-com-logo.png" },
  { name: "PostHog", path: "/assets/logos/posthog-com-eight-vercel-app-logo.png" },
  { name: "Redis", path: "/assets/logos/redis-io-logo.png" },
  { name: "DigitalOcean", path: "/assets/logos/digitalocean-com-logo.png" },
  { name: "BetterStack", path: "/assets/logos/bullmq-logo-1.webp" },
  { name: "GitHub", path: "/assets/logos/github-blog-logo.png" }
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: {
    x?: string;
    github?: string;
    website?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Karthik Shanbhag",
    role: "Backend Developer",
    image: "/team/Kartik.jpeg",
    socials: {
      github: "http://github.com/karthikshanbhag/",
      linkedin: "https://www.linkedin.com/in/karthik-shanbhag-9339631bb"
    }
  },
  {
    name: "Aman Maddeshiya",
    role: "Full stack Developer",
    image: "/team/Aman.jpeg",
    socials: {
      x: "https://x.com/aman_aura",
      linkedin: "https://www.linkedin.com/in/aman-maddeshiya-b437581b1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      website: "https://aman-dev.is-a.dev/"
    }
  },
  {
    name: "Soubhagya Chouhan",
    role: "Testing Engineer",
    image: "/team/soubhagya.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/soubhagya-chouhan-744368128"
    }
  },
  {
    name: "Devang Saklani",
    role: "Software Engineer",
    image: "/team/devang.jpeg",
    socials: {
      website: "https://saklani.dev"
    }
  },
  {
    name: "Ammogh Vedamurthy",
    role: "Sr. Product Designer",
    image: "/team/ammogh_portrait_1.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/ammogh/"
    }
  },
  {
    name: "Ashish Ranjan Das",
    role: "DevRel Engineer",
    image: "/team/Ashish.jpeg",
    socials: {
      website: "https://arddev.in",
      instagram: "https://instagram.com/ashishhikr",
      linkedin: "https://www.linkedin.com/in/arddev/"
    }
  },
  {
    name: "Vansh Goyal",
    role: "AI and Backend Engineer",
    image: "/team/vansh.jpeg",
    socials: {
      github: "https://github.com/vanshcodeworks",
      website: "https://vanshcodeworks.com"
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

const faqItems = [
  {
    question: "Who is Builder House for?",
    answer: "Builder House is for developers, designers, and engineers with exceptional past work who genuinely enjoy building products. We’re looking for people who ship, not just talk about shipping."
  },
  {
    question: "Is this a paid residency?",
    answer: "Yes. Selected builders receive accommodation, meals, a workspace, and a stipend for the duration of the residency."
  },
  {
    question: "What will I be working on?",
    answer: "You’ll work alongside the TokenSupply team, helping build real features, improve the product architecture, and ship the first versions of the platform."
  },
  {
    question: "How long is the residency?",
    answer: "The duration depends on the current batch and product roadmap. Most residencies run for a few weeks, with builders working full-time alongside the core team."
  },
  {
    question: "How do I apply?",
    answer: "Applications open periodically. Share your past work, GitHub, portfolio, or anything you’ve built. We care much more about what you’ve shipped than where you’ve worked or studied."
  }
];

const programDetails = [
  {
    step: "01",
    title: "Invite only",
    description: "Past work matters more than resumes or a linkedin profile.",
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
    title: "One team, one product",
    description: "Everyone works alongside the TokenSupply team. No departments, just builders.",
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
    title: "Build from day one",
    description: "Solve real problems, and contribute to a product used by real customers.",
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
    title: "Learn together",
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

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [isHeaderDark, setIsHeaderDark] = useState(false);

  const [logoText, setLogoText] = useState("BUILDER HOUSE");

  useEffect(() => {
    const target = "BUILDER HOUSE";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    let iterations = 0;
    
    const interval = setInterval(() => {
      setLogoText((prev) => {
        return target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });
      
      if (iterations >= target.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  const [footerText, setFooterText] = useState("BUILDER HOUSE");
  const footerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerFooterScramble = useCallback(() => {
    if (footerIntervalRef.current) clearInterval(footerIntervalRef.current);
    
    const target = "BUILDER HOUSE";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    let iterations = 0;
    
    footerIntervalRef.current = setInterval(() => {
      setFooterText((prev) => {
        return target
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });
      
      if (iterations >= target.length) {
        if (footerIntervalRef.current) clearInterval(footerIntervalRef.current);
      }
      iterations += 1 / 3;
    }, 30);
  }, []);

  useEffect(() => {
    return () => {
      if (footerIntervalRef.current) clearInterval(footerIntervalRef.current);
    };
  }, []);

  // Team slider state and scroll control
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMarqueePausedRef = useRef(false);

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

  // Sticky scroll player transition
  useLenis((lenis) => {
    const scroll = lenis.scroll;
    const sticky = scroll > 120;

    // Transition header logo color
    const heroHeight = typeof window !== "undefined" ? (window.innerWidth < 640 ? 750 : window.innerHeight) : 800;
    const isPastHero = scroll > (heroHeight - 64);
    setIsHeaderDark((prev) => (prev !== isPastHero ? isPastHero : prev));

    const inlinePlayer = document.getElementById("inline-player");
    const floatingPlayer = document.getElementById("floating-player");

    if (inlinePlayer && floatingPlayer) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
      const maxScroll = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 0;
      // Hide player when entering the footer reveal section on mobile (within 420px of bottom to account for bounce/overscroll)
      const isNearBottom = isMobile && maxScroll > 0 && (maxScroll - scroll) < 420;

      if (sticky && !isNearBottom) {
        inlinePlayer.style.opacity = "0";
        inlinePlayer.style.pointerEvents = "none";

        floatingPlayer.style.opacity = "1";
        floatingPlayer.style.transform = "translateY(0)";
        floatingPlayer.style.pointerEvents = "auto";
      } else {
        inlinePlayer.style.opacity = sticky ? "0" : "1";
        inlinePlayer.style.pointerEvents = sticky ? "none" : "auto";

        floatingPlayer.style.opacity = "0";
        floatingPlayer.style.transform = isMobile ? "translateY(16px)" : "translateY(-16px)";
        floatingPlayer.style.pointerEvents = "none";
      }
    }
  });

  // Autoplay music when user lands on page
  useEffect(() => {
    let cleanupListeners: (() => void) | null = null;

    const playAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked, waiting for user interaction:", err);

          const startPlayOnInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  if (cleanupListeners) cleanupListeners();
                })
                .catch((e) => console.log("Play on interaction failed:", e));
            }
          };

          const cleanup = () => {
            window.removeEventListener("click", startPlayOnInteraction);
            window.removeEventListener("touchstart", startPlayOnInteraction);
            window.removeEventListener("keydown", startPlayOnInteraction);
          };

          cleanupListeners = cleanup;

          window.addEventListener("click", startPlayOnInteraction);
          window.addEventListener("touchstart", startPlayOnInteraction);
          window.addEventListener("keydown", startPlayOnInteraction);
        });
    };

    playAudio();

    return () => {
      if (cleanupListeners) cleanupListeners();
    };
  }, []);

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

  // Scroll Blur Reveal Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Reveal once for smooth scroll-by
        }
      });
    }, observerOptions);

    // Observe all scroll reveal elements EXCEPT the footer (which is handled by a sentinel)
    const elements = document.querySelectorAll(".reveal-on-scroll:not(footer)");
    elements.forEach((el) => observer.observe(el));

    // Footer Specific Sentinel Observer for bottom reveal transition
    const footerSentinel = document.getElementById("footer-sentinel");
    const footerElement = document.querySelector("footer");
    let footerObserver: IntersectionObserver | null = null;

    if (footerSentinel && footerElement) {
      footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footerElement.classList.add("revealed");
            triggerFooterScramble();
          } else {
            footerElement.classList.remove("revealed");
          }
        });
      }, {
        threshold: 0.01,
        rootMargin: "0px 0px 50px 0px" // Trigger slightly early as sentinel approaches viewport bottom
      });
      footerObserver.observe(footerSentinel);
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      if (footerObserver && footerSentinel) {
        footerObserver.unobserve(footerSentinel);
      }
    };
  }, [triggerFooterScramble]);

  // Marquee scroll loop
  useEffect(() => {
    isMarqueePausedRef.current = false;
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const item = container.children[0] as HTMLElement;
      if (item) {
        const itemWidth = item.offsetWidth || (typeof window !== "undefined" && window.innerWidth < 768 ? 280 : 320);
        const setWidth = (itemWidth + 24) * 4;
        container.scrollLeft = setWidth;
      }
    });

    let animId: number;
    const scrollSpeed = (typeof window !== "undefined" && window.innerWidth < 768) ? 0.8 : 1.8;

    const step = () => {
      if (container && !isManualScrollingRef.current && !isMarqueePausedRef.current) {
        container.scrollLeft += scrollSpeed;

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
    }, 1500);
  };

  const handleWheel = () => {
    isManualScrollingRef.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 1000);
  };

  return (
    <main className="relative text-[#1c1d1f] font-sans selection:bg-black selection:text-white bg-zinc-900">
      {/* Sticky BUILDER HOUSE logo in top-left */}
      <div className={`fixed top-8 left-4 md:left-8 z-40 pointer-events-none select-none transition-colors duration-300 ${isHeaderDark ? 'text-black' : 'text-white'}`}>
        <h1
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-coastersans leading-none uppercase font-normal pt-1 pointer-events-auto cursor-pointer animate-logo-reveal transition-all duration-500 ease-out hover:tracking-[0.1em] hover:text-[#e2b857] active:scale-95"
        >
          {logoText}
        </h1>
      </div>

      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] mb-[380px] md:mb-[400px]">
        {/* Hero Section Container (Full Viewport Screen, retains its dark styling wrapper) */}
        <div className="relative w-full aspect-[1536/900] min-h-[750px] md:min-h-[924px] flex flex-col justify-between overflow-hidden text-white bg-zinc-950">
          {/* Background Image */}
          <div className="absolute inset-0 select-none pointer-events-none z-0">
            <Image
              src="/assets/background-image-1.png"
              alt="Hero Background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Header Container */}
          <div className="relative w-full pt-8 pb-4 px-4 md:px-8 max-w-[1800px] mx-auto flex flex-row justify-between items-start z-10">
            {/* Invisible Spacer logo to keep layout spacing balanced */}
            <div className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-coastersans leading-none uppercase opacity-0 pointer-events-none select-none pt-1">
              BUILDER HOUSE
            </div>

            {/* Right Side: Bangalore & FM Player */}
            <div className="flex flex-col items-end pr-2 md:pr-4">
              <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter leading-none mb-3 pt-2">
                Bangalore, 16th July
              </span>
              {/* Inline lo-fi FM player */}
              <div
                id="inline-player"
                className="flex items-center gap-2.5 select-none transition-opacity duration-300 text-zinc-400 opacity-100 pointer-events-auto pt-5"
              >
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

          {/* Centered Hero Section */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 max-w-[1800px] mx-auto w-full pb-20 md:pb-80 text-center z-10">
            {/* Glass Card Box */}
            <div className=" px-6 py-6 md:px-10 md:py-8 lg:px-12 lg:py-9 max-w-[640px] w-full flex flex-col items-center">
              {/* Badge with Overlapping Avatars and Info Pill */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3 mb-5 select-none">
                {/* Overlapping circular avatars */}
                <div className="flex -space-x-2">
                  <div className="relative w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1.5 hover:z-10 hover:shadow-lg cursor-pointer">
                    <Image src="/assets/pile_1.webp" alt="Team Member 1" fill className="object-cover" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1.5 hover:z-10 hover:shadow-lg cursor-pointer">
                    <Image src="/assets/pile_4.webp" alt="Team Member 2" fill className="object-cover" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1.5 hover:z-10 hover:shadow-lg cursor-pointer">
                    <Image src="/assets/pile_7.webp" alt="Team Member 3" fill className="object-cover" />
                  </div>
                </div>

                {/* Badge text in its own white box */}
                <div className="bg-white px-3 py-1.5 sm:px-4 shadow-lg border border-black flex items-center justify-center max-w-full">
                  <span className="text-[8px] min-[320px]:text-[9px] sm:text-[11px] uppercase tracking-widest font-instrument-sans font-semibold text-black whitespace-nowrap leading-none pt-[1px]">
                    A Sponsored Residency for Cracked People
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="font-instrument-serif select-none mb-6 leading-[1.05] tracking-tight">
                <span className="text-5xl sm:text-5xl md:text-[75px] font-light block text-[#ededed]">
                  The <span className="font-instrument-serif italic text-[#ffc83b] pr-1 md:pr-2">Builders</span> Are
                </span>
                <span className="text-5xl sm:text-6xl md:text-[75px] font-instrument-serif block text-white tracking-tight">
                  Assembling
                </span>
              </h2>

              {/* CTA Button */}
              <a
                href="https://luma.com/zc8zrg9g"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-instrument-sans font-bold text-[13px] md:text-[12px] px-8 py-3.5 rounded-full active:scale-105 transition duration-200 cursor-pointer uppercase flex items-center justify-center whitespace-nowrap"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* About TokenSupply Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 py-24 md:py-32 px-4 md:px-8 max-w-[1400px] mx-auto z-10 relative reveal-on-scroll">
          <div className="flex flex-col">
            {/* Main Grid: Left = Text, Right = Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
              {/* Left Column: Text Content */}
              <div className="col-span-1 lg:col-span-6 flex flex-col items-start pl-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-black mb-4 tracking-tight font-semibold">
                  About <span className="font-instrument-serif italic">TokenSupply</span>
                </h2>
                <p className="text-zinc-800 text-[18px] md:text-[22px] lg:text-[25px] font-instrument-sans leading-[1.25] tracking-normal mb-6 font-normal">
                 Token Supply is a unified platform that helps businesses selling digital products such as game keys, gift cards, and software licenses manage their entire operation from one dashboard. Connect multiple marketplaces, automate digital product fulfillment, track inventory and orders in real time, and eliminate manual workflows.
                </p>
                <button className="bg-black text-white font-instrument-sans font-bold text-[13px] md:text-[12px] px-8 py-3.5 rounded-full active:scale-105 transition duration-200 cursor-pointer uppercase flex items-center justify-center">
                  Learn More
                </button>
              </div>

              {/* Right Column: Image Section */}
              <div className="col-span-1 lg:col-span-6 w-full">
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 shadow-2xl">
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
        </section>

        {/* Subprocessor Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-36 px-4 md:px-8 max-w-[1400px] mx-auto z-10 relative reveal-on-scroll">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-start">
              {/* Left Column: Subprocessors Logos Grid */}
              <div className="lg:col-span-8 w-full pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                  {subprocessorLogos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center p-5 bg-zinc-50 border border-zinc-200 backdrop-blur-md rounded-2xl h-24 shadow-sm relative overflow-hidden group cursor-pointer"
                    >
                      {/* Grid overlay for texture */}
                      <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                          backgroundSize: '15px 15px'
                        }}
                      />
                      <div className={`relative select-none pointer-events-none flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2.5 group-hover:scale-[0.8] ${logo.name === "Better Auth" ? "bg-black rounded-xl p-2.5 h-12 w-12" : "w-full h-full max-w-[85%] max-h-[75%]"}`}>
                        <img
                          src={logo.path}
                          alt={`${logo.name} Logo`}
                          className="max-w-full max-h-full object-contain filter brightness-95 opacity-95 pointer-events-none select-none"
                        />
                      </div>
                      <div className="absolute bottom-2.5 left-0 right-0 text-center text-[10px] font-mono uppercase tracking-wider text-zinc-500 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none select-none">
                        {logo.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Title & Paragraph */}
              <div className="lg:col-span-4 flex flex-col items-start pl-0 lg:pl-8 pt-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl italic font-instrument-serif text-black font-semibold tracking-tight mb-4">
                  TechStack
                </h2>
                <p className="text-zinc-800 text-[18px] md:text-[22px] lg:text-[25px] leading-[1.25] max-w-[380px]">
                  Building TokenSupply with a great team of developers and designers. we’ve spent a lot of time designing the architecture so we can keep shipping new features without breaking things. if you’re into systems, take a look around.   
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Builder House Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-36 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col pt-24 md:pt-26 z-10 relative">
          {/* Main Grid: Left = Text & Stats, Right = Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
            {/* Left Column: Text & Stats */}
            <div className="col-span-1 lg:col-span-6 flex flex-col items-start pl-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-black mb-6 tracking-tight font-semibold">
                About <span className="font-instrument-serif italic">BuilderHouse</span>
              </h2>
              <p className="text-zinc-800 text-[18px] md:text-[22px] lg:text-[25px] font-instrument-sans leading-[1.25] tracking-normal mb-10 font-normal">
                Builder House is a residency by the TokenSupply team for developers, designers, and engineers who are obsessed with building. We invite a small group of exceptional builders to spend a few weeks living and working alongside our core team, shipping the first versions of TokenSupply together.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 w-full">
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-black tracking-tight mb-1 font-semibold">3</div>
                  <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-semibold">Cracked Minds</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-black tracking-tight mb-1 font-semibold">45</div>
                  <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight animate-pulse">Days of shipping</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-black tracking-tight mb-1 font-semibold">v1</div>
                  <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-wider font-semibold leading-tight">Launch target</div>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-span-1 lg:col-span-6 w-full">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 shadow-2xl">
                <Image
                  src="/assets/builderhouse.gif"
                  alt="About Builder House Building Project"
                  fill
                  unoptimized
                  className="object-cover object-center animate-fade-in"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What happens in the Builder House Grid Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-24 flex flex-col max-w-[1400px] mx-auto px-4 md:px-8 z-10 relative reveal-on-scroll">
          {/* 6-Box Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
            {programDetails.map((activity, idx) => (
              <div    
                key={idx}
                className="relative overflow-hidden bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300/80 p-6 flex flex-col items-start justify-between min-h-[290px] rounded-2xl transition-all duration-300 shadow-sm group"
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
                  <div className="absolute inset-0 select-none pointer-events-none">
                    <Image
                      src="/assets/bg-2.jpeg"
                      alt="Live & Work Together Background"
                      fill
                      className="object-cover pointer-events-none"
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
                      className="object-cover pointer-events-none"
                    />
                  </div>
                )}
                {idx === 4 && (
                  <div className="absolute inset-0 select-none pointer-events-none">
                    <Image
                      src="/assets/bg-5.jpeg"
                      alt="Build collaborate launch Background"
                      fill
                      className="object-cover pointer-events-none"
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
                      className="object-cover pointer-events-none"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start w-full mb-6 z-10">
                  <span className="text-xs font-mono text-white uppercase tracking-widest">{activity.step}</span>
                  <div className="p-2 bg-transparent">
                    {activity.icon}
                  </div>
                </div>
                <div className={`z-10 w-full backdrop-blur-md rounded-xl p-4 mt-auto border text-white ${idx === 1 ? 'bg-black/60 border-white/10 shadow-lg' : 'bg-white/10 border-white/20 shadow-sm'}`}>
                  <h3 className="text-[19px] md:text-[22px] font-instrument-serif mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-[12px] md:text-sm leading-relaxed font-normal">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Collaborative Callout */}
          <div className="mt-12 w-full relative overflow-hidden rounded-2xl border border-zinc-200 min-h-[290px] flex items-center justify-center p-6 md:p-8">
            <Image
              src="/assets/new-section.gif"
              alt="Collaboration Background"
              fill
              unoptimized
              sizes="100vw"
              className="object-cover pointer-events-none brightness-95"
            />
            <div className="relative z-10 bg-white/10 backdrop-blur-md px-8 py-6 rounded-xl border border-white/20 max-w-3xl shadow-sm text-center flex flex-col items-center">
              <h3 className="text-xl md:text-3xl font-instrument-serif text-white mb-2">
                Come Build with Us
              </h3>
              <p className="text-sm sm:text-base text-white/90 tracking-tight font-instrument-sans font-normal leading-relaxed">
                Anyone building something can also just join us and work with other builders there to collaborate.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-36 px-4 md:px-8 max-w-[1400px] mx-auto z-10 relative reveal-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sticky Header Column */}
            <div className="md:col-span-4 md:sticky md:top-[120px] flex flex-col items-start pl-1 self-start mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-black mb-2 font-semibold tracking-tight">
                The <span className="font-instrument-serif italic">Road</span> to V1
              </h2>
              <p className="text-zinc-500 text-[16px] md:text-[18px] leading-[1.45] font-semibold font-instrument-sans max-w-[320px]">
                Six weeks. Seven workstreams. One shipped product.
              </p>
            </div>

            {/* Timeline Cards Stack Column */}
            <div className="md:col-span-8 flex flex-col gap-6 relative">
              {roadmapPhases.map((phase, idx) => (
                <div
                  key={idx}
                  style={{
                    ["--card-index" as any]: idx,
                  }}
                  className="roadmap-card grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 backdrop-blur-sm rounded-2xl items-center transition-all duration-300 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05),0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_-8px_30px_rgba(0,0,0,0.08),0_10px_15px_-3px_rgba(0,0,0,0.08)] group"
                >
                  {/* Phase & Date */}
                  <div className="md:col-span-4 flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#a2770c]">{phase.id}</span>
                    <span className="text-black text-lg font-instrument-serif">{phase.date}</span>
                  </div>
                  {/* Title & Body */}
                  <div className="md:col-span-6 flex flex-col gap-2">
                    <h3 className="text-[18px] md:text-[25px] font-instrument-serif text-black font-semibold">
                      {phase.title}
                    </h3>
                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-[500px]">
                      {phase.description}
                    </p>
                  </div>

                  {/* Status Icon Image */}
                  <div className="md:col-span-2 flex md:justify-end pt-1">
                    {phase.image ? (
                      <div className="relative w-17 h-17 overflow-hidden bg-transparent select-none">
                        <Image
                          src={phase.image}
                          alt={phase.title}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border border-dashed border-zinc-300 bg-transparent flex items-center justify-center text-zinc-400 shadow-sm select-none">
                        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-20 flex flex-col pt-14 md:pt-26 z-10 relative reveal-on-scroll">
          <div className="w-full mb-16 max-w-[850px] mx-auto flex flex-col items-center text-center px-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-instrument-serif text-black mb-4 tracking-tight font-semibold">
              The <span className="font-instrument-serif italic">People</span> Building <span className="font-instrument-serif italic">TokenSupply</span>
            </h2>
            <p className="text-zinc-500 text-[16px] md:text-[18px] leading-[1.45] tracking-tight max-w-[600px]">
              Developers, Designers and Builders working together to create software for digital goods sellers.
            </p>
          </div>

          {/* Slider Area */}
          <div
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            className="w-full overflow-x-auto scrollbar-none flex flex-row gap-6 py-4 px-4 md:px-8 marquee-mask"
          >
            {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={idx}
                className="w-[280px] md:w-[320px] flex-shrink-0 bg-zinc-50 border-2 border-black rounded-2xl p-5 flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-black mb-5 bg-zinc-200">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-[17px] md:text-[19px] font-semibold text-black tracking-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-wide">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex gap-2.5 pt-1.5">
                    {member.socials.x && (
                      <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-400 hover:text-black transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-400 hover:text-black transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-400 hover:text-black transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-400 hover:text-black transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    )}
                    {member.socials.website && (
                      <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="transition">
                        <svg className="w-4 h-4 text-zinc-400 hover:text-black transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </section>

        {/* FAQ Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-36 px-4 md:px-8 max-w-[900px] mx-auto pt-24 md:pt-36 z-10 relative reveal-on-scroll">
          {/* FAQ Title */}
          <div className="flex items-center justify-center gap-3 md:gap-4 select-none mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-instrument-serif text-black tracking-tight text-center font-semibold leading-tight">
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

          {/* Questions Accordion Stack */}
          <div className="flex flex-col gap-3 w-full">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left text-black hover:text-zinc-700 transition duration-200 cursor-pointer"
                  >
                    <span className="text-lg font-semibold font-instrument-sans pr-4">
                      {item.question}
                    </span>
                    <span className={`text-xl font-light text-zinc-400 transition-transform duration-300 transform select-none ${isOpen ? "rotate-45 text-black" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[300px] border-t border-zinc-200/55" : "max-h-0"}`}
                  >
                    <div className="px-6 py-4 text-xs md:text-sm text-zinc-500 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pillars Section (White Background) */}
        <section className="w-full bg-white text-zinc-950 pb-36 flex flex-col md:pt-36 z-10 relative reveal-on-scroll">
          <div className="w-full overflow-hidden">
            <CurvedLoop
              marqueeText="✦ LIVE ✦ BUILD ✦ NETWORK "
              speed={2.5}
              curveAmount={150}
              direction="left"
              interactive
              className="fill-zinc-950 font-instrument-serif font-bold"
              containerClassName="py-12 flex items-center justify-center w-full tracking-widest overflow-hidden"
            />
          </div>

          {/* Footer Subtext */}
          <div className="text-center mt-12 text-[14px] md:text-[16px] text-zinc-600 max-w-[1400px] mx-auto px-4 md:px-8 w-full">
            Pick a pillar. <span className="font-instrument-serif text-black font-bold ml-0.5 text-lg">Step inside.</span>
          </div>
        </section>

        {/* CTA Section (Retains original design details on white body grid) */}
        <section className="w-full px-4 md:px-8 max-w-[1400px] mx-auto mb-0 mt-12 z-10 relative reveal-on-scroll">
          <div className="relative w-full rounded-3xl overflow-hidden bg-transparent border border-zinc-200 px-8 py-30 md:px-12 md:py-38 flex flex-col items-center shadow-xl">
            {/* Background Image overlay */}
            <div className="absolute inset-0 select-none pointer-events-none">
              <Image
                src="/assets/cta-gif.gif"
                alt="CTA Background"
                fill
                className="object-cover"
              />
            </div>
            {/* Grid lines background overlay */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Text & Buttons Container */}
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 w-full z-10">
              <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/10 border border-white/20 text-white backdrop-blur-md rounded-2xl p-6 max-w-xl shadow-lg">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white mb-2 tracking-tight select-none">
                  Ready to ship?
                </h2>
                <p className="text-white text-sm md:text-base max-w-[450px] font-normal">
                  Let's build the incredible together, with TokenSupply
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row gap-3.5 shrink-0">
                <a
                  href="https://luma.com/zc8zrg9g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black font-instrument-sans font-bold text-[13px] md:text-[12px] px-8 py-3.5 rounded-full active:scale-105 transition duration-200 cursor-pointer uppercase flex items-center justify-center whitespace-nowrap"
                >
                  Apply Now
                </a>
                <a
                  href="mailto:hi@realanshuman.com"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold font-instrument-sans text-[14px] px-8 py-3.5 rounded-full active:scale-105 transition duration-200 cursor-pointer flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                >
                  Contact us
                  <svg className="w-3.5 h-3.5 text-white mt-[0.5px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer to create a gap below CTA card */}
        <div className="h-24 w-full bg-white z-10 relative" />
        {/* Footer Sentinel for Scroll Reveal Trigger */}
        <div id="footer-sentinel" className="w-full h-1 pointer-events-none" />
      </div>

      {/* Footer Section (Fixed Bottom Reveal) */}
      <footer className="fixed bottom-0 left-0 right-0 h-[380px] md:h-[400px] z-0 overflow-hidden flex flex-col justify-end reveal-on-scroll">
        {/* Background Image */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <img
            src="/assets/footerbackground.png"
            alt="Footer Background"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Content Container */}
        <div className="relative w-full max-w-[1800px] mx-auto flex flex-col justify-end pt-12 pb-6 px-4 md:px-8 z-10 text-white">
          {/* Footer Top Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-[700px] mx-auto text-center text-[13px] md:text-[15px] text-black mb-16">
            <div className="flex flex-col items-center justify-center font-instrument-sans font-semibold text-black">
              <span>©2026 TokenSupply</span>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center font-instrument-sans font-semibold text-black">
              <span>Have more queries?</span>
              <a href="mailto:admint@tokensupply.io" className="hover:text-[#a2770c] transition duration-200 font-instrument-sans font-semibold text-black">
                admin@tokensupply.io
              </a>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center font-instrument-sans font-semibold text-white animate-pulse-none">
              <a href="https://www.instagram.com/tokensupplyhq" className="hover:text-[#a2770c] transition duration-200 text-black">Instagram</a>
              <a href="#" className="hover:text-[#a2770c] transition duration-200 text-black">X (Twitter)</a>
              <a href="#" className="hover:text-[#a2770c] transition duration-200 text-black">Youtube</a>
            </div>
          </div>

          {/* Giant Stamp */}
          <h1 className="w-full text-center text-[5.9vw] sm:text-[4vw] font-coastersans leading-[0.8] whitespace-nowrap uppercase select-none text-black font-normal pb-4 pr-4 md:pr-6">
            {footerText}
          </h1>

          {/* Designed & Developed by Credit */}
          <div className="w-full text-center text-[10px] md:text-[11px] text-black font-instrument-sans pb-4 select-none">
            Designed and Developed by{" "}
            <a
              href="https://arddev.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-200 underline-offset-4"
            >
              ard.dev
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Music Player (Corner Pill) */}
      <div
        id="floating-player"
        className="fixed bottom-6 sm:bottom-auto sm:top-12 right-4 md:right-8 z-50 p-2 md:p-2.5 px-4 bg-[#0d0d0f]/90 border border-zinc-800/80 rounded-full shadow-2xl text-white flex items-center gap-3 select-none transition-[transform,opacity] duration-300 opacity-0 translate-y-4 sm:-translate-y-4 pointer-events-none backdrop-blur-md"
      >
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
    </main>
  );
}
