import { ReactNode } from "react";

const DefaultView = ({ children }: { children?: ReactNode }) => (
  <div className="h-screen w-screen px-4 pt-4">{children}</div>
);

export default DefaultView;
