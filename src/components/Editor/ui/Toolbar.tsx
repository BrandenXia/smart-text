import { ComponentPropsWithoutRef, forwardRef } from "react";
import cn from "@utils/cn.ts";

const Root = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => (
    <div className={className}>
      <div className="flex w-full justify-center md:justify-start">
        <div className="flex items-center gap-x-1 p-2" ref={ref} {...props}>
          {children}
        </div>
      </div>
    </div>
  ),
);

const Divider = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "mx-4 h-3/4 w-0 border-r border-neutral-content",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    className={cn(
      "rounded-xl p-2 transition-colors hover:bg-base-200 disabled:cursor-not-allowed disabled:text-neutral-content disabled:hover:bg-base-100 dark:disabled:text-neutral-content/50",
      className,
    )}
    ref={ref}
    {...props}
  />
));

const ToggleButton = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, children, id, ...props }, ref) => (
  <span>
    <input
      type="checkbox"
      className="peer hidden"
      id={id}
      {...props}
      ref={ref}
    />
    <label
      className={cn(
        "flex cursor-pointer rounded-xl p-2 transition-colors hover:bg-base-200 peer-checked:bg-base-200 dark:hover:bg-neutral dark:peer-checked:bg-neutral",
        className,
      )}
      htmlFor={id}
    >
      {children}
    </label>
  </span>
));

const Toolbar = {
  Root,
  Divider,
  Button,
  ToggleButton,
};

export default Toolbar;
