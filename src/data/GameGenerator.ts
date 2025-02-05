import {
	EDisplayDifficulty,
	ESubjectiveRate,
	ICard,
} from "@/const/card";
import {
	OfficialAttributeCards,
	OfficialContextCards,
	OfficialWordCards,
} from "./OfficialCards";
import { IDifficulties, IGeneratedCards, ISettings } from "@/const/generator";
import { getDifficulties } from "@/utils/getDifficulties";
import { FanWordCards } from "./FanCards";

export class GameGenerator {
	public difficulty: IDifficulties;

	public subjectiveRates: ESubjectiveRate[] = [];
	public wordCards: ICard[] = [];
	public contextCards: ICard[] = [];
	public attributeCards: ICard[] = [];
	public generatedCards: Partial<IGeneratedCards> = {};
	constructor(
		difficulty: EDisplayDifficulty,
		subjectiveRates: ESubjectiveRate[],
		settings?: ISettings,
	) {
		const { wordDifficulty, contextDifficulty, attributeDifficulty } =
        getDifficulties(difficulty);
		const _difficulty = wordDifficulty
        ? wordDifficulty + contextDifficulty + attributeDifficulty
        : difficulty;

		this.subjectiveRates = subjectiveRates;

		// use user difficulty if it is not null
		this.difficulty = {
            difficulty: _difficulty,
			wordDifficulty: settings?.enableAdvancedDifficulty ? settings.wordDifficulty : wordDifficulty,
			contextDifficulty: settings?.enableAdvancedDifficulty ? settings.contextDifficulty : contextDifficulty,
			attributeDifficulty: settings?.enableAdvancedDifficulty ? settings.attributeDifficulty : attributeDifficulty,
		};

		const smallerEqual = (a: number, b: number) => a <= b;
		const strictEqual = (a: number, b: number) => a === b;
		const compareFn = settings ? strictEqual : smallerEqual;

        const _wordCards = settings?.hasFanMode ? [...OfficialWordCards, ...FanWordCards] : OfficialWordCards;
        console.log('🎸 [test] - GameGenerator - _wordCards:', settings, _wordCards);
		const _contextCards = settings?.hasFanMode ? [...OfficialContextCards] : OfficialContextCards;
		const _attributeCards = settings?.hasFanMode ? [...OfficialAttributeCards] : OfficialAttributeCards;

		this.wordCards = _wordCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && compareFn(card.difficulty, wordDifficulty)
		);
		this.contextCards = _contextCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && compareFn(card.difficulty, contextDifficulty)
		);
		this.attributeCards = _attributeCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && compareFn(card.difficulty, attributeDifficulty)
		);
	}

	public generate() {
		const { wordCards, contextCards, attributeCards } = this.generatedCards;
		const _generatedCards = {
			wordCards: [
				this.selectOne(
					this.wordCards,
					wordCards
				),
			],
			contextCards: [
				this.selectOne(
					this.contextCards,
					contextCards
				),
			],
			attributeCards: [
				this.selectOne(
					this.attributeCards,
					attributeCards
				),
			],
		};

		this.generatedCards = {
			..._generatedCards,
			difficulty: this.difficulty,
			subjectiveRates: this.getGeneratedSubjectiveRates(_generatedCards),
		};

		return this.generatedCards;
	}

	public rerollWordCard() {
		const { wordCards, contextCards, attributeCards } = this.generatedCards;
		const _generatedCards = {
			wordCards: [
				this.selectOne(
					this.wordCards,
					wordCards
				),
			],
			contextCards: contextCards,
			attributeCards: attributeCards,
		};
		this.generatedCards = {
			..._generatedCards,
			difficulty: this.difficulty,
			subjectiveRates: this.getGeneratedSubjectiveRates(_generatedCards),
		};
	}

	public rerollContextCard() {
		const { wordCards, contextCards, attributeCards } = this.generatedCards;
		const _generatedCards = {
			wordCards: wordCards,
			contextCards: [
				this.selectOne(
					this.contextCards,
					contextCards
				),
			],
			attributeCards: attributeCards,
		};
		this.generatedCards = {
			..._generatedCards,
			difficulty: this.difficulty,
			subjectiveRates: this.getGeneratedSubjectiveRates(_generatedCards),
		};
	}
	public rerollAttributeCard() {
		const { wordCards, contextCards, attributeCards } = this.generatedCards;
		const _generatedCards = {
			wordCards: wordCards,
			contextCards: contextCards,
			attributeCards: [
				this.selectOne(
					this.attributeCards,
					attributeCards
				),
			],
		};
		this.generatedCards = {
			..._generatedCards,
			difficulty: this.difficulty,
			subjectiveRates: this.getGeneratedSubjectiveRates(_generatedCards),
		};
	}

	public selectOne(_cards: ICard[], prevCards?: ICard[]) {
		let cards = [..._cards];
		if (prevCards && prevCards.length > 0) {
			cards = cards.filter((card) => !prevCards?.includes(card));

		}
		// Logically it will have at least one card
		// if (cards.length === 0) {
		//     return prevCards;
		// }
		return cards[Math.floor(Math.random() * cards.length)];
	}

	public getGeneratedDifficulty(generatedCards: Partial<IGeneratedCards>) {
		const wordDifficulty =
			generatedCards.wordCards
				?.map((card) => card.difficulty)
				.reduce((a, b) => a + b, 0) || 0;
		const contextDifficulty =
			generatedCards.contextCards
				?.map((card) => card.difficulty)
				.reduce((a, b) => a + b, 0) || 0;
		const attributeDifficulty =
			generatedCards.attributeCards
				?.map((card) => card.difficulty)
				.reduce((a, b) => a + b, 0) || 0;
		return wordDifficulty + contextDifficulty + attributeDifficulty;
	}

	public getGeneratedSubjectiveRates(generatedCards: Partial<IGeneratedCards>) {
		const word =
			generatedCards.wordCards
				?.map((card) => card.subjectiveRate)
				.reduce((a, b) => a + b, 0) || 0;
		const context =
			generatedCards.contextCards
				?.map((card) => card.subjectiveRate)
				.reduce((a, b) => a + b, 0) || 0;
		const attribute =
			generatedCards.attributeCards
				?.map((card) => card.subjectiveRate)
				.reduce((a, b) => a + b, 0) || 0;
		return word + context + attribute;
	}

	public getGeneratedCards() {
		return this.generatedCards as IGeneratedCards;
	}
}
