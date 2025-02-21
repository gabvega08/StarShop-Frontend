import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
const inputVariants = cva(
  'w-full rounded-lg text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F733] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-input border border-[#A855F733] text-foreground focus:border-[#A855F733] focus:ring-[#A855F733] focus:ring-offset-0 rounded-md px-3 py-2 outline-none bg-custom-dark-input-background text-white',
        space:
          'focus:border-[#A855F733] focus:ring-[#A855F733] focus:ring-offset-0 rounded-md px-3 py-2 outline-none bg-custom-dark-input-background text-white placeholder:text-white/70',
      },
      size: {
        default: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3',
      },
      hasIcon: {
        true: 'pl-12',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hasIcon: false,
    },
  },
)
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, hasIcon, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size, hasIcon: !!Icon, className }),
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
