"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, max,bgc,...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-white", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1  transition-all"
      style={{ transform: `translateX(-${max - (value || 0)}%)`,
                backgroundColor: bgc || "#333"}} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
