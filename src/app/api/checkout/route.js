import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../models/order";
import { SupplementItem } from "../../models/supplement-item";
import { authOptions } from "../auth/[...nextauth]/authOptions";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDocument = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await SupplementItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }

    if (cartProduct.flavour) {
      const flavourInfo = productInfo.flavour.find(
        (flavour) =>
          flavour._id.toString() === cartProduct.flavour._id.toString()
      );
      if (flavourInfo) {
        productPrice += flavourInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  console.log({ stripeLineItems });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDocument._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?cancelled=1",
    metadata: { orderId: orderDocument._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDocument._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
