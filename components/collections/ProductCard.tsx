import Link from "next/link";
import Image from "next/image";
import { Product } from "@/utils/types";
import { formatCurrency } from "@/utils/format";

function ProductCard({ product }: { product: Product }) {
  const {
    name,
    collection,
    defaultColour,
    colourInfo,
    availableColours,
    price,
    id,
  } = product;
  const image =
    colourInfo.find((colour) => colour.name === defaultColour)?.mainImage || "";
  return (
    <Link href={`/collections/${id}`} className="w-full flex flex-col gap-6 ">
      <div className={"w-full h-[416px] relative"}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
          priority
          className="w-full h-full rounded-3xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-[2px] items-start">
        <h4 className={"text-xl font-medium text-black  capitalize"}>{name}</h4>
        <span className={"text-sm  capitalize text-black/80"}>
          {collection}&apos;s shoes
        </span>
        <span className={"text-sm capitalize text-black/80"}>
          {availableColours.length} color
          {availableColours.length > 1 && "s"}
        </span>
        <span className={"text-xl font-medium text-black "}>
          {formatCurrency(price)}
        </span>
      </div>
    </Link>
  );
}
export default ProductCard;
