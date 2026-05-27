/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BirthdayData, ArchiveResult, Behavior } from "../types";

export function parseBirthday(input: string): BirthdayData | null {
  if (!/^\d{8}$/.test(input)) return null;
  
  const yearStr = input.substring(0, 4);
  const monthStr = input.substring(4, 6);
  const dayStr = input.substring(6, 8);
  
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);
  
  if (month < 1 || month > 12) return null;
  
  // Use JS Date to validate actually existing dates (e.g. leap years, 30 vs 31 days)
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  // Reasonable year range check
  const currentYear = new Date().getFullYear();
  if (year < 1920 || year > currentYear) return null;
  
  return {
    raw: input,
    year,
    month,
    day
  };
}

function getConstellationPinyin(month: number, day: number): string {
  const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
  const constellations = [
    "Mo Jie Zuo", "Shui Ping Zuo", "Shuang Yu Zuo", "Bai Yang Zuo", 
    "Jin Niu Zuo", "Shuang Zi Zuo", "Ju Xie Zuo", "Shi Zi Zuo", 
    "Chu Nv Zuo", "Tian Cheng Zuo", "Tian Xie Zuo", "She Shou Zuo"
  ];
  
  if (day < dates[month - 1]) {
    return constellations[month - 1];
  } else {
    return constellations[month % 12];
  }
}

const BEHAVIORS: Behavior[] = [
  // 曲线类 (Curved) - B, C, D, G, J, O, P, Q, R, S, U
  { name: "并不是很准时", type: "Curved", percentage: 45, country: "美国" },
  { name: "别扭星人", type: "Curved", percentage: 76, country: "法国" },
  { name: "吃饭时会先挑剔", type: "Curved", percentage: 61, country: "中国" },
  { name: "沉默是金爱好者", type: "Curved", percentage: 54, country: "中国" },
  { name: "大步流星赶路人", type: "Curved", percentage: 73, country: "俄国" },
  { name: "丢三落四专业户", type: "Curved", percentage: 54, country: "加拿大" },
  { name: "感知极其敏锐", type: "Curved", percentage: 82, country: "印尼" },
  { name: "观察细节的大师", type: "Curved", percentage: 92, country: "日本" },
  { name: "即使很累也要洗澡", type: "Curved", percentage: 87, country: "中国" },
  { name: "纠结症末期患者", type: "Curved", percentage: 82, country: "德国" },
  { name: "几乎不看电视节目", type: "Curved", percentage: 72, country: "瑞典" },
  { name: "偶尔会盯着天顶发呆", type: "Curved", percentage: 68, country: "挪威" },
  { name: "胖乎乎的其实很可爱", type: "Curved", percentage: 91, country: "巴西" },
  { name: "跑步达人且装备齐全", type: "Curved", percentage: 76, country: "西班牙" },
  { name: "其实是个顶级社恐", type: "Curved", percentage: 85, country: "芬兰" },
  { name: "期待每一场惊喜", type: "Curved", percentage: 84, country: "法国" },
  { name: "忍不住想拆快递", type: "Curved", percentage: 97, country: "中国" },
  { name: "任何社交都想逃跑", type: "Curved", percentage: 41, country: "瑞士" },
  { name: "深度社交恐惧者", type: "Curved", percentage: 41, country: "瑞士" },
  { name: "深夜网购战斗力强", type: "Curved", percentage: 31, country: "韩国" },
  { name: "睡觉一定要抱紧枕头", type: "Curved", percentage: 89, country: "日本" },
  { name: "手机长期静音勿扰", type: "Curved", percentage: 85, country: "荷兰" },
  { name: "所有的外卖都不放葱", type: "Curved", percentage: 92, country: "中国" },
  { name: "上厕所必刷短视频", type: "Curved", percentage: 94, country: "全球" },
  { name: "甚至能预感谁发消息", type: "Curved", percentage: 84, country: "以色列" },
  { name: "善解人意的心灵支柱", type: "Curved", percentage: 81, country: "冰岛" },

  // 直线类 (Straight) - A, E, F, H, I, K, L, M, N, T, V, W, X, Y, Z
  { name: "熬夜秃头小天才", type: "Straight", percentage: 87, country: "中国" },
  { name: "爱喝冰美式续命", type: "Straight", percentage: 95, country: "意大利" },
  { name: "饿了还没饭吃会暴怒", type: "Straight", percentage: 62, country: "墨西哥" },
  { name: "奋不顾身的理想主义", type: "Straight", percentage: 69, country: "希腊" },
  { name: "反应速度奇快无比", type: "Straight", percentage: 91, country: "德国" },
  { name: "好奇猫咪本猫", type: "Straight", percentage: 88, country: "挪威" },
  { name: "很爱笑但内心孤寂", type: "Straight", percentage: 92, country: "巴西" },
  { name: "会理财的高端玩家", type: "Straight", percentage: 54, country: "新加坡" },
  { name: "渴望一觉醒来暴富", type: "Straight", percentage: 96, country: "全球" },
  { name: "开心小狗性格", type: "Straight", percentage: 94, country: "澳洲" },
  { name: "逻辑严谨到朋友头大", type: "Straight", percentage: 83, country: "加拿大" },
  { name: "凌晨习惯删朋友圈", type: "Straight", percentage: 58, country: "中国" },
  { name: "乐观到近乎盲目", type: "Straight", percentage: 71, country: "瑞典" },
  { name: "拿得起放得下的酷盖", type: "Straight", percentage: 85, country: "英国" },
  { name: "努力装合群的独行侠", type: "Straight", percentage: 72, country: "俄国" },
  { name: "难过时一个字不说", type: "Straight", percentage: 48, country: "俄罗斯" },
  { name: "天赋点全长在吃上", type: "Straight", percentage: 94, country: "泰国" },
  { name: "听歌洗澡到忘记时间", type: "Straight", percentage: 91, country: "英国" },
  { name: "晚睡早起的硬核人类", type: "Straight", percentage: 88, country: "西班牙" },
  { name: "喜欢吃香菜到疯狂", type: "Straight", percentage: 75, country: "中国" },
  { name: "洗澡时突然想起尴尬事", type: "Straight", percentage: 67, country: "韩国" },
  { name: "性格爽朗人见人爱", type: "Straight", percentage: 78, country: "泰国" },
  { name: "依然热爱热腾腾的生活", type: "Straight", percentage: 98, country: "挪威" },
  { name: "悠闲自在的佛系青年", type: "Straight", percentage: 82, country: "芬兰" },
  { name: "总是最后一个离开舞池", type: "Straight", percentage: 92, country: "爱尔兰" },
  { name: "直觉准到有点可怕", type: "Straight", percentage: 84, country: "以色列" },
];

/**
 * Trick logic: The population count is generated by adding 1 to each individual digit.
 */
export function generateArchiveResult(data: BirthdayData): ArchiveResult {
  const populationCount = data.raw
    .slice(-6)
    .split("")
    .map((digit) => (parseInt(digit) + 1).toString())
    .join("");

  const constellationPinyin = getConstellationPinyin(data.month, data.day);

  // Pick primary based on birthday, but we actually want to give a list of 20 choices
  const distractors = BEHAVIORS.slice(0, 20); // Provide enough for any scenario

  const prophecies = [
    "宇宙在你初次呼吸时产生了一次静默共鸣，标记了奇点的到来。",
    "档案显示，你的生命轨迹受无形潮汐的律动所指引。",
    "你的存在被记录在全人类编织网路的核心节点中。",
    "古老的律律预示着，你的到来是为了填补某段破碎的旋律。",
    "星环的震颤记录下了那个瞬间，一个灵魂入驻了这尘世的躯壳。"
  ];
  const prophecy = prophecies[(data.month + data.day) % prophecies.length];

  return {
    populationCount,
    prophecy,
    constellationPinyin,
    primaryBehavior: BEHAVIORS[0], // Placeholder
    distractors
  };
}

export function getAllBehaviors() {
  return BEHAVIORS;
}

