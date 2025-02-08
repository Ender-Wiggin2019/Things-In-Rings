/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-08 18:32:10
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-09 01:35:46
 * @Description:
 */

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Props = {
	locale: string;
	locales: readonly string[];
	route: string;
};
export default function LocaleSwitcher({ locale, locales, route }: Props) {
	const t = useTranslations("LocaleSwitcher");
	// const otherLocales = locales?.filter((cur) => cur !== locale);
	return (
		<div className="flex gap-2 justify-start items-center text-sm">
			<div className="text-white">{t('language')}:</div>
			{locales.map((l) => {
				return (
					<Link
                    key={l}
						href={route}
						locale={l}
						className={`${locale === l ? 'text-word border-2 border-word p-1 rounded-md' : 'text-white underline hover:underline'}`}
					>
						{t(l)}
					</Link>
				);
			})}
		</div>
	);
}
