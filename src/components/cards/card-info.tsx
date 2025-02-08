/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-05 21:34:02
 * @Description:
 */
import React from "react";
import { useTranslations } from "next-intl";
import withBaseContainer from "./base-container"; // 导入高阶组件
import { ECardSource, ICard } from "@/const/card";
import { Label } from "../ui/label";
import { StarSelector } from "../ui/star-selector";
import { getSubjectiveText } from "@/utils/subjectiveRate";
import { getCardSource } from "@/utils/fanCards";
import { getDifficultyText } from "@/utils/difficulty";
type BaseInfoProps = {
	card: ICard;
};

const BaseInfo = ({ card }: BaseInfoProps) => {
	const t = useTranslations("card");
	return (
		<>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex justify-center items-center">
					<h1 className="text-3xl font-bold">
						{t(getDifficultyText(card.difficulty))}
					</h1>
				</div>
				<div className="flex justify-center items-center">
					<StarSelector value={card.difficulty} size={36} />
				</div>
				<div className="flex justify-between items-center">
					<Label>{t("Subjective Rate")}:</Label>
					<div>{t(getSubjectiveText(card.subjectiveRate))}</div>
				</div>
				{card.source !== ECardSource.OFFICIAL && (
					<div className="flex justify-between items-center">
						<Label>{t("Source")}:</Label>
						<div>{t(getCardSource(card.source))}</div>
					</div>
				)}
				{card.author && (
					<div className="flex justify-between items-center">
						<Label>{t("Author")}:</Label>
						<div>{card.author}</div>
					</div>
				)}
			</div>
		</>
	);
};

export default withBaseContainer(BaseInfo);
