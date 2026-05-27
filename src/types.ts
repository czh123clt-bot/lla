/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BirthdayData {
  raw: string; // e.g. "19970624"
  year: number;
  month: number;
  day: number;
}

export interface Behavior {
  name: string;
  type: "Curved" | "Straight";
  percentage: number;
  country: string;
}

export interface ArchiveResult {
  populationCount: string;
  prophecy: string;
  constellationPinyin: string;
  primaryBehavior: Behavior;
  distractors: Behavior[];
}
