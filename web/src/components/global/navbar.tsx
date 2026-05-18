import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Zap,
  Menu,
} from "lucide-react";

type Props = {};

const Navbar = async (props: Props) => {
  const user = await currentUser();
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-6 bg-black/60 backdrop-blur-xl z-[100] flex items-center border-b border-white/[0.06] justify-between">
      {/* Logo */}
      <aside className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
          <Zap size={16} className="text-white" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">
          StreamForge
        </span>
      </aside>

      {/* Navigation Links */}
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-8 list-none">
          <li>
            <Link
              href="#features"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#pricing"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Side */}
      <aside className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors duration-200"
        >
          {user ? "Dashboard" : "Get Started"}
        </Link>
        {user ? <UserButton afterSignOutUrl="/" /> : null}
        <Menu className="md:hidden text-neutral-400" size={20} />
      </aside>
    </header>
  );
};

export default Navbar;
