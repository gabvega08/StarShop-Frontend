import { ArrowLeft, PawPrint, Search } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col gap-4 text-center px-3 md:px-0">
      <div className="flex flex-col justify-center items-center">
        <PawPrint className="w-14 h-14" />
        <PawPrint className="w-14 h-14 -ml-20" />
      </div>
      <h1 className="text-4xl md:text-6xl mt-10">Oops! Page not found.</h1>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10 flex flex-col gap-5 md:flex-row justify-evenly px-8 md:px-0">
        <Link
          href="/"
          aria-label="Back to Home"
          className=" border border-white rounded-full px-6 py-2 cursor-pointer hover:border-gray-600 hover:text-gray-300"
        >
          <ArrowLeft className="inline w-4" /> Back to home
        </Link>

        <Link
          href="/"
          aria-label="Search Page"
          className=" border border-white rounded-full px-6 py-2 cursor-pointer hover:border-gray-600 hover:text-gray-300"
        >
          <Search className="inline w-6 mr-2" /> Search
        </Link>

        <Link
          href="/dashboard"
          aria-label="Popular Page"
          className=" border border-white rounded-full px-6 py-2 cursor-pointer hover:border-gray-600 hover:text-gray-300"
        >
          Check Popular Page
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
