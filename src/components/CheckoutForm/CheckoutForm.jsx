import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";

const CheckoutForm = ({ price, loadedClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);

  

// get all approved class for update spesific class enrolled and avaiable seat
  useEffect(() => {
    fetch(`https://teaching-server.vercel.app/approvedclass`)
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);


// create payment intant, and post data
  useEffect(() => {
    if(price > 0){
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);


  // payment button click handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setTransactionId("");
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError", confirmError);
    }
    setProcessing(false);
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const { classImage, classId, className, instructorName, _id } = loadedClass;
      
      const updatedSeat = classes.map((cls) => {
        if (cls._id === loadedClass.classId) {
          fetch(`https://teaching-server.vercel.app/updateClass/${loadedClass.classId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ availableSeats: cls.availableSeats - 1, enrolled: cls.enrolled + 1 }),
          })
            .then((res) => res.json())
            .then((updatedClass) => {
              console.log("Available seats updated in the database:", updatedClass);
            });
        }
      });
      setClasses(updatedSeat);
  
     

      const payment = {
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        price,
        classImage,
        classId,
        className,
        instructorName,
        selecteItemId: _id
      };
      axiosSecure.post("/payment", payment).then((res) => {
        if (res.data.insertResult.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment has been successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
          <button
            disabled={!stripe || !clientSecret || processing}
            className="btn btn-wide mt-20 bg-purple-600 text-white border-0"
          >
            Pay
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-500 mt-10 text-center">{cardError}</p>
      )}
      {transactionId && (
        <p className="text-green-500 mt-10 text-center">
          Payment Success with transacition ID: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;

