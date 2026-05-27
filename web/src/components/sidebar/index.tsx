"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { menuOptions } from "@/lib/constants";
import clsx from "clsx";
import { useUser } from "@clerk/nextjs";

type Props = {
  className?: string;
};

const Sidebar = ({ className }: Props) => {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <aside className={clsx("h-screen w-64 fixed left-0 top-0 flex flex-col py-base bg-surface-container border-r border-border-subtle shadow-sm z-50", className)}>
      <div className="px-gutter mb-10 mt-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">StreamForge</h1>
        <p className="text-on-surface-variant text-sm mt-1">Premium AI Suite</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuOptions.map((menuItem) => {
          const isActive = pathName === menuItem.href;
          return (
            <Link
              key={menuItem.name}
              href={menuItem.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors duration-200",
                isActive 
                  ? "text-primary font-bold border-r-2 border-primary bg-primary-container/10" 
                  : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
              )}
            >
              {/* Note: In a real app we might map lucide icons to material-symbols, but since menuOptions has lucide icons, we can just use them! */}
              <menuItem.Component className="w-5 h-5" />
              <span className="font-label-md">{menuItem.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-border-subtle">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low border border-border-subtle">
          <img 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full object-cover" 
            src={user?.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
          />
          <div className="overflow-hidden">
            <p className="text-on-surface font-bold truncate text-sm">{user?.fullName || "Guest"}</p>
            <p className="text-on-surface-variant text-xs truncate">{user?.primaryEmailAddress?.emailAddress || "Welcome"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
