import * as React from "react";

const TooltipProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
TooltipProvider.displayName = "TooltipProvider";

export { TooltipProvider };
