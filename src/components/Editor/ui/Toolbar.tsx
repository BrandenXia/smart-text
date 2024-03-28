import { ReactNode } from "react";

const Toolbar = ({ children }: { children?: ReactNode }) => (
  <div className="flex w-full justify-center md:justify-start">
    <div className="flex gap-x-1 p-2 items-center">
      {children}
    </div>
  </div>
);

const ToolbarDivider = () => (
  <div
    className="h-3/4 border-r border-neutral-content w-0 mx-4"
  />
);

export default Toolbar;
export { ToolbarDivider };
