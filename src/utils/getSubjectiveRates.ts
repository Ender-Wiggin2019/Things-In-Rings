/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-03 23:26:59
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 23:29:17
 * @Description:
 */
import { EDisplaySubjectiveRate, ESubjectiveRate } from "@/const/card";

export const SubjectiveRateMap: Record<EDisplaySubjectiveRate, ESubjectiveRate[]> = {
    1: [ESubjectiveRate.NONE, ESubjectiveRate.LOW],
    2: [ESubjectiveRate.NONE, ESubjectiveRate.LOW, ESubjectiveRate.MEDIUM],
    3: [ESubjectiveRate.NONE, ESubjectiveRate.LOW, ESubjectiveRate.MEDIUM, ESubjectiveRate.HIGH],
}
export const getSubjectiveRates = (SubjectiveRate: EDisplaySubjectiveRate): ESubjectiveRate[] => {
    return SubjectiveRateMap[SubjectiveRate];
}