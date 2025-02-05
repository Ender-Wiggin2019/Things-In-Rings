"use client";
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-05 21:34:11
 * @Description:
 */
import { useTranslations } from "next-intl"; // declare this import
import { useRef, useState } from "react";
import { GameGenerator } from "@/data/GameGenerator";
import {
	DEFAULT_SUBJECTIVE_RATES,
	IGeneratedCards,
	ISettings,
} from "@/const/generator";
import { Button } from "@/components/ui/button";
import Card from "@/components/cards/card";
import { Slider } from "@/components/ui/star-slider";
import { DisplayDifficultyMap, EDisplayDifficulty } from "@/const/card";
import { SettingsDialogButton } from "@/components/ui/settings-dialog";
import { getSubjectiveRates } from "@/utils/getSubjectiveRates";
import { useSettings } from "@/hooks/useSettings";
import { LockKeyholeOpen, LockKeyhole } from "lucide-react";

export default function Page() {
	const { settings, setSettings } = useSettings();
	const [isLocked, setIsLocked] = useState(false);
	const [generatedCards, setGeneratedCards] = useState<IGeneratedCards>();
	const [displayDifficulty, setDisplayDifficulty] =
		useState<EDisplayDifficulty>(EDisplayDifficulty.LEVEL_1);
	const gameGeneratorRef = useRef<GameGenerator>(null);

	const handleValueChange = (value: number[]) => {
		setDisplayDifficulty(value[0]);
	};

	const handleGenerate = () => {
		let gameGenerator: GameGenerator;
		if (settings) {
			console.log("🎸 [test] - handleGenerate - settings:", settings);
			gameGenerator = new GameGenerator(
				displayDifficulty,
				getSubjectiveRates(settings.displaySubjectiveRate),
				settings
			);
		} else {
			gameGenerator = new GameGenerator(
				displayDifficulty,
				DEFAULT_SUBJECTIVE_RATES
			);
		}

		gameGeneratorRef.current = gameGenerator;
		gameGenerator.generate();
		setGeneratedCards(gameGenerator.getGeneratedCards());
		console.log(gameGenerator.getGeneratedCards());
	};

	const handleRerollWordCard = () => {
		gameGeneratorRef.current?.rerollWordCard();
		setGeneratedCards(gameGeneratorRef.current?.getGeneratedCards());
	};

	const handleRerollContextCard = () => {
		gameGeneratorRef.current?.rerollContextCard();
		setGeneratedCards(gameGeneratorRef.current?.getGeneratedCards());
	};

	const handleRerollAttributeCard = () => {
		gameGeneratorRef.current?.rerollAttributeCard();
		setGeneratedCards(gameGeneratorRef.current?.getGeneratedCards());
	};

	const handleSettings = (s: ISettings) => {
		setSettings(s);
	};

	const t = useTranslations("Generator"); // declare the hook passing into parameter a context name
	return (
		<div className="flex justify-center">
			<div className="flex flex-col gap-4 items-start w-full max-w-2xl bg-bg">
				{!settings?.enableAdvancedDifficulty && !isLocked && (
					<>
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
					</>
				)}
				<div className="flex w-full justify-between items-center gap-4">
					{/* <BubbleButton text={'Click'} onClick={handleGenerate}>Click Me</BubbleButton> */}
					{!isLocked && (
						<Button variant="bubble" size="lg" onClick={handleGenerate}>
							{t("generate")}
						</Button>
					)}
					{!isLocked && <SettingsDialogButton onSubmit={handleSettings} />}
				</div>
				{gameGeneratorRef?.current && (
					<div className="absolute right-2 top-2">
						<Button
							variant="destructive"
							className="w-20"
							size="lg"
							onClick={() => setIsLocked((prev) => !prev)}
						>
							{isLocked ? <LockKeyhole /> : <LockKeyholeOpen />}
							{t("Lock")}
						</Button>
					</div>
				)}

				{generatedCards && (
					<div className="flex w-full flex-col justify-start items-center gap-4">
						<div className="flex gap-4 justify-center">
							<Card card={generatedCards.wordCards[0]} showInfo={true} />
							{!isLocked && (
								<Button
									className="bg-word border-2 border-primary text-primary"
									onClick={handleRerollWordCard}
								>
									{t("Reroll")}
								</Button>
							)}
						</div>
						<div className="flex gap-4 justify-center">
							<Card card={generatedCards.contextCards[0]} showInfo={true} />
							{!isLocked && (
								<Button
									className="bg-context border-2 border-primary"
									onClick={handleRerollContextCard}
								>
									{t("Reroll")}
								</Button>
							)}
						</div>
						<div className="flex gap-4 justify-center">
							<Card card={generatedCards.attributeCards[0]} showInfo={true} />
							{!isLocked && (
								<Button
									className="bg-attribute border-2 border-primary"
									onClick={handleRerollAttributeCard}
								>
									{t("Reroll")}
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
