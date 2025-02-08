/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-03 23:26:59
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 11:54:37
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

export const getSubjectiveText = (subjectiveRate: ESubjectiveRate): string => {
    switch (subjectiveRate) {
        case ESubjectiveRate.NONE:
            return 'None';
        case ESubjectiveRate.LOW:
            return 'Low';
        case ESubjectiveRate.MEDIUM:
            return 'Medium';
        case ESubjectiveRate.HIGH:
            return 'High';
        default:
            return '';
    }
}