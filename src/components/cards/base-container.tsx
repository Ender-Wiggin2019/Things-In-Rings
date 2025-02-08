/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 12:15:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-08 18:51:32
 * @Description:
 */
import React from "react";

const withBaseContainer = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	return function WithBaseContainer({
		bgColor,
		cardSize,
		...props
	}: P & {
		bgColor?: string;
		cardSize?: "sm";
	}) {
		return (
			<div
				className={`relative ${
					cardSize === "sm" ? "w-40 h-40 text-sm" : "w-56 h-56 text-md"
				} rounded-lg p-4 shadow-lg ${bgColor} flex items-center justify-center`}
			>
				<WrappedComponent {...(props as P)} />
			</div>
		);
	};
};

export default withBaseContainer;
