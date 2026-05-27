/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BirthdayInput } from "./components/BirthdayInput";
import { ResultView } from "./components/ResultView";
import { LoadingView } from "./components/LoadingView";
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

    const generated = generateArchiveResult(data);
    setResult(generated);
    setStep("loading");
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
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <LoadingView duration={3.2} onFinished={() => setStep("result")} />
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
