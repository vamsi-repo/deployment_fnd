import * as React from "react"
import { cn } from "@/lib/utils"

// Simple Select components without Radix dependency
const Select = ({ children, value, onValueChange, ...props }: {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  [key: string]: any
}) => {
  return (
    <div className="relative" {...props}>
      {children}
    </div>
  )
}

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) => {
  return <span>{children || placeholder}</span>
}

const SelectContent = ({ children, className, ...props }: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; children: React.ReactNode }
>(({ className, children, value, onClick, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer select-none px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

// Simplified Select component that actually works
const SimpleSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})
SimpleSelect.displayName = "SimpleSelect"

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SimpleSelect
}
