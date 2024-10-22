import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function ProductsSkeleton() {
  return (
    <section className="grid w-full grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[48px]">
      {Array.from({ length: 9 }, (_, index) => (
        <Card
          key={index}
          className="w-full flex flex-col gap-6 rounded-none border-none"
        >
          <Skeleton className="w-full h-[416px]" />
          <div className="flex flex-col gap-4">
            <Skeleton className="rounded-full h-3 w-[300px]" />
            <Skeleton className="rounded-full  h-3 w-[200px]" />
          </div>
        </Card>
      ))}
    </section>
  );
}

export default ProductsSkeleton;
