import { EDifficulty, EDisplayDifficulty, EDisplaySubjectiveRate, ESubjectiveRate, ICard } from "./card";

/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 14:50:06
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 10:41:56
 * @Description:
 */
export const DEFAULT_DIFFICULTY = 1;
export const DEFAULT_SUBJECTIVE_RATES = [ESubjectiveRate.NONE, ESubjectiveRate.LOW, ESubjectiveRate.MEDIUM, ESubjectiveRate.HIGH];

export interface IGeneratedCards {
    wordCards: ICard[]; // in the future it can support more cards
    attributeCards: ICard[];
    contextCards: ICard[];
    difficulty: IDifficulties;
    subjectiveRates: number;
}

export interface IDifficulties {
    difficulty: EDisplayDifficulty;
    wordDifficulty: EDifficulty;
    contextDifficulty: EDifficulty;
    attributeDifficulty: EDifficulty;
}

export interface ISettings {
    hasFanMode: boolean;
    displaySubjectiveRate: EDisplaySubjectiveRate;
    enableAdvancedDifficulty: boolean;
    wordDifficulty: EDifficulty,
    contextDifficulty: EDifficulty,
    attributeDifficulty: EDifficulty,
}