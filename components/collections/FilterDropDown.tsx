"use client";

import { cn } from "@/lib/utils";

import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CategoryCheckbox from "../form/CategoryCheckbox";
import ColourCheckbox from "../form/ColourCheckbox";
import SortByCheckbox from "../form/SortByCheckbox";
import PriceRangeCheckbox from "../form/PriceRangeCheckbox";

function FilterDropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex gap-3.5">
        <button
          className="flex gap-1.5 items-center text-black/80 text-base"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span>Filter & Sort</span>
          <ChevronDown
            className={cn(
              "transition-transform size-[20px]",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        <Link
          onClick={() => setIsDropdownOpen(false)}
          href="/collections"
          className={cn(
            "gap-1.5 decoration-none transition-all hidden text-black/80 text-base items-center",
            isDropdownOpen && "animate-in fade-in flex"
          )}
        >
          <span>Clear all</span>
          <X className={"size-[20px]  text-black/80"} />
        </Link>
      </div>

      {isDropdownOpen && (
        <form className="w-full border relative animate-in fade-in slide-in-from-top-0 border-[#C0C0C0] bg-[#f8f8f8] py-5 px-4 flex flex-col justify-start items-start md:flex-row md:justify-center gap-20 md:items-center rounded-3xl ">
          <CategoryCheckbox />
          <ColourCheckbox />
          <PriceRangeCheckbox />
          <SortByCheckbox />

          <button
            onClick={() => setIsDropdownOpen(false)}
            className={cn(
              "gap-1.5 cursor-pointer absolute top-0 right-0 translate-y-5 -translate-x-5 transition-all flex text-black/80 text-base items-center"
            )}
          >
            <span>Close</span>
            <X className={"size-[20px]  text-black/80"} />
          </button>
        </form>
      )}
    </div>
  );
}
export default FilterDropDown;
