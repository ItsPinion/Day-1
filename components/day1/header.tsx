import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme";
import { UserNav } from "../user-nav";
import { GiFeather } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { GiMaterialsScience } from "react-icons/gi";

export function Header() {
  return (
    <>
      <header className="fixed top-0 w-full bg-accent/80 backdrop-blur-md py-2 shadow-md z-50 px-4 md:px-6 flex items-center ml-3 rounded-b-xl">
        <Link className="mr-6 flex flex-row" href="/">
          <GiMaterialsScience className="h-10 w-10 " />
          <span className="sr-only">Home</span>
          <span className="text-3xl font-sans">Day</span>
          <span className="text-lg sans-serif font-sans">1</span>
        </Link>
        <nav className="hidden sm:flex sm:space-x-4">
          <Link className="text-sm font-medium hover:underline" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline" href="/about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline" href="/contact">
            Contect
          </Link>
          <Link className="text-sm font-medium hover:underline" href="/report">
            Report
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Link href="/profile">
            <Button className="text-sm mx-auto sm:ml-auto space-x-1">
              <LuLayoutDashboard className="h-4 w-4 " />
              <p>Past Reports</p>
            </Button>
          </Link>
          <ModeToggle />
          <UserNav />
        </div>
      </header>
    </>
  );
}
