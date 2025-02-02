import { EDisplayDifficulty } from "@/const/card";
import { IDifficulties } from "@/const/generator"

export const DifficultyMap: Record<EDisplayDifficulty, IDifficulties> = {
    1: {
        difficulty: 1,
        wordDifficulty: 1,
        contextDifficulty: 1,
        attributeDifficulty: 1,
    },
    2: {
        difficulty: 2,
        wordDifficulty: 2,
        contextDifficulty: 1,
        attributeDifficulty: 1,
    },
    3: {
        difficulty: 3,
        wordDifficulty: 2,
        contextDifficulty: 2,
        attributeDifficulty: 2,
    },
    4: {
        difficulty: 4,
        wordDifficulty: 3,
        contextDifficulty: 2,
        attributeDifficulty: 2,
    },
    5: {
        difficulty: 5,
        wordDifficulty: 3,
        contextDifficulty: 3,
        attributeDifficulty: 3,
    },
}
export const getDifficulties = (difficulty: EDisplayDifficulty): IDifficulties => {

    return DifficultyMap[difficulty];
}