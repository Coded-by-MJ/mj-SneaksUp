import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";

function BreadCrumbs({
  name,
  collection,
}: {
  name: string;
  collection: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize text-sm text-black" asChild>
            <Link href="/collections">collections</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="size-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="text-sm capitalize text-black" asChild>
            <Link href={`/collections?category=${collection}`}>
              {collection}&apos;s shoes
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash className="size-3" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-sm text-black">
            {name.trim()}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export default BreadCrumbs;
