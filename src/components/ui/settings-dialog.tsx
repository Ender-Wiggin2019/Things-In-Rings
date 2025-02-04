/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-03 11:32:58
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 23:30:49
 * @Description:
 */
import { useTranslations } from "next-intl"; // declare this import

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { Switch } from "./switch";
import { Slider } from "./slider";
import { DisplaySubjectiveRateMap, EDifficulty, EDisplaySubjectiveRate } from "@/const/card";
import { useState } from "react";
import { StarSelector } from "./star-selector";
import { ISettings } from "@/const/generator";
const SETTINGS_KEY = 'card-generator-settings';

type Props = {
	onSubmit: (settings: ISettings) => void;
};

export function SettingsDialogButton({ onSubmit }: Props) {
	const t = useTranslations("Generator");

	// 初始化时从 localStorage 读取设置
	const [settings, setSettings] = useState<ISettings>(() => {
		if (typeof window !== 'undefined') {
			const savedSettings = localStorage.getItem(SETTINGS_KEY);
			if (savedSettings) {
				return JSON.parse(savedSettings);
			}
		}
		return {
			hasFanMode: false,
			displaySubjectiveRate: EDisplaySubjectiveRate.LEVEL_1,
			wordDifficulty: EDifficulty.EASY,
			contextDifficulty: EDifficulty.EASY,
			attributeDifficulty: EDifficulty.EASY,
		};
	});

	const updateSettings = (update: Partial<ISettings>) => {
		setSettings(prev => ({ ...prev, ...update }));
	};

	const handleSubmit = () => {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
		onSubmit(settings);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="bubble" size="lg" className="text-zinc-600">
					<Settings size={48} />
					{t("settings")}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t("Advanced Settings")}</DialogTitle>
					<DialogDescription>
						{t('The Settings will be saved after clicking "Confirm" button.')}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<div className="flex items-center space-x-2">
						<Label htmlFor="fan-mode">{t("Add Fan Cards")}</Label>
						<Switch
							id="fan-mode"
							checked={settings.hasFanMode}
							onCheckedChange={(checked) => updateSettings({ hasFanMode: checked })}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Label>{`${t("Subjective Rate")}: ${t(
							DisplaySubjectiveRateMap[settings.displaySubjectiveRate]
						)}`}</Label>
						<Slider
							defaultValue={[settings.displaySubjectiveRate]}
							min={EDisplaySubjectiveRate.LEVEL_1}
							max={EDisplaySubjectiveRate.LEVEL_3}
							step={EDisplaySubjectiveRate.LEVEL_1}
							onValueChange={(value) => updateSettings({ displaySubjectiveRate: value[0] })}
						/>
					</div>
					<div className="flex justify-between items-center space-x-2 text-star-dark">
						<Label>{t("Word Difficulty")}</Label>
						<StarSelector
							maxStars={3}
							value={settings.wordDifficulty}
							onChange={(value) => updateSettings({ wordDifficulty: value })}
						/>
					</div>
					<div className="flex justify-between items-center space-x-2 text-context">
						<Label>{t("Context Difficulty")}</Label>
						<StarSelector
							maxStars={3}
							value={settings.contextDifficulty}
							onChange={(value) => updateSettings({ contextDifficulty: value })}
						/>
					</div>
					<div className="flex justify-between items-center space-x-2 text-attribute">
						<Label>{t("Attribute Difficulty")}</Label>
						<StarSelector
							maxStars={3}
							value={settings.attributeDifficulty}
							onChange={(value) => updateSettings({ attributeDifficulty: value })}
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button type="submit" onClick={handleSubmit}>
						{t("Confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
