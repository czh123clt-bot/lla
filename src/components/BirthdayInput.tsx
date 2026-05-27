/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { parseBirthday } from "../utils/magic";

interface BirthdayInputProps {
  onComplete: (value: string) => void;
}

export function BirthdayInput({ onComplete }: BirthdayInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidDate = useMemo(() => {
    return parseBirthday(value) !== null;
  }, [value]);

  // Auto focus for mobile experience
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-full py-6 px-6"
    >
      <div className="text-center space-y-6 mb-8 relative">
        {/* Geometric Calendar Shape */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto w-12 h-12 relative mb-6"
        >
          <div className="absolute inset-0 border border-zinc-200 rounded-sm" />
          <div className="absolute top-0 left-0 w-full h-3 border-b border-zinc-200" />
          <div className="absolute top-[-4px] left-3 w-[2px] h-3 bg-zinc-300" />
          <div className="absolute top-[-4px] right-3 w-[2px] h-3 bg-zinc-300" />
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-2 right-2 w-2 h-2 bg-zinc-200 rounded-full" 
          />
        </motion.div>

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "24px" }}
          className="h-[1px] bg-zinc-300 mx-auto mb-4" 
        />
        <h1 className="text-3xl font-sans font-extralight tracking-[0.2em] text-zinc-900">
          寻找你的生日伙伴
        </h1>
        <div className="space-y-2">
          <p className="text-[10px] font-sans text-zinc-400 tracking-widest leading-loose uppercase">
            Discovery of Cosmic Parallelism
          </p>
          <div className="w-[120px] h-[1px] bg-zinc-100 mx-auto mt-4" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center space-y-8">
        <div className="relative w-full max-w-[320px] group">
          {/* Subtle frame corners */}
          <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-zinc-200" />
          <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-zinc-200" />
          
          <input
            ref={inputRef}
            type="tel"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 8))}
            className="w-full bg-transparent border-b border-zinc-200 py-4 text-4xl text-center font-mono tracking-[0.4em] focus:outline-none focus:border-zinc-500 transition-all duration-700 text-zinc-800 placeholder:text-zinc-100"
            placeholder="YYYYMMDD"
            maxLength={8}
          />
          
          <div className="absolute -bottom-1 left-0 w-full flex justify-between px-1 opacity-20 group-focus-within:opacity-100 transition-opacity duration-700">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-[1px] h-2 bg-zinc-400" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => isValidDate && onComplete(value)}
            disabled={!isValidDate}
            className={`group relative overflow-hidden px-16 py-4 rounded-none border transition-all duration-700 text-[10px] tracking-[0.5em] font-light uppercase
              ${isValidDate 
                ? "bg-zinc-900 text-white border-zinc-900" 
                : "bg-transparent text-zinc-300 border-zinc-100 cursor-not-allowed"}`}
          >
            <span className="relative z-10">开始追踪</span>
            {isValidDate && (
              <motion.div 
                className="absolute inset-0 bg-zinc-800" 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.1 }}
              />
            )}
          </motion.button>
          
          <p className="text-[9px] font-mono text-zinc-300 tracking-[0.2em]">
            {value.length}/8 DIGITS
          </p>
        </div>
      </div>


      <div className="pt-6 flex flex-col items-center space-y-6">
        <div className="flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: value.length > i ? "#3f3f46" : "#e4e4e7"
              }}
              className="w-2 h-2 rounded-full transition-colors"
            />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-2 opacity-20">
          <p className="text-[8px] font-sans tracking-[0.2em] text-zinc-600 uppercase text-center">
            Zero-Knowledge Proof Protocol / 零知识证明协议
          </p>
          <p className="text-[7px] font-mono tracking-widest text-zinc-400">
            ENCRYPTION ARCHIVE SYSTEM v2.0 - SECURE NODE
          </p>
        </div>
      </div>
    </div>
  );
}
