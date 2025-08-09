import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/40 border-input flex h-10 w-full min-w-0 rounded-lg border-2 bg-background/50 backdrop-blur-sm px-4 py-2.5 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-ring focus:ring-2 focus:ring-ring/20 focus:shadow-md",
        "hover:border-ring/60 hover:shadow-sm",
        "aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
