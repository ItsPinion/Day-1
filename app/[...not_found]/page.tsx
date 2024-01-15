import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
      <SearchIcon className="w-12 h-12 mx-auto " />
      <h2 className="mt-2 text-4xl font-extrabold ">404 | Page Not Found</h2>
      <p className="mt-2 text-lg ">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Button className="text-sm mx-auto lg:ml-auto">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

function SearchIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
