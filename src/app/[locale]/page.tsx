"use client";
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 23:33:16
 * @Description:
 */
import { useTranslations } from "next-intl"; // declare this import
import { useRef, useState } from "react";
import { GameGenerator } from "@/data/GameGenerator";
import { DEFAULT_SUBJECTIVE_RATES, IGeneratedCards, ISettings } from "@/const/generator";
import { Button } from "@/components/ui/button";
import Card from "@/components/cards/card";
import { Slider } from "@/components/ui/star-slider";
import { DisplayDifficultyMap, EDisplayDifficulty } from "@/const/card";
import { SettingsDialogButton } from "@/components/ui/settings-dialog";
import { getSubjectiveRates } from "@/utils/getSubjectiveRates";

export default function Page() {
	const [generatedCards, setGeneratedCards] = useState<IGeneratedCards>();
  const [settings, setSettings] = useState<ISettings>();
	const [displayDifficulty, setDisplayDifficulty] =
		useState<EDisplayDifficulty>(EDisplayDifficulty.LEVEL_1);
	const GameGeneratorRef = useRef<GameGenerator>(null);

	const handleValueChange = (value: number[]) => {
		setDisplayDifficulty(value[0]);
	};

	const handleGenerate = () => {
    let gameGenerator: GameGenerator;
    if (settings) {
      gameGenerator = new GameGenerator(
        displayDifficulty,
        settings,

      );
    }
		gameGenerator = new GameGenerator(
			displayDifficulty,
			DEFAULT_SUBJECTIVE_RATES,
      false,
		);
		GameGeneratorRef.current = gameGenerator;
		gameGenerator.generate();
		setGeneratedCards(gameGenerator.getGeneratedCards());
		console.log(gameGenerator.getGeneratedCards());
	};

	const handleRerollWordCard = () => {
		GameGeneratorRef.current?.rerollWordCard();
		setGeneratedCards(GameGeneratorRef.current?.getGeneratedCards());
	};

	const handleRerollContextCard = () => {
		GameGeneratorRef.current?.rerollContextCard();
		setGeneratedCards(GameGeneratorRef.current?.getGeneratedCards());
	};

	const handleRerollAttributeCard = () => {
		GameGeneratorRef.current?.rerollAttributeCard();
		setGeneratedCards(GameGeneratorRef.current?.getGeneratedCards());
	};

  const handleSettings = (s: ISettings) => {
    setSettings(s);
  };

	const t = useTranslations("Generator"); // declare the hook passing into parameter a context name
	return (
		<div className="flex flex-col gap-4 items-start">
			<div className="text-white text-2xl mb-2">{`${t("difficulty")}: ${t(
				DisplayDifficultyMap[displayDifficulty]
			)}`}</div>
			<Slider
				defaultValue={[displayDifficulty]}
				min={EDisplayDifficulty.LEVEL_1}
				max={EDisplayDifficulty.LEVEL_5}
				step={EDisplayDifficulty.LEVEL_1}
				onValueChange={handleValueChange}
			/>
      <div className="flex w-full justify-between items-center gap-4">

			{/* <BubbleButton text={'Click'} onClick={handleGenerate}>Click Me</BubbleButton> */}
			<Button variant="bubble" size="lg" onClick={handleGenerate}>
				{t("generate")}
			</Button>
      <SettingsDialogButton onSubmit={handleSettings}/>
      </div>

			{generatedCards && (
				<div className="flex w-full flex-col justify-start items-center gap-4">
					<div className="flex gap-4 justify-center">
						<Card card={generatedCards.wordCards[0]} />
						<Button className="bg-word border-2 border-primary text-primary" onClick={handleRerollWordCard}>Reroll</Button>
					</div>
					<div className="flex gap-4 justify-center">
						<Card card={generatedCards.contextCards[0]} />
						<Button className="bg-context border-2 border-primary" onClick={handleRerollContextCard}>Reroll</Button>
					</div>
					<div className="flex gap-4 justify-center">
						<Card card={generatedCards.attributeCards[0]} />
						<Button className="bg-attribute border-2 border-primary" onClick={handleRerollAttributeCard}>Reroll</Button>
					</div>
				</div>
			)}
		</div>
	);
}
