import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../../../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_PK);

const Payment = () => {
  const loadedClass = useLoaderData();
  const price = parseFloat(loadedClass.price.toFixed(2));

  return (
    <div className="w-full bg-slate-100 h-full">
      <h3 className="text-center mt-20 text-3xl font-bold text-purple-500 ">
        Please Procced to Payment
      </h3>
      <div className="max-w-3xl mx-auto my-32 bg-white py-10 px-16">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} loadedClass={loadedClass} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
