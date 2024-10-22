import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchCartItems } from "@/utils/actions";
import Link from "next/link";
import { SlBag } from "react-icons/sl";

async function CartButton() {
  const numItemsInCart = await fetchCartItems();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={"/bag"} className="relative">
            <SlBag className="text-white size-6 " />
            <span className="size-[19px] top-0 right-0 translate-x-2 flex items-center justify-center font-semibold -translate-y-1 z-10 rounded-full bg-white text-[12px] text-black absolute">
              {numItemsInCart}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bag</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default CartButton;
