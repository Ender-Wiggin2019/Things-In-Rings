/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-02 14:03:13
 * @Description:
 */
import React from "react";
import { ICard } from "@/const/card";
import { getColor } from "@/utils/getColor";
import BaseCard from "./base-card";

type CardProps = {
	card: ICard;
    cardSize?: 'sm';
};

const Card = ({ card, cardSize }: CardProps) => {
	const bgColor = getColor(card.type);
	return <BaseCard content={card.content} bgColor={bgColor} cardSize={cardSize}/>;
};

export default Card;
