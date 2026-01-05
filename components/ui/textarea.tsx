import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base
        "flex w-full min-h-28 rounded-md bg-input/20 px-3 py-2 text-base md:text-sm",
        "border border-neutral-800/60 text-foreground",
        "placeholder:text-muted-foreground",
        "resize-none transition-colors outline-none",

        // Focus (NO white ring)
        "focus:border-neutral-700 focus:ring-0",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
      {...props}
    />
  )
}

export { Textarea }
