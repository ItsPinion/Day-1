import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme";
import { UserNav } from "../user-nav";
import { GiFeather } from "react-icons/gi";;
import { LuLayoutDashboard } from "react-icons/lu";

export function Header() {
  return (
    <>
<header className="fixed top-0 w-full bg-accent/80 backdrop-blur-md py-2 shadow-md z-50 px-4 md:px-6 flex items-center ml-3 rounded-b-xl">
        <Link className="mr-6" href="/">
          <GiFeather className="h-10 w-10 " />
          <span className="sr-only">Home</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
        <Link href="/dashboard/links"><Button className="text-sm mx-auto sm:ml-auto space-x-1">
            <LuLayoutDashboard className="h-4 w-4 " />
            <p>DashBoard</p>
          </Button></Link>
          <ModeToggle />
          <UserNav />

        </div>
      </header>
    </>
  );
}
