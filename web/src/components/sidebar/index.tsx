"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constants";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import { ModeToggle } from "../global/mode-toggle";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const MenuOptions = ({ className }: Props) => {
  const pathName = usePathname();

  return (
    <nav
      className={cn(
        "dark:bg-black h-screen overflow-scroll justify-between flex items-center flex-col gap-10 py-6 px-2 border-r border-white/[0.06]",
        className
      )}
    >
      <div className="flex items-center max-w-[80px] justify-center flex-col gap-8">
        {/* StreamForge Logo */}
        <Link
          className="flex items-center justify-center flex-col gap-1"
          href="/"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-400 tracking-tight">
            StreamForge
          </span>
        </Link>

        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        "group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer transition-colors duration-200",
                        {
                          "dark:bg-violet-500/20 bg-violet-100":
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/80 backdrop-blur-xl border-white/10"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>

        <Separator className="bg-white/[0.06]" />
      </div>
      <div className="flex items-center justify-center flex-col gap-8 mt-[10px]">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MenuOptions;
