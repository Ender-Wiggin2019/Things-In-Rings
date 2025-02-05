/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 15:22:43
 * @Description:
 */
import { useTranslations } from 'next-intl'; // declare this import
import { OfficialCards } from "@/data/OfficialCards";
import { CardList } from "@/components/cards/card-list";
import { FanCards } from "@/data/FanCards";

export default function Page() {
	  const t = useTranslations('List'); // declare the hook passing into parameter a context name
	return (
	<div className="flex flex-col gap-4">
		<h1 className="text-3xl font-bold">{t('Official Cards')}</h1>
		<CardList cards={OfficialCards} showInfo />
		<h1 className="text-3xl font-bold mt-2">{t('Fan Cards')}</h1>
		<CardList cards={FanCards} showInfo />
	</div>

	)
}
