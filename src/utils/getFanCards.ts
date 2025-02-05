import { ECardSource, ECardType } from "@/const/card";
import { FanCards } from "@/data/FanCards";

export const getFanCardsLength = () => {
    return FanCards.length;
}

export const getCardSource = (source: ECardSource) => {
    switch (source) {
        case ECardSource.OFFICIAL:
            return 'Official';
        case ECardSource.COMMUNITY:
            return 'Fan';
        case ECardSource.AI:
            return 'AI';
        default:
            return '';
    }
}

export const getFanCardType = (type: ECardType) => {
    switch (type) {
        case ECardType.WORD:
            return 'Word';
        case ECardType.CONTEXT:
            return 'Context';
        case ECardType.ATTRIBUTE:
            return 'Attribute';
        default:
            return '';
    }
}