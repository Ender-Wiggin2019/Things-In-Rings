/*
 * @Author: Oushuo Huang
 * @Date: 2025-02-05 10:59:59
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 12:15:01
 * @Description:
 */

import { useState } from "react";
import { EDisplaySubjectiveRate, EDifficulty } from "@/const/card";
import { ISettings } from "@/const/generator";

const SETTINGS_KEY = "card-generator-settings";

export const useSettings = (onSubmit?: (settings: ISettings) => void) => {
	const [settings, setSettings] = useState<ISettings>(() => {
		if (typeof window !== "undefined") {
			const savedSettings = localStorage.getItem(SETTINGS_KEY);
			if (savedSettings) {
				return JSON.parse(savedSettings);
			}
		}
		return {
			hasFanMode: false,
			displaySubjectiveRate: EDisplaySubjectiveRate.LEVEL_3,
			enableAdvancedDifficulty: false,
			wordDifficulty: EDifficulty.EASY,
			contextDifficulty: EDifficulty.EASY,
			attributeDifficulty: EDifficulty.EASY,
		};
	});

	const updateSettings = (update: Partial<ISettings>) => {
		setSettings((prev) => ({ ...prev, ...update }));
	};

	const handleSubmit = () => {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
		onSubmit?.(settings);
	};

	return { settings, setSettings, updateSettings, handleSubmit };
}