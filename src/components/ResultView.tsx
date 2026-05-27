/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ArchiveResult, Behavior } from "../types";
import { ArrowLeft, RefreshCw, Star, Info, X } from "lucide-react";
import { useState, useMemo } from "react";
import { getAllBehaviors } from "../utils/magic";

interface ResultViewProps {
  result: ArchiveResult;
  onReset: () => void;
}

export function ResultView({ result, onReset }: ResultViewProps) {
  const [selectedBehavior, setSelectedBehavior] = useState<Behavior | null>(null);
  
  // Helper to generate a new set of behaviors (5 Curved + 5 Straight = 10 total)
  const getNewBehaviors = () => {
    const all = getAllBehaviors();
    const curved = [...all.filter(b => b.type === "Curved")].sort(() => Math.random() - 0.5).slice(0, 5);
    const straight = [...all.filter(b => b.type === "Straight")].sort(() => Math.random() - 0.5).slice(0, 5);
    return [...curved, ...straight].sort(() => Math.random() - 0.5);
  };

  const [initialChoices, setInitialChoices] = useState<Behavior[]>(() => getNewBehaviors());

  const handleRefreshBehaviors = () => {
    setInitialChoices(getNewBehaviors());
  };

  const handleBehaviorClick = (behavior: Behavior) => {
    setSelectedBehavior(behavior);
  };

  // Mentalism Logic: 
  // If selected is Curved, distractors are Straight. 
  // If selected is Straight, distractors are Curved.
  const detailList = useMemo(() => {
    if (!selectedBehavior) return [];
    const all = getAllBehaviors();
    const oppositeType = selectedBehavior.type === "Curved" ? "Straight" : "Curved";
    const distractors = all
      .filter(b => b.type === oppositeType)
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);
    return [selectedBehavior, ...distractors].sort(() => Math.random() - 0.5);
  }, [selectedBehavior]);

  const tagColors = [
    "bg-emerald-400",
    "bg-amber-400",
    "bg-pink-400",
    "bg-green-500",
    "bg-yellow-500",
    "bg-pink-500"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between min-h-full py-8 px-6 space-y-4 overflow-hidden"
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-20">
        <button 
          onClick={onReset}
          className="p-2 -ml-2 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-4">
        {/* Population Stats */}
        <div className="text-center space-y-1">
          <p className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-zinc-900">
            全球同日出生人数统计
          </p>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-mono text-zinc-900 tracking-tight"
          >
            {result.populationCount}
          </motion.h2>
        </div>

        {/* Word Cloud Container */}
        <div className="w-full max-w-[360px] pb-2">
          <div className="text-center mb-6">
            <span className="text-[10px] font-sans font-bold tracking-widest text-zinc-900 uppercase">
              性格特质扫描探测
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-2">
            {initialChoices.map((b, i) => {
              const color = tagColors[i % tagColors.length];
              const sizes = ["text-xs", "text-sm", "text-xs"];
              const size = sizes[i % sizes.length];
              
              return (
                <motion.button
                  key={`${b.name}-${i}-${initialChoices[0].name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: i * 0.02,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleBehaviorClick(b)}
                  className={`px-3 py-1.5 rounded-lg text-white font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap active:scale-95 ${size} ${color}`}
                >
                  {b.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex flex-col items-center space-y-6 pt-4">
          <motion.div 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[11px] font-sans font-bold tracking-widest text-zinc-900 uppercase underline decoration-zinc-100 underline-offset-8"
          >
            点击符合你真实一面的词项
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefreshBehaviors}
            className="flex items-center space-x-2 px-8 py-3 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-500 hover:text-zinc-800 transition-all hover:bg-white hover:border-zinc-200 shadow-sm"
          >
            <RefreshCw size={16} />
            <span className="text-xs font-medium tracking-widest uppercase">换一批特质</span>
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full">
        <button 
          onClick={onReset}
          className="flex items-center space-x-2 text-xs font-sans tracking-widest uppercase text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <RefreshCw size={14} />
          <span>重新查询</span>
        </button>
        <div className="text-[10px] font-mono tracking-[0.4em] text-zinc-300 uppercase py-2 flex flex-col items-center space-y-1 opacity-40">
          <span>{result.constellationPinyin.toUpperCase()} ARCHIVE NODE</span>
        </div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedBehavior && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-zinc-900 leading-none">共鸣深度分析</h3>
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Global Connection Profile</p>
              </div>
              <button 
                onClick={() => setSelectedBehavior(null)}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                title="关闭"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-hidden grid grid-cols-2 gap-2 content-start">
              {detailList.map((b, i) => (
                <DetailRow 
                  key={`${b.name}-${i}`} 
                  behavior={b} 
                  index={i} 
                  isPrimary={b.name === selectedBehavior.name} 
                />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col items-center space-y-4">
              <div className="text-[9px] font-mono tracking-[0.4em] text-zinc-300 uppercase text-center space-y-1">
                 <p className="text-zinc-200">{result.constellationPinyin.toUpperCase()} ARCHIVE NODE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ behavior, index, isPrimary }: { behavior: Behavior; index: number; isPrimary: boolean; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      style={{ zIndex: isPrimary ? 10 : 1 }}
      className={`relative group overflow-hidden rounded-lg p-2.5 transition-all ${
        isPrimary 
          ? "bg-zinc-900 text-white shadow-lg col-span-2 sm:col-span-1" 
          : "bg-zinc-50 text-zinc-600 border border-zinc-100"
      }`}
    >
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col">
          <span className={`text-sm font-medium leading-tight ${isPrimary ? 'text-white' : 'text-zinc-800'}`}>
            {behavior.name}
          </span>
          <span className={`text-[8px] uppercase tracking-wider font-mono opacity-60 mt-0.5`}>
            准确率: {behavior.percentage}%
          </span>
        </div>
        
        {isPrimary && (
          <Star size={10} fill="white" className="text-white mt-1" />
        )}
      </div>

      {/* Probability Bar */}
      <div className={`mt-2 h-0.5 w-full rounded-full overflow-hidden ${isPrimary ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${behavior.percentage}%` }}
          transition={{ delay: 0.3 + index * 0.03, duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${isPrimary ? 'bg-white' : 'bg-zinc-300'}`}
        />
      </div>
    </motion.div>
  );
}

