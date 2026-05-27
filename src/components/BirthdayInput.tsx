/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useRef, useEffect, useMemo, ChangeEvent, KeyboardEvent } from "react";
import { parseBirthday } from "../utils/magic";

interface BirthdayInputProps {
  onComplete: (value: string) => void;
}

export function BirthdayInput({ onComplete }: BirthdayInputProps) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  const isValidDate = useMemo(() => {
    if (year.length < 4 || month.length < 1 || day.length < 1) return false;
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");
    const combined = `${year}${formattedMonth}${formattedDay}`;
    return parseBirthday(combined) !== null;
  }, [year, month, day]);

  // Auto focus Year on mount
  useEffect(() => {
    yearRef.current?.focus();
  }, []);

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);
    if (val.length === 4) {
      monthRef.current?.focus();
    }
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);
    if (val.length === 2) {
      dayRef.current?.focus();
    }
  };

  const handleMonthKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && month === "") {
      yearRef.current?.focus();
    }
  };

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);
  };

  const handleDayKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && day === "") {
      monthRef.current?.focus();
    }
  };

  const handleSubmit = () => {
    if (isValidDate) {
      const formattedMonth = month.padStart(2, "0");
      const formattedDay = day.padStart(2, "0");
      const combined = `${year}${formattedMonth}${formattedDay}`;
      onComplete(combined);
    }
  };

  const totalLength = year.length + month.length + day.length;

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

      <div className="w-full flex flex-col items-center space-y-10">
        {/* Split input fields: 年, 月, 日 */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-[340px]">
          {/* Year Input Box */}
          <div className="flex-[1.5] flex flex-col items-center space-y-2">
            <div className="relative w-full h-20 bg-white border-2 border-zinc-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] focus-within:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-300">
              <input
                ref={yearRef}
                type="tel"
                value={year}
                onChange={handleYearChange}
                className="w-full bg-transparent text-center font-mono text-2xl font-extrabold text-zinc-900 focus:outline-none placeholder:text-zinc-200"
                placeholder="YYYY"
                maxLength={4}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 font-bold uppercase">年 / YEAR</span>
          </div>

          {/* Separator / Dot */}
          <div className="text-zinc-600 font-extrabold text-lg pb-6 select-none">•</div>

          {/* Month Input Box */}
          <div className="flex-1 flex flex-col items-center space-y-2">
            <div className="relative w-full h-20 bg-white border-2 border-zinc-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] focus-within:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-300">
              <input
                ref={monthRef}
                type="tel"
                value={month}
                onChange={handleMonthChange}
                onKeyDown={handleMonthKeyDown}
                className="w-full bg-transparent text-center font-mono text-2xl font-extrabold text-zinc-900 focus:outline-none placeholder:text-zinc-200"
                placeholder="MM"
                maxLength={2}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 font-bold uppercase">月 / MM</span>
          </div>

          {/* Separator / Dot */}
          <div className="text-zinc-600 font-extrabold text-lg pb-6 select-none">•</div>

          {/* Day Input Box */}
          <div className="flex-1 flex flex-col items-center space-y-2">
            <div className="relative w-full h-20 bg-white border-2 border-zinc-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] focus-within:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-300">
              <input
                ref={dayRef}
                type="tel"
                value={day}
                onChange={handleDayChange}
                onKeyDown={handleDayKeyDown}
                className="w-full bg-transparent text-center font-mono text-2xl font-extrabold text-zinc-900 focus:outline-none placeholder:text-zinc-200"
                placeholder="DD"
                maxLength={2}
              />
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 font-bold uppercase">日 / DD</span>
          </div>
        </div>

        <div className="flex flex-col items-center w-full space-y-4">
          <motion.button
            whileTap={isValidDate ? { scale: 0.97 } : {}}
            onClick={handleSubmit}
            disabled={!isValidDate}
            className={`w-full max-w-[280px] h-14 rounded-xl border-2 tracking-[0.4em] font-sans font-extrabold text-xs transition-all duration-300 uppercase select-none
              ${isValidDate 
                ? "bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(24,24,27,0.15)] hover:shadow-[5px_5px_0px_0px_rgba(24,24,27,0.25)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer" 
                : "bg-transparent text-zinc-300 border-zinc-200 cursor-not-allowed"}`}
          >
            开始追踪
          </motion.button>
          
          <p className="text-[9px] font-mono text-zinc-300 tracking-[0.2em]">
            {totalLength}/8 DIGITS
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
                backgroundColor: totalLength > i ? "#3f3f46" : "#e4e4e7"
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
