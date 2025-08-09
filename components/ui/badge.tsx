import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border-2 px-3 py-1.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary text-primary-foreground shadow-md [a&]:hover:bg-primary/90 [a&]:hover:shadow-lg [a&]:hover:scale-105",
        secondary:
          "border-secondary/30 bg-secondary text-secondary-foreground shadow-md [a&]:hover:bg-secondary/90 [a&]:hover:shadow-lg [a&]:hover:scale-105",
        destructive:
          "border-destructive/30 bg-destructive text-white shadow-md [a&]:hover:bg-destructive/90 [a&]:hover:shadow-lg [a&]:hover:scale-105 focus-visible:ring-destructive/30 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70",
        outline:
          "border-border bg-background/80 backdrop-blur-sm text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:border-accent-foreground/30 [a&]:hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
