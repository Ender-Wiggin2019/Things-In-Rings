/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 11:39:06
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-08 18:37:42
 * @Description:
 */
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { Link, routing } from "@/i18n/routing";
import { Bubblegum_Sans, ZCOOL_KuaiLe } from "next/font/google";
import { setRequestLocale, getTranslations } from "next-intl/server";

import "./globals.css";
import Script from "next/script";
import LocaleSwitcher from "@/components/ui/locale-selector";

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
	/* @next-codemod-ignore */
	let { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations({ locale, namespace: "Layout" });

	// Ensure that the incoming `locale` is valid
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (!routing?.locales?.includes(locale as any)) {
		locale = "en";
	}

	const messages = await getMessages();
	return (
		<html lang={locale}>
			<body
				className={`${
					locale === "zh-CN" ?  cnFont.className : enFont.className
				} antialiased bg-bg min-h-screen flex flex-col py-1`}
			>
				<div className="absolute top-2 left-2">
					<LocaleSwitcher
						locale={locale}
						locales={routing?.locales || []}
						route="/"
					/>
				</div>
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
						<Link href={"/"} className="text-white underline hover:underline">
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
			<Script
				async
				src="https://umami.ender-wiggin.com/script.js"
				data-website-id="33d420b0-b494-4b81-acca-713e5302af1e"
			></Script>
		</html>
	);
}
