/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 11:48:50
 * @Description:
 */
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import withBaseContainer from "./base-container"; // 导入高阶组件

type BaseCardProps = {
	content: string;
};

const BaseCard = ({ content }: BaseCardProps) => {
	const t = useTranslations("card");
	return (
		<>
			<div className="absolute inset-0 flex items-center justify-center">
				<Image src="/assets/container.png" alt="alt" width={300} height={300} />
			</div>
			<div className="w-32 relative z-10 text-center font-bold">
				{t(content)}
			</div>
		</>
	);
};

export default withBaseContainer(BaseCard);
