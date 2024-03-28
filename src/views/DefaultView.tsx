import { ReactNode } from "react";

const DefaultView = ({ children }: { children?: ReactNode }) => (
  <div className="h-screen w-screen px-5 pt-5 sm:px-10 sm:pt-5">{children}</div>
);

export default DefaultView;
