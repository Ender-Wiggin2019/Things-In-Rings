/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-02 14:05:22
 * @Description:
 */
// import { useTranslations } from 'next-intl'; // declare this import
import { OfficialCards } from "@/data/OfficialCards";
import { CardList } from "@/components/cards/card-list";

export default function Page() {
	//   const t = useTranslations('Home'); // declare the hook passing into parameter a context name
	const cards = OfficialCards;
	return <CardList cards={cards} />;
}
