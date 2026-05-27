/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingViewProps {
  duration: number; // in seconds, e.g. 3
  onFinished: () => void;
}

export function LoadingView({ duration, onFinished }: LoadingViewProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef<number | null>(null);
  const onFinishedRef = useRef(onFinished);

  // Update ref when onFinished changes
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    let animationFrameId: number;

    const tick = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed = (now - startTimeRef.current) / 1000;
      const remaining = Math.max(0, duration - elapsed);

      setTimeLeft(remaining);

      if (remaining > 0) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        onFinishedRef.current();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration]);

  // Calculate percentage of progress (from 0 to 100)
  const progress = ((duration - timeLeft) / duration) * 100;
  
  // Custom poetic messages that transition based on the current stage of the countdown
  const getPoeticState = () => {
    if (timeLeft > 2.0) {
      return {
        zh: "正在捕捉生命轨迹的宇宙微波振荡",
        en: "CAPTURING RESONANCE OF BIRTHPLACE VIBRATIONS",
        step: "I"
      };
    } else if (timeLeft > 1.0) {
      return {
        zh: "正在溯源共鸣时间线轴的交汇节点",
        en: "LOCATING CO-AXIAL LIFETIME TRAJECTORIES",
        step: "II"
      };
    } else {
      return {
        zh: "正在解密时空档案中的性格特质共鸣",
        en: "DECODING PARALLEL PERSORTRAIT HARMONICS",
        step: "III"
      };
    }
  };

  const status = getPoeticState();

  // Draw circular SVG progress calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div id="loading-container" className="w-full flex-1 flex flex-col items-center justify-center space-y-12 px-6 py-12 select-none">
      
      {/* Aesthetic Dial & Number Countdown */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        
        {/* Subtle Background Ring */}
        <div className="absolute inset-0 rounded-full border border-zinc-100 opacity-60" />

        {/* Dynamic Circled Progress SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#f4f4f5"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#18181b"
            strokeWidth="2"
            strokeDasharray={circumference}
            animated-offset={strokeDashoffset}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            transition={{ type: "tween", ease: "easeOut" }}
          />
        </svg>

        {/* Core Countdown Number display */}
        <div className="text-center flex flex-col items-center justify-center z-13">
          <AnimatePresence mode="wait">
            <motion.div
              key={Math.ceil(timeLeft)}
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-6xl font-serif text-zinc-900 tracking-tighter"
            >
              {Math.ceil(timeLeft)}
            </motion.div>
          </AnimatePresence>
          
          <div className="h-[1px] w-8 bg-zinc-200 my-1" />
          
          <span className="text-[10px] font-mono tracking-widest text-zinc-400">
            {timeLeft.toFixed(2)}s
          </span>
        </div>

        {/* Interactive Orbiting Dot */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            transform: `rotate(${(progress / 100) * 360}deg)`
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#18181b",
              top: "50%",
              left: "50%",
              marginTop: "-3px",
              marginLeft: "-3px",
              transform: `translateY(-${radius}px)`
            }}
            className="shadow-sm"
          />
        </div>
      </div>

      {/* Dynamic Texts with micro animations */}
      <div className="text-center space-y-4 max-w-sm">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-300">STAGE</span>
          <span className="text-[10px] font-mono text-zinc-800 bg-zinc-100 px-1.5 py-0.5 rounded-sm">{status.step}</span>
          <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-300">//</span>
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-medium">ALIGNING</span>
        </div>

        <div className="space-y-1.5 px-4 h-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={status.zh}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-sans tracking-[0.1em] text-zinc-700 font-light"
            >
              {status.zh}
            </motion.p>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.p
              key={status.en}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[8px] font-sans tracking-[0.2em] text-zinc-500 leading-normal"
            >
              {status.en}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dynamic percentage bar below */}
        <div className="w-24 h-[1px] bg-zinc-100 mx-auto relative overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-zinc-900"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-[9px] font-mono text-zinc-300 tracking-wider">
          {Math.floor(progress)}% RESOLVED
        </p>
      </div>

    </div>
  );
}
