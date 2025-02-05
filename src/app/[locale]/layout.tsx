/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Oushuo Huang
 * @LastEditTime: 2025-02-05 12:15:40
 * @Description:
 */
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import { Bubblegum_Sans, ZCOOL_KuaiLe } from "next/font/google";
import { setRequestLocale, getTranslations } from "next-intl/server";

import "./globals.css";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

const enFont = Bubblegum_Sans({
	weight: "400",
	subsets: ["latin"],
});

const cnFont = ZCOOL_KuaiLe({
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Things In Rings Fan App",
	description: "More cards, more fun!",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "Layout" });

	// Ensure that the incoming `locale` is valid
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	const messages = await getMessages();
	return (
		<html lang="en">
			<body
				className={`${
					locale === "en" ? enFont.className : cnFont.className
				} antialiased bg-bg min-h-screen flex flex-col py-1`}
			>
				<div className="flex justify-center items-center from-current to-transparent">
					<Image src="/assets/logo.png" width={100} height={100} alt="logo" />
				</div>
				<main className="flex-1 px-2">
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</main>
				<footer className="w-full py-4">
					<div className="container mx-auto px-2 flex justify-between gap-4 text-sm">
						<Link
							href={"/card-list"}
							className="text-white underline hover:underline"
						>
							{t("Card List")}
						</Link>
						<Link
							href={"/"}
							className="text-white underline hover:underline"
						>
							{t("Generator")}
						</Link>
						<Link
							href={
								"https://docs.google.com/spreadsheets/d/1VxIXf5RiGQGDnk4eoLz4tDqIaKmzvNnropPOSWjrh2w/edit?usp=sharing"
							}
							className="text-white underline hover:underline"
						>
							{t("Add Cards")}
						</Link>
						{locale !== "zh-CN" && (
							<Link
								href={
									" https://github.com/Ender-Wiggin2019/Things-In-Rings?tab=readme-ov-file#help-to-translate"
								}
								className="text-white underline hover:underline"
							>
								{t("Help Translate")}
							</Link>
						)}
					</div>
				</footer>
			</body>
		</html>
	);
}
