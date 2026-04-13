import * as React from "react";

import { cn } from "./utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ 
  label, 
  error, 
  icon,
  rightIcon,
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full h-12 px-4 ${icon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''} bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
