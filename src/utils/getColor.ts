import { ECardType } from "@/const/card";

/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 14:00:45
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-02 14:01:58
 * @Description:
 */
export const getColor = (cardType: ECardType) => {
    switch (cardType) {
        case ECardType.WORD:
            return "bg-word";
        case ECardType.CONTEXT:
            return "bg-context";
        case ECardType.ATTRIBUTE:
            return "bg-attribute";
        default:
            return "bg-bg";
    }
}