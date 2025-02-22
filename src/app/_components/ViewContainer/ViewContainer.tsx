"use client";

import Navbar from "../NavBar/NavBar";

export default function ViewContainer() {
  return (
    <div className="flex h-screen">
      {" "}
      {/* Full height container */}
      <Navbar className="h-full" /> {/* Ensure Navbar takes full height */}
      <div className="flex min-h-0 flex-1 flex-col bg-white transition-all duration-300">
        <div className="p-2 lg:hidden">
          <button
            type="button"
            className="flex size-8 items-center justify-center gap-x-3 rounded-full text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-sidebar-content-push"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-sidebar-content-push"
          >
            <svg
              className="size-4 shrink-0 sm:hidden"
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
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
            <svg
              className="hidden size-4 shrink-0 sm:block"
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
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m10 15-3-3 3-3" />
            </svg>
            <span className="sr-only">Navigation Toggle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
