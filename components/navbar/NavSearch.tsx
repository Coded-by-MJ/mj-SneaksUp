"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";

function NavSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/collections?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <div className="w-full lg:w-[300px] h-[36px] focus-within:ring-1 focus-within:ring-white bg-transparent px-2 py-3 border border-white rounded-md flex items-center gap-2">
      <GoSearch className="text-white size-5" />
      <input
        type="search"
        placeholder="Search"
        className="flex-grow bg-transparent text-white text-base border-none focus:outline-none "
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
      />
    </div>
  );
}
export default NavSearch;
