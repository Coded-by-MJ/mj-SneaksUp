"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Collections } from "@/utils/schema";

const collection: {
  men: "men";
  women: "women";
  kids: "kids";
  unisex: "unisex";
} = {
  men: "men",
  women: "women",
  kids: "kids",
  unisex: "unisex",
};

function CategoryCheckbox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory =
    (searchParams.get("category")?.split(",") as Collections) || [];
  const [selectedCategory, setSelectedCategory] =
    useState<Collections>(initialCategory);

  const updateCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const { checked, value } = e.target;

    let updatedCategory = [...selectedCategory];

    if (checked && value === "unisex") {
      if (!updatedCategory.includes("men")) updatedCategory.push("men");
      if (!updatedCategory.includes("women")) updatedCategory.push("women");
    } else if (checked) {
      if (!updatedCategory.includes(value as "men" | "women" | "kids"))
        updatedCategory.push(value as "men" | "women" | "kids");
    } else {
      updatedCategory = updatedCategory.filter(
        (Category) => Category !== value
      );
    }

    if (!checked && value === "unisex") {
      updatedCategory = updatedCategory.filter(
        (Category) => Category !== "men" && Category !== "women"
      );
    }

    setSelectedCategory(updatedCategory);
    if (updatedCategory.length > 0) {
      params.set("category", updatedCategory.join(","));
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const category =
      (searchParams.get("category")?.split(",") as Collections) || [];
    setSelectedCategory(category);
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-black text-base font-medium">Category</h4>
      <div className="flex flex-col gap-2">
        <label htmlFor="men" className="flex gap-1.5">
          <input
            type="checkbox"
            id="men"
            name="Category"
            className="accent-black"
            onChange={(e) => updateCategory(e)}
            checked={selectedCategory.includes(collection.men)}
            defaultValue={collection.men}
          />
          <span className="capitalize text-sm">men</span>
        </label>
        <label htmlFor="women" className="flex items-center gap-1.5">
          <input
            type="checkbox"
            className="accent-black"
            id="women"
            name="Category"
            onChange={(e) => updateCategory(e)}
            checked={selectedCategory.includes(collection.women)}
            defaultValue={collection.women}
          />
          <span className="capitalize text-sm">women</span>
        </label>

        <label htmlFor="kids" className="flex gap-1.5">
          <input
            type="checkbox"
            id="kids"
            className="accent-black"
            name="category"
            onChange={(e) => updateCategory(e)}
            checked={selectedCategory.includes(collection.kids)}
            defaultValue={collection.kids}
          />
          <span className="capitalize text-sm">kids</span>
        </label>
        <label htmlFor="unisex" className="flex gap-1">
          <input
            type="checkbox"
            id="unisex"
            name="category"
            className="accent-black"
            onChange={(e) => updateCategory(e)}
            checked={
              selectedCategory.includes(collection.men) &&
              selectedCategory.includes(collection.women)
            }
            defaultValue={collection.unisex}
          />
          <span className="capitalize text-sm">unisex</span>
        </label>
      </div>
    </div>
  );
}
export default CategoryCheckbox;
