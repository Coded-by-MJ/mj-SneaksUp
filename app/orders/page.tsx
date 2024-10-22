import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/global/Container";
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
    <Container className="flex flex-col gap-4 py-14">
      <h2 className="lg:text-4xl uppercase font-medium xl:text-[43px] text-black text-3xl">
        your orders
      </h2>
      <div className="[&>*]:scrollbar-thumb-black [&>*]:scrollbar-track-[#F8F8F8] [&>*]:scrollbar-thumb-rounded-full [&>*]:scrollbar-track-rounded-full [&>*]:scrollbar-thin">
        <Table>
          <TableCaption>Total orders : {orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead className="text-nowrap">Order Total</TableHead>
              <TableHead className="text-nowrap">Delivery Fee</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const {
                products,
                orderTotal,
                shippingAddress,
                shipping,
                createdAt,
              } = order;

              return (
                <TableRow key={order.id}>
                  <TableCell>{products}</TableCell>
                  <TableCell className="text-nowrap">
                    {formatCurrency(orderTotal)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {formatCurrency(shipping)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {shippingAddress}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {formatDate(createdAt)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
export default OrdersPage;
