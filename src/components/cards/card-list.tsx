/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 13:58:48
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 14:57:08
 * @Description:
 */

import Card from "./card";
import { type ICard } from "@/const/card";

export const CardList = ({ cards, showInfo = true }: { cards: ICard[], showInfo?: boolean }) => {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{cards.map((card) => (
				<Card key={card.id} card={card} cardSize='sm' showInfo={showInfo} />
			))}
		</div>
	);
};
