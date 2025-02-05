"use client";
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-05 17:10:43
 * @Description:
 */
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { ICard } from "@/const/card";
import { getColor } from "@/utils/getColor";
import BaseCard from "./base-card";
import BaseInfo from "./card-info";

type CardProps = {
	card: ICard;
	cardSize?: "sm";
	showInfo?: boolean;
};

const Card = ({ card, cardSize, showInfo }: CardProps) => {
	const bgColor = getColor(card.type);
	const [isFlipped, setIsFlipped] = useState(false);
	if (!showInfo) {
		return (
			<BaseCard content={card.content} bgColor={bgColor} cardSize={cardSize} />
		);
	}
	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div onClick={() => setIsFlipped(!isFlipped)}>
				<BaseCard
					content={card.content}
					bgColor={bgColor}
					cardSize={cardSize}
				/>
			</div>
			<div onClick={() => setIsFlipped(!isFlipped)}>
				<BaseInfo card={card} bgColor={bgColor} cardSize={cardSize} />
			</div>
		</ReactCardFlip>
	);
};

export default Card;
