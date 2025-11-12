/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-01 12:17:19
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-05-25 23:36:48
 * @Description:
 */
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "zh-CN", "ja-JP", "nl-BE"], // Define in this line the possible languages for translation
  defaultLocale: "en", // Define in this line the default language to be shown
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);