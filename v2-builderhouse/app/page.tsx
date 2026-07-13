"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

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

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <main className="relative min-h-screen flex flex-col text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Background Image */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        <Image
          src="/assets/bg-1.png"
          alt="Hero Background"
          fill
          priority
          className=""
        />
      </div>

      {/* Header Container */}
      <div className="relative w-full pt-8 pb-4 px-4 md:px-8 max-w-[1800px] mx-auto flex flex-row justify-between items-start z-10">
        {/* Left Side: logo */}
        <div className="select-none">
          <h1 className="text-left text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-coastersans leading-none uppercase text-white font-normal pt-1">
            BUILDER HOUSE
          </h1>
        </div>

        {/* Right Side: Bangalore & FM Player */}
        <div className="flex flex-col items-end pr-2 md:pr-4">
          <span className="text-white text-[17px] md:text-[25px] font-instrument-serif tracking-tighter leading-none mb-3">
            Bangalore, 16th July
          </span>
          {/* Inline lo-fi FM player */}
          <div
            id="inline-player"
            className="flex items-center gap-2.5 select-none transition-opacity duration-300 text-[#8e8e93] opacity-100 pointer-events-auto pt-5"
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

      {/* Spacer to stretch layout */}
      <div className="flex-1" />

      {/* Root audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentSongIndex].src}
        onEnded={handleNextSong}
      />
    </main>
  );
}
