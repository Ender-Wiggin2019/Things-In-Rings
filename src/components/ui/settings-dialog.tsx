"use client";
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-03 11:32:58
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-05 21:34:22
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
import { DisplaySubjectiveRateMap, EDisplaySubjectiveRate } from "@/const/card";
import { StarSelector } from "./star-selector";
import { ISettings } from "@/const/generator";
import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import { getFanCardsLength } from "@/utils/fanCards";

type Props = {
	onSubmit: (settings: ISettings) => void;
};

export function SettingsDialogButton({ onSubmit }: Props) {
	const t = useTranslations("Generator");
	const [open, setOpen] = useState(false);
	// 初始化时从 localStorage 读取设置
	const {
		settings,
		updateSettings,
		handleSubmit: _handleSubmit,
	} = useSettings(onSubmit);

	const handleSubmit = () => {
		setOpen(false);
		_handleSubmit();
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
						{t("advanced-settings-description")}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center space-x-2">
						<Label htmlFor="fan-mode">
							{t("fan-mode", { count: getFanCardsLength() })}
						</Label>
						<Switch
							id="fan-mode"
							checked={settings.hasFanMode}
							onCheckedChange={(checked: boolean) =>
								updateSettings({ hasFanMode: checked })
							}
						/>
					</div>
					<div className="flex gap-1">
						<Label className="w-full">{`${t("Subjective Rate")}: ${t(
							DisplaySubjectiveRateMap[settings.displaySubjectiveRate]
						)}`}</Label>
						<Slider
							defaultValue={[settings.displaySubjectiveRate]}
							min={EDisplaySubjectiveRate.LEVEL_1}
							max={EDisplaySubjectiveRate.LEVEL_3}
							step={1}
							onValueChange={(value) =>
								updateSettings({ displaySubjectiveRate: value[0] })
							}
						/>
					</div>
					<div className="flex justify-between items-center space-x-2">
						<Label htmlFor="enable-difficulty">
							{t("Select Difficulty Respectively")}
						</Label>
						<Switch
							id="enable-difficulty"
							checked={settings.enableAdvancedDifficulty}
							onCheckedChange={(checked: boolean) =>
								updateSettings({ enableAdvancedDifficulty: checked })
							}
						/>
					</div>
					{settings.enableAdvancedDifficulty && (
						<>
							<div className="flex justify-between items-center space-x-2 text-star-dark">
								<Label>{t("Word Difficulty")}</Label>
								<StarSelector
									maxStars={3}
									value={settings.wordDifficulty}
									onChange={(value) =>
										updateSettings({ wordDifficulty: value })
									}
								/>
							</div>
							<div className="flex justify-between items-center space-x-2 text-context">
								<Label>{t("Context Difficulty")}</Label>
								<StarSelector
									maxStars={3}
									value={settings.contextDifficulty}
									onChange={(value) =>
										updateSettings({ contextDifficulty: value })
									}
								/>
							</div>
							<div className="flex justify-between items-center space-x-2 text-attribute">
								<Label>{t("Attribute Difficulty")}</Label>
								<StarSelector
									maxStars={3}
									value={settings.attributeDifficulty}
									onChange={(value) =>
										updateSettings({ attributeDifficulty: value })
									}
								/>
							</div>
						</>
					)}
				</div>
				<DialogFooter className="sm:justify-start">
					<Button type="submit" className="bg-bg" onClick={handleSubmit}>
						{t("Confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
