import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import { Cart } from "@prisma/client";
import { SubmitButton } from "../form/Buttons";
import { createOrderAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  return (
    <div className="xl:w-[421px] lg:w-[390px] w-full flex-shrink-0 flex flex-col gap-3 h-[304px]  rounded-[16px] border border-[#C0C0C0] p-5">
      <h3 className="text-2xl font-medium text-black capitalize">summary</h3>
      <CartTotalRow label="Subtotal" amount={cartTotal} />
      <CartTotalRow label="Estimated Delivery" amount={shipping} />
      <CartTotalRow label="Tax" amount={tax} />
      <CartTotalRow label="Total" amount={orderTotal} lastRow />

      <FormContainer action={createOrderAction}>
        <SubmitButton className="w-full rounded-full" text="place order" />
      </FormContainer>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      {lastRow ? <Separator className="my-1" /> : null}
      <p
        className={cn(
          "flex justify-between text-black text-sm",
          lastRow && "font-bold"
        )}
      >
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? <Separator className="my-1" /> : null}
    </>
  );
}

export default CartTotals;
