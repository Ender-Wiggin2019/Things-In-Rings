/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-02 20:54:42
 * @Description:
 */
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type BaseCardProps = {
	content: string;
	bgColor?: string;
    cardSize?: 'sm';
};

const BaseCard = ({ content, bgColor, cardSize }: BaseCardProps) => {
	const t = useTranslations("card"); // declare the hook passing into parameter a context name
	return (
		<div
			className={`relative ${cardSize === 'sm' ? 'w-40 h-40 text-sm' : 'w-60 h-60 text-md'} rounded-lg p-4 shadow-lg ${bgColor} flex items-center justify-center`}
		>
			<div className="absolute inset-0 flex items-center justify-center">
				<Image src="/assets/container.png" alt="alt" width={300} height={300} />
			</div>
			<div className="w-32 relative z-10 text-center font-bold">
				{t(content)}
			</div>
		</div>
	);
};

export default BaseCard;
