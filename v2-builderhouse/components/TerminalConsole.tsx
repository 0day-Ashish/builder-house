"use client";

import { useState, useRef, useEffect } from "react";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "system";
  prompt?: string;
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<LogLine[]>([
    { text: "Welcome to Builder House CLI v1.0.0", type: "system" },
    { text: "Type 'help' to see available commands or click an action pill.", type: "system" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of the console container when history changes
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({
        top: logContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [history]);

  // Focus the input when clicking anywhere in the console
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const newLines: LogLine[] = [
      { text: trimmed, type: "input", prompt: "visitor@builderhouse ~ % " }
    ];

    if (lower === "help" || lower === "?") {
      newLines.push({
        text: `Available commands:
  ./apply_now.sh   - Apply to the residency batch
  list_residents   - List all builders in the house
  cat stack.json   - View project design & code stack
  help             - Print this help message
  clear            - Clear terminal logs`,
        type: "output"
      });
    } else if (lower === "./apply_now.sh" || lower === "apply") {
      newLines.push({ text: "Executing apply_now.sh...", type: "system" });
      newLines.push({ text: "Opening Luma application link in a new tab.", type: "output" });
      if (typeof window !== "undefined") {
        window.open("https://luma.com/zc8zrg9g", "_blank");
      }
    } else if (lower === "list_residents" || lower === "residents") {
      newLines.push({
        text: `Active Batch 1 Residents:
------------------------------------------
- Anshuman Kumar     [Founder]
- Yash Raj           [Co-Founder]
- Karthik Shanbhag   [Backend Dev]
- Aman Maddeshiya    [Fullstack Dev]
- Soubhagya Chouhan  [QA Engineer]
- Devang Saklani     [Software Engineer]
- Ammogh Vedamurthy  [Sr. Designer]
- Ashish Ranjan Das  [DevRel]
- Vansh Goyal        [AI/Backend]`,
        type: "output"
      });
    } else if (lower === "cat stack.json" || lower === "cat house_stack.json") {
      newLines.push({
        text: `{
  "framework": "Next.js 15 (App Router)",
  "styling": "Tailwind CSS v4",
  "smooth-scroll": "Lenis React",
  "font": "Coaster Sans, Instrument Serif"
}`,
        type: "output"
      });
    } else if (lower === "clear" || lower === "cls") {
      setHistory([]);
      setInputValue("");
      return;
    } else {
      newLines.push({
        text: `command not found: ${trimmed}. Type 'help' for instructions.`,
        type: "error"
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    }
  };

  const handleQuickAction = (cmd: string) => {
    executeCommand(cmd);
    // Refocus after clicking a button
    setTimeout(focusInput, 50);
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full max-w-[480px] bg-zinc-950/95 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-mono text-left cursor-text mt-8 flex flex-col select-text"
    >
      {/* OS Mock Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-900 bg-zinc-900/40 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
        </div>
        <span className="text-[11px] text-zinc-500">visitor@builderhouse:~</span>
        <div className="w-12" /> {/* spacer for visual symmetry */}
      </div>

      {/* Quick Action Buttons */}
      <div className="px-4 pt-3 flex flex-wrap gap-2 select-none border-b border-zinc-900/30 pb-2 bg-zinc-950/40">
        <button
          onClick={() => handleQuickAction("./apply_now.sh")}
          className="border border-zinc-800/80 rounded-md bg-zinc-900/40 px-2 py-1 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          ./apply_now.sh
        </button>
        <button
          onClick={() => handleQuickAction("list_residents")}
          className="border border-zinc-800/80 rounded-md bg-zinc-900/40 px-2 py-1 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          list_residents
        </button>
        <button
          onClick={() => handleQuickAction("cat stack.json")}
          className="border border-zinc-800/80 rounded-md bg-zinc-900/40 px-2 py-1 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          cat stack.json
        </button>
        <button
          onClick={() => handleQuickAction("clear")}
          className="border border-zinc-800/80 rounded-md bg-zinc-900/40 px-2 py-1 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
        >
          clear
        </button>
      </div>

      {/* Output Stream */}
      <div 
        ref={logContainerRef}
        className="p-4 overflow-y-auto max-h-[160px] sm:max-h-[200px] flex flex-col gap-1.5 scrollbar-none min-h-[120px]"
      >
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed text-[11px] sm:text-xs">
            {line.prompt && (
              <span className="text-emerald-500">{line.prompt}</span>
            )}
            <span className={
              line.type === "error" ? "text-red-400" :
              line.type === "system" ? "text-[#e2b857]" :
              line.type === "input" ? "text-zinc-100" : "text-zinc-300"
            }>
              {line.text}
            </span>
          </div>
        ))}
        
        {/* Active prompt row */}
        <div className="flex items-center text-[11px] sm:text-xs mt-1">
          <span className="text-emerald-500 shrink-0">visitor@builderhouse ~ %&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-0 outline-none p-0 m-0 text-zinc-100 font-mono text-[11px] sm:text-xs caret-[#e2b857] focus:ring-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal Command Input"
          />
        </div>
      </div>
    </div>
  );
}
