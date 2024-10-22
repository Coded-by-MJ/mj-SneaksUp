"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "Above $200", min: 200, max: 1000 },
];

function PriceRangeCheckbox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialMin = Number(searchParams.get("min")) || 0;
  const initialMax = Number(searchParams.get("max")) || 1000;
  const [priceRange, setPriceRange] = useState({
    min: initialMin,
    max: initialMax,
  });

  const updatePriceRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    range: { min: number; max: number }
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const { checked } = e.target;

    if (checked) {
      params.set("min", range.min.toString());
      params.set("max", range.max.toString());
    } else {
      params.delete("min");
      params.delete("max");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const initialMin = Number(searchParams.get("min")) || 0;
    const initialMax = Number(searchParams.get("max")) || 1000;
    setPriceRange({
      min: initialMin,
      max: initialMax,
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-black text-base font-medium">Price</h4>
      <div className="flex flex-col gap-2">
        {priceRanges.map((range) => (
          <label
            htmlFor={range.label}
            className="flex gap-1.5"
            key={range.label}
          >
            <input
              type="checkbox"
              id={range.label}
              name="priceRange"
              className="accent-black"
              onChange={(e) =>
                updatePriceRange(e, {
                  min: range.min,
                  max: range.max,
                })
              }
              checked={
                priceRange.min === range.min && priceRange.max === range.max
              }
            />
            <span className="capitalize text-sm">{range.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
export default PriceRangeCheckbox;
