/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 13:58:48
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-02 14:04:26
 * @Description:
 */

import Card from "./card";
import { type ICard } from "@/const/card";

export const CardList = ({ cards }: { cards: ICard[] }) => {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{cards.map((card) => (
				<Card key={card.id} card={card} cardSize='sm' />
			))}
		</div>
	);
};
