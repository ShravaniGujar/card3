import { useEffect, useState } from "react";

const TYPEWRITER_TEXT = "story…";
const TYPEWRITER_SPEED = 100;
const PAUSE_DURATION = 1500;

export default function LandingPage() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < TYPEWRITER_TEXT.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText(TYPEWRITER_TEXT.slice(0, displayedText.length + 1));
      }, TYPEWRITER_SPEED);
    } else if (!isDeleting && displayedText.length === TYPEWRITER_TEXT.length) {
      // Pause at the end
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_DURATION);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting backwards
      timeout = setTimeout(() => {
        setDisplayedText(TYPEWRITER_TEXT.slice(0, displayedText.length - 1));
      }, TYPEWRITER_SPEED);
    } else if (isDeleting && displayedText.length === 0) {
      // Ready to type again
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animate-background-shift" />

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center justify-start pt-12">
          <div className="animate-breathing text-xs md:text-sm font-light tracking-widest text-gray-400">
            POWER
          </div>
        </div>

        {/* Center Vertical Partition Line */}
        <div className="w-px bg-gray-700 opacity-30" />

        {/* Right Column */}
        <div className="flex-1 flex flex-col items-center justify-start pt-12">
          <div className="animate-breathing text-xs md:text-sm font-light tracking-widest text-gray-400">
            CONNECTIONS
          </div>
        </div>
      </div>

      {/* Bottom Center Text with Typewriter Effect */}
      <div className="absolute inset-x-0 bottom-12 flex items-center justify-center z-20">
        <div className="text-center">
          <div className="h-8 flex items-center">
            <span className="text-sm md:text-base font-light text-gray-300 whitespace-nowrap">
              {displayedText}
            </span>
            <span className="animate-blink ml-1 text-sm md:text-base font-light text-gray-300 border-r-2 border-gray-300">
              &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
