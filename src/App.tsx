/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BirthdayInput } from "./components/BirthdayInput";
import { ResultView } from "./components/ResultView";
import { parseBirthday, generateArchiveResult } from "./utils/magic";
import { ArchiveResult } from "./types";

export default function App() {
  const [step, setStep] = useState<"input" | "loading" | "result">("input");
  const [result, setResult] = useState<ArchiveResult | null>(null);

  const handleComplete = (value: string) => {
    const data = parseBirthday(value);
    if (!data) {
      alert("请输入有效的8位日期 (YYYYMMDD)。");
      return;
    }

    setStep("loading");
    
    // Artificial delay for "artistic" loading effect
    setTimeout(() => {
      const generated = generateArchiveResult(data);
      setResult(generated);
      setStep("result");
    }, 3000);
  };

  const handleReset = () => {
    setStep("input");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 flex flex-col overflow-hidden">
      {/* Artistic Geometric Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[#fafafa]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Floating Lines */}
        <motion.div 
          animate={{ y: [-10, 10, -10], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-64 h-[1px] bg-zinc-200 rotate-[-15deg]" 
        />
        <motion.div 
          animate={{ x: [-20, 20, -20], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-48 h-[1px] bg-zinc-300 rotate-[45deg]" 
        />

        {/* Abstract geometric shapes */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] border border-zinc-100 rounded-full opacity-30" 
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] border border-zinc-100 opacity-20" 
        />
        
        {/* Thin vertical lines */}
        <div className="absolute top-0 right-1/2 w-[1px] h-full bg-zinc-50 opacity-50" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-50 opacity-50" />
      </div>
      
      <main className="flex-1 relative z-10 max-w-lg mx-auto w-full h-dvh flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div 
              key="input-step" 
              className="w-full flex-1 flex flex-col"
            >
              <BirthdayInput onComplete={handleComplete} />
            </motion.div>
          )}

          {step === "loading" && (
            <motion.div
              key="loading-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-1 flex flex-col items-center justify-center space-y-10 px-6"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-zinc-200 border-t-zinc-600 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-zinc-200 border-b-zinc-400 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-zinc-600 rounded-full" 
                />
              </div>
              
              <div className="text-center space-y-3">
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs font-sans tracking-[0.4em] text-zinc-600 uppercase"
                >
                  正在查询生日日历
                </motion.p>
                <div className="w-16 h-[1px] bg-zinc-200 mx-auto" />
              </div>
            </motion.div>
          )}

          {step === "result" && result && (
            <motion.div 
              key="result-step" 
              className="w-full flex-1 flex flex-col"
            >
              <ResultView 
                result={result} 
                onReset={handleReset} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
