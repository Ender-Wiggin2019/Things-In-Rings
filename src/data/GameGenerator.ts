import {
	EDifficulty,
	EDisplayDifficulty,
	ESubjectiveRate,
	ICard,
} from "@/const/card";
import {
	OfficialAttributeCards,
	OfficialContextCards,
	OfficialWordCards,
} from "./OfficialCards";
import { IDifficulties, IGeneratedCards } from "@/const/generator";
import { getDifficulties } from "@/utils/getDifficulties";

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
		_wordDifficulty?: EDifficulty,
		_contextDifficulty?: EDifficulty,
		_attributeDifficulty?: EDifficulty
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
			wordDifficulty: _wordDifficulty || wordDifficulty,
			contextDifficulty: _contextDifficulty || contextDifficulty,
			attributeDifficulty: _attributeDifficulty || attributeDifficulty,
		};
        console.log('🎸 [test] - GameGenerator - wordDifficulty:', this.difficulty);

		this.wordCards = OfficialWordCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && card.difficulty <= wordDifficulty
		);
		this.contextCards = OfficialContextCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && card.difficulty <= contextDifficulty
		);
		this.attributeCards = OfficialAttributeCards.filter((card) =>
			subjectiveRates.includes(card.subjectiveRate) && card.difficulty <= attributeDifficulty
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
