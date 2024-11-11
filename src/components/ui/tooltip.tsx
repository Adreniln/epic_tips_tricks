import * as React from "react"
import { cn } from "@/lib/utils"

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, children }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [position, setPosition] = React.useState<'right' | 'left'>('right');
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const updatePosition = React.useCallback(() => {
      if (!tooltipRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // If tooltip would overflow on right side, switch to left
      if (container.right + tooltip.width + 8 > viewportWidth) {
        setPosition('left');
      } else {
        setPosition('right');
      }
    }, []);

    React.useEffect(() => {
      if (isVisible) {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
      }
    }, [isVisible, updatePosition]);

    const tooltipStyles = {
      right: cn(
        "absolute px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg",
        "left-full top-1/2",
        "-translate-y-1/2 translate-x-2",
        "w-64 z-50"
      ),
      left: cn(
        "absolute px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg",
        "right-full top-1/2",
        "-translate-y-1/2 -translate-x-2",
        "w-64 z-50"
      )
    };

    return (
      <div
        className="relative inline-block overflow-visible"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        ref={containerRef}
      >
        <div ref={ref} className="overflow-visible">
          {children}
        </div>
        {isVisible && (
          <div
            ref={tooltipRef}
            className={cn(tooltipStyles[position], className)}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip"

export { Tooltip }