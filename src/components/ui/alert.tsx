import * as React from "react";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "info";
  className?: string;
  children?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles = "relative w-full rounded-lg border p-4";
    const variantStyles = {
      default: "bg-white border-gray-200 text-gray-900",
      destructive: "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600",
      info: "bg-blue-50/50 border-blue-100 text-blue-700 [&>svg]:text-blue-700"
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
}

export const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`text-sm [&_p]:leading-relaxed ${className}`}
        {...props}
      />
    );
  }
);
AlertDescription.displayName = "AlertDescription";

export default {
  Alert,
  AlertDescription
};