import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import cn from "@utils/cn.ts";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as SelectPrimitive from "@radix-ui/react-select";

const Root = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <div className={className}>
    <div className="flex w-full justify-center md:justify-start">
      <ToolbarPrimitive.Root
        className="flex items-center gap-x-1 p-2"
        ref={ref}
        {...props}
      >
        {children}
      </ToolbarPrimitive.Root>
    </div>
  </div>
));

const Divider = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    className={cn("mx-3 h-3/4 w-0 border-r border-neutral-content", className)}
    ref={ref}
    {...props}
  />
));

const Button = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Button>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    className={cn(
      "rounded-xl p-2 transition-colors hover:bg-base-200 disabled:cursor-not-allowed disabled:text-neutral-content disabled:hover:bg-base-100 dark:disabled:text-neutral-content/50",
      className,
    )}
    ref={ref}
    {...props}
  />
));

const ToggleGroup = forwardRef<
  ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>((props, ref) => (
  <ToolbarPrimitive.ToggleGroup asChild {...props} ref={ref} />
));

const ToggleItem = forwardRef<
  ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    className={cn(
      "flex cursor-pointer rounded-xl p-2 transition-colors hover:bg-base-200 data-[state=on]:bg-base-200 dark:hover:bg-neutral dark:data-[state=on]:bg-neutral",
      className,
    )}
    {...props}
    ref={ref}
  >
    {children}
  </ToolbarPrimitive.ToggleItem>
));

const SelectRoot = forwardRef<
  ElementRef<typeof SelectPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
    className?: string;
    "aria-label"?: string;
  }
>(({ children, className, "aria-label": ariaLabel, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    <ToolbarPrimitive.Button asChild>
      <SelectPrimitive.Trigger
        className="flex items-center justify-center gap-x-3 rounded-xl p-2 leading-none transition-colors hover:bg-base-200"
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="flex">
          <div className="i-ph-caret-down" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </ToolbarPrimitive.Button>
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
  Toggle: {
    Group: ToggleGroup,
    Item: ToggleItem,
  },
  Select: {
    Root: SelectRoot,
    Option: SelectOption,
  },
};

export default Toolbar;
