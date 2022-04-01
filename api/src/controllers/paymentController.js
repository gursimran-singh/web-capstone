const stripe = require("stripe")(
  "sk_test_51KimEjEOa2rFqgHgwNtuJquJ23Ss7wxgGovBwHSyvpLCHVZm22aHSC5RVj1NdY85hwALdkFJ6YDlPIcNW0rSN8bL00VeN91rku"
);

let payment = async (req, res) => {
  try {
    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: req.body.cardNumber,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
    });

    paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: req.body.amount * 100,
      currency: "cad",
      confirm: "true",
      payment_method_types: ["card"],
    });

    res.status(200).send(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { payment };
