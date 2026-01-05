import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "flex h-9 w-full min-w-0 rounded-md bg-input/20 px-3 py-1 text-base md:text-sm",
        "border border-neutral-800/60 text-foreground",
        "placeholder:text-muted-foreground",
        "transition-colors outline-none",

        // Focus (NO WHITE RING)
        "focus:border-neutral-700 focus:ring-0",

        // File input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",

        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  )
}

export { Input }
