
"use client"
import { useRef, useState} from 'react'

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import * as React from "react";
import { 
  Menu as MenuIcon  
} from "lucide-react";

const TabDock = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    items: { title: string; icon: React.ReactNode; value: string; content: React.ReactNode }[];
    desktopClassName?: string;
    mobileClassName?: string;
  }
>(({ className, items, desktopClassName, mobileClassName, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      <TabDockDesktop items={items} className={desktopClassName} />
      <TabDockMobile items={items} className={mobileClassName} />
      <TabsContent items={items} />
    </TabsPrimitive.Root>
  );
});
TabDock.displayName = "TabDock";

const TabDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; value: string; content: React.ReactNode }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <TabsPrimitive.List className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <TabsPrimitive.Trigger
                  value={item.value}
                  className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </TabsPrimitive.Trigger>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center"
      >
        <MenuIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </TabsPrimitive.List>
  );
};
const TabDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; value: string; content: React.ReactNode }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  
  return (
    <TabsPrimitive.List
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex h-16 gap-4 items-end rounded-t-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 max-w-md w-full rounded-2xl",
        className
      )}
    >
      {items.map((item) => (
        <TabTriggerContainer
          mouseX={mouseX}
          key={item.value}
          {...item}
        />
      ))}
    </TabsPrimitive.List>
  );
};

function TabTriggerContainer({
  mouseX,
  title,
  icon,
  value,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  value: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <TabsPrimitive.Trigger
      value={value}
      className="focus-visible:outline-none"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </TabsPrimitive.Trigger>
  );
}

const TabsContent = ({ items }: { 
  items: { title: string; icon: React.ReactNode; value: string; content: React.ReactNode }[] 
}) => {
  return (
    <>
      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className="mt-4 focus-visible:outline-none"
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </>
  );
};

export { TabDock };