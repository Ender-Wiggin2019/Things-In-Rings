/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 11:17:52
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 23:30:38
 * @Description:
 */
export enum ECardSource {
    OFFICIAL,
    COMMUNITY,
    AI,
}

export enum ECardType {
    WORD,
    CONTEXT,
    ATTRIBUTE,
}

export enum ESubjectiveRate {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

export enum EDifficulty {
    EASY = 1,
    MEDIUM = 2,
    DIFFICULT = 3,
    NIGHTMARE = 4, // fan made difficulty
}

export enum EDisplayDifficulty {
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    LEVEL_4 = 4,
    LEVEL_5 = 5,
    // LEVEL_6 = 6,
}

export enum EDisplaySubjectiveRate {
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
    // LEVEL_6 = 6,
}

export const DisplayDifficultyMap = {
    [EDisplayDifficulty.LEVEL_1]: 'star1',
    [EDisplayDifficulty.LEVEL_2]: 'star2',
    [EDisplayDifficulty.LEVEL_3]: 'star3',
    [EDisplayDifficulty.LEVEL_4]: 'star4',
    [EDisplayDifficulty.LEVEL_5]: 'star5',
}

export const DisplaySubjectiveRateMap = {
    [EDisplaySubjectiveRate.LEVEL_1]: 'sub1',
    [EDisplaySubjectiveRate.LEVEL_2]: 'sub2',
    [EDisplaySubjectiveRate.LEVEL_3]: 'sub3',
}
export interface ICard {
    id: string;
    type: ECardType;
    content: string; // card content
    difficulty: EDifficulty;
    subjectiveRate: ESubjectiveRate;
    source: ECardSource;
    author?: string;
}
