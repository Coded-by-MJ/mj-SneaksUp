import Container from "../global/Container";
import { Skeleton } from "../ui/skeleton";

function SingleProductSkeleton() {
  return (
    <>
      <Container className="flex flex-col gap-4 py-14">
        <Skeleton className="rounded-full  h-3 w-[300px]" />
        <div className="flex gap-6 w-full">
          <Skeleton className="w-1/2 h-[700px]" />
          <Skeleton className="w-1/2 h-[700px]" />
        </div>
      </Container>
    </>
  );
}
export default SingleProductSkeleton;
