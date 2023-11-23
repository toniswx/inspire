require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express.Router();
const stripeURL = process.env.STRIPE_PUBLIC_KEY;
const stripe = require("stripe")(stripeURL);
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const userModel = require("../models/user_model");
const products_model = require("../models/products_model");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const domain = "http://localhost:3000/purchase/sucess/";

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();

app.post("/checkout", jsonParser, async (req, res) => {
  const PRODUCTS_FROM_CLIENT = req.body.cart;
  const USERID = req.body.user;

  const purchase_id = uuidv4();

  const user = await userModel.findOne({ email: USERID });

  if (!user) return;

  console.log(PRODUCTS_FROM_CLIENT);

  //checkStore will return a array with ["true"] or ["false"]

  const checkStore = await Promise.all(
    PRODUCTS_FROM_CLIENT.map(async (item) => {
      let data = false;

      const checkIfItemHasEnoughQuantity = await products_model.findOne({
        title: item.name,
      });

      if (checkIfItemHasEnoughQuantity.quantity_available < item.quantity) {
        data = true;
      }

      return data;
    })
  );

 


  if (checkStore.includes(true)) return;


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

    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    custom_text: {
      shipping_address: {
        message:
          "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
      },
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
    customer: user.stripe_id,
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
      const lineItems = sessionWithLineItems.line_items;

      console.log(lineItems.data);

      const customerId = event.data.object.customer;

      //add invoice to user
      const newInvoice = {
        id: event.id,
        date: formattedDate,
        total: event.data.object.amount_total,
        adress: { ...event.data.object.shipping_details },
        status: event.data.object.status,
        items: lineItems.data,
      };

      const currentUser = await userModel.findOne({ stripe_id: customerId });

      const addInvoiceToUserDB = await userModel.findOneAndUpdate(
        {
          email: currentUser.email,
        },
        { invoices: [...currentUser.invoices, newInvoice], cart: [] }
      );

      //update products documents

      const updateProducstdb = Promise.all(
        lineItems.data.forEach(async (element) => {
          const currentItem = await products_model.findOne({
            title: element.description,
          });
          const updateCurrentItem = await products_model.findOneAndUpdate(
            { title: currentItem.title },
            {
              quantity_available:
                currentItem.quantity_available - element.quantity,
              buys: currentItem.buys + element.quantity,
            }
          );
        })
      );
    }
    if (event.type === "payment_intent.payment_failed") {
      //return to user
    }

    res.status(200).end();
  }
);

module.exports = app;
