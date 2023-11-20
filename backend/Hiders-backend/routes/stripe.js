require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express.Router();
const stripeURL = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeURL);
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const domain = "http://localhost:3000/purchase/sucess/";



app.post("/checkout", jsonParser, async (req, res) => {
  const PRODUCTS_FROM_CLIENT = req.body.cart;

  const purchase_id = uuidv4();

  const client_data_products_formated = PRODUCTS_FROM_CLIENT.map((i) => {
    return {
      price_data: {
        currency: "BRL",
        product_data: {
          name: i.name,
        },
        unit_amount: Math.round(i.price * 100),
      },
      quantity: i.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: client_data_products_formated,
    mode: "payment",
    success_url: `${domain + purchase_id}?success=true`,
    cancel_url: `${domain + purchase_id}?canceled=true`,
  });

  res.json({ url: session.url });
});

const webhook_secret = process.env.webhook_secret;

app.post(
  "/purchasewebhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhook_secret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      console.log(sessionWithLineItems);
    }
    if (event.type === "payment_intent.payment_failed") {
      
    }

    res.status(200).end();
  }
);

module.exports = app;
