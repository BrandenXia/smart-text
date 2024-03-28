import clsx, { ClassValue } from "clsx/lite";
import { twMerge } from "tailwind-merge";

const cn = (...args: ClassValue[]) => twMerge(clsx(...args));

export default cn;
