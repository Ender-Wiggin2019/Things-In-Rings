import {
	ECardSource,
	ECardType,
	EDifficulty,
	ESubjectiveRate,
	ICard,
} from "@/const/card";

/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 11:26:08
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-05 01:07:51
 * @Description:
 */
export const FanWordCards: ICard[] = [
    {
        id: "wf1",
        type: ECardType.WORD,
        content: "wf1",
        difficulty: EDifficulty.EASY,
        subjectiveRate: ESubjectiveRate.NONE,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf2",
        type: ECardType.WORD,
        content: "wf2",
        difficulty: EDifficulty.DIFFICULT,
        subjectiveRate: ESubjectiveRate.LOW,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf3",
        type: ECardType.WORD,
        content: "wf3",
        difficulty: EDifficulty.DIFFICULT,
        subjectiveRate: ESubjectiveRate.LOW,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf4",
        type: ECardType.WORD,
        content: "wf4",
        difficulty: EDifficulty.DIFFICULT,
        subjectiveRate: ESubjectiveRate.MEDIUM,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf5",
        type: ECardType.WORD,
        content: "wf5",
        difficulty: EDifficulty.MEDIUM,
        subjectiveRate: ESubjectiveRate.MEDIUM,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf6",
        type: ECardType.WORD,
        content: "wf6",
        difficulty: EDifficulty.MEDIUM,
        subjectiveRate: ESubjectiveRate.LOW,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf7",
        type: ECardType.WORD,
        content: "wf7",
        difficulty: EDifficulty.MEDIUM,
        subjectiveRate: ESubjectiveRate.NONE,
        source: ECardSource.COMMUNITY,
    },
    {
        id: "wf8",
        type: ECardType.WORD,
        content: "wf8",
        difficulty: EDifficulty.EASY,
        subjectiveRate: ESubjectiveRate.NONE,
        source: ECardSource.COMMUNITY,
    }
];


export const FanContextCards: ICard[] = [
	{
		id: "cf1",
		type: ECardType.CONTEXT,
		content: "f1",
		difficulty: EDifficulty.EASY,
		subjectiveRate: ESubjectiveRate.NONE,
		source: ECardSource.COMMUNITY,
	},
];

export const FanAttributeCards: ICard[] = [
	{
		id: "af1",
		type: ECardType.ATTRIBUTE,
		content: "af1",
		difficulty: EDifficulty.EASY,
		subjectiveRate: ESubjectiveRate.LOW,
		source: ECardSource.COMMUNITY,
	},
];

export const FanCards: ICard[] = [
	...FanWordCards,
	...FanContextCards,
	...FanAttributeCards,
];
