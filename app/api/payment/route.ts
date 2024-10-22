import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from "next/server";
import db from "@/utils/db";
import { ColourDetails } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");

  const { orderId, cartId } = await req.json();
  const user = await currentUser();

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  const line_items = cart.cartItems.map((cartItem) => {
    const { colour } = cartItem;
    const colourInfo = cartItem.product.colourInfo as ColourDetails[];
    const mainImage =
      colourInfo.find((col) => col.name === colour)?.mainImage || "";

    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.product.name.toUpperCase(),
          images: [mainImage],
        },
        unit_amount: cartItem.product.price * 100, // price in cents
      },
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      // customer_email: user?.emailAddresses[0].emailAddress,
      customer_email: "testsneaksup@gmail.com",
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: cart.shipping * 100,
              currency: "usd",
            },
            display_name: "Estimated Delivery",
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "NG"],
      },
      //   automatic_tax: { adding tax
      //     enabled: true,
      //   },
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
