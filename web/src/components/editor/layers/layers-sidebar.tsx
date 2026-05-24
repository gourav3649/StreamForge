import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuOptions from ".";
import { Menu } from "lucide-react";
import Layers from "./index";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function LayersSideBar() {
  return (
    <div className="block md:hidden ml-auto mr-5 mb-5 mt-5">
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
            </TooltipTrigger>
            <SheetContent
                side={"right"}
                className=" p-0 m-0 overflow-y-scroll"
              >
                <Layers />
            </SheetContent>
            <TooltipContent side="top" className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border-black/10 dark:border-white/10 text-black dark:text-white">
              <p>Open Layers</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Sheet>
    </div>
  );
}
