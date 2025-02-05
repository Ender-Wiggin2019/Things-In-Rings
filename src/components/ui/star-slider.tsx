/*
 * @Author: Ender-Wiggin
 * @Date: 2025-02-02 19:37:06
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-03 12:35:16
 * @Description:
 */
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center max-w-96",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-star-dark">
      <SliderPrimitive.Range className="absolute h-full bg-star" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-8 scale-125 bg-[url('/assets/star.png')] bg-contain bg-no-repeat bg-center" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
