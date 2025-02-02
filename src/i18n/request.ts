import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from "next/headers";

export default getRequestConfig(async () => {
    const defaultLocale = (await headers()).get("accept-language")?.split(",")[0];
    const locale = (await cookies()).get("NEXT_LOCALE")?.value || defaultLocale || "en";
	return {
		locale,
		messages: (await import(`../../public/locales/${locale}.json`)).default,
	};
});
    