import { cn } from "@/lib/utils";
import { CollectionLinks } from "./Navlinks";
import NavSearch from "./NavSearch";
import { Suspense } from "react";

function MobileNavbar() {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 min-h-dvh lg:hidden bg-black z-50 w-full p-6 absolute top-0 translate-y-[72px] left-0 animate-in fade-in slide-in-from-right-0"
      )}
    >
      <Suspense>
        <NavSearch />
      </Suspense>
      <CollectionLinks />
    </div>
  );
}
export default MobileNavbar;
