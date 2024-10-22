import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { type NextRequest } from "next/server";
import db from "@/utils/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const addressDetails = session.shipping_details?.address;
    const shippingAddress = `${
      addressDetails?.line1 || addressDetails?.line2 || ""
    }, ${addressDetails?.city || ""}, ${addressDetails?.state || ""} ${
      addressDetails?.postal_code || ""
    }, ${addressDetails?.country || ""}`;

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;
    if (session.status === "complete") {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress,
        },
      });
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/orders");
};
