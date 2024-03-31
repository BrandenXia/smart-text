import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import cn from "@utils/cn.ts";
import * as SelectPrimitive from "@radix-ui/react-select";

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
        "mx-3 h-3/4 w-0 border-r border-neutral-content",
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
  <label
    className={cn(
      "flex cursor-pointer rounded-xl p-2 transition-colors hover:bg-base-200 has-[:checked]:bg-base-200 dark:hover:bg-neutral dark:has-[:checked]:bg-neutral",
      className,
    )}
    htmlFor={id}
  >
    <input
      type="checkbox"
      className="peer hidden"
      id={id}
      {...props}
      ref={ref}
    />
    {children}
  </label>
));

const SelectRoot = forwardRef<
  ElementRef<typeof SelectPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & { className?: string }
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger className="flex items-center justify-center gap-x-3 rounded-xl p-2 leading-none outline-none transition-colors hover:bg-base-200">
      <SelectPrimitive.Value />
      <SelectPrimitive.Icon className="flex">
        <div className="i-ph-caret-down" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        className={cn(
          "rounded-lg border border-base-content/5 shadow dark:border-base-content/15",
          className,
        )}
        ref={ref}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
));

const SelectOption = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex select-none items-center rounded-lg p-2 leading-none data-[highlighted]:bg-base-300 data-[highlighted]:outline-none",
      className,
    )}
    ref={ref}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

const Toolbar = {
  Root,
  Divider,
  Button,
  ToggleButton,
  Select: {
    Root: SelectRoot,
    Option: SelectOption,
  },
};

export default Toolbar;
