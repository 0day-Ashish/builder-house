"use client";

import { useRef } from "react";
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLenis(() => {
    if (!imageRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let progress = (viewportHeight - rect.top) / viewportHeight;
    progress = Math.max(0, Math.min(1, progress));

    const scale = 1.20 - progress * 0.20;
    imageRef.current.style.transform = `scale(${scale})`;
  });

  return (
    <main className="min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black relative">
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
        <div className="flex justify-between items-center w-full mt-4 text-[13px] md:text-[15px] text-[#8e8e93] font-normal px-1">
          <a href="#" className="text-[17px] md:text-[20px] hover:text-white transition duration-200">
            Home
          </a>
          <a href="#" className="text-[17px] md:text-[20px] hover:text-white transition duration-200">
            About
          </a>
          <a href="#" className="text-[17px] md:text-[20px] hover:text-white transition duration-200">
            Contact
          </a>
          <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter">
            Bangalore, 16th July
          </span>
        </div>
      </div>

      {/* Main Content Area - Left-aligned text block and buttons */}
      <div className="flex-1 flex flex-col justify-end px-4 md:px-8 max-w-[1800px] mx-auto w-full pt-24 md:pt-36 md:pb-4">
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
        <div className="flex flex-row items-center gap-3 pl-1">
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
              About Builder House
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

      {/* Pillars Section */}
      <div className="w-full pb-24 flex flex-col pt-12 md:pt-16 border-t border-zinc-900/40">
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

