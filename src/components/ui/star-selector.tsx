/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-03 12:42:14
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 22:51:41
 * @Description:
 */
import { useState } from "react";
import Image from "next/image";

interface StarSelectorProps {
	maxStars?: number;
	value: number;
	onChange: (value: number) => void;
	size?: number;
}

export const StarSelector = ({
	maxStars = 5,
	value,
	onChange,
	size = 20,
}: StarSelectorProps) => {
	const [hoverValue, setHoverValue] = useState<number | null>(null);

	// 当前显示的星星数量（悬浮优先于选中值）
	const displayValue = hoverValue !== null ? hoverValue : value;

	return (
		<div className="flex gap-1">
			{Array.from({ length: maxStars }).map((_, index) => (
				<button
					key={index}
					className="p-1 hover:scale-110 transition-transform"
					onClick={() => onChange(index + 1)}
					onMouseEnter={() => setHoverValue(index + 1)}
					onMouseLeave={() => setHoverValue(null)}
				>
					<Image
						src="/assets/star.png"
						alt="star"
						width={size}
						height={size}
						className={`${
							index + 1 <= displayValue ? "brightness-100" : "brightness-50"
						}`}
					/>
				</button>
			))}
		</div>
	);
};
