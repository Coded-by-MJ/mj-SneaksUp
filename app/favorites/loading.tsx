"use client";

import ProductsSkeleton from "@/components/collections/ProductsSkeleton";
import Container from "@/components/global/Container";

function loading() {
  return (
    <Container className="py-14">
      <ProductsSkeleton />
    </Container>
  );
}
export default loading;
