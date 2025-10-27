import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#D97757] text-primary-foreground hover:bg-[#D97757]/90 shadow-card hover:shadow-hover",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-card-border bg-background hover:bg-[#D97757]/20  hover:text-[#2C3E50] shadow-card hover:shadow-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-card hover:shadow-hover",
        ghost: "hover:bg-[#D97757] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // NeuroBytes specific variants
        hero: "bg-[#D97757] text-pure-white hover:bg-[#D97757]/90 hover:shadow-glow shadow-card",
        "hero-outline":
          "border-2 border-pure-white text-pure-white bg-transparent hover:bg-pure-white hover:text-dark-gray",
        cta: "bg-[#D97757] text-pure-white hover:bg-[#D97757]/90 hover:shadow-glow text-base font-bold",
        "cta-outline":
          "border-2 border-[#D97757] text-[#D97757] bg-transparent hover:bg-[#D97757] hover:text-pure-white",
      },

      // variant: {
      //   default:
      //     "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-hover",
      //   destructive:
      //     "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      //   outline:
      //     "border border-card-border bg-background hover:bg-accent hover:text-accent-foreground shadow-card hover:shadow-hover",
      //   secondary:
      //     "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-card hover:shadow-hover",
      //   ghost: "hover:bg-accent hover:text-accent-foreground",
      //   link: "text-primary underline-offset-4 hover:underline",
      //   // NeuroBytes specific variants
      //   hero: "bg-electric-blue text-pure-white hover:bg-electric-blue/90 hover:shadow-glow shadow-card",
      //   "hero-outline":
      //     "border-2 border-pure-white text-pure-white bg-transparent hover:bg-pure-white hover:text-dark-gray",
      //   cta: "bg-electric-blue text-pure-white hover:bg-electric-blue/90 hover:shadow-glow text-base font-bold",
      //   "cta-outline":
      //     "border-2 border-electric-blue text-electric-blue bg-transparent hover:bg-electric-blue hover:text-pure-white",
      // },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-xl px-10 text-base",
        xl: "h-16 rounded-xl px-12 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
