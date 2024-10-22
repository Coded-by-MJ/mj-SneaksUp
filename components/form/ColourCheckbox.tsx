"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { availableColours, MultiColor } from "@/utils/helpers";
import type { AvailableColours } from "@/utils/schema";
import { ProductColors } from "@/utils/types";

function ColourCheckbox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialColours =
    (searchParams.get("colours")?.split(",") as AvailableColours) || [];
  const [selectedColours, setSelectedColours] = useState(initialColours);

  const updateColours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const checked = e.target.checked;
    const value = e.target.value as ProductColors;

    let updatedColor = [...selectedColours];

    if (checked) {
      updatedColor.push(value);
    } else {
      updatedColor = updatedColor.filter((color) => color !== value);
    }
    setSelectedColours(updatedColor);
    if (updatedColor.length > 0) {
      params.set("colours", updatedColor.join(","));
    } else {
      params.delete("colours");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const colours =
      (searchParams.get("colours")?.split(",") as AvailableColours) || [];
    setSelectedColours(colours);
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-black text-base font-medium">Colour</h4>
      <div className="grid grid-rows-4 grid-cols-2 gap-x-2 gap-y-2">
        {availableColours.map((colour) => {
          const { name, bg } = colour;
          return (
            <label
              htmlFor={name}
              className="flex items-center gap-1.5"
              key={name}
            >
              <input
                type="checkbox"
                id={name}
                name="colours"
                className="accent-black"
                onChange={(e) => updateColours(e)}
                checked={selectedColours.includes(name)}
                defaultValue={name}
              />
              <div className="flex gap-1.5 items-center">
                <span
                  style={{
                    background: bg,
                  }}
                  className={`size-4  block rounded-full`}
                ></span>
                <span className="capitalize text-sm">{name}</span>
              </div>
            </label>
          );
        })}

        <label htmlFor={"multicolor"} className="flex items-center gap-1.5">
          <input
            type="checkbox"
            id={"multicolor"}
            name="colours"
            className="accent-black"
            onChange={(e) => updateColours(e)}
            checked={selectedColours.includes("multicolor")}
            defaultValue={"multicolor"}
          />
          <div className="flex gap-1.5 items-center">
            <MultiColor />
            <span className="capitalize text-sm">multicolor</span>
          </div>
        </label>
      </div>
    </div>
  );
}
export default ColourCheckbox;
