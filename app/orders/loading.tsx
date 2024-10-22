"use client";

import LoadingTable from "@/components/global/LoadingTable";
import Container from "@/components/global/Container";

function loading() {
  return (
    <Container className="py-14">
      <LoadingTable />
    </Container>
  );
}
export default loading;
