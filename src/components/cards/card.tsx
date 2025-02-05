"use client";
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 15:14:49
 * @Description:
 */
import React from "react";
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

	if (!showInfo) {
		return (
			<BaseCard content={card.content} bgColor={bgColor} cardSize={cardSize} />
		);
	}
	return (
		<div className="flip-card">
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<BaseCard
						content={card.content}
						bgColor={bgColor}
						cardSize={cardSize}
					/>
				</div>
				<div className="flip-card-back">
					<BaseInfo card={card} bgColor={bgColor} cardSize={cardSize} />
				</div>
			</div>
		</div>
	);
};

export default Card;
