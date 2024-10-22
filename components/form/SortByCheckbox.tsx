"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { PriceOrder } from "@/utils/schema";

function SortByCheckbox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [bestSeller, setBestSeller] = useState(
    Boolean(searchParams.get("bestSeller"))
  );
  const [newCollection, setNewCollection] = useState(
    Boolean(searchParams.get("newCollection"))
  );
  const [priceOrder, setPriceOrder] = useState(
    searchParams.get("priceOrder") as PriceOrder
  );

  const updateSort = (
    e: React.ChangeEvent<HTMLInputElement>,
    sort: { key: string; value: string }
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const { checked } = e.target;
    const { key, value } = sort;

    if (checked) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setBestSeller(Boolean(searchParams.get("bestSeller")));
    setNewCollection(Boolean(searchParams.get("newCollection")));
    setPriceOrder(searchParams.get("priceOrder") as PriceOrder);
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-black text-base font-medium">Sort by</h4>
      <div className="flex flex-col gap-2">
        <label htmlFor="best" className="flex gap-1.5">
          <input
            type="checkbox"
            id="best"
            name="bestSeller"
            className="accent-black"
            onChange={(e) =>
              updateSort(e, {
                key: "bestSeller",
                value: "true",
              })
            }
            checked={bestSeller}
          />
          <span className="capitalize text-sm">best sellers</span>
        </label>
        <label htmlFor="new" className="flex gap-1.5">
          <input
            type="checkbox"
            id="new"
            name="newCollection"
            className="accent-black"
            onChange={(e) =>
              updateSort(e, { key: "newCollection", value: "true" })
            }
            checked={newCollection}
          />
          <span className="capitalize text-sm">new collections</span>
        </label>
        <label htmlFor="price-high" className="flex gap-1.5">
          <input
            type="checkbox"
            id="price-high"
            name="priceOrder"
            className="accent-black"
            onChange={(e) =>
              updateSort(e, {
                key: "priceOrder",
                value: "desc",
              })
            }
            checked={priceOrder === "desc"}
          />
          <span className="capitalize text-sm">price: high - low</span>
        </label>
        <label htmlFor="price-low" className="flex gap-1.5">
          <input
            type="checkbox"
            id="price-low"
            name="priceOrder"
            className="accent-black"
            onChange={(e) =>
              updateSort(e, {
                key: "priceOrder",
                value: "asc",
              })
            }
            checked={priceOrder === "asc"}
          />
          <span className="capitalize text-sm">price: low - high</span>
        </label>
      </div>
    </div>
  );
}
export default SortByCheckbox;
