import { ReactNode } from "react";

const DefaultView = ({ children }: { children?: ReactNode }) => (
  <div className="h-screen w-screen px-10 pt-10">{children}</div>
);

export default DefaultView;
